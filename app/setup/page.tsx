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
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Setup your LeetCode ID</h1>
      <form
        className="flex flex-col gap-4"
        action={async (formData) => {
          "use server";
          const leetcodeId = formData.get("leetcodeId") as string;
          if (!session?.user?.email) return;
          await updateLeetCodeIdByIdOrEmail(session.user.email, leetcodeId);
          redirect("/");
        }}
      >
        <input
          name="leetcodeId"
          placeholder="LeetCode Username"
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save
        </button>
      </form>
    </div>
  );
}
