"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { CodeSolutions } from "@/types";

const TABS: { key: keyof CodeSolutions; label: string; lang: string }[] = [
  { key: "python", label: "Python", lang: "python" },
  { key: "javascript", label: "JavaScript", lang: "javascript" },
  { key: "java", label: "Java", lang: "java" },
  { key: "cpp", label: "C++", lang: "cpp" },
  { key: "go", label: "Go", lang: "go" },
];

export default function CodeTabs({ code }: { code: CodeSolutions }) {
  const [active, setActive] = useState<keyof CodeSolutions>("python");

  return (
    <div className="rounded-lg overflow-hidden border border-gray-800">
      {/* Tab bar */}
      <div className="flex bg-[#1e1e2e] border-b border-gray-800 overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActive(tab.key)}
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
              active === tab.key
                ? "text-[#6c63ff] bg-[#282a36] border-b-2 border-[#6c63ff]"
                : "text-gray-500 hover:text-gray-300 hover:bg-gray-800/50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Code content */}
      <SyntaxHighlighter
        language={TABS.find((t) => t.key === active)!.lang}
        style={oneDark}
        customStyle={{
          margin: 0,
          borderRadius: 0,
          fontSize: "0.875rem",
          background: "#282a36",
        }}
        showLineNumbers
      >
        {code[active]}
      </SyntaxHighlighter>
    </div>
  );
}
