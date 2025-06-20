"use server"; // Marks this file/function as a server-side only

import { generateText } from 'ai'; // Assuming 'ai' is your library
import { openai } from '@ai-sdk/openai'; // Assuming this is how you import openai

export async function getMedicalAdvice() {
  try {
    const { text } = await generateText({
      model: openai("gpt-4o-mini"), // Or your 'o3-mini' model
      prompt: "Give medical advice on how a person can keep themselves fit"
    });
    return text;
  } catch (error) {
    console.error("Error generating text:", error);
    return "Failed to get advice. Please try again later.";
  }
}