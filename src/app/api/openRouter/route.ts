import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    const completion = await openai.chat.completions.create({
      // model: "google/gemini-2.0-flash-exp:free",
      model: "meta-llama/llama-4-scout:free",

      messages: [
        { role: "system", content: "You are a helpful HR assistant." },
        { role: "user", content: message },
      ],
    });

    return NextResponse.json({
      message: completion.choices[0].message.content,
    });
  } catch (error: any) {
    console.error("Error generating completion:", error);
    console.error("Error details:", error.message);
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
    }
    return NextResponse.json(
      { error: "Failed to generate completion", details: error.message },
      { status: 500 }
    );
  }
}
