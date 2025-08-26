"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          DSA Helper 🚀
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/goal"
            className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded transition-colors"
          >
            Set Goals 🎯
          </Link>

          {session?.user && (
            <div className="flex items-center gap-4">
              <span className="text-sm">
                Hello, {session.user.name?.split(" ")[0]}!
              </span>
              <button
                onClick={() => signOut()}
                className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded transition-colors text-sm"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
