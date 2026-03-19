const COOKIE_KEY = "fme_notes";

function getAllNotes(): Record<string, string> {
  if (typeof document === "undefined") return {};
  const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_KEY}=([^;]*)`));
  if (!match) return {};
  try {
    return JSON.parse(decodeURIComponent(match[1]));
  } catch {
    return {};
  }
}

function saveAllNotes(notes: Record<string, string>) {
  const encoded = encodeURIComponent(JSON.stringify(notes));
  // Cookie expires in 1 year
  const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${COOKIE_KEY}=${encoded}; expires=${expires}; path=/; SameSite=Lax`;
}

export function getNote(slug: string): string {
  return getAllNotes()[slug] || "";
}

export function setNote(slug: string, note: string) {
  const notes = getAllNotes();
  if (note.trim()) {
    notes[slug] = note.trim();
  } else {
    delete notes[slug];
  }
  saveAllNotes(notes);
}
