"use client";

import { useEffect, useState } from "react";

const TINKERING_MESSAGES = [
  "Reading the problem statement...",
  "Identifying DSA patterns...",
  "Thinking about edge cases...",
  "Crafting the intuition...",
  "Building the approach step by step...",
  "Analyzing time complexity...",
  "Writing clean code...",
  "Polishing the editorial...",
];

export default function LoadingSkeleton() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((i) => (i + 1) % TINKERING_MESSAGES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-12">
      <div className="h-10 w-10 rounded-full border-2 border-zinc-700 border-t-zinc-300 animate-spin" />

      <p className="text-zinc-500 text-sm animate-pulse">
        {TINKERING_MESSAGES[messageIndex]}
      </p>

      <div className="w-full max-w-sm space-y-4 opacity-20">
        <div className="h-5 w-3/4 rounded bg-zinc-700 animate-pulse" />
        <div className="flex gap-2">
          <div className="h-4 w-16 rounded-md bg-zinc-700 animate-pulse" />
          <div className="h-4 w-14 rounded-md bg-zinc-700 animate-pulse" />
        </div>
        <div className="space-y-2">
          <div className="h-3 w-full rounded bg-zinc-700 animate-pulse" />
          <div className="h-3 w-5/6 rounded bg-zinc-700 animate-pulse" />
          <div className="h-3 w-4/6 rounded bg-zinc-700 animate-pulse" />
        </div>
        <div className="h-28 w-full rounded bg-zinc-700 animate-pulse" />
      </div>
    </div>
  );
}
