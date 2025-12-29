import express from 'express';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// API key stored securely on server (not exposed to frontend)
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyATutVNYUwlmUsTk-klfzXUQTvMwD9j3Qk';

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

/**
 * Load the system prompt from file
 */
async function loadSystemPrompt() {
  try {
    const promptPath = path.join(__dirname, 'dist', 'prompts', 'pitch-refiner-system-prompt.md');
    return await fs.readFile(promptPath, 'utf-8');
  } catch (error) {
    console.error('Error loading system prompt:', error);
    // Fallback prompt
    return `You are an expert pitch refinement consultant. Analyze the user's pitch and provide a refined version with detailed analysis. Focus on clarity, impact, and memorability.`;
  }
}

/**
 * API endpoint to refine pitches using Google Gemini
 * POST /api/refine-pitch
 * Body: { "pitch": "user's pitch text" }
 */
app.post('/api/refine-pitch', async (req, res) => {
  try {
    const { pitch } = req.body;

    if (!pitch || typeof pitch !== 'string' || pitch.trim().length === 0) {
      return res.status(400).json({ 
        error: 'Invalid request', 
        message: 'Please provide a pitch to refine.' 
      });
    }

    // Load system prompt
    const systemPrompt = await loadSystemPrompt();

    // Call Google Gemini API
    const endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
    
    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: `${systemPrompt}\n\nUser pitch to refine: "${pitch.trim()}"\n\nPlease provide your refined pitch suggestion:`
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

    // Get the origin from the request for the referer header
    const origin = req.get('origin') || req.get('host') || 'localhost';
    const referer = origin.startsWith('http') ? origin : `http://${origin}`;
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': GEMINI_API_KEY,
        'Referer': referer
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
      return res.json({ refinedPitch: generatedText.trim() });
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
});

// Handle SPA routing - send all other requests to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
