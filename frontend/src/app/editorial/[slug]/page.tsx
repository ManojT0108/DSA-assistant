"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { fetchEditorial, fetchDailyEditorial } from "@/lib/api";
import { EditorialResponse } from "@/types";
import ProblemPane from "@/components/ProblemPane";
import EditorialPane from "@/components/EditorialPane";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import ThemeToggle from "@/components/ThemeToggle";

export default function EditorialPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const [data, setData] = useState<EditorialResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const request = slug === "daily" ? fetchDailyEditorial() : fetchEditorial(slug);

    request
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug]);

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

      {/* Error */}
      {error && (
        <div className="flex flex-1 items-center justify-center">
          <div className="max-w-sm rounded-xl border border-rose-400/15 bg-rose-400/5 p-6 text-center animate-fade-in">
            <svg className="mx-auto mb-3 h-8 w-8 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            <p className="mb-4 text-sm text-rose-300">{error}</p>
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
