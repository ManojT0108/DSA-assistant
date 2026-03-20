"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Problem } from "@/lib/blind75";
import { isCompleted, toggleCompleted } from "@/lib/notes";
import { getTopicStyle } from "@/lib/topicColors";

const DIFFICULTY_DOT = {
  Easy: "bg-emerald-400",
  Medium: "bg-amber-400",
  Hard: "bg-rose-400",
};

const DIFFICULTY_TEXT = {
  Easy: "text-emerald-400",
  Medium: "text-amber-400",
  Hard: "text-rose-400",
};

function Checkbox({ slug, onChange }: { slug: string; onChange: () => void }) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(isCompleted(slug));
  }, [slug]);

  return (
    <button
      onClick={() => {
        const next = toggleCompleted(slug);
        setChecked(next);
        onChange();
      }}
      className="group flex items-center justify-center"
      aria-label={checked ? "Mark incomplete" : "Mark complete"}
    >
      <div
        className={`h-[18px] w-[18px] rounded-[5px] border-2 flex items-center justify-center transition-all ${
          checked
            ? "border-[var(--accent)] bg-[var(--accent)]"
            : "border-[var(--border-hover)] bg-transparent group-hover:border-[var(--accent)]"
        }`}
      >
        {checked && (
          <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
    </button>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-4 w-4 text-[var(--text-muted)] transition-transform duration-200 ${open ? "rotate-0" : "-rotate-90"}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export default function ProblemTable({
  problems,
  title,
  difficulty,
  defaultOpen = true,
}: {
  problems: Problem[];
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const [completedCount, setCompletedCount] = useState(0);

  const recalcCount = useCallback(() => {
    setCompletedCount(problems.filter((p) => isCompleted(p.slug)).length);
  }, [problems]);

  useEffect(() => {
    recalcCount();
  }, [recalcCount]);

  const progress = problems.length > 0 ? (completedCount / problems.length) * 100 : 0;

  return (
    <section className="animate-fade-in">
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="mb-3 flex w-full items-center gap-3 text-left"
      >
        <ChevronIcon open={open} />
        <div className={`h-2.5 w-2.5 rounded-full ${DIFFICULTY_DOT[difficulty]}`} />
        <span className="text-sm font-semibold text-[var(--text-primary)]">{title}</span>
        <span className="text-xs text-[var(--text-muted)]">
          {completedCount}/{problems.length}
        </span>
        {/* Progress bar */}
        <div className="ml-auto hidden h-1 w-20 overflow-hidden rounded-full bg-[var(--border)] sm:block">
          <div
            className={`h-full rounded-full ${DIFFICULTY_DOT[difficulty]} transition-all duration-500`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </button>

      {/* Table */}
      {open && (
        <div className="overflow-x-auto rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] text-left">
                <th className="w-10 px-3 py-3" />
                <th className="w-14 px-3 py-3 text-[11px] font-medium uppercase tracking-widest text-[var(--text-muted)]">#</th>
                <th className="px-3 py-3 text-[11px] font-medium uppercase tracking-widest text-[var(--text-muted)]">Problem</th>
                <th className="hidden w-20 px-3 py-3 text-[11px] font-medium uppercase tracking-widest text-[var(--text-muted)] sm:table-cell">Diff.</th>
                <th className="hidden w-16 px-3 py-3 text-[11px] font-medium uppercase tracking-widest text-[var(--text-muted)] sm:table-cell">Acc.</th>
                <th className="hidden px-3 py-3 text-[11px] font-medium uppercase tracking-widest text-[var(--text-muted)] lg:table-cell">Topics</th>
                <th className="w-20 px-3 py-3" />
              </tr>
            </thead>
            <tbody>
              {problems.map((p, i) => (
                <tr
                  key={p.id}
                  className={`group border-b border-[var(--border)]/40 last:border-0 hover:bg-[var(--accent-dim)] transition-colors ${
                    i % 2 !== 0 ? "bg-[var(--bg-primary)]/30" : ""
                  }`}
                >
                  <td className="px-3 py-2.5 text-center">
                    <Checkbox slug={p.slug} onChange={recalcCount} />
                  </td>
                  <td className="px-3 py-2.5 font-mono text-xs text-[var(--text-muted)]">{p.id}</td>
                  <td className="px-3 py-2.5">
                    <Link
                      href={`/editorial/${p.slug}`}
                      className="text-sm text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
                    >
                      {p.title}
                    </Link>
                  </td>
                  <td className="hidden px-3 py-2.5 sm:table-cell">
                    <span className={`text-xs font-medium ${DIFFICULTY_TEXT[p.difficulty]}`}>
                      {p.difficulty}
                    </span>
                  </td>
                  <td className="hidden px-3 py-2.5 sm:table-cell">
                    <span className="text-xs text-[var(--text-muted)]">{p.acceptance}%</span>
                  </td>
                  <td className="hidden px-3 py-2.5 lg:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {p.topics.map((t) => (
                        <span
                          key={t}
                          className={`rounded-md border px-1.5 py-0.5 text-[10px] font-medium ${getTopicStyle(t)}`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-3 py-2.5">
                    <Link
                      href={`/editorial/${p.slug}`}
                      className="inline-block rounded-md border border-[var(--border)] px-2.5 py-1 text-[11px] font-medium text-[var(--text-muted)] opacity-0 group-hover:opacity-100 hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
                    >
                      Solve
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
