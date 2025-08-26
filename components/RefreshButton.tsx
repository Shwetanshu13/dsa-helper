"use client";

import { useState } from "react";

interface RefreshButtonProps {
  onRefresh: () => Promise<void>;
}

export default function RefreshButton({ onRefresh }: RefreshButtonProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await onRefresh();
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <button
      onClick={handleRefresh}
      disabled={isRefreshing}
      className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-4 py-2 rounded transition-colors"
    >
      <span className={isRefreshing ? "animate-spin" : ""}>🔄</span>
      {isRefreshing ? "Refreshing..." : "Refresh LeetCode Data"}
    </button>
  );
}
