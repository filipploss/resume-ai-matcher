import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    const completion = await anthropic.messages.create({
      // model: "claude-3-opus-20240229",
      // model: "claude-3-sonnet-20240229",
      model: "claude-3-haiku-20240307",
      max_tokens: 4000,
      messages: [
        { role: "user", content: message }
      ],
    });

    return NextResponse.json({ message: completion.content[0].text });
  } catch (error) {
    console.error('Error generating completion:', error);
    return NextResponse.json({ error: 'Failed to generate completion' }, { status: 500 });
  }
}