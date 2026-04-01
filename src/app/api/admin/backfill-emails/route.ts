import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { bookings, vouchers, emails } from '@/db/schema';
import { isNull } from 'drizzle-orm';

export async function POST(req: NextRequest) {
  try {
    let bookingsProcessed = 0;
    let vouchersProcessed = 0;

    // Get all bookings that don't have email records
    const allBookings = await db.select().from(bookings);
    
    for (const booking of allBookings) {
      // Check if email already exists for this booking
      const existingEmail = await db
        .select()
        .from(emails)
        .where(isNull(emails.bookingId))
        .limit(1);

      // Create email log for this booking
      await db.insert(emails).values({
        type: 'booking_confirmation',
        recipient: booking.guestEmail,
        subject: `Booking Confirmation - The Hawthorn - ${new Date(booking.date).toLocaleDateString()} at ${booking.time}`,
        bookingId: booking.id,
        emailData: {
          guestName: booking.guestName,
          date: new Date(booking.date).toLocaleDateString(),
          time: booking.time,
          partySize: booking.partySize,
          specialRequests: booking.specialRequests || undefined,
        },
        status: 'sent',
        sentAt: booking.createdAt,
      });
      bookingsProcessed++;
    }

    // Get all vouchers that don't have email records
    const allVouchers = await db.select().from(vouchers);
    
    for (const voucher of allVouchers) {
      // Check if email already exists for this voucher
      const existingEmail = await db
        .select()
        .from(emails)
        .where(isNull(emails.voucherId))
        .limit(1);

      // Create email log for this voucher
      await db.insert(emails).values({
        type: 'voucher_purchase',
        recipient: voucher.purchaserEmail,
        subject: `Gift Voucher Purchase Confirmation - £${voucher.amount} - The Hawthorn`,
        voucherId: voucher.id,
        emailData: {
          voucherCode: voucher.code,
          voucherAmount: `£${voucher.amount}`,
          recipientName: voucher.recipientName || undefined,
          message: voucher.message || undefined,
        },
        status: 'sent',
        sentAt: voucher.createdAt,
      });
      vouchersProcessed++;
    }

    return NextResponse.json({
      success: true,
      message: 'Email logs backfilled successfully',
      bookingsProcessed,
      vouchersProcessed,
    });
  } catch (error) {
    console.error('Backfill error:', error);
    return NextResponse.json(
      { error: 'Failed to backfill email logs' },
      { status: 500 }
    );
  }
}
