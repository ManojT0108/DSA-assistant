"use client";

import { useState } from "react";
import { Editorial } from "@/types";
import PatternPills from "./PatternPills";
import CodeTabs from "./CodeTabs";
import Markdown from "./Markdown";

interface EditorialPaneProps {
  patterns: string[];
  editorial: Editorial;
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-[var(--accent)]">
      {children}
    </h3>
  );
}

function SolutionDropdown({ code }: { code: Editorial["code"] }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <section>
      <button
        onClick={() => setRevealed(!revealed)}
        className="w-full flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-3 transition-colors hover:border-[var(--accent)]/40 group"
      >
        <h3 className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)]">
          Solution
        </h3>
        <div className="flex items-center gap-2">
          {!revealed && (
            <span className="text-xs text-[var(--text-muted)] group-hover:text-[var(--text-secondary)] transition-colors">
              Try it yourself first!
            </span>
          )}
          <svg
            className={`h-4 w-4 text-[var(--text-muted)] transition-transform ${revealed ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      {revealed && (
        <div className="mt-3 animate-fade-in">
          <CodeTabs code={code} />
        </div>
      )}
    </section>
  );
}

export default function EditorialPane({ patterns, editorial }: EditorialPaneProps) {
  return (
    <div className="p-6 space-y-8 text-base text-[var(--text-secondary)]">
      {/* Headline */}
      <section>
        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">
          {editorial.headline}
        </h2>
      </section>

      <PatternPills patterns={patterns} />

      {/* The First Idea (Brute Force) */}
      <section>
        <SectionHeading>The First Idea</SectionHeading>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] p-4">
          <Markdown content={editorial.overview} />
        </div>
      </section>

      {/* Mental Model */}
      <section>
        <SectionHeading>The Mental Model</SectionHeading>
        <Markdown content={editorial.intuition} />
      </section>

      {/* Visual Trace */}
      <section>
        <SectionHeading>Visual Execution Trace</SectionHeading>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--code-bg)] p-4 overflow-x-auto">
          <Markdown content={editorial.visual_trace} />
        </div>
      </section>

      {/* Implementation Deep Dive */}
      <section>
        <SectionHeading>Implementation Deep Dive</SectionHeading>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] p-4">
          <Markdown content={editorial.algorithm_steps} />
        </div>
      </section>

      {/* Code — collapsible */}
      <SolutionDropdown code={editorial.code} />

      {/* Complexity */}
      <section>
        <SectionHeading>Complexity Analysis</SectionHeading>
        <div className="space-y-3">
          <div className="flex gap-3 rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-3">
            <span className="shrink-0 text-sm font-semibold text-[var(--accent)]">Time</span>
            <span className="text-sm text-[var(--text-primary)]">{editorial.time_complexity}</span>
          </div>
          <div className="flex gap-3 rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-3">
            <span className="shrink-0 text-sm font-semibold text-[var(--accent)]">Space</span>
            <span className="text-sm text-[var(--text-primary)]">{editorial.space_complexity}</span>
          </div>
        </div>
      </section>

      {/* Edge Cases */}
      <section>
        <SectionHeading>The "Gotchas"</SectionHeading>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] p-4">
          <Markdown content={editorial.edge_cases} />
        </div>
      </section>
    </div>
  );
}
