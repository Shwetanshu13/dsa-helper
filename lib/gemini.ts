import { GoogleGenAI } from "@google/genai";

// Helper for fetching motivational lines from Gemini API
export async function fetchMotivation(): Promise<string> {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY not found, using fallback quote");
      return getFallbackQuote();
    }

    // Initialize the Google Generative AI client
    const ai = new GoogleGenAI({ apiKey });

    const prompt = `Generate a short, creative and inspiring motivational quote (maximum 15 words) for a programmer working on Data Structures and Algorithms. The quote should encourage them to keep practicing, push their limits, and achieve their coding goals. Make it energetic and specific to DSA/competitive programming.`;

    // Generate content with timeout handling
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Request timeout")), 8000)
    );

    const response = await Promise.race([
      ai.models.generateContent({
        model: "gemini-2.0-flash-001",
        contents: prompt,
      }),
      timeoutPromise,
    ]);

    const motivationalQuote = response.text?.trim();

    if (motivationalQuote && motivationalQuote.length > 0) {
      return motivationalQuote;
    } else {
      console.warn("Empty quote generated from Gemini API");
      return getFallbackQuote();
    }
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Request timeout") {
        console.error("Gemini API request timed out");
      } else {
        console.error("Error fetching motivation from Gemini:", error.message);
      }
    } else {
      console.error("Unknown error fetching motivation:", error);
    }

    return getFallbackQuote();
  }
}

function getFallbackQuote(): string {
  // Fallback motivational quotes
  const fallbackQuotes = [
    "🔥 Every bug you fix makes you a better coder!",
    "🚀 Master one algorithm at a time, conquer them all!",
    "💪 Your next breakthrough is just one solve away!",
    "⚡ Code with passion, debug with patience, succeed with persistence!",
    "🎯 Turn complexity into simplicity, one line at a time!",
    "🌟 Today's struggle is tomorrow's strength in coding!",
    "🔥 Break the problem, not your spirit!",
    "💻 Every algorithm mastered is a superpower gained!",
    "🚀 Think in code, dream in algorithms!",
    "⭐ Your coding journey is a marathon, not a sprint!",
  ];

  return fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
}
