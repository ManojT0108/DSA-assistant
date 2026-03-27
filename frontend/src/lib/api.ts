import { EditorialResponse } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

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

async function fetchWithRetry(
  url: string,
  options: RequestInit,
  { retries = 1, timeoutMs = 90_000 } = {}
): Promise<Response> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const res = await fetch(url, { ...options, signal: controller.signal });
      clearTimeout(timer);
      if (res.ok || res.status === 429 || attempt === retries) return res;
      // Server error — retry
    } catch (err) {
      clearTimeout(timer);
      if (attempt === retries) throw err;
      // Timeout or network error — retry
    }
  }
  throw new Error("Something went wrong. Please try again.");
}

export async function fetchEditorial(slug: string): Promise<EditorialResponse> {
  const res = await fetchWithRetry(`${API_URL}/solve/${slug}`, { method: "POST" });
  return handleResponse(res);
}

export async function fetchDailyEditorial(): Promise<EditorialResponse> {
  const res = await fetchWithRetry(`${API_URL}/daily`, { method: "GET" });
  return handleResponse(res);
}
