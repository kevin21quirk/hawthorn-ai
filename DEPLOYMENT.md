# Deployment Guide - The Hawthorn AI Restaurant Platform

## Quick Start

### 1. Seed the Database (Manual Method)

Since the automated seed script has environment loading issues, you can seed the database manually:

**Option A: Use Drizzle Studio**
```bash
npm run db:studio
```
Then manually insert menu items via the UI.

**Option B: Use the API endpoint (after starting the server)**

Create a temporary API route to seed data:

```typescript
// src/app/api/seed/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/db';
import { menuItems } from '@/db/schema';

export async function POST() {
  const items = [
    {
      name: 'Pan-Seared Scallops',
      description: 'Fresh scallops with cauliflower puree, crispy pancetta, and truffle oil',
      category: 'Starters',
      price: '14.50',
      dietary: ['gluten-free'],
      allergens: ['shellfish', 'dairy'],
      ingredients: ['scallops', 'cauliflower', 'pancetta', 'truffle oil'],
      available: true,
      popularity: 95,
    },
    // Add more items...
  ];

  for (const item of items) {
    await db.insert(menuItems).values(item);
  }

  return NextResponse.json({ success: true });
}
```

Then call: `POST http://localhost:3000/api/seed`

### 2. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

### 3. Test AI Features

#### Test Chat Widget:
- Click the chat button (bottom-right)
- Try: "Do you have availability for 4 people tomorrow at 7pm?"
- Try: "What vegetarian options do you have?"

#### Test Dashboard:
- Visit: `http://localhost:3000/dashboard`
- Click "Generate AI Insights"

## Deploying to Vercel

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Add AI-powered features"
git push origin main
```

### Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js

### Step 3: Configure Environment Variables

In Vercel Dashboard → Settings → Environment Variables, add:

```
DATABASE_URL=postgresql://neondb_owner:npg_3wIiZGP2gdso@ep-restless-star-abespayz-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require

OPENAI_API_KEY=your_openai_api_key_here

LANGCHAIN_TRACING_V2=true

LANGCHAIN_ENDPOINT=https://api.smith.langchain.com

LANGCHAIN_API_KEY=your_langsmith_api_key_here

LANGCHAIN_PROJECT=hawthorn-restaurant

NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

### Step 4: Deploy

Click "Deploy" - Vercel will:
- Install dependencies
- Build the Next.js app
- Deploy to production

### Step 5: Seed Production Database

After deployment, you can seed the production database:

1. Create the `/api/seed` route (as shown above)
2. Call it once: `POST https://your-domain.vercel.app/api/seed`
3. Delete the seed route for security

## Environment Variables Needed

| Variable | Description | Where to Get |
|----------|-------------|--------------|
| `DATABASE_URL` | Neon PostgreSQL connection | Already have it |
| `OPENAI_API_KEY` | OpenAI API key | [platform.openai.com](https://platform.openai.com) |
| `LANGCHAIN_API_KEY` | LangSmith API key | [smith.langchain.com](https://smith.langchain.com) |

## Post-Deployment Checklist

- [ ] Test chat widget on production
- [ ] Create a test booking
- [ ] Generate AI insights in dashboard
- [ ] Test menu recommendations API
- [ ] Verify LangSmith traces are appearing
- [ ] Test gift voucher creation
- [ ] Create a test event

## Monitoring

### LangSmith Dashboard
- View all AI agent traces
- Monitor performance
- Debug conversations
- Track costs

Visit: https://smith.langchain.com

### Vercel Analytics
- Monitor page performance
- Track errors
- View deployment logs

### Neon Database
- Monitor database performance
- View query analytics
- Check connection pooling

## Troubleshooting

### Chat Widget Not Responding
- Check OPENAI_API_KEY is set correctly
- Verify DATABASE_URL is accessible
- Check Vercel function logs

### Database Connection Issues
- Ensure Neon database is active
- Verify connection string includes `?sslmode=require`
- Check IP allowlist in Neon (should allow all for Vercel)

### AI Responses Slow
- Normal for first request (cold start)
- Consider upgrading to Vercel Pro for better performance
- Check LangSmith for bottlenecks

## Scaling Considerations

### Database
- Neon auto-scales
- Monitor connection pool usage
- Consider read replicas for high traffic

### AI Costs
- Monitor OpenAI usage in dashboard
- Set spending limits
- Consider caching frequent queries

### Vercel
- Free tier: 100GB bandwidth/month
- Upgrade to Pro for production workloads
- Enable Edge caching for static assets

## Security Best Practices

✅ **Implemented:**
- Environment variables for secrets
- SQL injection protection (Drizzle ORM)
- Input validation (Zod schemas)
- Secure API routes

🔒 **Recommended:**
- Add rate limiting for API routes
- Implement authentication for dashboard
- Add CORS restrictions
- Enable Vercel password protection during development

## Backup Strategy

### Database Backups
Neon provides automatic backups:
- Point-in-time recovery
- Daily snapshots
- 7-day retention (free tier)

### Code Backups
- GitHub repository (primary)
- Vercel deployment history
- Local development copy

## Support Resources

- **Next.js Docs**: https://nextjs.org/docs
- **LangChain Docs**: https://js.langchain.com/docs
- **Drizzle ORM**: https://orm.drizzle.team
- **Neon Docs**: https://neon.tech/docs
- **Vercel Docs**: https://vercel.com/docs

---

## Quick Commands Reference

```bash
# Development
npm run dev                 # Start dev server
npm run build              # Build for production
npm run start              # Start production server

# Database
npm run db:push            # Push schema to database
npm run db:studio          # Open Drizzle Studio
npm run db:generate        # Generate migrations

# Deployment
vercel                     # Deploy to Vercel
vercel --prod             # Deploy to production
```

## Next Steps After Deployment

1. **Add Authentication** - Protect the dashboard with NextAuth.js
2. **Email Notifications** - Send booking confirmations via Resend or SendGrid
3. **SMS Reminders** - Integrate Twilio for booking reminders
4. **Analytics Dashboard** - Add charts with Recharts
5. **Customer Portal** - Let customers manage their bookings
6. **Staff Portal** - Manage bookings and view AI insights
7. **Payment Integration** - Add Stripe for deposits and vouchers
8. **Review System** - Collect and display customer reviews

---

**Your AI-powered restaurant platform is ready to deploy! 🚀**
