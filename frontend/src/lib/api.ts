import { EditorialResponse } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function fetchEditorial(slug: string): Promise<EditorialResponse> {
  const res = await fetch(`${API_URL}/solve/${slug}`, { method: "POST" });
  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Failed to fetch editorial: ${detail}`);
  }
  return res.json();
}

export async function fetchDailyEditorial(): Promise<EditorialResponse> {
  const res = await fetch(`${API_URL}/daily`);
  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Failed to fetch daily editorial: ${detail}`);
  }
  return res.json();
}
