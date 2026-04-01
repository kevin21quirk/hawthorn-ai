# Groq API Setup Guide

Your application now uses **Groq** as the free LLM provider instead of OpenAI.

## What is Groq?

Groq provides blazing-fast LLM inference with a generous free tier:
- **14,400 requests per day**
- **30 requests per minute**
- **Models:** Llama 3.1 70B, Mixtral, Gemma, and more
- **Speed:** 10x faster than OpenAI in many cases
- **100% Free** for the limits above

## Step 1: Get Your Free Groq API Key

1. Go to [https://console.groq.com](https://console.groq.com)
2. Sign up with your email or Google account (free, no credit card required)
3. Once logged in, go to **API Keys** in the left sidebar
4. Click **Create API Key**
5. Give it a name like "Hawthorn Restaurant"
6. Copy the API key (starts with `gsk_...`)

## Step 2: Add to `.env.local`

Open your `.env.local` file and add:

```bash
# Database
DATABASE_URL=your_existing_database_url

# Groq API (Free LLM Provider)
GROQ_API_KEY=gsk_your_groq_api_key_here

# LangSmith (Optional - for tracing)
LANGCHAIN_TRACING_V2=true
LANGCHAIN_API_KEY=lsv2_pt_your_langsmith_key
LANGCHAIN_PROJECT=hawthorn-restaurant
LANGCHAIN_ENDPOINT=https://api.smith.langchain.com
```

**Note:** You no longer need `OPENAI_API_KEY`!

## Step 3: Add to Vercel (Production)

1. Go to [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your **hawthorn-ai** project
3. Go to **Settings** → **Environment Variables**
4. Add:
   - **Key:** `GROQ_API_KEY`
   - **Value:** `gsk_your_groq_api_key_here`
   - **Environments:** Production, Preview, Development (all 3)
5. Click **Save**
6. Redeploy your site

## Step 4: Restart Your Dev Server

```bash
npm run dev
```

## Step 5: Test the Chatbot

1. Go to `http://localhost:3000`
2. Click the orange chat button
3. Send a message
4. You should get a fast response from Llama 3.1!

## What Changed?

All LangChain integrations now use Groq:
- ✅ **Chatbot** - Customer assistant
- ✅ **Booking Agent** - Booking information extraction
- ✅ **Gift Vouchers** - Personalized message generation
- ✅ **Menu Recommendations** - AI-powered suggestions
- ✅ **Events** - Event description generation
- ✅ **Analytics Insights** - Business intelligence

## Model Information

**Current Model:** `llama-3.1-70b-versatile`
- 70 billion parameters
- Excellent for conversational AI
- Fast inference
- Great instruction following

**Alternative Models Available:**
- `llama-3.1-8b-instant` - Faster, smaller model
- `mixtral-8x7b-32768` - Good for long context
- `gemma2-9b-it` - Google's Gemma model

To change the model, edit `src/lib/langchain/config.ts` and update the `model` field.

## Free Tier Limits

- **14,400 requests/day** = ~600 requests/hour
- **30 requests/minute** = Plenty for most use cases
- **No credit card required**
- **No expiration**

For a restaurant website, this is more than enough for production use!

## Troubleshooting

### "API key not found" error
- Make sure `GROQ_API_KEY` is in your `.env.local` file
- Restart your dev server after adding the key

### "Rate limit exceeded"
- You've hit the 30 requests/minute limit
- Wait 60 seconds and try again
- Consider implementing request caching if needed

### Slow responses
- Groq is usually very fast (faster than OpenAI)
- Check your internet connection
- Try a smaller model like `llama-3.1-8b-instant`

## Comparison: Groq vs OpenAI

| Feature | Groq (Free) | OpenAI (Paid) |
|---------|-------------|---------------|
| Cost | **Free** | $0.15-$60 per 1M tokens |
| Speed | **Very Fast** | Fast |
| Daily Limit | 14,400 requests | Based on credits |
| Setup | No credit card | Credit card required |
| Models | Llama 3.1, Mixtral | GPT-4, GPT-3.5 |
| Quality | Excellent | Excellent |

## Resources

- [Groq Console](https://console.groq.com)
- [Groq Documentation](https://console.groq.com/docs)
- [Groq Playground](https://console.groq.com/playground)
- [LangChain Groq Integration](https://js.langchain.com/docs/integrations/chat/groq)

---

**You're all set!** Get your free Groq API key and start using the chatbot immediately.
