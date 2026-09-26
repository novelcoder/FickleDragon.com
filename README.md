# Fickle Dragon Publishing

This repository is the authoritative code and project home for the future
Fickle Dragon Publishing website at `fickledragon.com`.

The site is currently in planning and non-production development. The existing
WordPress site remains live and unchanged until the migration, redirect,
rollback, and launch work is complete and explicitly approved. This repository
is for the publisher site; Jamie McFarlane and Mac Worden remain distinct
reader-facing author brands.

The authoritative local checkout is:

```text
~/Projects/fickledragon.com
```

## Local development

The non-production homepage prototype uses Next.js, React, and TypeScript.

```bash
npm install
npm run dev
```

Open `http://localhost:3000` to review it locally. Before opening a pull request,
run:

```bash
npm run lint
npm run build
```

Book pages are served from `/books/[slug]` and load the shared Appwrite catalog
on the server. Copy `.env.example` to `.env.local` and provide a server-only
`CATALOG_API_KEY` with `rows.read` access. Do not expose this key through a
`NEXT_PUBLIC_` variable.

Indexing is separately controlled by the server-only `SITE_INDEXING_ENABLED`
variable. Leave it false or unset for local, preview, and staging deployments.
Set it to the exact value `true` only for the approved production deployment;
otherwise pages, `robots.txt`, and `sitemap.xml` remain non-indexable.

Optional analytics uses the existing Fickle Dragon GA4 property. Set the
server-only `GA4_MEASUREMENT_ID` to `G-SS2ZB4J95T` in an environment where
analytics is intentionally enabled. Missing or malformed values disable both
the Google tag and the consent interface. The browser receives the validated
ID through the root layout; it is not configured with a `NEXT_PUBLIC_`
variable.

The site uses first-party basic consent mode: it does not load Google code or
send Analytics requests until a visitor selects **Allow analytics**. Consent
and GA cookies have a six-month maximum. Page views are sent manually with
automatic page views disabled so Next.js navigation records one event per URL.
Keep the GA4 web stream's Enhanced Measurement option **Page changes based on
browser history events** disabled; Google documents that this provider-side
option can independently emit history page views even when
`send_page_view: false`, which would duplicate the application events.

The homepage began as the local issue #1 prototype. Issue #6 connects its book
routes to the shared Appwrite catalog; deployment environments must provide the
same server-only catalog variable before those routes can run.

`WORDPRESS_SERIES_AND_BOOK_INVENTORY.md` is a dated factual inventory of the
legacy site's published series and book pages. It is migration reference
material, not a complete bibliography and not an instruction to change the live
WordPress site.

## Project plan

GitHub issues are the authoritative plan. Work follows dependency order rather
than issue-number order:

1. [#4 Bootstrap the repository and import the current project plans](https://github.com/novelcoder/FickleDragon.com/issues/4)
2. [#1 Create a non-production code-first MVP with the intended homepage aesthetic](https://github.com/novelcoder/FickleDragon.com/issues/1)
3. [#5 Define the holistic site design, content disposition, routes, and blog strategy](https://github.com/novelcoder/FickleDragon.com/issues/5)
4. [#3 Create the Appwrite Site and stage custom domains without DNS cutover](https://github.com/novelcoder/FickleDragon.com/issues/3)
5. [#6 Audit Appwrite, prove one publisher record, and define the publishing workflow](https://github.com/novelcoder/FickleDragon.com/issues/6)
6. [#12 Track deferred master-plan scope not covered by implementation issues](https://github.com/novelcoder/FickleDragon.com/issues/12)
7. [#7 Create the publisher business, contact, and policy pages](https://github.com/novelcoder/FickleDragon.com/issues/7)
8. [#8 Implement metadata, structured data, canonicals, sitemap, and indexability rules](https://github.com/novelcoder/FickleDragon.com/issues/8)
9. [#2 Add and test legacy redirects in the non-production site](https://github.com/novelcoder/FickleDragon.com/issues/2)
10. [#9 Prepare the production cutover and rollback runbook without executing it](https://github.com/novelcoder/FickleDragon.com/issues/9)
11. [#10 Execute the approved DNS cutover and launch the Appwrite site](https://github.com/novelcoder/FickleDragon.com/issues/10)
12. [#11 Monitor the launch and retire or archive WordPress only after stabilization](https://github.com/novelcoder/FickleDragon.com/issues/11)

Issue #12 is a deferred-scope umbrella. Its contents should be promoted into
focused implementation issues only when they become necessary for launch.

## Workflow

- Associate work with a GitHub issue before creating a branch.
- Use pull requests for changes to `main`.
- Keep all work non-production unless a later issue explicitly authorizes a
  production action.
- Do not alter WordPress, Appwrite, hosting, DNS, or public URLs as part of
  repository bootstrap work.
