import { NextRequest, NextResponse } from 'next/server';
import { ChatGroq } from '@langchain/groq';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { db } from '@/db';
import { menuItems, customers } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { RESTAURANT_CONTEXT } from '@/lib/langchain/config';

export async function POST(req: NextRequest) {
  try {
    const { dietary, allergies, occasion, customerEmail, preferences } = await req.json();

    let items = await db.select().from(menuItems).where(eq(menuItems.available, true));

    let customerPreferences = preferences;
    if (customerEmail) {
      const customer = await db
        .select()
        .from(customers)
        .where(eq(customers.email, customerEmail))
        .limit(1);

      if (customer.length > 0) {
        customerPreferences = {
          ...customerPreferences,
          ...(customer[0].preferences as any),
        };
      }
    }

    if (dietary && dietary.length > 0) {
      items = items.filter(item => 
        dietary.some((pref: string) => item.dietary?.includes(pref))
      );
    }

    if (allergies && allergies.length > 0) {
      items = items.filter(item => 
        !allergies.some((allergen: string) => item.allergens?.includes(allergen))
      );
    }

    const model = new ChatGroq({
      model: 'llama-3.1-70b-versatile',
      temperature: 0.8,
      apiKey: process.env.GROQ_API_KEY,
      callbacks: process.env.LANGCHAIN_TRACING_V2 === 'true' ? undefined : [],
    });

    const prompt = ChatPromptTemplate.fromMessages([
      ['system', RESTAURANT_CONTEXT + '\n\nYou are a sommelier and menu expert. Provide personalized recommendations.'],
      ['human', `Based on the following information, recommend 5 dishes from our menu:

Available items: {items}
Dietary preferences: {dietary}
Allergies: {allergies}
Occasion: {occasion}
Customer preferences: {customerPreferences}

For each recommendation, explain why it's a good choice and suggest wine pairings.`],
    ]);

    const chain = prompt.pipe(model);

    const result = await chain.invoke({
      items: JSON.stringify(items.slice(0, 20).map(i => ({
        name: i.name,
        description: i.description,
        category: i.category,
        price: i.price,
      }))),
      dietary: dietary?.join(', ') || 'none',
      allergies: allergies?.join(', ') || 'none',
      occasion: occasion || 'casual dining',
      customerPreferences: JSON.stringify(customerPreferences || {}),
    });

    const topItems = items
      .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
      .slice(0, 8);

    return NextResponse.json({
      recommendations: topItems,
      aiSuggestions: result.content,
      personalized: !!customerEmail,
    });
  } catch (error) {
    console.error('Menu recommendations error:', error);
    return NextResponse.json(
      { error: 'Failed to generate recommendations' },
      { status: 500 }
    );
  }
}
