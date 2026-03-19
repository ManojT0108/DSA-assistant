"use client";

import { Editorial } from "@/types";
import PatternPills from "./PatternPills";
import CodeTabs from "./CodeTabs";
import Markdown from "./Markdown";

interface EditorialPaneProps {
  patterns: string[];
  editorial: Editorial;
}

export default function EditorialPane({ patterns, editorial }: EditorialPaneProps) {
  return (
    <div className="h-full overflow-y-auto p-6 space-y-6 text-gray-300">
      <PatternPills patterns={patterns} />

      <section>
        <h3 className="mb-3 text-lg font-semibold text-[#6c63ff]">Intuition &amp; The &quot;Aha!&quot; Moment</h3>
        <Markdown content={editorial.intuition} />
      </section>

      <section>
        <h3 className="mb-3 text-lg font-semibold text-[#6c63ff]">Visual Walkthrough</h3>
        <Markdown content={editorial.visual_walkthrough} />
      </section>

      <section>
        <h3 className="mb-3 text-lg font-semibold text-[#6c63ff]">Approaches</h3>
        <div className="space-y-4">
          {editorial.approaches.map((approach, i) => (
            <div key={i} className="rounded-lg border border-gray-800 p-4">
              <h4 className="mb-2 font-semibold text-gray-200">
                {i + 1}. {approach.name}
              </h4>
              <Markdown content={approach.explanation} />
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="mb-3 text-lg font-semibold text-[#6c63ff]">Complexity</h3>
        <div className="space-y-2">
          <div className="flex items-start gap-2 rounded-lg bg-gray-800/50 px-4 py-2.5">
            <span className="font-medium text-gray-400 shrink-0">Time:</span>
            <span className="text-gray-200 font-mono text-sm">{editorial.time_complexity}</span>
          </div>
          <div className="flex items-start gap-2 rounded-lg bg-gray-800/50 px-4 py-2.5">
            <span className="font-medium text-gray-400 shrink-0">Space:</span>
            <span className="text-gray-200 font-mono text-sm">{editorial.space_complexity}</span>
          </div>
        </div>
      </section>

      <section>
        <h3 className="mb-3 text-lg font-semibold text-[#6c63ff]">Solution</h3>
        <CodeTabs code={editorial.code} />
      </section>

      <section>
        <h3 className="mb-3 text-lg font-semibold text-[#6c63ff]">Edge Cases &amp; Pitfalls</h3>
        <ul className="space-y-2">
          {editorial.edge_cases.map((ec, i) => (
            <li key={i} className="flex gap-2 text-gray-400">
              <span className="text-amber-400 shrink-0">&#x26a0;</span>
              <span><Markdown content={ec} /></span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
