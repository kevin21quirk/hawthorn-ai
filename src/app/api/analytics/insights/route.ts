import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { bookings, orders, customers, aiInsights, analytics } from '@/db/schema';
import { gte, sql } from 'drizzle-orm';
import { ChatGroq } from '@langchain/groq';
import { ChatPromptTemplate } from '@langchain/core/prompts';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const generate = searchParams.get('generate') === 'true';

    if (generate) {
      await generateAIInsights();
    }

    const insights = await db
      .select()
      .from(aiInsights)
      .orderBy(sql`${aiInsights.createdAt} DESC`)
      .limit(10);

    return NextResponse.json({ insights });
  } catch (error) {
    console.error('Insights retrieval error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve insights' },
      { status: 500 }
    );
  }
}

async function generateAIInsights() {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const recentBookings = await db
    .select()
    .from(bookings)
    .where(gte(bookings.createdAt, thirtyDaysAgo));

  const recentOrders = await db
    .select()
    .from(orders)
    .where(gte(orders.createdAt, thirtyDaysAgo));

  const totalCustomers = await db.select().from(customers);

  const model = new ChatGroq({
    model: 'llama-3.1-70b-versatile',
    temperature: 0.7,
    apiKey: process.env.GROQ_API_KEY,
    callbacks: process.env.LANGCHAIN_TRACING_V2 === 'true' ? undefined : [],
  });

  const prompt = ChatPromptTemplate.fromMessages([
    ['system', 'You are a restaurant business analyst. Analyze the data and provide actionable insights.'],
    ['human', `Analyze this restaurant data from the last 30 days:

Total Bookings: {totalBookings}
Total Orders: {totalOrders}
Total Customers: {totalCustomers}
Average Party Size: {avgPartySize}

Provide 3-5 key insights with:
1. Insight title
2. Description
3. Priority (high/medium/low)
4. Actionable recommendation

Format as JSON array: [{{"title": "...", "description": "...", "priority": "...", "recommendation": "..."}}]`],
  ]);

  const avgPartySize = recentBookings.length > 0
    ? recentBookings.reduce((sum, b) => sum + b.partySize, 0) / recentBookings.length
    : 0;

  const chain = prompt.pipe(model);
  const result = await chain.invoke({
    totalBookings: recentBookings.length,
    totalOrders: recentOrders.length,
    totalCustomers: totalCustomers.length,
    avgPartySize: avgPartySize.toFixed(1),
  });

  try {
    const insights = JSON.parse(result.content as string);

    for (const insight of insights) {
      await db.insert(aiInsights).values({
        insightType: 'business_analytics',
        title: insight.title,
        description: insight.description,
        data: { recommendation: insight.recommendation },
        priority: insight.priority,
        actionable: true,
        status: 'new',
      });
    }
  } catch (error) {
    console.error('Error parsing AI insights:', error);
  }

  await db.insert(analytics).values({
    date: new Date(),
    metric: 'total_bookings_30d',
    value: recentBookings.length.toString(),
    metadata: { period: '30_days' },
  });

  await db.insert(analytics).values({
    date: new Date(),
    metric: 'avg_party_size',
    value: avgPartySize.toString(),
    metadata: { period: '30_days' },
  });
}
