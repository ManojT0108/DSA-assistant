"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { fetchEditorial, fetchDailyEditorial } from "@/lib/api";
import { EditorialResponse } from "@/types";
import ProblemPane from "@/components/ProblemPane";
import EditorialPane from "@/components/EditorialPane";
import LoadingSkeleton from "@/components/LoadingSkeleton";

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
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center gap-4 border-b border-zinc-800 px-6 py-3">
        <Link
          href="/"
          className="text-sm font-semibold text-zinc-100 hover:text-white transition-colors"
        >
          Find My Editorial
        </Link>
        {data && (
          <>
            <span className="text-zinc-700">/</span>
            <span className="text-sm text-zinc-500">
              {data.problem.title}
            </span>
          </>
        )}
      </header>

      {error && (
        <div className="mx-auto mt-16 max-w-md rounded-lg border border-rose-500/20 bg-rose-500/5 p-6 text-center">
          <p className="mb-4 text-sm text-rose-400">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="rounded-md border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm text-zinc-300 hover:border-zinc-500 hover:text-zinc-100 transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {loading && (
        <div className="grid flex-1 grid-cols-1 lg:grid-cols-2 divide-x divide-zinc-800">
          <LoadingSkeleton />
          <LoadingSkeleton />
        </div>
      )}

      {data && !loading && (
        <div className="grid flex-1 grid-cols-1 lg:grid-cols-2 divide-x divide-zinc-800">
          <ProblemPane problem={data.problem} />
          <EditorialPane patterns={data.patterns} editorial={data.editorial} />
        </div>
      )}
    </div>
  );
}
