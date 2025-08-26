import { ProfileData } from "@/lib/types";

export default function ProfileCard({ profile }: { profile: ProfileData }) {
  if (!profile) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center text-gray-500">
          Profile data not available
        </div>
      </div>
    );
  }

  // Show error message if there's an error
  if (profile.error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          👤 LeetCode Profile
        </h2>
        <div className="text-center py-4">
          {profile.isRateLimited ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="text-yellow-800 font-medium mb-2">
                ⏳ Rate Limited
              </div>
              <div className="text-yellow-600 text-sm">{profile.error}</div>
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="text-gray-600 text-sm">{profile.error}</div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        👤 LeetCode Profile
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="text-sm text-gray-600">Username</div>
          <div className="font-semibold">{profile.username || "N/A"}</div>
        </div>

        <div>
          <div className="text-sm text-gray-600">Global Ranking</div>
          <div className="font-semibold text-blue-600">
            #{profile.ranking || "N/A"}
          </div>
        </div>

        <div>
          <div className="text-sm text-gray-600">Reputation</div>
          <div className="font-semibold">{profile.reputation || "N/A"}</div>
        </div>

        <div>
          <div className="text-sm text-gray-600">Country</div>
          <div className="font-semibold">{profile.country || "N/A"}</div>
        </div>
      </div>

      {profile.gitHub && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-600">GitHub</div>
          <a
            href={`https://github.com/${profile.gitHub}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 font-semibold"
          >
            @{profile.gitHub}
          </a>
        </div>
      )}
    </div>
  );
}
