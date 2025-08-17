import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

function generateSystemPrompt(tone, profession) {
  return `You are an expert communication assistant specializing in professional tone adjustment.

Role: ${profession}
Desired Tone: ${tone}

Instructions:
1. Rewrite the given text to match the specified tone and professional context
2. Maintain the original meaning and intent
3. Ensure the language is appropriate for the specified profession
4. Make the text sound natural and authentic
5. Keep the same general length unless brevity is requested
6. Only return the improved text, no explanations

Focus on making the communication effective and professional while matching the desired tone perfectly.`;
}

export async function POST(request) {
  try {
    const { text, profession, tone } = await request.json();

    if (!text || !profession || !tone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    // Get the Gemini model
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash"
    });

    // Create the prompt
    const systemPrompt = generateSystemPrompt(tone, profession);
    const prompt = `${systemPrompt}

Original text: "${text}"

Please rewrite this text with the specified tone and professional context. Provide only the improved version:`;

    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const outputText = response.text().trim();

    // Return the result
    return NextResponse.json({ result: outputText });

  } catch (error) {
    console.error('Gemini API Error:', error);

    // Handle specific errors
    if (error.message?.includes('quota')) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again in a moment.' },
        { status: 429 }
      );
    }

    if (error.message?.includes('SAFETY')) {
      return NextResponse.json(
        { error: 'Content filtered. Please try different text.' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to process request. Please try again.' },
      { status: 500 }
    );
  }
}