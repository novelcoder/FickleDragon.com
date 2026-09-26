# Appwrite catalog audit

Audit date: September 25, 2026

This document records the catalog state used for GitHub issue #6. It is a
dated implementation snapshot, not a substitute for reading the live schema.

## Connection

- Endpoint: `https://sfo.cloud.appwrite.io/v1`
- Project: `6a0b4638002a71c2b8ec`
- Database: `6a0b628900008b8506e3`
- Runtime access: server-only `CATALOG_API_KEY` with `rows.read` scope

The browser never receives the catalog key. The site loads public catalog rows
through the Appwrite TablesDB REST API in a Next.js Server Component.

## Audited catalog

- 60 book rows
- 53 `published`
- 7 `coming_soon`
- 14 series rows
- 5 site rows

All 60 audited books have a title, slug, series relationship, blurb, cover URL,
and at least one author relationship. Four currently lack a store URL.

Only `published` and `coming_soon` books are eligible for public book pages.
Space Troopers is additionally excluded because it was published by another
publisher. Any later private status remains unavailable even if its slug is
requested. No other outside-publisher series is expected in the public set.

## Author schema added during issue #6

The `authors` table contains:

- required `name` varchar
- required `slug` varchar with a unique index
- optional `canonical_url` URL
- two-way `books` relationship

The `books` table contains a two-way, many-to-many `authors` relationship.
Deletion is restricted while related books exist.

Initial author rows and verified relationship counts:

| Author | Row ID | Related books |
| --- | --- | ---: |
| Jamie McFarlane | `jamie-mcfarlane` | 54 |
| Mac Worden | `mac-worden` | 6 |
| Rachel Aukes | `rachel-aukes` | 3 |

Three Space Troopers books are related to both Jamie McFarlane and Rachel
Aukes. The relationship audit found no unassigned or incorrectly assigned book
rows. Those three books remain in the shared catalog but are deliberately
excluded from the Fickle Dragon website.

## Public book route

The canonical route is `/books/[slug]`. Matching ignores case and punctuation,
including alternate hyphenation, but non-canonical requests permanently
redirect to the lowercase, single-hyphen slug stored in Appwrite.

Book pages show factual catalog metadata, cover art, author relationships,
series position, release information, retailer links, and Book JSON-LD. They
are publisher records; richer author- and series-oriented reading experiences
remain on the author sites.
