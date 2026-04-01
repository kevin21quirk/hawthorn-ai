# The Hawthorn - AI-Powered Restaurant Platform

## Overview

This project transforms The Hawthorn restaurant website into a fully automated, AI-powered platform using Next.js, LangChain, LangSmith, and Neon PostgreSQL. The system provides intelligent customer service, automated bookings, personalized recommendations, and business insights.

## 🤖 AI Features Implemented

### 1. 24/7 Intelligent Customer Assistant
- **Location**: Chat widget on all pages (bottom-right corner)
- **Technology**: LangChain agents with OpenAI GPT-4o-mini
- **Capabilities**:
  - Answer questions about the restaurant
  - Check table availability in real-time
  - Provide menu recommendations based on dietary preferences
  - Retrieve customer history for personalized service
  - Handle booking inquiries
- **API Endpoint**: `/api/chat`
- **Component**: `src/components/ChatWidget.tsx`

### 2. Smart Menu Experience
- **Technology**: AI-powered recommendations with LangChain
- **Features**:
  - Personalized dish recommendations based on:
    - Dietary preferences (vegetarian, vegan, gluten-free)
    - Allergies and restrictions
    - Special occasions
    - Customer history
  - Wine pairing suggestions
  - Intelligent filtering
- **API Endpoint**: `/api/menu/recommendations`
- **Database**: 12 sample menu items with full metadata

### 3. AI-Powered Table Booking
- **Technology**: LangChain structured output parsing
- **Features**:
  - Natural language booking extraction
  - Real-time availability checking (80-seat capacity)
  - Automatic customer profile creation/update
  - Special occasion detection
  - Personalized upsell suggestions
- **API Endpoint**: `/api/bookings`
- **Agent**: `src/lib/langchain/agents/bookingAgent.ts`

### 4. Upselling & Revenue Automation
- **Technology**: AI-generated contextual suggestions
- **Features**:
  - Automatic upsell recommendations based on:
    - Party size
    - Special occasions
    - Customer preferences
    - Booking time
  - Wine pairing suggestions
  - Premium menu item recommendations
- **Integration**: Built into booking flow

### 5. Events & Promotions Engine
- **Technology**: AI content generation
- **Features**:
  - AI-generated event titles and descriptions
  - Target audience analysis
  - Automated event marketing copy
  - Capacity management
  - Event booking system
- **API Endpoint**: `/api/events`

### 6. Intelligent Gift Voucher Sales
- **Technology**: AI-powered personalization
- **Features**:
  - Automatic voucher code generation (HTH-XXXXXXXX)
  - AI-generated personalized messages
  - Occasion-based customization
  - 1-year expiry tracking
  - Balance management
- **API Endpoint**: `/api/vouchers`

### 7. Customer Memory & Personalisation
- **Technology**: PostgreSQL with JSONB for preferences
- **Features**:
  - Automatic customer profile creation
  - Visit history tracking
  - Preference learning (dietary, seating, favorite dishes)
  - Special occasion reminders
  - Spending analytics
- **Database Tables**: `customers`, `interactions`

### 8. Owner Insights Dashboard
- **Location**: `/dashboard`
- **Technology**: AI-powered analytics with GPT-4o-mini
- **Features**:
  - Real-time business metrics
  - AI-generated insights and recommendations
  - Performance analytics
  - Revenue tracking
  - Customer behavior analysis
  - Actionable business recommendations
- **API Endpoints**: `/api/analytics/insights`, `/api/analytics/stats`

## 🗄️ Database Schema

### Tables Created
1. **customers** - Customer profiles and preferences
2. **bookings** - Table reservations with AI suggestions
3. **orders** - Order history with upsell tracking
4. **interactions** - Chat history and customer interactions
5. **vouchers** - Gift voucher management
6. **events** - Event management and bookings
7. **eventBookings** - Event reservation tracking
8. **menuItems** - Menu catalog with AI descriptions
9. **analytics** - Business metrics
10. **aiInsights** - AI-generated business insights

## 🚀 Setup Instructions

### 1. Environment Variables
Create `.env.local` with:
```env
DATABASE_URL=your_neon_connection_string
OPENAI_API_KEY=your_openai_key
LANGCHAIN_TRACING_V2=true
LANGCHAIN_ENDPOINT=https://api.smith.langchain.com
LANGCHAIN_API_KEY=your_langsmith_key
LANGCHAIN_PROJECT=hawthorn-restaurant
```

### 2. Database Setup
```bash
# Push schema to Neon database
npm run db:push

# Seed with sample menu items
npm run db:seed
```

