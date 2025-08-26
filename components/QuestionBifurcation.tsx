export default function QuestionBifurcation({ solved }: { solved: any }) {
  if (!solved) return null;
  return (
    <div className="my-4 p-4 bg-white rounded shadow">
      <div className="font-bold mb-2">Solved Questions</div>
      <div>Easy: {solved.easySolved}</div>
      <div>Medium: {solved.mediumSolved}</div>
      <div>Hard: {solved.hardSolved}</div>
    </div>
  );
}
