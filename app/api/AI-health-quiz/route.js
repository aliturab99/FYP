// src/app/api/chat/route.ts (for a Next.js App Router API route)
import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export const maxDuration = 30; // Vercel-specific for streaming

export async function POST(req) {
  const { messages } = await req.json();

  const result = await streamText({
    model: google('models/gemini-1.5-pro-latest'), // Specify the model
    messages,
  });

  return result.toAIStreamResponse();
}