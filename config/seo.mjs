import { isPublicCatalogBook } from "./catalog-policy.mjs";

export const SITE_ORIGIN = "https://fickledragon.com";
export const SITE_NAME = "Fickle Dragon Publishing";
export const ORGANIZATION_NAME = "Fickle Dragon Publishing LLC";
export const DEFAULT_DESCRIPTION =
  "Independent science fiction, fantasy, and mysteries from Jamie McFarlane and Mac Worden.";

export const DEFAULT_SOCIAL_IMAGE = Object.freeze({
  url: "/images/brand/fickle-dragon-mark-color.png",
  width: 1254,
  height: 1254,
  alt: "Fickle Dragon Publishing dragon mark",
});

export const STATIC_PAGE_SEO = Object.freeze({
  home: Object.freeze({
    path: "/",
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    changeFrequency: "monthly",
    priority: 1,
  }),
  about: Object.freeze({
    path: "/about",
    title: "About",
    description:
      "Meet Fickle Dragon Publishing, an independent press for science fiction, fantasy, and mystery readers.",
    changeFrequency: "yearly",
    priority: 0.7,
  }),
  contact: Object.freeze({
    path: "/contact",
    title: "Contact",
    description:
      "Contact Fickle Dragon Publishing about books, rights, review copies, media, or website questions.",
    changeFrequency: "yearly",
    priority: 0.6,
  }),
  rights: Object.freeze({
    path: "/rights",
    title: "Rights & Trade",
    description:
      "Bookseller, library, reviewer, media, and rights information from Fickle Dragon Publishing.",
    changeFrequency: "yearly",
    priority: 0.6,
  }),
  privacy: Object.freeze({
    path: "/privacy",
    title: "Privacy",
    description:
      "How Fickle Dragon Publishing handles website visits, email inquiries, and external links.",
    changeFrequency: "yearly",
    priority: 0.4,
  }),
});

export function isIndexingEnabled(value = process.env.SITE_INDEXING_ENABLED) {
  return value === "true";
}

export function absoluteUrl(pathname) {
  return new URL(pathname, SITE_ORIGIN).toString();
}

export function buildRobots(indexingEnabled = isIndexingEnabled()) {
  if (!indexingEnabled) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}

function validDate(value) {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.valueOf()) ? undefined : date;
}

/**
 * @typedef {object} SitemapBook
 * @property {string} slug
 * @property {string} [status]
 * @property {string} [$updatedAt]
 * @property {{ slug?: string, name?: string }} [series_id]
 */

/**
 * @param {{ indexingEnabled?: boolean, books?: SitemapBook[] }} [options]
 */
export function buildSitemap({
  indexingEnabled = isIndexingEnabled(),
  books = [],
} = {}) {
  if (!indexingEnabled) return [];

  const staticEntries = Object.values(STATIC_PAGE_SEO).map((page) => ({
    url: absoluteUrl(page.path),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  const bookEntries = books
    .filter(
      (book) =>
        isPublicCatalogBook(book) &&
        typeof book.slug === "string" &&
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(book.slug),
    )
    .sort((a, b) => a.slug.localeCompare(b.slug))
    .map((book) => ({
      url: absoluteUrl(`/books/${book.slug}`),
      lastModified: validDate(book.$updatedAt),
      changeFrequency: "monthly",
      priority: book.status === "coming_soon" ? 0.7 : 0.8,
    }));

  return [...staticEntries, ...bookEntries];
}

export function serializeJsonLd(value) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
