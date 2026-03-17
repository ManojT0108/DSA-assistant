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
      <header className="flex items-center gap-4 border-b border-gray-800 px-6 py-3">
        <Link
          href="/"
          className="text-lg font-bold text-gray-100 hover:text-[#6c63ff] transition-colors"
        >
          Find My Editorial
        </Link>
        {data && (
          <span className="text-sm text-gray-500">
            {data.problem.title}
          </span>
        )}
      </header>

      {error && (
        <div className="mx-auto mt-12 max-w-lg rounded-lg bg-rose-900/20 p-6 text-center text-rose-300">
          <p className="mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="rounded-lg bg-rose-600 px-4 py-2 text-sm text-white hover:bg-rose-700 transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {loading && (
        <div className="grid flex-1 grid-cols-1 lg:grid-cols-2 divide-x divide-gray-800">
          <LoadingSkeleton />
          <LoadingSkeleton />
        </div>
      )}

      {data && !loading && (
        <div className="grid flex-1 grid-cols-1 lg:grid-cols-2 divide-x divide-gray-800">
          <ProblemPane problem={data.problem} />
          <EditorialPane patterns={data.patterns} editorial={data.editorial} />
        </div>
      )}
    </div>
  );
}
