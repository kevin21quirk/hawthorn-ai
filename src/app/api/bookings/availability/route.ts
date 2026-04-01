import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { bookings } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

export async function POST(req: NextRequest) {
  try {
    const { date, partySize } = await req.json();

    const requestedDate = new Date(date);
    
    const allSlots = [
      '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
      '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', 
      '20:00', '20:30', '21:00', '21:30'
    ];

    const dayOfWeek = requestedDate.getDay();
    if (dayOfWeek === 1) {
      return NextResponse.json({
        availableSlots: [],
        message: 'We are closed on Mondays',
      });
    }

    const existingBookings = await db
      .select()
      .from(bookings)
      .where(eq(bookings.date, requestedDate));

    const availableSlots = allSlots.filter(slot => {
      const slotBookings = existingBookings.filter(b => b.time === slot);
      const totalBooked = slotBookings.reduce((sum, b) => sum + b.partySize, 0);
      const maxCapacity = 80;
      
      return totalBooked + partySize <= maxCapacity;
    });

    return NextResponse.json({
      availableSlots,
      date,
      partySize,
    });
  } catch (error) {
    console.error('Availability check error:', error);
    return NextResponse.json(
      { error: 'Failed to check availability' },
      { status: 500 }
    );
  }
}
