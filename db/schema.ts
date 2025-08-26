import { date, integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const dsaHelperUsers = pgTable("dsa_helper_users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name").notNull(),
  email: varchar("email").notNull(),
  googleId: varchar("google_id").notNull(),
  leetcodeUsername: varchar("leetcode_username"),
  targetQuestions: integer(),
  targetDate: date(),
});
