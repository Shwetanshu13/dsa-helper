"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="glass-effect border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="text-2xl">🚀</div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-300">
              DSA Helper
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link
              href="/goal"
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
            >
              <span>🎯</span>
              <span className="hidden sm:inline">Set Goals</span>
            </Link>

            {session?.user && (
              <div className="flex items-center space-x-3">
                <div className="hidden sm:flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 border border-white/20">
                  <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                    {session.user.name?.charAt(0)}
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {session.user.name?.split(" ")[0]}
                  </span>
                </div>
                <button
                  onClick={() => signOut()}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 text-sm"
                >
                  <span className="hidden sm:inline">Sign Out</span>
                  <span className="sm:hidden">👋</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
