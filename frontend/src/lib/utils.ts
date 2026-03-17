export function extractSlug(input: string): string {
  const trimmed = input.trim();

  // If it looks like a URL, extract the slug from /problems/{slug}/
  const urlMatch = trimmed.match(/\/problems\/([a-z0-9-]+)/);
  if (urlMatch) {
    return urlMatch[1];
  }

  // Otherwise treat the whole input as a slug
  return trimmed.toLowerCase().replace(/\s+/g, "-");
}
