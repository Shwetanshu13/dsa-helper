import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getUserByIdOrEmail } from "@/lib/user";
import { fetchLeetCodeSolved, fetchLeetCodeProfile } from "@/lib/leetcode";
import { fetchMotivation } from "@/lib/gemini";
import Navbar from "../components/Navbar";
import Motivation from "../components/Motivation";
import LeetCodeStats from "../components/LeetCodeStats";
import ProfileCard from "../components/ProfileCard";
import QuestionBifurcation from "../components/QuestionBifurcation";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    redirect("/api/auth/signin");
  }
  const user = await getUserByIdOrEmail(session.user.email);
  if (!user?.leetcodeUsername) {
    redirect("/setup");
  }

  // Fetch LeetCode stats and profile
  const [solved, profile, motivation] = await Promise.all([
    fetchLeetCodeSolved(user.leetcodeUsername),
    fetchLeetCodeProfile(user.leetcodeUsername),
    fetchMotivation(),
  ]);

  // Calculate stats
  const target = user.targetQuestions || 0;
  const solvedCount = solved.totalSolved || 0;
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-2xl mx-auto p-4 flex flex-col gap-6">
        <h1 className="text-2xl font-bold mt-4">Welcome, {user.name}!</h1>
        <Motivation message={motivation} />
        <LeetCodeStats
          solved={solvedCount}
          target={target}
          remaining={remaining}
          daysLeft={daysLeft}
        />
        <section className="my-4">
          <ProfileCard profile={profile} />
        </section>
        <section className="my-4">
          <QuestionBifurcation solved={solved} />
        </section>
      </main>
    </div>
  );
}
