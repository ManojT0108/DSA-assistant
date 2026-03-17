"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function CodeBlock({ code }: { code: string }) {
  return (
    <div className="rounded-lg overflow-hidden">
      <SyntaxHighlighter
        language="python"
        style={oneDark}
        customStyle={{ margin: 0, borderRadius: "0.5rem", fontSize: "0.875rem" }}
        showLineNumbers
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
