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
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        📊 Progress Overview
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{solved}</div>
          <div className="text-sm text-gray-600">Solved</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{target}</div>
          <div className="text-sm text-gray-600">Target</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-600">{remaining}</div>
          <div className="text-sm text-gray-600">Remaining</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">
            {daysLeft !== null ? daysLeft : "-"}
          </div>
          <div className="text-sm text-gray-600">Days Left</div>
        </div>
      </div>

      {target > 0 && (
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progress</span>
            <span>{progressPercentage.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}
