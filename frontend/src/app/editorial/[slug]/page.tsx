"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { fetchEditorial, fetchDailyEditorial, RateLimitError } from "@/lib/api";
import { EditorialResponse } from "@/types";
import ProblemPane from "@/components/ProblemPane";
import EditorialPane from "@/components/EditorialPane";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import ThemeToggle from "@/components/ThemeToggle";

interface ErrorState {
  message: string;
  type: "rate_limit" | "generic";
  retryAfter?: number;
  suggestions?: string[];
}

export default function EditorialPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const [data, setData] = useState<EditorialResponse | null>(null);
  const [error, setError] = useState<ErrorState | null>(null);
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const request = slug === "daily" ? fetchDailyEditorial() : fetchEditorial(slug);

    request
      .then(setData)
      .catch((err) => {
        if (err instanceof RateLimitError) {
          setError({
            message: err.message,
            type: "rate_limit",
            retryAfter: err.retryAfter,
            suggestions: err.suggestions,
          });
          setCountdown(err.retryAfter);
        } else {
          setError({ message: err.message, type: "generic" });
        }
      })
      .finally(() => setLoading(false));
  }, [slug]);

  // Countdown timer for rate limit
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      {/* Header */}
      <header className="flex shrink-0 items-center justify-between border-b border-[var(--border)] px-5 py-3">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-sm font-semibold text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
          >
            Find My Editorial
          </Link>
          {data && (
            <>
              <svg className="h-3 w-3 text-[var(--text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-sm text-[var(--text-secondary)]">{data.problem.title}</span>
            </>
          )}
        </div>
        <ThemeToggle />
      </header>

      {/* Rate Limit Error */}
      {error?.type === "rate_limit" && (
        <div className="flex flex-1 items-center justify-center p-4">
          <div className="max-w-md w-full rounded-xl border border-amber-400/20 bg-amber-400/5 p-6 animate-fade-in">
            {/* Icon */}
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-400/10">
              <svg className="h-6 w-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>

            {/* Title */}
            <h3 className="mb-2 text-center text-base font-semibold text-amber-300">
              Rate Limit Reached
            </h3>
            <p className="mb-4 text-center text-sm text-[var(--text-secondary)]">
              {error.message}
            </p>

            {/* Countdown */}
            {countdown > 0 && (
              <div className="mb-4 flex justify-center">
                <div className="rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)] px-4 py-2 text-center">
                  <span className="text-2xl font-mono font-bold text-amber-400">{countdown}s</span>
                  <p className="text-[11px] text-[var(--text-muted)] mt-0.5">until retry</p>
                </div>
              </div>
            )}

            {/* Suggestions */}
            {error.suggestions && (
              <ul className="mb-5 space-y-2">
                {error.suggestions.map((s, i) => (
                  <li key={i} className="flex gap-2 text-sm text-[var(--text-secondary)]">
                    <span className="shrink-0 text-amber-400/60 mt-0.5">&#8250;</span>
                    {s}
                  </li>
                ))}
              </ul>
            )}

            {/* Retry button */}
            <button
              onClick={() => window.location.reload()}
              disabled={countdown > 0}
              className={`w-full rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
                countdown > 0
                  ? "border-[var(--border)] text-[var(--text-muted)] cursor-not-allowed"
                  : "border-amber-400/30 text-amber-300 hover:bg-amber-400/10"
              }`}
            >
              {countdown > 0 ? `Retry in ${countdown}s` : "Retry Now"}
            </button>
          </div>
        </div>
      )}

      {/* Generic Error */}
      {error?.type === "generic" && (
        <div className="flex flex-1 items-center justify-center">
          <div className="max-w-sm rounded-xl border border-rose-400/15 bg-rose-400/5 p-6 text-center animate-fade-in">
            <svg className="mx-auto mb-3 h-8 w-8 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            <p className="mb-4 text-sm text-rose-300">{error.message}</p>
            <button
              onClick={() => window.location.reload()}
              className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              Try again
            </button>
          </div>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex flex-1 items-center justify-center">
          <LoadingSkeleton />
        </div>
      )}

      {/* Content — two scrollable panes */}
      {data && !loading && (
        <div className="grid flex-1 grid-cols-1 lg:grid-cols-2 divide-x divide-[var(--border)] overflow-hidden animate-fade-in">
          <div className="overflow-y-auto overflow-x-hidden min-w-0">
            <ProblemPane problem={data.problem} />
          </div>
          <div className="overflow-y-auto overflow-x-hidden min-w-0">
            <EditorialPane patterns={data.patterns} editorial={data.editorial} />
          </div>
        </div>
      )}
    </div>
  );
}
