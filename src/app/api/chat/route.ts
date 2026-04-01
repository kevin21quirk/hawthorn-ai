import { NextRequest, NextResponse } from 'next/server';
import { createCustomerAssistantAgent } from '@/lib/langchain/agents/customerAssistant';
import { HumanMessage, AIMessage } from '@langchain/core/messages';
import { db } from '@/db';
import { interactions } from '@/db/schema';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
  try {
    const { messages, sessionId } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid messages format' },
        { status: 400 }
      );
    }

    const currentSessionId = sessionId || uuidv4();
    const userMessage = messages[messages.length - 1];

    const chatHistory = messages.slice(0, -1).map((msg: any) => {
      return msg.role === 'user' 
        ? new HumanMessage(msg.content)
        : new AIMessage(msg.content);
    });

    const agent = await createCustomerAssistantAgent();

    const result = await agent.invoke({
      input: userMessage.content,
      chat_history: chatHistory,
    });

    const messageContent = typeof userMessage.content === 'string' 
      ? userMessage.content 
      : JSON.stringify(userMessage.content);
    
    const responseContent = typeof result.output === 'string'
      ? result.output
      : JSON.stringify(result.output);

    await db.insert(interactions).values({
      sessionId: currentSessionId,
      type: 'chat',
      message: messageContent,
      response: responseContent,
      metadata: {
        intent: 'general_inquiry',
        confidence: 0.9,
      },
    });

    return NextResponse.json({
      response: result.output,
      sessionId: currentSessionId,
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    );
  }
}
