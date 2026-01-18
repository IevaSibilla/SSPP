/**
 * Refines a pitch using the backend API proxy
 * The API key is stored securely on the server, not exposed to the frontend
 * @param userInput The user's original pitch text
 * @returns Promise<string> The refined pitch suggestion
 */

// Vercel backend URL - update this after deploying to Vercel
const VERCEL_API_URL = 'https://sspp.vercel.app';

// Determine the API endpoint based on environment
const getApiEndpoint = (): string => {
  const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
  
  // If running on localhost, use local API (for development with node server.js)
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return '/api/refine-pitch';
  }
  
  // For production (Hostinger or other static hosts), use Vercel backend
  return `${VERCEL_API_URL}/api/refine-pitch`;
};

export const refinePitch = async (userInput: string): Promise<string> => {
  const endpoint = getApiEndpoint();

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pitch: userInput }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || 
        `Request failed with status ${response.status}: ${response.statusText}`
      );
    }

    const data = await response.json();

    if (data.refinedPitch) {
      return data.refinedPitch;
    }

    throw new Error('Unexpected API response format');
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(`Failed to refine pitch: ${String(error)}`);
  }
};

/**
 * @deprecated System prompt is now loaded server-side
 * This function is kept for backwards compatibility but does nothing
 */
export const loadSystemPrompt = async (): Promise<string> => {
  console.warn('loadSystemPrompt is deprecated - system prompt is now loaded server-side');
  return '';
};