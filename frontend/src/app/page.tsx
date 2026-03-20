"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SearchBar from "@/components/SearchBar";
import ProblemTable from "@/components/ProblemTable";
import ThemeToggle from "@/components/ThemeToggle";
import { BLIND_75, Problem } from "@/lib/blind75";
import { NEETCODE_150 } from "@/lib/neetcode150";

type ListKey = "blind75" | "neetcode150";

const LISTS: Record<ListKey, { label: string; description: string; problems: Problem[] }> = {
  blind75: {
    label: "Blind 75",
    description: "Essential interview prep, organized by difficulty",
    problems: BLIND_75,
  },
  neetcode150: {
    label: "NeetCode 150",
    description: "Expanded NeetCode roadmap — 150 curated problems",
    problems: NEETCODE_150,
  },
};

export default function Home() {
  const router = useRouter();
  const [activeList, setActiveList] = useState<ListKey>("blind75");

  const current = LISTS[activeList];
  const easy = current.problems.filter((p) => p.difficulty === "Easy");
  const medium = current.problems.filter((p) => p.difficulty === "Medium");
  const hard = current.problems.filter((p) => p.difficulty === "Hard");

  return (
    <main className="min-h-screen">
      {/* Nav */}
      <nav className="border-b border-[var(--border)]">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <span className="text-sm font-semibold text-[var(--text-primary)]">
            Find My <span className="text-[var(--accent)]">Editorial</span>
          </span>
          <ThemeToggle />
        </div>
      </nav>

      {/* Hero */}
      <div className="border-b border-[var(--border)]">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-5 px-4 pt-14 pb-10">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Find My <span className="text-[var(--accent)]">Editorial</span>
            </h1>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              AI-powered editorials for any LeetCode problem
            </p>
          </div>

          <SearchBar />

          <button
            onClick={() => router.push("/editorial/daily")}
            className="group flex items-center gap-2 rounded-lg border border-[var(--border)] px-5 py-2.5 text-sm text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Daily Challenge
          </button>
        </div>
      </div>

      {/* Problem List */}
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">{current.label}</h2>
            <p className="mt-0.5 text-xs text-[var(--text-muted)]">
              {current.description}
            </p>
          </div>

          {/* Dropdown */}
          <div className="relative">
            <select
              value={activeList}
              onChange={(e) => setActiveList(e.target.value as ListKey)}
              className="appearance-none rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-2 pr-8 text-sm text-[var(--text-primary)] outline-none hover:border-[var(--border-hover)] focus:border-[var(--accent)] transition-colors cursor-pointer"
            >
              <option value="blind75">Blind 75</option>
              <option value="neetcode150">NeetCode 150</option>
            </select>
            <svg
              className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <div className="space-y-6">
          <ProblemTable problems={easy} title="Easy" difficulty="Easy" />
          <ProblemTable problems={medium} title="Medium" difficulty="Medium" />
          <ProblemTable problems={hard} title="Hard" difficulty="Hard" />
        </div>
      </div>
    </main>
  );
}
