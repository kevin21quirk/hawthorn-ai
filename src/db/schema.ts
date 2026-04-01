import { pgTable, text, serial, timestamp, integer, boolean, jsonb, decimal, varchar, uuid } from 'drizzle-orm/pg-core';

export const customers = pgTable('customers', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }),
  preferences: jsonb('preferences').$type<{
    dietary?: string[];
    favoriteItems?: string[];
    allergies?: string[];
    seatingPreference?: string;
    specialOccasions?: { type: string; date: string }[];
  }>(),
  totalSpent: decimal('total_spent', { precision: 10, scale: 2 }).default('0'),
  visitCount: integer('visit_count').default(0),
  lastVisit: timestamp('last_visit'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const bookings = pgTable('bookings', {
  id: serial('id').primaryKey(),
  customerId: integer('customer_id').references(() => customers.id),
  guestName: varchar('guest_name', { length: 255 }).notNull(),
  guestEmail: varchar('guest_email', { length: 255 }).notNull(),
  guestPhone: varchar('guest_phone', { length: 50 }).notNull(),
  date: timestamp('date').notNull(),
  time: varchar('time', { length: 10 }).notNull(),
  partySize: integer('party_size').notNull(),
  specialRequests: text('special_requests'),
  status: varchar('status', { length: 50 }).default('confirmed').notNull(),
  tableNumber: varchar('table_number', { length: 20 }),
  aiSuggestions: jsonb('ai_suggestions').$type<{
    menuRecommendations?: string[];
    upsellItems?: string[];
    specialOccasion?: string;
  }>(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  bookingId: integer('booking_id').references(() => bookings.id),
  customerId: integer('customer_id').references(() => customers.id),
  items: jsonb('items').notNull().$type<{
    name: string;
    quantity: number;
    price: number;
    category: string;
  }[]>(),
  subtotal: decimal('subtotal', { precision: 10, scale: 2 }).notNull(),
  tax: decimal('tax', { precision: 10, scale: 2 }).notNull(),
  total: decimal('total', { precision: 10, scale: 2 }).notNull(),
  upsellItems: jsonb('upsell_items').$type<string[]>(),
  aiRecommendations: jsonb('ai_recommendations').$type<{
    suggested: string[];
    accepted: string[];
    revenue: number;
  }>(),
  status: varchar('status', { length: 50 }).default('pending').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  completedAt: timestamp('completed_at'),
});

export const interactions = pgTable('interactions', {
  id: serial('id').primaryKey(),
  customerId: integer('customer_id').references(() => customers.id),
  sessionId: uuid('session_id').notNull(),
  type: varchar('type', { length: 50 }).notNull(),
  message: text('message').notNull(),
  response: text('response'),
  sentiment: varchar('sentiment', { length: 20 }),
  metadata: jsonb('metadata').$type<{
    intent?: string;
    entities?: Record<string, any>;
    confidence?: number;
  }>(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const vouchers = pgTable('vouchers', {
  id: serial('id').primaryKey(),
  code: varchar('code', { length: 50 }).notNull().unique(),
  customerId: integer('customer_id').references(() => customers.id),
  purchaserName: varchar('purchaser_name', { length: 255 }).notNull(),
  purchaserEmail: varchar('purchaser_email', { length: 255 }).notNull(),
  recipientName: varchar('recipient_name', { length: 255 }),
  recipientEmail: varchar('recipient_email', { length: 255 }),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  balance: decimal('balance', { precision: 10, scale: 2 }).notNull(),
  message: text('message'),
  status: varchar('status', { length: 50 }).default('active').notNull(),
  expiresAt: timestamp('expires_at'),
  redeemedAt: timestamp('redeemed_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const events = pgTable('events', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  eventDate: timestamp('event_date').notNull(),
  eventType: varchar('event_type', { length: 50 }).notNull(),
  capacity: integer('capacity').notNull(),
  bookedSeats: integer('booked_seats').default(0),
  price: decimal('price', { precision: 10, scale: 2 }),
  imageUrl: text('image_url'),
  aiGenerated: boolean('ai_generated').default(false),
  targetAudience: jsonb('target_audience').$type<{
    demographics?: string[];
    interests?: string[];
    previousAttendees?: boolean;
  }>(),
  promotionStatus: varchar('promotion_status', { length: 50 }).default('draft'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const eventBookings = pgTable('event_bookings', {
  id: serial('id').primaryKey(),
  eventId: integer('event_id').references(() => events.id).notNull(),
  customerId: integer('customer_id').references(() => customers.id),
  guestName: varchar('guest_name', { length: 255 }).notNull(),
  guestEmail: varchar('guest_email', { length: 255 }).notNull(),
  seats: integer('seats').notNull(),
  totalAmount: decimal('total_amount', { precision: 10, scale: 2 }).notNull(),
  status: varchar('status', { length: 50 }).default('confirmed').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const menuItems = pgTable('menu_items', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description').notNull(),
  category: varchar('category', { length: 100 }).notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  imageUrl: text('image_url'),
  dietary: jsonb('dietary').$type<string[]>(),
  allergens: jsonb('allergens').$type<string[]>(),
  ingredients: jsonb('ingredients').$type<string[]>(),
  available: boolean('available').default(true),
  popularity: integer('popularity').default(0),
  aiDescription: text('ai_description'),
  pairingRecommendations: jsonb('pairing_recommendations').$type<string[]>(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const analytics = pgTable('analytics', {
  id: serial('id').primaryKey(),
  date: timestamp('date').notNull(),
  metric: varchar('metric', { length: 100 }).notNull(),
  value: decimal('value', { precision: 10, scale: 2 }).notNull(),
  metadata: jsonb('metadata').$type<Record<string, any>>(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const aiInsights = pgTable('ai_insights', {
  id: serial('id').primaryKey(),
  insightType: varchar('insight_type', { length: 100 }).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  data: jsonb('data').notNull().$type<Record<string, any>>(),
  priority: varchar('priority', { length: 20 }).default('medium'),
  actionable: boolean('actionable').default(true),
  status: varchar('status', { length: 50 }).default('new'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const emails = pgTable('emails', {
  id: serial('id').primaryKey(),
  type: varchar('type', { length: 50 }).notNull(), // 'booking_confirmation', 'voucher_purchase', etc.
  recipient: varchar('recipient', { length: 255 }).notNull(),
  subject: varchar('subject', { length: 500 }).notNull(),
  bookingId: integer('booking_id').references(() => bookings.id),
  voucherId: integer('voucher_id').references(() => vouchers.id),
  emailData: jsonb('email_data').$type<{
    guestName?: string;
    date?: string;
    time?: string;
    partySize?: number;
    specialRequests?: string;
    voucherCode?: string;
    voucherAmount?: string;
    recipientName?: string;
    message?: string;
  }>(),
  status: varchar('status', { length: 50 }).default('sent').notNull(),
  sentAt: timestamp('sent_at').defaultNow().notNull(),
});
