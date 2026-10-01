import assert from "node:assert/strict";
import test from "node:test";

import { isPublicCatalogBook } from "../config/catalog-policy.mjs";
import {
  SITE_ORIGIN,
  STATIC_PAGE_SEO,
  buildRobots,
  buildSitemap,
  isIndexingEnabled,
  serializeJsonLd,
} from "../config/seo.mjs";

test("the canonical origin is the public www host", () => {
  assert.equal(SITE_ORIGIN, "https://www.fickledragon.com");
});

test("indexing is opt-in and requires the exact true value", () => {
  assert.equal(isIndexingEnabled(undefined), false);
  assert.equal(isIndexingEnabled("false"), false);
  assert.equal(isIndexingEnabled("TRUE"), false);
  assert.equal(isIndexingEnabled("true"), true);
});

test("non-production robots and sitemap expose no indexable routes", () => {
  assert.deepEqual(buildRobots(false), {
    rules: { userAgent: "*", disallow: "/" },
  });
  assert.deepEqual(
    buildSitemap({
      indexingEnabled: false,
      books: [{ slug: "public-book", status: "published" }],
    }),
    [],
  );
});

test("production robots allow the site and identify its canonical sitemap", () => {
  assert.deepEqual(buildRobots(true), {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_ORIGIN}/sitemap.xml`,
  });
});

test("the public catalog excludes private states and author-owned titles", () => {
  assert.equal(
    isPublicCatalogBook({
      status: "published",
      series_id: { slug: "fickle-dragon-series", name: "Fickle Dragon Series" },
    }),
    true,
  );
  assert.equal(
    isPublicCatalogBook({
      status: "coming_soon",
      series_id: { slug: "space-troopers", name: "Space Troopers" },
    }),
    false,
  );
  assert.equal(
    isPublicCatalogBook({
      status: "published",
      series_id: { name: "Space Troopers" },
    }),
    false,
  );
  assert.equal(
    isPublicCatalogBook({
      slug: "flying-saucers-and-chrome-plate",
      status: "published",
      series_id: { slug: "spaceship-mechanic" },
    }),
    false,
  );
  assert.equal(
    isPublicCatalogBook({
      status: "draft",
      series_id: { slug: "fickle-dragon-series" },
    }),
    false,
  );
});

test("the production sitemap contains canonical static pages and eligible books only", () => {
  const sitemap = buildSitemap({
    indexingEnabled: true,
    books: [
      {
        slug: "published-book",
        status: "published",
        $updatedAt: "2026-09-25T12:00:00.000Z",
        series_id: { slug: "owned-series" },
      },
      {
        slug: "forthcoming-book",
        status: "coming_soon",
        series_id: { slug: "owned-series" },
      },
      {
        slug: "flying-saucers-and-chrome-plate",
        status: "published",
        series_id: { slug: "spaceship-mechanic" },
      },
      {
        slug: "space-troopers-one",
        status: "published",
        series_id: { slug: "space-troopers", name: "Space Troopers" },
      },
      {
        slug: "private-draft",
        status: "draft",
        series_id: { slug: "owned-series" },
      },
      {
        slug: "Not-Canonical",
        status: "published",
        series_id: { slug: "owned-series" },
      },
    ],
  });

  const urls = sitemap.map(({ url }) => url);
  const expectedStaticUrls = Object.values(STATIC_PAGE_SEO).map(
    ({ path }) => new URL(path, SITE_ORIGIN).toString(),
  );

  assert.deepEqual(urls.slice(0, expectedStaticUrls.length), expectedStaticUrls);
  assert.deepEqual(urls.slice(expectedStaticUrls.length), [
    `${SITE_ORIGIN}/books/forthcoming-book`,
    `${SITE_ORIGIN}/books/published-book`,
  ]);
  assert.ok(!urls.includes(`${SITE_ORIGIN}/catalog`));
  assert.ok(!urls.some((url) => url.includes("flying-saucers-and-chrome-plate")));
  assert.ok(!urls.some((url) => url.includes("space-troopers")));
});

test("JSON-LD serialization neutralizes script-closing markup", () => {
  const serialized = serializeJsonLd({ description: "</script><script>alert(1)</script>" });

  assert.ok(!serialized.includes("<"));
  assert.match(serialized, /\\u003c\/script>/);
});
