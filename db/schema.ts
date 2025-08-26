import {
  date,
  integer,
  pgTable,
  varchar,
  text,
  timestamp,
  primaryKey,
} from "drizzle-orm/pg-core";

// This will be used by NextAuth automatically
export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name"),
  email: varchar("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: varchar("type").notNull(),
    provider: varchar("provider").notNull(),
    providerAccountId: varchar("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type"),
    scope: varchar("scope"),
    id_token: text("id_token"),
    session_state: varchar("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessions = pgTable("session", {
  sessionToken: varchar("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: varchar("identifier").notNull(),
    token: varchar("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);

// DSA-specific user data
export const dsaHelperUsers = pgTable("dsa_helper_users", {
  id: text("id")
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade" }),
  leetcodeUsername: varchar("leetcode_username"),
  targetQuestions: integer("target_questions"),
  targetDate: date("target_date"),
});
