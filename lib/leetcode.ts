// Helpers for fetching LeetCode data
export async function fetchLeetCodeSolved(username: string) {
  const res = await fetch(
    `https://alfa-leetcode-api.onrender.com/${username}/solved`
  );
  return res.json();
}
export async function fetchLeetCodeProfile(username: string) {
  const res = await fetch(`https://alfa-leetcode-api.onrender.com/${username}`);
  return res.json();
}
