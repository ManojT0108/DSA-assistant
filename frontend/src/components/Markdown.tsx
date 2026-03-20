"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import "katex/dist/katex.min.css";

export default function Markdown({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex]}
      components={{
        code({ className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          const codeString = String(children).replace(/\n$/, "");

          if (!match && !className) {
            return (
              <code className="rounded-md bg-[var(--bg-elevated)] px-1.5 py-0.5 text-[13px] font-mono text-[var(--accent)]" {...props}>
                {children}
              </code>
            );
          }

          return (
            <SyntaxHighlighter
              style={oneDark}
              language={match ? match[1] : "text"}
              customStyle={{
                margin: 0,
                borderRadius: "0.75rem",
                fontSize: "0.875rem",
                background: "var(--code-bg)",
                border: "1px solid var(--border)",
              }}
              showLineNumbers
              lineNumberStyle={{ color: "var(--text-muted)", opacity: 0.4, fontSize: "0.8rem" }}
            >
              {codeString}
            </SyntaxHighlighter>
          );
        },
        pre({ children }) {
          return <div className="my-3">{children}</div>;
        },
        p({ children }) {
          return <p className="mb-3 text-base leading-relaxed">{children}</p>;
        },
        strong({ children }) {
          return <strong className="font-semibold text-[var(--text-primary)]">{children}</strong>;
        },
        em({ children }) {
          return <em className="italic">{children}</em>;
        },
        ul({ children }) {
          return <ul className="mb-3 list-disc list-inside space-y-1 text-base">{children}</ul>;
        },
        ol({ children }) {
          return <ol className="mb-3 list-decimal list-inside space-y-1 text-base">{children}</ol>;
        },
        li({ children }) {
          return <li className="leading-relaxed text-base">{children}</li>;
        },
        table({ children }) {
          return (
            <div className="my-3 overflow-x-auto rounded-xl border border-[var(--border)]">
              <table className="w-full border-collapse text-sm">{children}</table>
            </div>
          );
        },
        th({ children }) {
          return (
            <th className="border-b border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-2 text-left text-sm font-medium text-[var(--text-primary)]">
              {children}
            </th>
          );
        },
        td({ children }) {
          return (
            <td className="border-b border-[var(--border)] px-3 py-2 text-sm text-[var(--text-secondary)]">
              {children}
            </td>
          );
        },
        blockquote({ children }) {
          return (
            <blockquote className="my-3 border-l-2 border-[var(--accent)] pl-4 italic text-base">
              {children}
            </blockquote>
          );
        },
        h1({ children }) {
          return <h1 className="mb-2 text-xl font-bold text-[var(--text-primary)]">{children}</h1>;
        },
        h2({ children }) {
          return <h2 className="mb-2 text-lg font-bold text-[var(--text-primary)]">{children}</h2>;
        },
        h3({ children }) {
          return <h3 className="mb-2 text-base font-semibold text-[var(--text-primary)]">{children}</h3>;
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
