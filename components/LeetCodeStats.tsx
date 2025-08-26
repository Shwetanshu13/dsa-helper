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
  return (
    <div className="my-4 p-4 bg-white rounded shadow flex flex-col gap-2">
      <div>
        <b>Solved:</b> {solved}
      </div>
      <div>
        <b>Target:</b> {target}
      </div>
      <div>
        <b>Remaining:</b> {remaining}
      </div>
      <div>
        <b>Days Left:</b> {daysLeft !== null ? daysLeft : "-"}
      </div>
    </div>
  );
}
