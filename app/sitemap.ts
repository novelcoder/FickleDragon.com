import type { MetadataRoute } from "next";
import { buildSitemap, isIndexingEnabled } from "@/config/seo.mjs";
import { getPublicBooks } from "@/lib/catalog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const indexingEnabled = isIndexingEnabled();
  const books = indexingEnabled ? await getPublicBooks() : [];

  return buildSitemap({ indexingEnabled, books }) as MetadataRoute.Sitemap;
}
