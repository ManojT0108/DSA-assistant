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

          // Inline code (no language class, short content)
          if (!match && !className) {
            return (
              <code className="rounded bg-gray-800 px-1.5 py-0.5 text-sm font-mono text-[#6c63ff]" {...props}>
                {children}
              </code>
            );
          }

          // Block code
          return (
            <SyntaxHighlighter
              style={oneDark}
              language={match ? match[1] : "text"}
              customStyle={{ margin: 0, borderRadius: "0.5rem", fontSize: "0.875rem" }}
              showLineNumbers
            >
              {codeString}
            </SyntaxHighlighter>
          );
        },
        pre({ children }) {
          return <div className="my-3">{children}</div>;
        },
        p({ children }) {
          return <p className="mb-3 leading-relaxed">{children}</p>;
        },
        strong({ children }) {
          return <strong className="font-semibold text-gray-200">{children}</strong>;
        },
        em({ children }) {
          return <em className="italic text-gray-300">{children}</em>;
        },
        ul({ children }) {
          return <ul className="mb-3 list-disc list-inside space-y-1">{children}</ul>;
        },
        ol({ children }) {
          return <ol className="mb-3 list-decimal list-inside space-y-1">{children}</ol>;
        },
        li({ children }) {
          return <li className="leading-relaxed">{children}</li>;
        },
        table({ children }) {
          return (
            <div className="my-3 overflow-x-auto">
              <table className="w-full border-collapse text-sm">{children}</table>
            </div>
          );
        },
        th({ children }) {
          return (
            <th className="border border-gray-700 bg-gray-800/60 px-3 py-2 text-left font-semibold text-gray-200">
              {children}
            </th>
          );
        },
        td({ children }) {
          return (
            <td className="border border-gray-700 px-3 py-2 text-gray-400">
              {children}
            </td>
          );
        },
        blockquote({ children }) {
          return (
            <blockquote className="my-3 border-l-4 border-[#6c63ff] pl-4 text-gray-400 italic">
              {children}
            </blockquote>
          );
        },
        h1({ children }) {
          return <h1 className="mb-2 text-xl font-bold text-gray-100">{children}</h1>;
        },
        h2({ children }) {
          return <h2 className="mb-2 text-lg font-bold text-gray-100">{children}</h2>;
        },
        h3({ children }) {
          return <h3 className="mb-2 text-base font-semibold text-gray-200">{children}</h3>;
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
