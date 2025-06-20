// app/actions.js (or similar server-side file)
"use server"; // Marks this file/function as a server-side only

import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function getMedicalAdvice() {
  try {
    // Access the API key from environment variables
    const openaiApiKey = process.env.OPENAI_API_KEY;

    if (!openaiApiKey) {
      throw new Error("OpenAI API key is not configured. Please set the OPENAI_API_KEY environment variable.");
    }

    const { text } = await generateText({
      model: openai("gpt-4o-mini", { apiKey: openaiApiKey }), // Pass the API key to the model initialization
      prompt: "Give medical advice on how a person can keep themselves fit"
    });
    return text;
  } catch (error) {
    console.error("Error generating text:", error);
    // Return a user-friendly error message
    return "Failed to get advice. Please try again later. (Check server logs for details).";
  }
}