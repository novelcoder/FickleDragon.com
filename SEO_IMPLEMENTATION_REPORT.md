# SEO and indexability implementation

This document records the repository behavior implemented for GitHub issue #8.
It does not authorize a production deployment, DNS change, Search Console
submission, or WordPress retirement.

## Canonical publishing policy

- The canonical origin is `https://fickledragon.com` without `www`.
- Current canonical static routes are `/`, `/about`, `/contact`, `/rights`, and
  `/privacy`.
- Public book records use `/books/[stored-slug]`. Recognized case, punctuation,
  and hyphen variants permanently redirect to the stored canonical slug.
- Redirect sources, query-string variants, drafts, and the not-yet-implemented
  `/catalog` route are not sitemap entries.
- Only `published` and `coming_soon` catalog records are public.
- Space Troopers remains in the shared Appwrite catalog but is excluded from
  this website because it was published by another publisher. That exclusion
  applies at the shared public-catalog boundary, so it covers direct book
  routes, metadata, structured data, and the sitemap.

## Metadata and structured data

Static page titles, descriptions, canonical paths, social titles, and sitemap
settings are reviewable in `config/seo.mjs`. The shared brand image is the
default social image; book pages use their authoritative cover when present.
Open Graph metadata supports ordinary link previews. Twitter/X-specific card
metadata is intentionally omitted.

The root layout emits an `Organization` record for Fickle Dragon Publishing
LLC. Public book pages emit sanitized `Book` JSON-LD from the same Appwrite row
used for visible content. Current verified fields cover title, URL, cover,
description, publication date, authors, series, series position, Kindle ASIN,
and publisher. JSON-LD serialization escapes `<` to prevent a catalog string
from closing the script element.

The present shared catalog does not expose verified edition, format, ISBN,
imprint, or language fields through this application's audited model. Those
properties are deliberately omitted rather than inferred. They can be added
when the catalog supplies authoritative values and the page displays them.

## Production and non-production behavior

Indexing is intentionally opt-in through the server-side
`SITE_INDEXING_ENABLED` environment variable.

- Missing, empty, or any value other than the exact string `true`: pages emit
  `noindex, nofollow`, `robots.txt` disallows all crawling, and `sitemap.xml`
  is empty.
- Exact value `true`: pages emit index/follow directives, `robots.txt` allows
  crawling and identifies the canonical sitemap, and the sitemap loads current
  eligible books from Appwrite.

Local, preview, and Appwrite staging deployments must keep the setting false.
The production deployment should set it true only as part of the approved
launch work, when `fickledragon.com` serves this application.

## Verification

`npm test` covers the opt-in indexing rule, production and non-production
robots behavior, sitemap inclusion and exclusion, Space Troopers exclusion,
and safe JSON-LD serialization. `npm run build` verifies the Next.js metadata
routes and initial server-rendered output. A local source smoke test should
confirm titles, descriptions, canonicals, robots directives, Open Graph and
Organization JSON-LD on the static pages, and the absence of Twitter/X tags.

Production sitemap verification requires the deployment's server-only
`CATALOG_API_KEY`; the key is intentionally unavailable to browser code and is
not stored in this repository.
