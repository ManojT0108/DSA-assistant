const COOKIE_KEY = "fme_completed";

function getAll(): Set<string> {
  if (typeof document === "undefined") return new Set();
  const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_KEY}=([^;]*)`));
  if (!match) return new Set();
  try {
    return new Set(JSON.parse(decodeURIComponent(match[1])));
  } catch {
    return new Set();
  }
}

function saveAll(completed: Set<string>) {
  const encoded = encodeURIComponent(JSON.stringify([...completed]));
  const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${COOKIE_KEY}=${encoded}; expires=${expires}; path=/; SameSite=Lax`;
}

export function isCompleted(slug: string): boolean {
  return getAll().has(slug);
}

export function toggleCompleted(slug: string): boolean {
  const completed = getAll();
  if (completed.has(slug)) {
    completed.delete(slug);
  } else {
    completed.add(slug);
  }
  saveAll(completed);
  return completed.has(slug);
}

export function getCompletedCount(): number {
  return getAll().size;
}
