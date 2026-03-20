"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { CodeSolutions } from "@/types";

const TABS: { key: keyof CodeSolutions; label: string; lang: string }[] = [
  { key: "python", label: "Python", lang: "python" },
  { key: "javascript", label: "JavaScript", lang: "javascript" },
  { key: "java", label: "Java", lang: "java" },
  { key: "cpp", label: "C++", lang: "cpp" },
  { key: "go", label: "Go", lang: "go" },
];

// Custom theme that matches our color scheme
const codeTheme: Record<string, React.CSSProperties> = {
  'code[class*="language-"]': { color: "#EEEEEE", background: "none", fontFamily: "var(--font-geist-mono), monospace", fontSize: "0.8125rem", lineHeight: "1.6" },
  'pre[class*="language-"]': { color: "#EEEEEE", background: "var(--code-bg)", padding: "1rem", margin: 0, overflow: "auto" },
  comment: { color: "#6b7380", fontStyle: "italic" },
  prolog: { color: "#6b7380" },
  punctuation: { color: "#a0a8b4" },
  property: { color: "#00ADB5" },
  tag: { color: "#00ADB5" },
  boolean: { color: "#f7768e" },
  number: { color: "#f7768e" },
  constant: { color: "#f7768e" },
  symbol: { color: "#00ADB5" },
  selector: { color: "#9ece6a" },
  "attr-name": { color: "#e0af68" },
  string: { color: "#9ece6a" },
  char: { color: "#9ece6a" },
  builtin: { color: "#e0af68" },
  inserted: { color: "#9ece6a" },
  operator: { color: "#a0a8b4" },
  entity: { color: "#e0af68" },
  url: { color: "#00ADB5" },
  variable: { color: "#EEEEEE" },
  atrule: { color: "#00ADB5" },
  "attr-value": { color: "#9ece6a" },
  function: { color: "#7aa2f7" },
  keyword: { color: "#bb9af7" },
  regex: { color: "#e0af68" },
  important: { color: "#e0af68", fontWeight: "bold" },
  deleted: { color: "#f7768e" },
  "class-name": { color: "#e0af68" },
};

export default function CodeTabs({ code }: { code: CodeSolutions }) {
  const [active, setActive] = useState<keyof CodeSolutions>("python");

  return (
    <div className="rounded-xl overflow-hidden border border-[var(--border)]">
      {/* Tab bar */}
      <div className="flex bg-[var(--bg-secondary)] border-b border-[var(--border)] overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActive(tab.key)}
            className={`relative px-4 py-2.5 text-xs font-medium whitespace-nowrap transition-colors ${
              active === tab.key
                ? "text-[var(--accent)]"
                : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
            }`}
          >
            {tab.label}
            {active === tab.key && (
              <div className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full bg-[var(--accent)]" />
            )}
          </button>
        ))}
      </div>

      {/* Code */}
      <SyntaxHighlighter
        language={TABS.find((t) => t.key === active)!.lang}
        style={codeTheme}
        customStyle={{
          margin: 0,
          borderRadius: 0,
          fontSize: "0.8125rem",
          background: "var(--code-bg)",
          padding: "1rem",
        }}
        showLineNumbers
        lineNumberStyle={{ color: "var(--text-muted)", opacity: 0.4, fontSize: "0.75rem" }}
      >
        {code[active]}
      </SyntaxHighlighter>
    </div>
  );
}
