"use client";

import { useRouter } from "next/navigation";
import SearchBar from "@/components/SearchBar";
import ProblemTable from "@/components/ProblemTable";
import { BLIND_75 } from "@/lib/blind75";

const easy = BLIND_75.filter((p) => p.difficulty === "Easy");
const medium = BLIND_75.filter((p) => p.difficulty === "Medium");
const hard = BLIND_75.filter((p) => p.difficulty === "Hard");

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <div className="border-b border-zinc-800">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-4 pt-14 pb-10">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
              Find My Editorial
            </h1>
            <p className="mt-2 text-sm text-zinc-500 sm:text-base">
              AI-powered editorials for any LeetCode problem
            </p>
          </div>

          <SearchBar />

          <button
            onClick={() => router.push("/editorial/daily")}
            className="rounded-lg border border-zinc-700 px-5 py-2 text-sm text-zinc-400 hover:border-zinc-500 hover:text-zinc-200 transition-colors"
          >
            Daily Challenge
          </button>
        </div>
      </div>

      {/* Blind 75 */}
      <div className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-zinc-100">Blind 75</h2>
          <p className="mt-1 text-sm text-zinc-500">
            The most popular interview prep problems, organized by difficulty.
          </p>
        </div>

        <div className="space-y-8">
          <ProblemTable problems={easy} title="Easy" difficulty="Easy" />
          <ProblemTable problems={medium} title="Medium" difficulty="Medium" />
          <ProblemTable problems={hard} title="Hard" difficulty="Hard" />
        </div>
      </div>
    </main>
  );
}
