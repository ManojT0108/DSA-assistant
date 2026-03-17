"use client";

import { useRouter } from "next/navigation";
import SearchBar from "@/components/SearchBar";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 px-4">
      <div className="text-center">
        <h1 className="mb-2 text-4xl font-bold text-gray-100">
          Find My <span className="text-[#6c63ff]">Editorial</span>
        </h1>
        <p className="text-gray-400">
          AI-powered editorials for any LeetCode problem
        </p>
      </div>

      <SearchBar />

      <button
        onClick={() => router.push("/editorial/daily")}
        className="rounded-lg border border-gray-700 px-6 py-3 text-gray-300 hover:border-[#6c63ff] hover:text-[#6c63ff] transition-colors"
      >
        Daily Challenge
      </button>
    </main>
  );
}
