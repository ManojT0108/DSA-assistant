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
      <PatternPills patterns={patterns} />

      <section>
        <SectionHeading>Intuition</SectionHeading>
        <Markdown content={editorial.intuition} />
      </section>

      <section>
        <SectionHeading>Visual Walkthrough</SectionHeading>
        <Markdown content={editorial.visual_walkthrough} />
      </section>

      <section>
        <SectionHeading>Approaches</SectionHeading>
        <div className="space-y-3">
          {editorial.approaches.map((approach, i) => (
            <div key={i} className="rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] p-4">
              <h4 className="mb-2 text-base font-semibold text-[var(--text-primary)]">
                {i + 1}. {approach.name}
              </h4>
              <Markdown content={approach.explanation} />
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading>Complexity</SectionHeading>
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-2.5">
            <span className="text-sm font-medium text-[var(--text-muted)]">Time</span>
            <span className="font-mono text-sm text-[var(--text-primary)]">{editorial.time_complexity}</span>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-2.5">
            <span className="text-sm font-medium text-[var(--text-muted)]">Space</span>
            <span className="font-mono text-sm text-[var(--text-primary)]">{editorial.space_complexity}</span>
          </div>
        </div>
      </section>

      <section>
        <SectionHeading>Solution</SectionHeading>
        <CodeTabs code={editorial.code} />
      </section>

      <section>
        <SectionHeading>Edge Cases</SectionHeading>
        <div className="space-y-2">
          {editorial.edge_cases.map((ec, i) => (
            <div key={i} className="flex gap-3 rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-3">
              <span className="shrink-0 text-amber-400 text-sm mt-0.5">!</span>
              <div><Markdown content={ec} /></div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
