import { NextResponse } from "next/server";
import { fetchMotivation } from "@/lib/gemini";

export async function GET() {
  try {
    const motivation = await fetchMotivation();
    return NextResponse.json({
      motivation,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching motivation:", error);

    // Provide fallback motivational quotes
    const fallbackQuotes = [
      "Every problem solved makes you stronger! 💪",
      "Consistency beats perfection. Keep coding! 🚀",
      "Your next breakthrough is just one problem away! ✨",
      "Great programmers are made through practice! 🌟",
      "Turn your struggles into your strength! 💯",
      "Every expert was once a beginner. Keep going! 🔥",
      "Progress, not perfection! 📈",
      "Code with passion, learn with purpose! 💻",
    ];

    const randomQuote =
      fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];

    return NextResponse.json({
      motivation: randomQuote,
      success: false,
      message: "Using fallback motivation",
    });
  }
}