### 3. Development
```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

### 4. Deployment to Vercel

#### Environment Variables to Set in Vercel:
- `DATABASE_URL` - Your Neon PostgreSQL connection string
- `OPENAI_API_KEY` - Your OpenAI API key
- `LANGCHAIN_API_KEY` - Your LangSmith API key
- `LANGCHAIN_TRACING_V2` - Set to `true`
- `LANGCHAIN_ENDPOINT` - `https://api.smith.langchain.com`
- `LANGCHAIN_PROJECT` - `hawthorn-restaurant`

#### Deploy:
```bash
# Using Vercel CLI
vercel

# Or connect your GitHub repo to Vercel dashboard
```

## 📊 LangSmith Integration

All AI agents are automatically traced in LangSmith for:
- Performance monitoring
- Debugging conversations
- Cost tracking
- Quality assurance

Access your traces at: https://smith.langchain.com

## 🎯 Key AI Agents

### Customer Assistant Agent
- **File**: `src/lib/langchain/agents/customerAssistant.ts`
- **Tools**:
  - `check_availability` - Real-time table availability
  - `get_menu_recommendations` - Personalized menu suggestions
  - `get_customer_history` - Customer profile retrieval

### Booking Agent
- **File**: `src/lib/langchain/agents/bookingAgent.ts`
- **Functions**:
  - `processBookingWithAI` - Extract booking from conversation
  - `createBooking` - Create reservation with AI suggestions
  - `generateUpsellSuggestions` - Revenue optimization

## 🔧 API Routes

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/chat` | POST | AI customer assistant |
| `/api/bookings` | POST/GET | Table reservations |
| `/api/menu/recommendations` | POST | AI menu suggestions |
| `/api/vouchers` | POST/GET | Gift voucher management |
| `/api/events` | POST/GET | Event management |
| `/api/analytics/insights` | GET | AI business insights |
| `/api/analytics/stats` | GET | Dashboard statistics |

## 📱 Frontend Components

### ChatWidget
- Floating chat button
- Real-time AI responses
- Session management
- Message history

### Dashboard
- Business metrics overview
- AI-generated insights
- Performance analytics
- Activity feed

## 🎨 Tech Stack

- **Framework**: Next.js 16.2.1 (App Router)
- **AI/ML**: LangChain, OpenAI GPT-4o-mini
- **Database**: Neon PostgreSQL with Drizzle ORM
- **Monitoring**: LangSmith
- **Styling**: Tailwind CSS
- **Deployment**: Vercel
- **Icons**: Lucide React

## 🔐 Security Features

- Environment variables for sensitive data
- SQL injection protection via Drizzle ORM
- Input validation with Zod
- Secure API routes
- Customer data encryption

## 📈 Performance Optimizations

- Edge runtime for API routes
- Database connection pooling (Neon)
- Efficient AI model selection (gpt-4o-mini)
- Optimized database queries
- Client-side caching

## 🧪 Testing the AI Features

### Test the Chat Assistant:
1. Open the website
2. Click the chat widget (bottom-right)
3. Try queries like:
   - "Do you have availability for 4 people on Friday at 7pm?"
   - "What vegetarian options do you have?"
   - "I have a gluten allergy, what can I eat?"

### Test Menu Recommendations:
```bash
curl -X POST http://localhost:3000/api/menu/recommendations \
  -H "Content-Type: application/json" \
  -d '{"dietary": ["vegetarian"], "occasion": "anniversary"}'
```

### Test Booking:
```bash
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "bookingData": {
      "guestName": "John Doe",
      "guestEmail": "john@example.com",
      "guestPhone": "+44 1234 567890",
      "date": "2026-04-15",
      "time": "19:00",
      "partySize": 4,
      "occasion": "anniversary"
    }
  }'
```

### Access Dashboard:
Navigate to: `http://localhost:3000/dashboard`

## 🎯 Future Enhancements

- Email notifications for bookings
- SMS reminders
- Voice AI integration
- Multi-language support
- Advanced analytics with charts
- Customer loyalty program
- Automated marketing campaigns
- Integration with POS systems

## 📞 Support

For issues or questions:
- Check LangSmith traces for AI debugging
- Review database logs in Neon dashboard
- Monitor Vercel deployment logs

## 🏆 Success Metrics

The AI system tracks:
- Chat resolution rate (target: 90%+)
- Booking conversion rate (target: 85%+)
- Upsell success rate (target: 70%+)
- Customer satisfaction
- Revenue per booking
- Repeat customer rate

---

**Built with ❤️ using cutting-edge AI technology**
