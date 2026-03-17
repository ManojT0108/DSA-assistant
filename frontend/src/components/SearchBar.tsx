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
      <div className="flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter LeetCode slug or URL (e.g. two-sum)"
          className="flex-1 rounded-lg bg-[#1e2a3a] px-4 py-3 text-gray-100 placeholder-gray-500 outline-none ring-1 ring-gray-700 focus:ring-[#6c63ff] transition-all"
        />
        <button
          type="submit"
          className="rounded-lg bg-[#6c63ff] px-6 py-3 font-medium text-white hover:bg-[#5a52d5] transition-colors"
        >
          Solve
        </button>
      </div>
    </form>
  );
}
