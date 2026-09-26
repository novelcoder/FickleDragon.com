import "server-only";
import { isPublicCatalogBook } from "@/config/catalog-policy.mjs";

const APPWRITE_ENDPOINT = "https://sfo.cloud.appwrite.io/v1";
const APPWRITE_PROJECT_ID = "6a0b4638002a71c2b8ec";
const APPWRITE_DATABASE_ID = "6a0b628900008b8506e3";
const BOOKS_TABLE_ID = "books";

export type CatalogAuthor = {
  $id: string;
  name: string;
  slug: string;
  canonical_url?: string;
};

export type CatalogSeries = {
  $id: string;
  name: string;
  slug: string;
};

export type CatalogBook = {
  $id: string;
  $updatedAt?: string;
  title: string;
  slug: string;
  tagline?: string;
  card_description?: string;
  blurb?: string;
  status?: string;
  release_date?: string;
  cover_url?: string;
  cover_alt?: string;
  store_url?: string;
  store_label?: string;
  audible_url?: string;
  kindle_asin?: string;
  series_number?: number;
  series_id?: CatalogSeries;
  authors?: CatalogAuthor[];
};

type AppwriteRowList<T> = {
  total: number;
  rows: T[];
};

function requireApiKey() {
  const apiKey = process.env.CATALOG_API_KEY;

  if (!apiKey) {
    throw new Error("CATALOG_API_KEY is required to load the publishing catalog.");
  }

  return apiKey;
}

function query(method: string, values: Array<string | number>) {
  return `queries[]=${encodeURIComponent(JSON.stringify({ method, values }))}`;
}

export async function getPublicBooks() {
  const books: CatalogBook[] = [];
  const pageSize = 100;
  let total = pageSize;

  while (books.length < total) {
    const queries = [
      query("limit", [pageSize]),
      query("offset", [books.length]),
      query("select", ["*", "series_id.*", "authors.*"]),
    ].join("&");
    const response = await fetch(
      `${APPWRITE_ENDPOINT}/tablesdb/${APPWRITE_DATABASE_ID}/tables/${BOOKS_TABLE_ID}/rows?${queries}`,
      {
        headers: {
          "X-Appwrite-Key": requireApiKey(),
          "X-Appwrite-Project": APPWRITE_PROJECT_ID,
        },
        next: { revalidate: 300 },
      },
    );

    if (!response.ok) {
      throw new Error(`Catalog request failed with status ${response.status}.`);
    }

    const result = (await response.json()) as AppwriteRowList<CatalogBook>;
    books.push(...result.rows);
    total = result.total;

    if (result.rows.length === 0 && books.length < total) {
      throw new Error("Catalog pagination stopped before all books were loaded.");
    }
  }

  return books.filter(isPublicCatalogBook);
}

export function slugLookupKey(value: string) {
  return value.normalize("NFKD").toLowerCase().replace(/[^a-z0-9]/g, "");
}

export async function findPublicBookBySlug(requestedSlug: string) {
  const lookupKey = slugLookupKey(requestedSlug);
  const books = await getPublicBooks();
  const matches = books.filter((book) => slugLookupKey(book.slug) === lookupKey);

  if (matches.length > 1) {
    throw new Error(`Ambiguous catalog slug: ${requestedSlug}`);
  }

  return matches[0] ?? null;
}
