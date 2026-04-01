import { NextResponse } from 'next/server';
import { db } from '@/db';
import { bookings, orders, customers, events } from '@/db/schema';
import { gte, sql } from 'drizzle-orm';

export async function GET() {
  try {
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

    const totalRevenue = recentOrders.reduce((sum, order) => {
      return sum + parseFloat(order.total as string);
    }, 0);

    const allCustomers = await db.select().from(customers);

    const sixtyDaysFromNow = new Date();
    sixtyDaysFromNow.setDate(sixtyDaysFromNow.getDate() + 60);

    const upcomingEvents = await db
      .select()
      .from(events)
      .where(
        sql`${events.eventDate} >= ${new Date()} AND ${events.eventDate} <= ${sixtyDaysFromNow}`
      );

    return NextResponse.json({
      totalBookings: recentBookings.length,
      totalRevenue: Math.round(totalRevenue),
      totalCustomers: allCustomers.length,
      upcomingEvents: upcomingEvents.length,
    });
  } catch (error) {
    console.error('Stats error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
