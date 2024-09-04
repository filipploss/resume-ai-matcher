// src/app/api/openai/route.ts

import { NextResponse } from 'next/server';
import OpenAI from 'openai'; // Assuming you have the OpenAI package installed

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure you have this environment variable set
});

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    const completion = await openai.chat.completions.create({
      // model: "gpt-4",
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: message },
      ],
    });

    return NextResponse.json({ message: completion.choices[0].message.content });
  } catch (error) {
    console.error('Error generating completion:', error);
    return NextResponse.json({ error: 'Failed to generate completion' }, { status: 500 });
  }
}
