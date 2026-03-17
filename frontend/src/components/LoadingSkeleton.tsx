"use client";

import { useEffect, useState } from "react";

const TINKERING_MESSAGES = [
  "Reading the problem statement...",
  "Identifying DSA patterns...",
  "Thinking about edge cases...",
  "Crafting the intuition...",
  "Building the approach step by step...",
  "Analyzing time complexity...",
  "Writing clean Python code...",
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
    <div className="flex flex-col items-center justify-center gap-8 p-12">
      {/* Animated brain/gear icon */}
      <div className="relative flex items-center justify-center">
        <div className="h-16 w-16 rounded-full border-4 border-gray-700 border-t-[#6c63ff] animate-spin" />
        <span className="absolute text-2xl">&#x1f9e0;</span>
      </div>

      {/* Cycling status message */}
      <p className="text-gray-400 text-sm font-medium animate-pulse transition-all">
        {TINKERING_MESSAGES[messageIndex]}
      </p>

      {/* Skeleton content preview */}
      <div className="w-full max-w-md space-y-4 opacity-30">
        <div className="h-6 w-3/4 rounded bg-gray-700/50 animate-pulse" />
        <div className="flex gap-2">
          <div className="h-5 w-20 rounded-full bg-gray-700/50 animate-pulse" />
          <div className="h-5 w-16 rounded-full bg-gray-700/50 animate-pulse" />
        </div>
        <div className="space-y-2">
          <div className="h-3 w-full rounded bg-gray-700/50 animate-pulse" />
          <div className="h-3 w-5/6 rounded bg-gray-700/50 animate-pulse" />
          <div className="h-3 w-4/6 rounded bg-gray-700/50 animate-pulse" />
        </div>
        <div className="h-32 w-full rounded bg-gray-700/50 animate-pulse" />
      </div>
    </div>
  );
}
