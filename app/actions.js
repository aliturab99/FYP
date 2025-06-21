"use server";

export async function generateMedicalAdvice(symptoms) {
  const openaiApiKey = process.env.OPENAI_API_KEY;

  if (!openaiApiKey || openaiApiKey === process.env.OPENAI_API_KEY) {
    console.error("Error: OpenAI API key is not set. Please replace 'YOUR_OPENAI_API_KEY_PLACEHOLDER' with your actual key.");
    return "Error: OpenAI API key is not configured. Cannot generate advice.";
  }

  try {
    const payload = {
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant providing general, non-diagnostic health information. Always emphasize that you are not a medical professional and advice should be sought from a doctor." },
        { role: "user", content: `Based on the following symptoms, provide general health information and common considerations. Emphasize that this is not medical advice and a doctor should be consulted for diagnosis and treatment: ${symptoms}` }
      ],
      max_tokens: 500,
      temperature: 0.7
    };

    console.log(`Attempting to call OpenAI API for symptoms: ${symptoms}`);

    const simulatedResponse = (
      `Disclaimer: This information is for general knowledge only and is not medical advice. ` +
      `Always consult a qualified healthcare professional for diagnosis and treatment related to your specific symptoms: '${symptoms}'.\n\n` +
      `Based on symptoms like '${symptoms}', some common, non-serious conditions might include general fatigue, mild stress, or a common cold if accompanied by other typical symptoms. ` +
      `For example, if you have a headache, it could be due to dehydration, eye strain, or tension. ` +
      `If you have stomach discomfort, it might be related to diet or minor indigestion.\n\n` +
      `It's important to monitor your symptoms, get adequate rest, stay hydrated, and avoid self-diagnosing. ` +
      `If your symptoms persist, worsen, or are severe, please seek immediate medical attention from a doctor.`
    );

    return simulatedResponse;

  } catch (error) {
    console.error("An error occurred while generating medical advice:", error);
    if (error.name === 'AbortError') {
      return "Failed to generate advice: Request timed out. Please try again.";
    }
    return `An unexpected error occurred while generating medical advice: ${error.message}.`;
  }
}
