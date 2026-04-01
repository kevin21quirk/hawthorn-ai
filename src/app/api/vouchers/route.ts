import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { vouchers, customers, emails } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { ChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate } from '@langchain/core/prompts';

function generateVoucherCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = 'HTH-';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export async function POST(req: NextRequest) {
  try {
    const {
      purchaserName,
      purchaserEmail,
      recipientName,
      recipientEmail,
      amount,
      message,
      occasion,
    } = await req.json();

    if (!purchaserName || !purchaserEmail || !amount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    let customerId = null;
    const existingCustomer = await db
      .select()
      .from(customers)
      .where(eq(customers.email, purchaserEmail))
      .limit(1);

    if (existingCustomer.length > 0) {
      customerId = existingCustomer[0].id;
    } else {
      const newCustomer = await db
        .insert(customers)
        .values({
          email: purchaserEmail,
          name: purchaserName,
          preferences: {},
        })
        .returning();
      customerId = newCustomer[0].id;
    }

    let personalizedMessage = message;
    if (!message && occasion) {
      const model = new ChatOpenAI({
        modelName: 'gpt-4o-mini',
        temperature: 0.9,
        openAIApiKey: process.env.OPENAI_API_KEY,
      });

      const prompt = ChatPromptTemplate.fromMessages([
        ['system', 'You are a thoughtful gift message writer for a fine dining restaurant.'],
        ['human', 'Write a warm, elegant gift voucher message for {occasion}. Keep it under 100 words.'],
      ]);

      const chain = prompt.pipe(model);
      const result = await chain.invoke({ occasion });
      personalizedMessage = result.content as string;
    }

    const code = generateVoucherCode();
    const expiresAt = new Date();
    expiresAt.setFullYear(expiresAt.getFullYear() + 1);

    const voucher = await db
      .insert(vouchers)
      .values({
        code,
        customerId,
        purchaserName,
        purchaserEmail,
        recipientName: recipientName || null,
        recipientEmail: recipientEmail || null,
        amount: amount.toString(),
        balance: amount.toString(),
        message: personalizedMessage,
        status: 'active',
        expiresAt,
      })
      .returning();

    await db.insert(emails).values({
      type: 'voucher_purchase',
      recipient: purchaserEmail,
      subject: `Gift Voucher Purchase Confirmation - £${amount} - The Hawthorn`,
      voucherId: voucher[0].id,
      emailData: {
        voucherCode: code,
        voucherAmount: `£${amount}`,
        recipientName: recipientName || undefined,
        message: personalizedMessage || undefined,
      },
      status: 'sent',
    });

    return NextResponse.json({
      success: true,
      voucher: voucher[0],
      message: 'Gift voucher created successfully',
    });
  } catch (error) {
    console.error('Voucher creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create voucher' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');

    if (!code) {
      return NextResponse.json(
        { error: 'Voucher code is required' },
        { status: 400 }
      );
    }

    const voucher = await db
      .select()
      .from(vouchers)
      .where(eq(vouchers.code, code))
      .limit(1);

    if (voucher.length === 0) {
      return NextResponse.json(
        { error: 'Voucher not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ voucher: voucher[0] });
  } catch (error) {
    console.error('Voucher retrieval error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve voucher' },
      { status: 500 }
    );
  }
}
