"use client";

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

      {/* Code */}
      <section>
        <SectionHeading>Solution</SectionHeading>
        <CodeTabs code={editorial.code} />
      </section>

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
