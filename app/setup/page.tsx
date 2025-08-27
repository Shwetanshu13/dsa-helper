import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getUserByIdOrEmail, updateLeetCodeIdByIdOrEmail } from "@/lib/user";
import { redirect } from "next/navigation";

// Force dynamic rendering for authentication
export const dynamic = "force-dynamic";

export default async function SetupPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    redirect("/api/auth/signin");
  }
  // Fetch user by email (unique for Google login)
  const user = await getUserByIdOrEmail(session.user.email!);
  if (user?.leetcodeUsername) {
    redirect("/");
  }

  // Render a form to submit LeetCode ID
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-500 p-0.5 rounded-2xl shadow-2xl">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🚀</div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Setup Your Profile
              </h1>
              <p className="text-gray-600">
                Connect your LeetCode account to get started
              </p>
            </div>

            <form
              className="space-y-6"
              action={async (formData) => {
                "use server";
                const leetcodeId = formData.get("leetcodeId") as string;
                if (!session?.user?.email) return;
                await updateLeetCodeIdByIdOrEmail(
                  session.user.email,
                  leetcodeId
                );
                redirect("/");
              }}
            >
              <div className="space-y-2">
                <label
                  htmlFor="leetcodeId"
                  className="block text-sm font-medium text-gray-700"
                >
                  LeetCode Username
                </label>
                <div className="relative">
                  <input
                    id="leetcodeId"
                    name="leetcodeId"
                    placeholder="Enter your LeetCode username"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm placeholder-gray-400"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <span className="text-gray-400">👤</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  This should be your exact LeetCode username (case-sensitive)
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-white/20 translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
                <div className="relative flex items-center justify-center gap-2">
                  <span>🎯</span>
                  <span>Save & Continue</span>
                </div>
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <span>✨</span>
                <span>Ready to start your DSA journey?</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
