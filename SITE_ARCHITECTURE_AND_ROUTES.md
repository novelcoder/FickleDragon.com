# Fickle Dragon Site Architecture and Routes

Status: approved direction for issue #5, with the remaining decisions called out
explicitly below.

This document defines the intended role, content ownership, routes, navigation,
catalog behavior, and legacy-content disposition for the Fickle Dragon
Publishing website. It is an implementation brief, not authorization to change
the live WordPress site, public DNS, or production traffic.

## Site role

Fickle Dragon is the publisher website. It should provide a credible company
presence, a complete factual book catalog, and clear pathways to the distinct
Jamie McFarlane and Mac Worden reader-facing sites.

The publisher site is not an author blog or newsletter destination. Author
voice, release posts, newsletters, and continuing editorial content belong on
the author sites.

## Primary journeys

- Readers can search or browse the complete catalog and open a full factual
  page for any publicly known book.
- Readers can continue to the appropriate author site for richer series and
  author experiences.
- Booksellers, librarians, reviewers, media contacts, and rights contacts can
  quickly find company information and a public contact address.
- Search engines can discover stable publisher book records without indexing
  arbitrary search and filter combinations.

## Approved routes

| Route | Purpose |
| --- | --- |
| `/` | Publisher homepage and pathways to the catalog and author sites. |
| `/catalog` | Searchable, filterable catalog with compact book results. |
| `/books/[slug]` | Full factual publisher record for one book. |
| `/about` | Fickle Dragon Publishing company information. |
| `/contact` | Public contact information and inquiry guidance. |
| `/rights` | Rights, bookseller, library, reviewer, and media information. |
| `/privacy` | Privacy, analytics, and cookie disclosures that match actual site behavior. |

There will be no Fickle Dragon `/news` or `/blog` route. There will initially
be no internal author or series page. Authors and series are catalog filters;
the rich reader-facing destinations remain on the appropriate author sites.

## Navigation

Primary navigation should remain concise:

- Catalog
- About
- Contact

Rights and Privacy belong in the footer. The homepage author pathways continue
to link directly to the Jamie McFarlane and Mac Worden sites.

The current homepage News and Releases section should be replaced with a
compact invitation for booksellers, librarians, reviewers, media contacts, and
rights inquiries, linking to `/rights` and `/contact`.

## Catalog scope

The catalog should include every publicly known Fickle Dragon-published book
associated with Jamie McFarlane or Mac Worden for which authoritative metadata
is available. This includes historical, unavailable, and out-of-print titles.
Space Troopers remains in the shared catalog but is excluded from this website
because it was published by another publisher. Publisher, imprint,
availability, and authorship must be represented accurately.

Published and publicly announced forthcoming books may be visible. Private
drafts, unannounced projects, and incomplete internal records must not be
published merely because they exist in the shared catalog.

Unavailable and out-of-print books remain visible with an accurate status and
without a misleading purchase action.

## Catalog search and results

`/catalog` should support:

- text search across title, author, series, and approved descriptive fields;
- author filtering;
- series filtering;
- genre filtering;
- format filtering; and
- availability filtering.

The default order is series name followed by series position. Standalone books
and books without a numbered position should have a deterministic fallback,
ordered by title.

Every result or other book list uses a compact treatment:

- cover thumbnail;
- title;
- author;
- series name and position when applicable;
- one- or two-sentence short description; and
- availability or forthcoming status when useful.

Long descriptions do not belong in catalog grids, homepage rails, related-book
lists, or search results.

## Full book pages

Each `/books/[slug]` page should begin with these fields when applicable:

- cover;
- title and subtitle;
- author or authors;
- series and series position;
- full description;
- publication date;
- publisher or imprint;
- availability status;
- formats and editions;
- ISBN, ASIN, or other verified identifiers;
- retailer or purchase links; and
- the appropriate author-site or series destination.

Book pages are stable, directly addressable records. They must not be reachable
only by submitting a catalog search.

## URLs and canonical behavior

The canonical form is lowercase with single hyphens, for example:

```text
/books/boltguns-and-duct-tape
```

Inbound book URLs should tolerate case differences and reasonable separator or
hyphen variations. The server should normalize a recognized variant and issue
a permanent redirect to the one stored canonical slug. It must not create
multiple indexable versions of the same book page.

