import { EditorialResponse } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface RateLimitDetail {
  error: "rate_limited";
  message: string;
  retry_after: number;
  suggestions: string[];
}

export class RateLimitError extends Error {
  retryAfter: number;
  suggestions: string[];

  constructor(detail: RateLimitDetail) {
    super(detail.message);
    this.name = "RateLimitError";
    this.retryAfter = detail.retry_after;
    this.suggestions = detail.suggestions;
  }
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (res.ok) return res.json();

  if (res.status === 429) {
    const body = await res.json();
    throw new RateLimitError(body.detail);
  }

  let message = "Something went wrong. Please try again.";
  try {
    const body = await res.json();
    message = typeof body.detail === "string" ? body.detail : JSON.stringify(body.detail);
  } catch {
    // couldn't parse JSON, use default
  }
  throw new Error(message);
}

export async function fetchEditorial(slug: string): Promise<EditorialResponse> {
  const res = await fetch(`${API_URL}/solve/${slug}`, { method: "POST" });
  return handleResponse(res);
}

export async function fetchDailyEditorial(): Promise<EditorialResponse> {
  const res = await fetch(`${API_URL}/daily`);
  return handleResponse(res);
}
