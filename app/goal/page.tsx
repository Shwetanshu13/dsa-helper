import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getUserByIdOrEmail, updateGoal } from "@/lib/user";
import { redirect } from "next/navigation";
import Link from "next/link";

// Force dynamic rendering for authentication
export const dynamic = "force-dynamic";

export default async function GoalPage() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    redirect("/api/auth/signin");
  }
  const user = await getUserByIdOrEmail(session.user.email);
  if (!user) {
    redirect("/setup");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-4">
      <div className="max-w-md mx-auto">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors duration-300 group"
          >
            <span className="transition-transform group-hover:-translate-x-1">
              ←
            </span>
            <span>Back to Dashboard</span>
          </Link>
        </div>

        <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-500 p-0.5 rounded-2xl shadow-2xl">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🎯</div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Set Your DSA Goal
              </h1>
              <p className="text-gray-600">Define your path to success</p>
            </div>

            <form
              className="space-y-6"
              action={async (formData) => {
                "use server";
                const targetQuestions = Number(formData.get("targetQuestions"));
                const targetDate = formData.get("targetDate") as string;
                if (!session?.user?.email) return;
                await updateGoal(
                  session.user.email,
                  targetQuestions,
                  targetDate
                );
                redirect("/");
              }}
            >
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Target Questions
                </label>
                <div className="relative">
                  <input
                    name="targetQuestions"
                    type="number"
                    min={1}
                    defaultValue={user.targetQuestions || ""}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                    placeholder="e.g., 150"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <span className="text-gray-400">📊</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  How many questions do you want to solve?
                </p>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Target Deadline
                </label>
                <div className="relative">
                  <input
                    name="targetDate"
                    type="date"
                    defaultValue={
                      user.targetDate ? user.targetDate.slice(0, 10) : ""
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <span className="text-gray-400">📅</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  When do you want to achieve this goal?
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-white/20 translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
                <div className="relative flex items-center justify-center gap-2">
                  <span>🚀</span>
                  <span>Save Goal</span>
                </div>
              </button>
            </form>

            {user.targetQuestions && user.targetDate && (
              <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-emerald-500"></div>
                <h3 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                  <span>🎯</span>
                  <span>Current Goal</span>
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-green-700">
                    <span className="font-medium">📊</span>
                    <span>{user.targetQuestions} questions</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-700">
                    <span className="font-medium">📅</span>
                    <span>
                      Due: {new Date(user.targetDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
