"use client";

import { Editorial } from "@/types";
import PatternPills from "./PatternPills";
import CodeBlock from "./CodeBlock";
import "katex/dist/katex.min.css";

// Dynamic import to avoid SSR issues with KaTeX
import { InlineMath } from "react-katex";

function ComplexityBadge({ label, value }: { label: string; value: string }) {
  // Try to render LaTeX, fallback to plain text
  const latexMatch = value.match(/^(O\(.+\))\s*[-—–]\s*(.+)$/);
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

interface EditorialPaneProps {
  patterns: string[];
  editorial: Editorial;
}

export default function EditorialPane({ patterns, editorial }: EditorialPaneProps) {
  return (
    <div className="h-full overflow-y-auto p-6 space-y-6">
      <PatternPills patterns={patterns} />

      <section>
        <h3 className="mb-2 text-lg font-semibold text-[#6c63ff]">Intuition</h3>
        <p className="text-gray-300 leading-relaxed">{editorial.intuition}</p>
      </section>

      <section>
        <h3 className="mb-2 text-lg font-semibold text-[#6c63ff]">Approach</h3>
        <ol className="list-decimal list-inside space-y-2 text-gray-300">
          {editorial.approach.map((step, i) => (
            <li key={i} className="leading-relaxed">{step}</li>
          ))}
        </ol>
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
    </div>
  );
}
