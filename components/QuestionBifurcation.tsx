import { SolvedData } from "@/lib/types";

export default function QuestionBifurcation({
  solved,
}: {
  solved: SolvedData;
}) {
  if (!solved) {
    return (
      <div className="bg-gradient-to-br from-slate-500 via-gray-500 to-zinc-500 p-0.5 rounded-2xl shadow-lg">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 h-full">
          <div className="text-center text-gray-500">
            Question stats not available
          </div>
        </div>
      </div>
    );
  }

  // Show error message if there's an error
  if (solved.error) {
    return (
      <div className="bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 p-0.5 rounded-2xl shadow-lg">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 h-full">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">📊</span>
            <h2 className="text-lg font-bold text-gray-800">
              Question Breakdown
            </h2>
          </div>
          <div className="text-center py-4">
            {solved.isRateLimited ? (
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-300 rounded-xl p-4">
                <div className="text-yellow-800 font-medium mb-2">
                  ⏳ Rate Limited
                </div>
                <div className="text-yellow-600 text-sm">{solved.error}</div>
              </div>
            ) : (
              <div className="bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-300 rounded-xl p-4">
                <div className="text-gray-600 text-sm">{solved.error}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  const easyCount = solved.easySolved || 0;
  const mediumCount = solved.mediumSolved || 0;
  const hardCount = solved.hardSolved || 0;
  const totalCount = easyCount + mediumCount + hardCount;

  const easyPercentage = totalCount > 0 ? (easyCount / totalCount) * 100 : 0;
  const mediumPercentage =
    totalCount > 0 ? (mediumCount / totalCount) * 100 : 0;
  const hardPercentage = totalCount > 0 ? (hardCount / totalCount) * 100 : 0;

  return (
    <div className="bg-gradient-to-br from-green-500 via-blue-500 to-purple-500 p-0.5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 h-full">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-2xl">📊</span>
          <h2 className="text-lg font-bold text-gray-800">
            Question Breakdown
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center group">
            <div className="bg-gradient-to-br from-green-400 to-emerald-500 text-white rounded-xl p-4 transition-all duration-300 hover:shadow-lg hover:scale-105">
              <div className="text-2xl font-bold">{easyCount}</div>
              <div className="text-sm opacity-90">Easy</div>
              <div className="text-xs opacity-80">
                {easyPercentage.toFixed(1)}%
              </div>
            </div>
          </div>

          <div className="text-center group">
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white rounded-xl p-4 transition-all duration-300 hover:shadow-lg hover:scale-105">
              <div className="text-2xl font-bold">{mediumCount}</div>
              <div className="text-sm opacity-90">Medium</div>
              <div className="text-xs opacity-80">
                {mediumPercentage.toFixed(1)}%
              </div>
            </div>
          </div>

          <div className="text-center group">
            <div className="bg-gradient-to-br from-red-400 to-pink-500 text-white rounded-xl p-4 transition-all duration-300 hover:shadow-lg hover:scale-105">
              <div className="text-2xl font-bold">{hardCount}</div>
              <div className="text-sm opacity-90">Hard</div>
              <div className="text-xs opacity-80">
                {hardPercentage.toFixed(1)}%
              </div>
            </div>
          </div>
        </div>

        {/* Visual representation */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full shadow-sm"></div>
            <div className="flex-1 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full transition-all duration-700 ease-out shadow-sm"
                style={{ width: `${easyPercentage}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium text-gray-700 w-12">
              {easyCount}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-sm"></div>
            <div className="flex-1 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full transition-all duration-700 ease-out shadow-sm"
                style={{ width: `${mediumPercentage}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium text-gray-700 w-12">
              {mediumCount}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-gradient-to-r from-red-400 to-pink-500 rounded-full shadow-sm"></div>
            <div className="flex-1 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-red-400 to-pink-500 h-3 rounded-full transition-all duration-700 ease-out shadow-sm"
                style={{ width: `${hardPercentage}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium text-gray-700 w-12">
              {hardCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
