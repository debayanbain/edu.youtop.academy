/**
 * Returns the URL only if it is a safe http(s) link, else undefined.
 *
 * Scraped/third-party data flows into `href` attributes on the results and job
 * pages. Without this guard a value like `javascript:alert(1)` or a `data:` URL
 * could execute when clicked (XSS). Anchors should render only when this
 * returns a value.
 */
export function safeHref(url?: string | null): string | undefined {
  if (!url) return undefined;
  const trimmed = url.trim();
  try {
    // Base handles protocol-relative/relative inputs; we only accept http(s).
    const parsed = new URL(trimmed, "https://youtop.local");
    if (parsed.protocol === "http:" || parsed.protocol === "https:") {
      return trimmed;
    }
  } catch {
    /* malformed URL -> treat as unsafe */
  }
  return undefined;
}
