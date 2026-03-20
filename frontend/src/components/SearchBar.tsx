"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { extractSlug } from "@/lib/utils";

export default function SearchBar() {
  const [input, setInput] = useState("");
  const [focused, setFocused] = useState(false);
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const slug = extractSlug(input);
    if (slug) {
      router.push(`/editorial/${slug}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg">
      <div
        className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 transition-all ${
          focused
            ? "border-[var(--accent)] bg-[var(--bg-secondary)] shadow-[0_0_0_3px_var(--accent-dim)]"
            : "border-[var(--border)] bg-[var(--bg-secondary)]"
        }`}
      >
        <svg className="h-4 w-4 shrink-0 text-[var(--text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Search by slug or paste LeetCode URL..."
          className="flex-1 bg-transparent text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none"
        />
        <button
          type="submit"
          className="shrink-0 rounded-lg bg-[var(--accent)] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[var(--accent-hover)] active:scale-[0.97] transition-all"
        >
          Solve
        </button>
      </div>
    </form>
  );
}
