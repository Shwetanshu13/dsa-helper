"use client";

import { useState } from "react";
import LeetCodeStats from "./LeetCodeStats";
import ProfileCard from "./ProfileCard";
import QuestionBifurcation from "./QuestionBifurcation";
import RefreshButton from "./RefreshButton";
import MotivationButton from "./MotivationButton";
import { SolvedData, ProfileData, DashboardData } from "@/lib/types";

interface DashboardContentProps {
  initialData: DashboardData;
}

export default function DashboardContent({
  initialData,
}: DashboardContentProps) {
  const [solved, setSolved] = useState<SolvedData>(initialData.solved);
  const [profile, setProfile] = useState<ProfileData>(initialData.profile);
  const [motivation, setMotivation] = useState(initialData.motivation);
  const [refreshError, setRefreshError] = useState<string | null>(null);

  const handleRefresh = async () => {
    setRefreshError(null);

    try {
      const response = await fetch("/api/refresh-leetcode", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Update data even if it's fallback data
      if (data.solved) {
        setSolved(data.solved);
      }
      if (data.profile) {
        setProfile(data.profile);
      }

      // Show user feedback if using fallback data or rate limited
      if (!data.success) {
        const isRateLimit =
          data.solved?.isRateLimited || data.profile?.isRateLimited;
        if (isRateLimit) {
          setRefreshError(
            "Rate limited by LeetCode API. Please wait before refreshing again."
          );
        } else {
          setRefreshError(
            "Using cached data - external service temporarily unavailable."
          );
        }
      }
    } catch (error) {
      console.error("Error refreshing data:", error);
      setRefreshError("Failed to refresh data. Please try again later.");
    }
  };

  const currentSolvedCount = solved?.totalSolved || initialData.solvedCount;
  const remaining = Math.max(initialData.target - currentSolvedCount, 0);

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            Dashboard Overview
          </h2>
          <p className="text-gray-600">
            Track your progress and stay motivated
          </p>
        </div>
        <RefreshButton onRefresh={handleRefresh} />
      </div>

      {refreshError && (
        <div
          className={`rounded-xl p-4 mb-6 border ${
            refreshError.includes("Rate limited")
              ? "bg-amber-50 border-amber-200 text-amber-800"
              : "bg-red-50 border-red-200 text-red-800"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">
              {refreshError.includes("Rate limited") ? "⏳" : "⚠️"}
            </span>
            <span className="text-sm font-medium">{refreshError}</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <MotivationButton
            currentMotivation={motivation}
            onNewMotivation={setMotivation}
          />
        </div>
        <div className="lg:col-span-1">
          <LeetCodeStats
            solved={currentSolvedCount}
            target={initialData.target}
            remaining={remaining}
            daysLeft={initialData.daysLeft}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProfileCard profile={profile} />
        <QuestionBifurcation solved={solved} />
      </div>
    </>
  );
}
