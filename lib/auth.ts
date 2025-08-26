import { DrizzleAdapter } from "@auth/drizzle-adapter";
import GoogleProvider from "next-auth/providers/google";
import db from "@/db";

import type { NextAuthOptions, Session } from "next-auth";
import { JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: { strategy: "jwt" as const },
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user && token?.sub) {
        // Extend the session user type to include id
        (session.user as Session["user"] & { id: string }).id = token.sub;
      }
      return session;
    },
  },
};
