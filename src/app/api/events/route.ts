import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { events, eventBookings, customers } from '@/db/schema';
import { eq, gte } from 'drizzle-orm';
import { ChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { RESTAURANT_CONTEXT } from '@/lib/langchain/config';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const upcoming = searchParams.get('upcoming') === 'true';

    let query = db.select().from(events);

    if (upcoming) {
      query = query.where(gte(events.eventDate, new Date()));
    }

    const results = await query;

    return NextResponse.json({ events: results });
  } catch (error) {
    console.error('Events retrieval error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve events' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const {
      title,
      description,
      eventDate,
      eventType,
      capacity,
      price,
      generateWithAI,
      targetAudience,
    } = await req.json();

    let finalTitle = title;
    let finalDescription = description;

    if (generateWithAI && eventType) {
      const model = new ChatOpenAI({
        modelName: 'gpt-4o-mini',
        temperature: 0.9,
        openAIApiKey: process.env.OPENAI_API_KEY,
      });

      const prompt = ChatPromptTemplate.fromMessages([
        ['system', RESTAURANT_CONTEXT + '\n\nYou are an event marketing expert for fine dining restaurants.'],
        ['human', `Create an engaging event for our restaurant:

Event Type: {eventType}
Date: {eventDate}
Target Audience: {targetAudience}

Generate:
1. A catchy event title (max 60 characters)
2. An enticing description (max 200 words) that highlights the unique experience

Format as JSON: {{"title": "...", "description": "..."}}`],
      ]);

      const chain = prompt.pipe(model);
      const result = await chain.invoke({
        eventType,
        eventDate,
        targetAudience: JSON.stringify(targetAudience || {}),
      });

      try {
        const parsed = JSON.parse(result.content as string);
        finalTitle = parsed.title || title;
        finalDescription = parsed.description || description;
      } catch {
        finalTitle = title;
        finalDescription = description;
      }
    }

    const event = await db
      .insert(events)
      .values({
        title: finalTitle,
        description: finalDescription,
        eventDate: new Date(eventDate),
        eventType,
        capacity,
        bookedSeats: 0,
        price: price?.toString() || null,
        aiGenerated: generateWithAI || false,
        targetAudience: targetAudience || null,
        promotionStatus: 'active',
      })
      .returning();

    return NextResponse.json({
      success: true,
      event: event[0],
    });
  } catch (error) {
    console.error('Event creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    );
  }
}
