import { ProfileData } from "@/lib/types";

export default function ProfileCard({ profile }: { profile: ProfileData }) {
  if (!profile) {
    return (
      <div className="bg-gradient-to-br from-slate-500 via-gray-500 to-zinc-500 p-0.5 rounded-2xl shadow-lg">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 h-full">
          <div className="text-center text-gray-500">
            Profile data not available
          </div>
        </div>
      </div>
    );
  }

  // Show error message if there's an error
  if (profile.error) {
    return (
      <div className="bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 p-0.5 rounded-2xl shadow-lg">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 h-full">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">👤</span>
            <h2 className="text-lg font-bold text-gray-800">
              LeetCode Profile
            </h2>
          </div>
          <div className="text-center py-4">
            {profile.isRateLimited ? (
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-300 rounded-xl p-4">
                <div className="text-yellow-800 font-medium mb-2">
                  ⏳ Rate Limited
                </div>
                <div className="text-yellow-600 text-sm">{profile.error}</div>
              </div>
            ) : (
              <div className="bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-300 rounded-xl p-4">
                <div className="text-gray-600 text-sm">{profile.error}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-500 p-0.5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 h-full">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-2xl">👤</span>
          <h2 className="text-lg font-bold text-gray-800">LeetCode Profile</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="group">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 transition-all duration-300 hover:shadow-md hover:scale-105">
              <div className="text-xs font-medium text-blue-600 uppercase tracking-wide mb-1">
                Username
              </div>
              <div className="font-bold text-lg text-gray-800">
                {profile.username || "N/A"}
              </div>
            </div>
          </div>

          <div className="group">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-4 transition-all duration-300 hover:shadow-md hover:scale-105">
              <div className="text-xs font-medium text-purple-600 uppercase tracking-wide mb-1">
                Global Ranking
              </div>
              <div className="font-bold text-lg bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                #{profile.ranking || "N/A"}
              </div>
            </div>
          </div>

          <div className="group">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 transition-all duration-300 hover:shadow-md hover:scale-105">
              <div className="text-xs font-medium text-green-600 uppercase tracking-wide mb-1">
                Reputation
              </div>
              <div className="font-bold text-lg text-gray-800">
                {profile.reputation || "N/A"}
              </div>
            </div>
          </div>

          <div className="group">
            <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl p-4 transition-all duration-300 hover:shadow-md hover:scale-105">
              <div className="text-xs font-medium text-orange-600 uppercase tracking-wide mb-1">
                Country
              </div>
              <div className="font-bold text-lg text-gray-800">
                {profile.country || "N/A"}
              </div>
            </div>
          </div>
        </div>

        {profile.gitHub && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="bg-gradient-to-r from-gray-900 to-black rounded-xl p-4 transition-all duration-300 hover:shadow-lg hover:scale-105">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-medium text-gray-300 uppercase tracking-wide">
                    GitHub
                  </div>
                  <a
                    href={`https://github.com/${profile.gitHub}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-blue-300 font-bold transition-colors duration-300"
                  >
                    @{profile.gitHub}
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
