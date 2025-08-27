type Props = {
  solved: number;
  target: number;
  remaining: number;
  daysLeft: number | null;
};

export default function LeetCodeStats({
  solved,
  target,
  remaining,
  daysLeft,
}: Props) {
  const progressPercentage = target > 0 ? (solved / target) * 100 : 0;

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <span className="text-2xl">📊</span>
          Progress Overview
        </h2>
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          Live Stats
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-3 bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl border border-green-200">
          <div className="text-2xl font-bold text-green-600 mb-1">{solved}</div>
          <div className="text-xs font-medium text-green-700">Solved</div>
        </div>
        <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-cyan-100 rounded-xl border border-blue-200">
          <div className="text-2xl font-bold text-blue-600 mb-1">{target}</div>
          <div className="text-xs font-medium text-blue-700">Target</div>
        </div>
        <div className="text-center p-3 bg-gradient-to-br from-orange-50 to-amber-100 rounded-xl border border-orange-200">
          <div className="text-2xl font-bold text-orange-600 mb-1">
            {remaining}
          </div>
          <div className="text-xs font-medium text-orange-700">Remaining</div>
        </div>
        <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-violet-100 rounded-xl border border-purple-200">
          <div className="text-2xl font-bold text-purple-600 mb-1">
            {daysLeft !== null ? daysLeft : "-"}
          </div>
          <div className="text-xs font-medium text-purple-700">Days Left</div>
        </div>
      </div>

      {target > 0 && (
        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm text-gray-600">
            <span className="font-medium">Overall Progress</span>
            <span className="font-bold text-gray-800">
              {progressPercentage.toFixed(1)}%
            </span>
          </div>
          <div className="relative">
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-700 ease-out relative overflow-hidden"
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
              </div>
            </div>
          </div>
          {progressPercentage >= 100 && (
            <div className="text-center text-sm font-medium text-green-600 animate-pulse">
              🎉 Goal Achieved! Congratulations!
            </div>
          )}
        </div>
      )}
    </div>
  );
}