Each published publisher book record is self-canonical. The page links to the
appropriate author site for the richer reader experience; that outbound link
does not make the publisher record a duplicate author page.

Individual public book pages are eligible for the sitemap and indexing.
Arbitrary query and filter combinations under `/catalog` should not become
independent indexed pages; they should resolve their canonical relationship to
the base catalog route unless a later SEO decision deliberately promotes a
specific browse page.

## Author and series ownership

Fickle Dragon does not initially maintain full internal author profiles or
series landing pages.

- Author names link to or clearly identify the appropriate author site.
- Series act as catalog relationships and filters.
- Rich series descriptions, lore, reading experiences, and author news belong
  on the author sites.
- Fickle Dragon book pages remain factual publisher records rather than copies
  of author marketing pages.

## Blog and legacy posts

Fickle Dragon will not operate an ongoing blog or news archive. Legacy
WordPress posts are intended to migrate to `jamiemcfarlane.com`; their old URLs
should redirect directly to the migrated post URLs after migration.

Legacy WordPress categories and tags are migration metadata, not Fickle Dragon
routes. Recreate them on the Jamie site only when they remain useful there.
Avoid redirecting unrelated posts to a generic homepage.

## Business pages and contact

The initial public contact address is:

```text
jamie@fickledragon.com
```

The Contact page may provide topic guidance for general, rights and licensing,
bookseller or library, reviewer or media, and website or order inquiries. A
production submission form is not required for the initial implementation.

The Rights page should provide a concise invitation for booksellers,
librarians, reviewers, media contacts, and rights inquiries without publishing
private addresses, internal contacts, or unapproved business information.

No public downloads are required for the initial site. Catalog PDFs, rights
guides, sell sheets, and press kits should be added only when there is a real
maintenance owner and business need.

## Analytics and privacy

The site will use analytics. The Privacy page and any consent mechanism must be
written for the analytics provider and site behavior actually implemented.
Advertising pixels, embedded media, forms, or other cookie-setting services
must not be implied or omitted; the policy and consent behavior must be updated
when those capabilities are introduced.

## Legacy disposition rules

The full WordPress surface still needs an item-level disposition matrix, using
these approved defaults:

| Legacy content | Default destination |
| --- | --- |
| Book page | Matching Fickle Dragon `/books/[slug]` record or a documented exception. |
| Series page | Appropriate author-site series page. |
| Blog, news, or newsletter post | Migrated Jamie McFarlane post. |
| Author biography or author-specific content | Appropriate author site. |
| Publisher company information | Matching Fickle Dragon business page. |
| Contact content | Fickle Dragon `/contact` or the appropriate author contact destination. |
| Privacy or policy content | Replace with policy matching the new site's actual behavior. |
| Media or attachment | Migrate only when required by retained content or a documented business need. |
| Duplicate, obsolete, or incomplete content | Archive or retire deliberately; do not invent a destination. |

Every retained legacy URL should ultimately have one recorded outcome: migrate,
redirect, archive, retain temporarily, or intentionally remove.

## Remaining decisions

The architecture is sufficiently defined for route and catalog planning. These
details remain to be resolved by their implementation work:

- select the analytics provider and consent behavior;
- approve final company, About, Rights, Contact, and Privacy copy;
- confirm the public author-site destinations for every author and series;
- define the authoritative catalog fields and controlled filter values from
  the live Appwrite schema audit;
- complete the item-level WordPress content and redirect matrix; and
- decide the appropriate HTTP outcome for retired legacy URLs that have no
  replacement.

## Implementation boundaries

- Issue #3 owns Appwrite Site configuration and non-production domain staging.
- Issue #6 owns the live Appwrite schema audit, one end-to-end publisher book
  record, and the catalog publishing workflow.
- Issue #7 owns implementation of About, Contact, Rights, and Privacy.
- Issue #8 owns final metadata, structured data, sitemap, canonical, robots,
  and indexability implementation.
- Issue #2 owns legacy redirects after the disposition matrix is approved.
- No decision in this document authorizes production DNS changes, WordPress
  retirement, or public cutover.
