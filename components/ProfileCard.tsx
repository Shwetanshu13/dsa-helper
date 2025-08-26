export default function ProfileCard({ profile }: { profile: any }) {
  if (!profile) return null;
  return (
    <div className="my-4 p-4 bg-white rounded shadow">
      <div className="font-bold text-lg mb-2">LeetCode Profile</div>
      <div>
        <b>Username:</b> {profile.username}
      </div>
      <div>
        <b>Rank:</b> {profile.ranking}
      </div>
      <div>
        <b>Reputation:</b> {profile.reputation}
      </div>
      <div>
        <b>Country:</b> {profile.country}
      </div>
    </div>
  );
}
