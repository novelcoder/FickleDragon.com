export const PUBLIC_BOOK_STATUSES = new Set(["published", "coming_soon"]);

const EXCLUDED_PUBLIC_SERIES = new Set(["space-troopers"]);

function normalizedSeriesSlug(series) {
  if (!series) return "";
  if (typeof series.slug === "string" && series.slug.trim()) {
    return series.slug.trim().toLowerCase();
  }

  return String(series.name ?? "")
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function isPublicCatalogBook(book) {
  return (
    PUBLIC_BOOK_STATUSES.has(book.status ?? "") &&
    !EXCLUDED_PUBLIC_SERIES.has(normalizedSeriesSlug(book.series_id))
  );
}
