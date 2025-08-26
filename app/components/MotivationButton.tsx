"use client";

import { useState } from "react";

interface MotivationButtonProps {
  currentMotivation: string;
  onNewMotivation: (motivation: string) => void;
}

export default function MotivationButton({
  currentMotivation,
  onNewMotivation,
}: MotivationButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleGetNewQuote = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/motivation", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.motivation) {
        onNewMotivation(data.motivation);
      }

      // Log if we're using fallback motivation
      if (!data.success) {
        console.info("Using fallback motivation:", data.message);
      }
    } catch (error) {
      console.error("Error fetching new motivation:", error);

      // Provide client-side fallback
      const fallbackQuotes = [
        "Keep coding, keep growing! 🌱",
        "Every algorithm conquered makes you stronger! 💪",
        "Debug your way to success! 🐛➡️✅",
        "Your persistence is your superpower! ⚡",
        "Code today, conquer tomorrow! 🚀",
      ];

      const randomFallback =
        fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
      onNewMotivation(randomFallback);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="bg-blue-100 p-4 rounded-lg">
        <p className="text-blue-800 font-medium">{currentMotivation}</p>
      </div>
      <button
        onClick={handleGetNewQuote}
        disabled={isLoading}
        className="self-end bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white px-3 py-1 rounded text-sm transition-colors"
      >
        {isLoading ? "✨ Generating..." : "✨ New Quote"}
      </button>
    </div>
  );
}
