// Vercel Serverless Function for Pitch Refiner API
// This runs on Vercel's edge network, keeping the API key secure

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyATutVNYUwlmUsTk-klfzXUQTvMwD9j3Qk';

const SYSTEM_PROMPT = `You are an expert pitch refinement consultant with years of experience helping founders secure funding. Your role is to transform basic pitches into compelling, investor-ready statements.

## Your Task
When given a pitch, you will:
1. **Provide a refined pitch** - A polished, high-impact version
2. **Analyze the original** - Brief explanation of what was weak
3. **Explain key improvements** - What specific changes you made and why
4. **Share why this version works** - The psychology/strategy behind the improvements
5. **Suggest next steps** - 2-3 actionable items to further strengthen their pitch

## Guidelines
- Keep refined pitches concise (1-2 sentences max)
- Use specific numbers and outcomes when possible
- Focus on the transformation/value delivered, not features
- Make it memorable and emotionally resonant
- Avoid jargon unless industry-specific and necessary

## Format
Structure your response with clear headers using markdown formatting.`;

export default async function handler(req, res) {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { pitch } = req.body;

    if (!pitch || typeof pitch !== 'string' || pitch.trim().length === 0) {
      return res.status(400).json({ 
        error: 'Invalid request', 
        message: 'Please provide a pitch to refine.' 
      });
    }

    // Call Google Gemini API
    const endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
    
    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: `${SYSTEM_PROMPT}\n\nUser pitch to refine: "${pitch.trim()}"\n\nPlease provide your refined pitch suggestion:`
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

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': GEMINI_API_KEY
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Gemini API error:', errorData);
      return res.status(response.status).json({ 
        error: 'API Error', 
        message: errorData.error?.message || `Request failed with status ${response.status}` 
      });
    }

    const data = await response.json();

    // Extract the generated text from the response
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      const generatedText = data.candidates[0].content.parts[0].text;
      return res.status(200).json({ refinedPitch: generatedText.trim() });
    }

    return res.status(500).json({ 
      error: 'Unexpected Response', 
      message: 'The AI response format was unexpected.' 
    });

  } catch (error) {
    console.error('Error in /api/refine-pitch:', error);
    return res.status(500).json({ 
      error: 'Server Error', 
      message: 'An error occurred while processing your request.' 
    });
  }
}



