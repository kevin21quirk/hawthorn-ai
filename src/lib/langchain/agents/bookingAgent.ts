import { ChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { z } from 'zod';
import { db } from '@/db';
import { bookings, customers } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { RESTAURANT_CONTEXT } from '../config';

const bookingSchema = z.object({
  guestName: z.string().describe('Full name of the guest'),
  guestEmail: z.string().email().describe('Email address'),
  guestPhone: z.string().describe('Phone number'),
  date: z.string().describe('Booking date in YYYY-MM-DD format'),
  time: z.string().describe('Booking time in HH:MM format'),
  partySize: z.number().describe('Number of guests'),
  specialRequests: z.string().optional().describe('Any special requests or dietary requirements'),
  occasion: z.string().optional().describe('Special occasion if any'),
});

export type BookingData = z.infer<typeof bookingSchema>;

export async function processBookingWithAI(conversationText: string): Promise<BookingData | null> {
  const model = new ChatOpenAI({
    modelName: 'gpt-4o-mini',
    temperature: 0,
    openAIApiKey: process.env.OPENAI_API_KEY,
  });

  const prompt = ChatPromptTemplate.fromMessages([
    ['system', RESTAURANT_CONTEXT + '\n\nExtract booking information from the conversation. Return a JSON object with: guestName, guestEmail, guestPhone, date (YYYY-MM-DD), time (HH:MM), partySize, specialRequests, occasion.'],
    ['human', 'Extract booking details from this conversation:\n\n{conversation}'],
  ]);

  try {
    const chain = prompt.pipe(model);
    
    const result = await chain.invoke({
      conversation: conversationText,
    });

    const parsed = JSON.parse(result.content as string);
    return parsed as BookingData;
  } catch (error) {
    console.error('Error processing booking:', error);
    return null;
  }
}

export async function createBooking(bookingData: BookingData) {
  try {
    const bookingDateTime = new Date(`${bookingData.date}T${bookingData.time}`);

    let customerId = null;
    const existingCustomer = await db
      .select()
      .from(customers)
      .where(eq(customers.email, bookingData.guestEmail))
      .limit(1);

    if (existingCustomer.length > 0) {
      customerId = existingCustomer[0].id;
      
      await db
        .update(customers)
        .set({
          visitCount: existingCustomer[0].visitCount + 1,
          lastVisit: new Date(),
          updatedAt: new Date(),
        })
        .where(eq(customers.id, customerId));
    } else {
      const newCustomer = await db
        .insert(customers)
        .values({
          email: bookingData.guestEmail,
          name: bookingData.guestName,
          phone: bookingData.guestPhone,
          visitCount: 1,
          preferences: {},
        })
        .returning();
      
      customerId = newCustomer[0].id;
    }

    const aiSuggestions: any = {};
    
    if (bookingData.occasion) {
      aiSuggestions.specialOccasion = bookingData.occasion;
      aiSuggestions.menuRecommendations = [
        'Chef\'s Tasting Menu',
        'Premium Wine Pairing',
        'Celebration Dessert Platter',
      ];
    }

    if (bookingData.partySize >= 6) {
      aiSuggestions.upsellItems = [
        'Family-style sharing platters',
        'Group wine selection',
        'Pre-dinner canapés',
      ];
    }

    const newBooking = await db
      .insert(bookings)
      .values({
        customerId,
        guestName: bookingData.guestName,
        guestEmail: bookingData.guestEmail,
        guestPhone: bookingData.guestPhone,
        date: bookingDateTime,
        time: bookingData.time,
        partySize: bookingData.partySize,
        specialRequests: bookingData.specialRequests || null,
        status: 'confirmed',
        aiSuggestions,
      })
      .returning();

    return newBooking[0];
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
}

export async function generateUpsellSuggestions(bookingId: number) {
  const model = new ChatOpenAI({
    modelName: 'gpt-4o-mini',
    temperature: 0.8,
    openAIApiKey: process.env.OPENAI_API_KEY,
  });

  const booking = await db
    .select()
    .from(bookings)
    .where(eq(bookings.id, bookingId))
    .limit(1);

  if (booking.length === 0) return [];

  const bookingData = booking[0];
  const aiSuggestions = bookingData.aiSuggestions as any;

  const prompt = ChatPromptTemplate.fromMessages([
    ['system', RESTAURANT_CONTEXT + '\n\nGenerate personalized upsell suggestions for this booking.'],
    ['human', `Booking details:
- Party size: {partySize}
- Special occasion: {occasion}
- Special requests: {specialRequests}

Generate 3-5 relevant upsell suggestions that would enhance their dining experience.`],
  ]);

  const chain = prompt.pipe(model);

  const result = await chain.invoke({
    partySize: bookingData.partySize,
    occasion: aiSuggestions?.specialOccasion || 'none',
    specialRequests: bookingData.specialRequests || 'none',
  });

  return result.content;
}
