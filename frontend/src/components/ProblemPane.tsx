"use client";

import { useMemo } from "react";
import { LeetCodeProblem } from "@/types";

const DIFFICULTY_COLORS: Record<string, string> = {
  Easy: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  Medium: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  Hard: "text-rose-400 bg-rose-400/10 border-rose-400/20",
};

function sanitizeHtml(html: string): string {
  // Remove inline width/height styles that cause overflow
  return html.replace(/style="[^"]*"/g, "");
}

export default function ProblemPane({ problem }: { problem: LeetCodeProblem }) {
  const cleanHtml = useMemo(() => sanitizeHtml(problem.question), [problem.question]);

  return (
    <div className="p-6 w-full max-w-full overflow-hidden">
      <div className="mb-5 flex items-center gap-3">
        <h2 className="text-lg font-semibold text-[var(--text-primary)]">{problem.title}</h2>
        <span className={`shrink-0 rounded-md border px-2 py-0.5 text-xs font-medium ${DIFFICULTY_COLORS[problem.difficulty] || "text-[var(--text-muted)]"}`}>
          {problem.difficulty}
        </span>
      </div>
      {problem.topicTags.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-1.5">
          {problem.topicTags.map((tag) => (
            <span
              key={tag.slug}
              className="rounded-md border border-[var(--border)] bg-[var(--bg-elevated)] px-2 py-0.5 text-xs text-[var(--text-secondary)]"
            >
              {tag.name}
            </span>
          ))}
        </div>
      )}
      <div
        className="problem-content"
        dangerouslySetInnerHTML={{ __html: cleanHtml }}
      />
    </div>
  );
}
