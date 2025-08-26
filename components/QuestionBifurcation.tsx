import { SolvedData } from "@/lib/types";

export default function QuestionBifurcation({
  solved,
}: {
  solved: SolvedData;
}) {
  if (!solved) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center text-gray-500">
          Question stats not available
        </div>
      </div>
    );
  }

  // Show error message if there's an error
  if (solved.error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          📈 Question Breakdown
        </h2>
        <div className="text-center py-4">
          {solved.isRateLimited ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="text-yellow-800 font-medium mb-2">
                ⏳ Rate Limited
              </div>
              <div className="text-yellow-600 text-sm">{solved.error}</div>
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="text-gray-600 text-sm">{solved.error}</div>
            </div>
          )}
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
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        📈 Question Breakdown
      </h2>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{easyCount}</div>
          <div className="text-sm text-gray-600">Easy</div>
          <div className="text-xs text-gray-500">
            {easyPercentage.toFixed(1)}%
          </div>
        </div>

        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-600">
            {mediumCount}
          </div>
          <div className="text-sm text-gray-600">Medium</div>
          <div className="text-xs text-gray-500">
            {mediumPercentage.toFixed(1)}%
          </div>
        </div>

        <div className="text-center">
          <div className="text-2xl font-bold text-red-600">{hardCount}</div>
          <div className="text-sm text-gray-600">Hard</div>
          <div className="text-xs text-gray-500">
            {hardPercentage.toFixed(1)}%
          </div>
        </div>
      </div>

      {/* Visual representation */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded"></div>
          <div className="flex-1 bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${easyPercentage}%` }}
            ></div>
          </div>
          <span className="text-sm text-gray-600 w-12">{easyCount}</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-yellow-500 rounded"></div>
          <div className="flex-1 bg-gray-200 rounded-full h-2">
            <div
              className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${mediumPercentage}%` }}
            ></div>
          </div>
          <span className="text-sm text-gray-600 w-12">{mediumCount}</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded"></div>
          <div className="flex-1 bg-gray-200 rounded-full h-2">
            <div
              className="bg-red-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${hardPercentage}%` }}
            ></div>
          </div>
          <span className="text-sm text-gray-600 w-12">{hardCount}</span>
        </div>
      </div>
    </div>
  );
}
