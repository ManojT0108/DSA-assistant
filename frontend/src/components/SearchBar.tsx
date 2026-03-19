"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { extractSlug } from "@/lib/utils";

export default function SearchBar() {
  const [input, setInput] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const slug = extractSlug(input);
    if (slug) {
      router.push(`/editorial/${slug}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl">
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter LeetCode slug or URL (e.g. two-sum)"
          className="flex-1 rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 outline-none focus:border-zinc-500 transition-colors"
        />
        <button
          type="submit"
          className="rounded-lg bg-zinc-100 px-5 py-2.5 text-sm font-medium text-zinc-900 hover:bg-white transition-colors"
        >
          Solve
        </button>
      </div>
    </form>
  );
}
