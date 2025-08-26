import db from "@/db";
import { dsaHelperUsers, users } from "@/db/schema";
import { eq } from "drizzle-orm";

// Fetch user by email with DSA data
export async function getUserByIdOrEmail(email: string) {
  const user = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      leetcodeUsername: dsaHelperUsers.leetcodeUsername,
      targetQuestions: dsaHelperUsers.targetQuestions,
      targetDate: dsaHelperUsers.targetDate,
    })
    .from(users)
    .leftJoin(dsaHelperUsers, eq(users.id, dsaHelperUsers.id))
    .where(eq(users.email, email));

  return user[0] || null;
}

// Update or create DSA user data
export async function updateLeetCodeIdByIdOrEmail(
  email: string,
  leetcodeId: string
) {
  const user = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, email));

  if (!user[0]) return;

  // Try to update first, if no rows affected, insert
  const result = await db
    .update(dsaHelperUsers)
    .set({ leetcodeUsername: leetcodeId })
    .where(eq(dsaHelperUsers.id, user[0].id));

  // If no rows were updated, insert new record
  if (result.rowCount === 0) {
    await db.insert(dsaHelperUsers).values({
      id: user[0].id,
      leetcodeUsername: leetcodeId,
    });
  }
}

export async function updateGoal(
  email: string,
  targetQuestions: number,
  targetDate: string
) {
  const user = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, email));

  if (!user[0]) return;

  // Try to update first, if no rows affected, insert
  const result = await db
    .update(dsaHelperUsers)
    .set({ targetQuestions, targetDate })
    .where(eq(dsaHelperUsers.id, user[0].id));

  // If no rows were updated, insert new record
  if (result.rowCount === 0) {
    await db.insert(dsaHelperUsers).values({
      id: user[0].id,
      targetQuestions,
      targetDate,
    });
  }
}
