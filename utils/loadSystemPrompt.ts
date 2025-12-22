/**
 * Loads the system prompt from the markdown file
 * @returns Promise<string> The content of the system prompt markdown file
 */
export const loadSystemPrompt = async (): Promise<string> => {
  try {
    const response = await fetch('/prompts/pitch-refiner-system-prompt.md');
    if (!response.ok) {
      throw new Error(`Failed to load system prompt: ${response.status} ${response.statusText}`);
    }
    const text = await response.text();
    return text;
  } catch (error) {
    console.error('Error loading system prompt:', error);
    // Return a fallback prompt if file loading fails
    return `You are an expert pitch refinement consultant. Analyze the user's pitch and provide a refined, more compelling version that is specific, outcome-focused, and memorable. Include concrete data, clear pain points, and tangible benefits.`;
  }
};
