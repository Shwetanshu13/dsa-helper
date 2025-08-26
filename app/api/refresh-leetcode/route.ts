import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { fetchLeetCodeSolved, fetchLeetCodeProfile } from "@/lib/leetcode";
import { getUserByIdOrEmail } from "@/lib/user";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await getUserByIdOrEmail(session.user.email);
    if (!user?.leetcodeUsername) {
      return NextResponse.json(
        { error: "LeetCode username not found" },
        { status: 400 }
      );
    }

    // Fetch fresh data from LeetCode API with error handling
    try {
      const [solved, profile] = await Promise.allSettled([
        fetchLeetCodeSolved(user.leetcodeUsername),
        fetchLeetCodeProfile(user.leetcodeUsername),
      ]);

      const solvedData =
        solved.status === "fulfilled"
          ? solved.value
          : {
              totalSolved: 0,
              easySolved: 0,
              mediumSolved: 0,
              hardSolved: 0,
              error: "Failed to fetch solved data",
            };

      const profileData =
        profile.status === "fulfilled"
          ? profile.value
          : {
              username: user.leetcodeUsername,
              ranking: "N/A",
              reputation: "N/A",
              country: "N/A",
              error: "Failed to fetch profile data",
            };

      return NextResponse.json({
        solved: solvedData,
        profile: profileData,
        success: true,
      });
    } catch (error) {
      console.error("Error fetching LeetCode data:", error);

      // Return fallback data
      return NextResponse.json({
        solved: {
          totalSolved: 0,
          easySolved: 0,
          mediumSolved: 0,
          hardSolved: 0,
          error: "Service temporarily unavailable",
        },
        profile: {
          username: user.leetcodeUsername,
          ranking: "N/A",
          reputation: "N/A",
          country: "N/A",
          error: "Service temporarily unavailable",
        },
        success: false,
        message: "Using cached/fallback data",
      });
    }
  } catch (error) {
    console.error("Critical error in refresh-leetcode API:", error);
    return NextResponse.json(
      { error: "Internal server error", success: false },
      { status: 500 }
    );
  }
}
