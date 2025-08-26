// Helpers for fetching LeetCode data with proper error handling and rate limiting
async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  maxRetries: number = 3
): Promise<Response> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          Accept: "application/json",
          "User-Agent": "DSA-Helper/1.0",
          ...options.headers,
        },
      });

      clearTimeout(timeoutId);

      // Handle rate limiting (429) with exponential backoff
      if (response.status === 429) {
        const retryAfter = response.headers.get("Retry-After");
        const delay = retryAfter
          ? parseInt(retryAfter) * 1000
          : Math.pow(2, attempt) * 1000; // Exponential backoff

        console.warn(
          `Rate limited (429). Retrying in ${delay}ms... (attempt ${attempt}/${maxRetries})`
        );

        if (attempt < maxRetries) {
          await new Promise((resolve) => setTimeout(resolve, delay));
          continue;
        }
      }

      // Handle other HTTP errors
      if (!response.ok) {
        throw new Error(
          `HTTP error! status: ${response.status} ${response.statusText}`
        );
      }

      return response;
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        console.error(`Request timeout on attempt ${attempt}`);
      } else {
        console.error(`Request failed on attempt ${attempt}:`, error);
      }

      // If this is the last attempt, throw the error
      if (attempt === maxRetries) {
        throw error;
      }

      // Wait before retrying (exponential backoff for non-429 errors)
      const delay = Math.pow(2, attempt) * 1000;
      console.warn(
        `Retrying in ${delay}ms... (attempt ${attempt}/${maxRetries})`
      );
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw new Error("Max retries exceeded");
}

export async function fetchLeetCodeSolved(username: string) {
  try {
    const response = await fetchWithRetry(
      `https://alfa-leetcode-api.onrender.com/${username}/solved`
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(
      `Error fetching LeetCode solved data for ${username}:`,
      error
    );

    // Return fallback data structure with more specific error info
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    const isRateLimit = errorMessage.includes("429");

    return {
      totalSolved: 0,
      easySolved: 0,
      mediumSolved: 0,
      hardSolved: 0,
      error: isRateLimit
        ? "Rate limited by LeetCode API. Please try again later."
        : "Failed to fetch solved questions data",
      isRateLimited: isRateLimit,
    };
  }
}

export async function fetchLeetCodeProfile(username: string) {
  try {
    const response = await fetchWithRetry(
      `https://alfa-leetcode-api.onrender.com/${username}`
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching LeetCode profile for ${username}:`, error);

    // Return fallback data structure with more specific error info
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    const isRateLimit = errorMessage.includes("429");

    return {
      username: username,
      ranking: "N/A",
      reputation: "N/A",
      country: "N/A",
      gitHub: null,
      error: isRateLimit
        ? "Rate limited by LeetCode API. Please try again later."
        : "Failed to fetch profile data",
      isRateLimited: isRateLimit,
    };
  }
}
