import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getUserByIdOrEmail } from "@/lib/user";
import { fetchLeetCodeSolved, fetchLeetCodeProfile } from "@/lib/leetcode";
import { fetchMotivation } from "@/lib/gemini";
import Navbar from "@/components/Navbar";
import DashboardContent from "@/components/DashboardContent";
import { redirect } from "next/navigation";
import Link from "next/link";

// Force dynamic rendering for authentication
export const dynamic = "force-dynamic";

export default async function Home() {
  // Authentication checks - allow redirects to flow through naturally
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    redirect("/api/auth/signin");
  }

  const user = await getUserByIdOrEmail(session.user.email);
  if (!user?.leetcodeUsername) {
    redirect("/setup");
  }

  // Data fetching with error handling (but not redirects)
  try {
    // Fetch LeetCode stats and profile with individual error handling
    let solved, profile, motivation;

    try {
      [solved, profile, motivation] = await Promise.allSettled([
        fetchLeetCodeSolved(user.leetcodeUsername),
        fetchLeetCodeProfile(user.leetcodeUsername),
        fetchMotivation(),
      ]).then((results) => [
        results[0].status === "fulfilled"
          ? results[0].value
          : {
              totalSolved: 0,
              easySolved: 0,
              mediumSolved: 0,
              hardSolved: 0,
              error: "Failed to fetch solved data",
            },
        results[1].status === "fulfilled"
          ? results[1].value
          : {
              username: user.leetcodeUsername,
              ranking: "N/A",
              reputation: "N/A",
              country: "N/A",
              error: "Failed to fetch profile data",
            },
        results[2].status === "fulfilled"
          ? results[2].value
          : "Keep pushing your limits! 🚀",
      ]);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Provide fallback data
      solved = {
        totalSolved: 0,
        easySolved: 0,
        mediumSolved: 0,
        hardSolved: 0,
        error: "Data unavailable",
      };
      profile = {
        username: user.leetcodeUsername,
        ranking: "N/A",
        reputation: "N/A",
        country: "N/A",
        error: "Data unavailable",
      };
      motivation = "Every challenge makes you stronger! 💪";
    }

    // Calculate stats with fallback values
    const target = user.targetQuestions || 0;
    const solvedCount = solved?.totalSolved || 0;
    const remaining = Math.max(target - solvedCount, 0);
    const today = new Date();
    const deadline = user.targetDate ? new Date(user.targetDate) : null;
    const daysLeft = deadline
      ? Math.max(
          Math.ceil(
            (deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
          ),
          0
        )
      : null;

    const initialData = {
      solved,
      profile,
      motivation,
      solvedCount,
      target,
      remaining,
      daysLeft,
      userName: user.name?.split(" ")[0] || "User",
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <Navbar />

        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-3xl"></div>
          <div className="relative">
            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  Welcome back, {initialData.userName}! 👋
                </h1>
                <p className="text-gray-600 text-lg">
                  Keep pushing your limits and achieve your coding goals
                </p>
              </div>

              <div className="space-y-8">
                <DashboardContent initialData={initialData} />
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error rendering dashboard:", error);

    // Return error page for rendering errors only
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Something went wrong
          </h1>
          <p className="text-gray-600 mb-4">
            We&apos;re having trouble loading your dashboard.
          </p>
          <Link
            href="/api/auth/signin"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Try Again
          </Link>
        </div>
      </div>
    );
  }
}
