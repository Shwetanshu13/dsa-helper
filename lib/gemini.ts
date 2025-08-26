// Helper for fetching motivational lines from Gemini Free API
export async function fetchMotivation(): Promise<string> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY not found, using fallback quote");
      return getFallbackQuote();
    }

    // Use direct API call since SDK has installation issues
    const prompt = `Generate a short, creative and inspiring motivational quote (maximum 15 words) for a programmer working on Data Structures and Algorithms. The quote should encourage them to keep practicing, push their limits, and achieve their coding goals. Make it energetic and specific to DSA/competitive programming.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.9,
            topK: 1,
            topP: 1,
            maxOutputTokens: 50,
          },
        }),
        signal: controller.signal,
      }
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error(
        `Gemini API error: ${response.status} ${response.statusText}`
      );
      return getFallbackQuote();
    }

    const data = await response.json();
    const motivationalQuote =
      data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    if (motivationalQuote && motivationalQuote.length > 0) {
      return motivationalQuote;
    } else {
      console.warn("Empty quote generated from Gemini API");
      return getFallbackQuote();
    }
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof Error) {
      if (error.name === "AbortError") {
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
