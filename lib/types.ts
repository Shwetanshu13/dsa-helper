// Shared TypeScript type definitions for the DSA Helper application

export interface SolvedData {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  error?: string;
  isRateLimited?: boolean;
}

export interface ProfileData {
  username: string;
  ranking: string | number;
  reputation: string | number;
  country: string;
  gitHub?: string | null;
  error?: string;
  isRateLimited?: boolean;
}

export interface DashboardData {
  solved: SolvedData;
  profile: ProfileData;
  motivation: string;
  solvedCount: number;
  target: number;
  remaining: number;
  daysLeft: number | null;
  userName: string;
}

export interface RefreshResponse {
  solved: SolvedData;
  profile: ProfileData;
  success: boolean;
  message?: string;
}

export interface MotivationResponse {
  motivation: string;
  success: boolean;
  message?: string;
}
