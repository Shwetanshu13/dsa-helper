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
    <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-0.5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 h-full">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">✨</span>
            <h3 className="text-lg font-bold text-gray-800">
              Daily Motivation
            </h3>
          </div>
          <button
            onClick={handleGetNewQuote}
            disabled={isLoading}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-400 disabled:to-gray-500 text-white px-4 py-2 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:scale-100 text-sm"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Generating...</span>
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <span>🎲</span>
                <span className="hidden sm:inline">New Quote</span>
              </div>
            )}
          </button>
        </div>

        <div className="relative">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-purple-200 rounded-xl p-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"></div>
            <p className="text-gray-800 font-medium text-lg leading-relaxed italic">
              "{currentMotivation}"
            </p>
            <div className="absolute bottom-2 right-3 text-purple-300 text-2xl opacity-50">
              💭
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
