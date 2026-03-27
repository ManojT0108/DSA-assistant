"use client";

import { useState } from "react";
import Markdown from "./Markdown";

interface HintPanelProps {
  slug: string;
}

const HINT_LEVELS = [
  { level: 1, label: "\u{1F4A1} Conceptual Nudge" },
  { level: 2, label: "\u{1F9E9} Pattern Hint" },
  { level: 3, label: "\u{1F527} Implementation Hint" },
];

export default function HintPanel({ slug }: HintPanelProps) {
  const [hints, setHints] = useState<Record<number, string>>({});
  const [loadingLevel, setLoadingLevel] = useState<number | null>(null);

  const maxRevealedLevel = Math.max(0, ...Object.keys(hints).map(Number));

  const fetchHint = async (level: number) => {
    if (hints[level]) return;
    if (level > 1 && !hints[level - 1]) return;
    setLoadingLevel(level);
    try {
      const res = await fetch(`/api/hint/${slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ level }),
      });
      const data = await res.json();
      setHints((prev) => ({ ...prev, [level]: data.hint }));
    } catch {
      setHints((prev) => ({
        ...prev,
        [level]: "Failed to load hint. Please try again.",
      }));
    } finally {
      setLoadingLevel(null);
    }
  };

  const isDisabled = (level: number) => {
    if (loadingLevel !== null) return true;
    if (hints[level]) return false;
    if (level > 1 && !hints[level - 1]) return true;
    return false;
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)] mb-1">
          Need a Hint?
        </h3>
        <p className="text-xs text-[var(--text-muted)]">
          Unlock hints progressively — from a gentle nudge to a concrete pointer.
        </p>
      </div>

      {/* Hint Buttons */}
      <div className="flex gap-2">
        {HINT_LEVELS.map(({ level, label }) => {
          const revealed = !!hints[level];
          const disabled = isDisabled(level);
          const isLoading = loadingLevel === level;

          return (
            <button
              key={level}
              onClick={() => fetchHint(level)}
              disabled={disabled && !revealed}
              className={`flex-1 rounded-lg px-3 py-2 text-xs font-medium transition-all ${
                revealed
                  ? "bg-[var(--accent)] text-white opacity-80 cursor-default"
                  : disabled
                  ? "border border-[var(--border)] text-[var(--text-muted)] opacity-40 cursor-not-allowed"
                  : "border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent-dim)] cursor-pointer"
              }`}
            >
              {isLoading ? (
                <span className="inline-flex items-center gap-1">
                  <svg
                    className="h-3 w-3 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Loading...
                </span>
              ) : (
                label
              )}
            </button>
          );
        })}
      </div>

      {/* Revealed Hints */}
      {maxRevealedLevel > 0 && (
        <div className="space-y-3">
          {HINT_LEVELS.filter(({ level }) => hints[level]).map(({ level, label }) => (
            <div
              key={level}
              className="rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] p-4"
            >
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
                {label}
              </h4>
              <Markdown content={hints[level]} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
