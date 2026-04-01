import { NextRequest, NextResponse } from 'next/server';
import { createBooking, processBookingWithAI, generateUpsellSuggestions } from '@/lib/langchain/agents/bookingAgent';
import { db } from '@/db';
import { bookings } from '@/db/schema';
import { eq, and, gte } from 'drizzle-orm';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { conversationText, bookingData } = body;

    let finalBookingData = bookingData;

    if (conversationText && !bookingData) {
      finalBookingData = await processBookingWithAI(conversationText);
      
      if (!finalBookingData) {
        return NextResponse.json(
          { error: 'Could not extract complete booking information from conversation' },
          { status: 400 }
        );
      }
    }

    if (!finalBookingData) {
      return NextResponse.json(
        { error: 'Booking data is required' },
        { status: 400 }
      );
    }

    const requestedDateTime = new Date(`${finalBookingData.date}T${finalBookingData.time}`);
    
    const existingBookings = await db
      .select()
      .from(bookings)
      .where(
        and(
          eq(bookings.date, requestedDateTime),
          eq(bookings.status, 'confirmed')
        )
      );

    const totalBooked = existingBookings.reduce((sum, booking) => sum + booking.partySize, 0);
    const maxCapacity = 80;

    if (totalBooked + finalBookingData.partySize > maxCapacity) {
      return NextResponse.json(
        { error: 'No availability at the requested time', available: false },
        { status: 409 }
      );
    }

    const newBooking = await createBooking(finalBookingData);

    const upsellSuggestions = await generateUpsellSuggestions(newBooking.id);

    return NextResponse.json({
      success: true,
      booking: newBooking,
      upsellSuggestions,
    });
  } catch (error) {
    console.error('Booking API error:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    const upcoming = searchParams.get('upcoming') === 'true';

    const conditions = [];
    
    if (email) {
      conditions.push(eq(bookings.guestEmail, email));
    }

    if (upcoming) {
      conditions.push(gte(bookings.date, new Date()));
    }

    const results = conditions.length > 0
      ? await db.select().from(bookings).where(and(...conditions))
      : await db.select().from(bookings);

    return NextResponse.json({ bookings: results });
  } catch (error) {
    console.error('Get bookings error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}
