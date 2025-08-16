import { NextRequest, NextResponse } from 'next/server'
import OpenAI from "openai";

export async function POST(request: NextRequest) {
  try {
    const { text, tone, profession } = await request.json()

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a tone fixer AI. Rewrite the given text in a ${tone} tone for a ${profession}. Keep the core message but adjust the language, formality, and style to match the requested tone and professional context.`,
        },
        { role: "user", content: text },
      ],
    });

    const result = completion.choices[0].message.content;

    return NextResponse.json({ result });
  } catch (error) {
    console.error("OpenAI error:", error);
    return NextResponse.json(
      { error: "Failed to connect to OpenAI" },
      { status: 500 }
    );
  }
}