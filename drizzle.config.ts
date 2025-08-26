import { defineConfig } from "drizzle-kit";

const dbUrl = process.env.DATABASE_URL!;

export default defineConfig({
  out: "./drizzle",
  schema: "./db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: dbUrl,
  },
});
