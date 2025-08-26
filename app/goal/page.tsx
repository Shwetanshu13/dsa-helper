import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getUserByIdOrEmail, updateGoal } from "@/lib/user";
import { redirect } from "next/navigation";

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
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Set Your DSA Goal</h1>
      <form
        className="flex flex-col gap-4"
        action={async (formData) => {
          "use server";
          const targetQuestions = Number(formData.get("targetQuestions"));
          const targetDate = formData.get("targetDate") as string;
          if (!session?.user?.email) return;
          await updateGoal(session.user.email, targetQuestions, targetDate);
          redirect("/");
        }}
      >
        <label className="flex flex-col">
          Target Questions
          <input
            name="targetQuestions"
            type="number"
            min={1}
            defaultValue={user.targetQuestions || ""}
            className="border p-2 rounded"
            required
          />
        </label>
        <label className="flex flex-col">
          Target Date
          <input
            name="targetDate"
            type="date"
            defaultValue={user.targetDate ? user.targetDate.slice(0, 10) : ""}
            className="border p-2 rounded"
            required
          />
        </label>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Goal
        </button>
      </form>
    </div>
  );
}
