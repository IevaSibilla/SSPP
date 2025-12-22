/**
 * Refines a pitch using Google Cloud's Gemini API
 * @param userInput The user's original pitch text
 * @param systemPrompt The system prompt/instructions for the AI
 * @returns Promise<string> The refined pitch suggestion
 */
export const refinePitch = async (
  userInput: string,
  systemPrompt: string
): Promise<string> => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error('Gemini API key is not configured. Please set VITE_GEMINI_API_KEY in your .env file.');
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-preview:generateContent`;

  const requestBody = {
    contents: [
      {
        parts: [
          {
            text: `${systemPrompt}\n\nUser pitch to refine: "${userInput}"\n\nPlease provide your refined pitch suggestion:`
          }
        ]
      }
    ],
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 2048
    }
  };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error?.message || 
        `API request failed with status ${response.status}: ${response.statusText}`
      );
    }

    const data = await response.json();

    // Extract the generated text from the response
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      const generatedText = data.candidates[0].content.parts[0].text;
      return generatedText.trim();
    }

    throw new Error('Unexpected API response format');
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(`Failed to refine pitch: ${String(error)}`);
  }
};

