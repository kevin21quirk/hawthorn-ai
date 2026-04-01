# LangSmith Integration Setup Guide

This guide will help you integrate LangSmith with your LangChain implementation for monitoring, debugging, and tracing AI interactions.

## What is LangSmith?

LangSmith is LangChain's platform for debugging, testing, evaluating, and monitoring LLM applications. It provides:
- **Tracing**: See every step of your LLM chain execution
- **Debugging**: Identify issues in your prompts and chains
- **Monitoring**: Track performance and costs in production
- **Testing**: Evaluate your LLM outputs

## Prerequisites

✅ You already have `langsmith` package installed (v0.5.15)
✅ LangChain is already configured in your project

## Step 1: Get Your LangSmith API Key

1. Go to [https://smith.langchain.com](https://smith.langchain.com)
2. Sign up or log in with your account
3. Navigate to **Settings** → **API Keys**
4. Click **Create API Key**
5. Copy your API key (you won't be able to see it again!)

## Step 2: Add Environment Variables to `.env.local`

Add these variables to your `.env.local` file:

```bash
# Existing variables
DATABASE_URL=your_existing_database_url
OPENAI_API_KEY=your_existing_openai_key

# LangSmith Configuration
LANGCHAIN_TRACING_V2=true
LANGCHAIN_API_KEY=your_langsmith_api_key_here
LANGCHAIN_PROJECT=hawthorn-restaurant
LANGCHAIN_ENDPOINT=https://api.smith.langchain.com
```

### Variable Explanations:

- **LANGCHAIN_TRACING_V2**: Set to `true` to enable tracing
- **LANGCHAIN_API_KEY**: Your LangSmith API key from Step 1
- **LANGCHAIN_PROJECT**: Name of your project in LangSmith (you can change this)
- **LANGCHAIN_ENDPOINT**: LangSmith API endpoint (default shown above)

## Step 3: Add Environment Variables to Vercel

For production deployment, add the same variables to Vercel:

1. Go to your Vercel dashboard: [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your **hawthorn-ai** project
3. Go to **Settings** → **Environment Variables**
4. Add each variable:
   - **LANGCHAIN_TRACING_V2** = `true`
   - **LANGCHAIN_API_KEY** = `your_langsmith_api_key`
   - **LANGCHAIN_PROJECT** = `hawthorn-restaurant`
   - **LANGCHAIN_ENDPOINT** = `https://api.smith.langchain.com`
5. Make sure to select **Production**, **Preview**, and **Development** for each variable
6. Click **Save**

## Step 4: Restart Your Development Server

After adding the environment variables:

```bash
# Stop your current dev server (Ctrl+C)
# Then restart it
npm run dev
```

## Step 5: Test the Integration

1. Go to your website: `http://localhost:3000`
2. Interact with the AI chatbot or make a booking
3. Go to [https://smith.langchain.com](https://smith.langchain.com)
4. Navigate to your **hawthorn-restaurant** project
5. You should see traces appearing in real-time!

## What You'll See in LangSmith

### Traces
Every AI interaction will show:
- **Input prompts** sent to the model
- **Model responses** received
- **Latency** for each step
- **Token usage** and costs
- **Full conversation context**

### Useful for:
- **Debugging**: See exactly what prompts are being sent
- **Optimization**: Identify slow chains or expensive calls
- **Quality**: Review AI responses for accuracy
- **Monitoring**: Track usage patterns and costs

## Tracing Locations in Your App

LangSmith will automatically trace:

1. **Chat API** (`/api/chat/route.ts`)
   - Customer conversations with the AI assistant
   - Intent detection and entity extraction

2. **Booking Agent** (`/lib/langchain/agents/bookingAgent.ts`)
   - Booking information extraction
   - Upsell suggestion generation

3. **Gift Voucher API** (`/api/vouchers/route.ts`)
   - AI-generated personalized messages for vouchers

## Troubleshooting

### Traces Not Appearing?

1. **Check environment variables are set correctly**
   ```bash
   # In your terminal
   echo $LANGCHAIN_TRACING_V2
   echo $LANGCHAIN_API_KEY
   ```

2. **Verify API key is valid**
   - Go to LangSmith settings and check your API key

3. **Restart your dev server**
   - Environment variables only load on server start

4. **Check the LangSmith project name**
   - Make sure the project exists in your LangSmith dashboard

### Still Having Issues?

- Check the browser console for errors
- Check your terminal for LangChain warnings
- Verify your `.env.local` file has no syntax errors
- Make sure there are no extra spaces in your API key

## Advanced Configuration

### Custom Project Names per Environment

You can use different project names for dev vs production:

```bash
# .env.local (development)
LANGCHAIN_PROJECT=hawthorn-dev

# Vercel (production)
LANGCHAIN_PROJECT=hawthorn-production
```

### Disable Tracing Temporarily

Set `LANGCHAIN_TRACING_V2=false` to disable tracing without removing other variables.

### Custom Tags and Metadata

You can add custom tags to traces by modifying the LangChain calls (advanced usage).

## Next Steps

Once LangSmith is working:

1. **Review traces** to understand your AI's behavior
2. **Optimize prompts** based on what you see
3. **Set up monitoring** for production usage
4. **Create datasets** for testing different scenarios
5. **Use feedback** features to improve responses

## Resources

- [LangSmith Documentation](https://docs.smith.langchain.com/)
- [LangChain Tracing Guide](https://python.langchain.com/docs/langsmith/walkthrough)
- [LangSmith Dashboard](https://smith.langchain.com)

---

**Need Help?** Check the LangSmith documentation or reach out to LangChain support.
