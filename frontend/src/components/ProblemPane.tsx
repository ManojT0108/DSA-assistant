import { LeetCodeProblem } from "@/types";

const DIFFICULTY_COLORS: Record<string, string> = {
  Easy: "text-emerald-400",
  Medium: "text-amber-400",
  Hard: "text-rose-400",
};

export default function ProblemPane({ problem }: { problem: LeetCodeProblem }) {
  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="mb-4 flex items-center gap-3">
        <h2 className="text-xl font-bold text-gray-100">{problem.title}</h2>
        <span className={`text-sm font-medium ${DIFFICULTY_COLORS[problem.difficulty] || "text-gray-400"}`}>
          {problem.difficulty}
        </span>
      </div>
      <div
        className="prose prose-invert prose-sm max-w-none"
        dangerouslySetInnerHTML={{ __html: problem.question }}
      />
    </div>
  );
}
