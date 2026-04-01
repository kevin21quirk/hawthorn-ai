import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { emails } from '@/db/schema';
import { desc } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  try {
    const results = await db
      .select()
      .from(emails)
      .orderBy(desc(emails.sentAt))
      .limit(100);

    const formattedEmails = results.map(email => ({
      id: email.id,
      type: 'sent',
      subject: email.subject,
      recipient: email.recipient,
      timestamp: email.sentAt.toISOString(),
      status: email.status,
      emailType: email.type,
      emailData: email.emailData,
      bookingId: email.bookingId,
      voucherId: email.voucherId,
    }));

    return NextResponse.json({ interactions: formattedEmails });
  } catch (error) {
    console.error('Email retrieval error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve emails', interactions: [] },
      { status: 500 }
    );
  }
}
