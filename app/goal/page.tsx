import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getUserByIdOrEmail, updateGoal } from "@/lib/user";
import { redirect } from "next/navigation";
import Link from "next/link";

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
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto">
        <div className="mb-4">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
          >
            ← Back to Dashboard
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Set Your DSA Goal 🎯
          </h1>

          <form
            className="space-y-4"
            action={async (formData) => {
              "use server";
              const targetQuestions = Number(formData.get("targetQuestions"));
              const targetDate = formData.get("targetDate") as string;
              if (!session?.user?.email) return;
              await updateGoal(session.user.email, targetQuestions, targetDate);
              redirect("/");
            }}
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Questions
              </label>
              <input
                name="targetQuestions"
                type="number"
                min={1}
                defaultValue={user.targetQuestions || ""}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 150"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Deadline
              </label>
              <input
                name="targetDate"
                type="date"
                defaultValue={
                  user.targetDate ? user.targetDate.slice(0, 10) : ""
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              Save Goal 🚀
            </button>
          </form>

          {user.targetQuestions && user.targetDate && (
            <div className="mt-6 p-4 bg-blue-50 rounded-md">
              <h3 className="font-medium text-blue-800 mb-2">Current Goal:</h3>
              <p className="text-blue-700">
                📊 {user.targetQuestions} questions by{" "}
                {new Date(user.targetDate).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
