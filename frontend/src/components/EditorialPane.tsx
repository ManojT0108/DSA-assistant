"use client";

import { Editorial } from "@/types";
import PatternPills from "./PatternPills";
import CodeBlock from "./CodeBlock";
import "katex/dist/katex.min.css";
import { InlineMath } from "react-katex";

function ComplexityBadge({ label, value }: { label: string; value: string }) {
  const latexMatch = value.match(/^(.+?)\s*[-—–]\s*(.+)$/);
  const complexityPart = latexMatch ? latexMatch[1] : value;
  const explanation = latexMatch ? latexMatch[2] : null;

  return (
    <div className="inline-flex items-center gap-2 rounded-lg bg-gray-800/50 px-3 py-1.5 text-sm">
      <span className="font-medium text-gray-400">{label}:</span>
      <span className="text-gray-200">
        {(() => {
          try {
            return <InlineMath math={complexityPart} />;
          } catch {
            return complexityPart;
          }
        })()}
      </span>
      {explanation && <span className="text-gray-500">— {explanation}</span>}
    </div>
  );
}

function MarkdownBlock({ content }: { content: string }) {
  // Render code blocks and basic markdown formatting
  const parts = content.split(/(```[\s\S]*?```)/g);
  return (
    <div className="space-y-3 text-gray-300 leading-relaxed">
      {parts.map((part, i) => {
        if (part.startsWith("```")) {
          const code = part.replace(/^```\w*\n?/, "").replace(/\n?```$/, "");
          return (
            <pre key={i} className="rounded-lg bg-gray-800/60 p-4 text-sm font-mono overflow-x-auto whitespace-pre">
              {code}
            </pre>
          );
        }
        if (!part.trim()) return null;
        return (
          <div key={i} className="whitespace-pre-wrap">
            {part}
          </div>
        );
      })}
    </div>
  );
}

interface EditorialPaneProps {
  patterns: string[];
  editorial: Editorial;
}

export default function EditorialPane({ patterns, editorial }: EditorialPaneProps) {
  return (
    <div className="h-full overflow-y-auto p-6 space-y-6">
      <PatternPills patterns={patterns} />

      <section>
        <h3 className="mb-2 text-lg font-semibold text-[#6c63ff]">Intuition &amp; The &quot;Aha!&quot; Moment</h3>
        <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{editorial.intuition}</p>
      </section>

      <section>
        <h3 className="mb-2 text-lg font-semibold text-[#6c63ff]">Visual Walkthrough</h3>
        <MarkdownBlock content={editorial.visual_walkthrough} />
      </section>

      <section>
        <h3 className="mb-3 text-lg font-semibold text-[#6c63ff]">Approaches</h3>
        <div className="space-y-4">
          {editorial.approaches.map((approach, i) => (
            <div key={i} className="rounded-lg border border-gray-800 p-4">
              <h4 className="mb-2 font-semibold text-gray-200">
                {i + 1}. {approach.name}
              </h4>
              <p className="text-gray-400 leading-relaxed whitespace-pre-wrap">
                {approach.explanation}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="mb-3 text-lg font-semibold text-[#6c63ff]">Complexity</h3>
        <div className="flex flex-wrap gap-3">
          <ComplexityBadge label="Time" value={editorial.time_complexity} />
          <ComplexityBadge label="Space" value={editorial.space_complexity} />
        </div>
      </section>

      <section>
        <h3 className="mb-3 text-lg font-semibold text-[#6c63ff]">Solution</h3>
        <CodeBlock code={editorial.code} />
      </section>

      <section>
        <h3 className="mb-3 text-lg font-semibold text-[#6c63ff]">Edge Cases &amp; Pitfalls</h3>
        <ul className="space-y-2">
          {editorial.edge_cases.map((ec, i) => (
            <li key={i} className="flex gap-2 text-gray-400">
              <span className="text-amber-400 shrink-0">&#x26a0;</span>
              <span>{ec}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
