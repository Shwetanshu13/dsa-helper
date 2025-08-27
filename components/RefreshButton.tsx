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
      className="relative overflow-hidden bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:from-gray-400 disabled:to-gray-500 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:scale-100 group"
    >
      <div className="absolute inset-0 bg-white/20 translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
      <div className="relative flex items-center gap-3">
        <span
          className={`text-lg transition-transform duration-300 ${
            isRefreshing ? "animate-spin" : "group-hover:rotate-180"
          }`}
        >
          🔄
        </span>
        <span className="font-semibold">
          {isRefreshing ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Refreshing...</span>
            </div>
          ) : (
            "Refresh LeetCode Data"
          )}
        </span>
      </div>
    </button>
  );
}
