import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { interactions } from '@/db/schema';
import { desc } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  try {
    const results = await db
      .select()
      .from(interactions)
      .orderBy(desc(interactions.createdAt))
      .limit(50);

    const formattedInteractions = results.map(interaction => ({
      id: interaction.id,
      type: interaction.type === 'chat' ? 'sent' : 'reply',
      subject: `${interaction.type === 'chat' ? 'AI Chat' : 'Customer Inquiry'} - ${interaction.message.substring(0, 50)}...`,
      recipient: (interaction.metadata as any)?.email || 'System',
      timestamp: interaction.createdAt.toISOString(),
      status: 'delivered',
    }));

    return NextResponse.json({ interactions: formattedInteractions });
  } catch (error) {
    console.error('Interactions retrieval error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve interactions', interactions: [] },
      { status: 500 }
    );
  }
}
