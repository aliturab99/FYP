import { NextResponse } from 'next/server';

export async function POST(request) {
  const { prompt } = await request.json();
  const apiKey = 'API_KEY_GOES_HERE'; // Replace with your actual Gemini API key

  if (!apiKey) {
    return NextResponse.json({ error: 'Gemini API key not set.' }, { status: 500 });
  }

  // Add system prompt for better medical responses
  const systemPrompt =
    `**Rules:**
- Do not express sympathy, concern, or politeness.
- Do not explain that you are an AI.
- Do not recommend seeing a doctor unless adding the provided short disclaimer at the end.
- Only ask up to 2 short follow-up questions if needed.
- After receiving answers, suggest medicines from the product list if relevant.
- Responses must be short and only in clean HTML using <p>, <ul>, <li>, <strong>, and <br> tags.
- Do not include extra phrases like "I understand", "It sounds like", "As an AI", etc.

  User's message: ${prompt}
`;
  const improvedPrompt = `${systemPrompt}`;

  try {
    console.log('prompt', improvedPrompt)
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: improvedPrompt }] }],
      }),
    });
    const data = await response.json();
    if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts[0].text) {
      return NextResponse.json({ result: data.candidates[0].content.parts[0].text });
    } else {
      return NextResponse.json({ error: 'No response from Gemini.' }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
