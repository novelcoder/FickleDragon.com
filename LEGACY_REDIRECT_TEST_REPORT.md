# Legacy Redirect Test Report

Snapshot date: September 25, 2026

This report covers the first approved redirect batch for issue #2. It is
non-production preparation only. No WordPress, DNS, Appwrite Site, or public
traffic configuration was changed.

The single source of truth for configured redirects is
`config/legacy-redirects.mjs`.

## Series redirect batch

| Legacy source | Approved destination | Local result | Destination result |
| --- | --- | ---: | ---: |
| `/junkyard-pirate-series` | `https://www.jamiemcfarlane.com/JunkyardPirate` | 308 | 200 |
| `/spaceship-mechanic` | `https://www.jamiemcfarlane.com/SpaceshipMechanic` | 308 | 200 |
| `/oldest-starfighter-series` | `https://www.jamiemcfarlane.com/ScienceFictionAdventures#oldest-starfighter` | 308 | 200 at base page |
| `/privateer-tales-series` | `https://www.jamiemcfarlane.com/PrivateerTales` | 308 | 200 |
| `/afterwar-saga` | `https://www.jamiemcfarlane.com/PrivateerTales#afterwar` | 308 | 200 at base page |
| `/books-witchy-world-series` | `https://www.jamiemcfarlane.com/WitchyWorld` | 308 | 200 |
| `/henry-biggston-thriller-series` | `https://www.macworden.com/HenryBiggston` | 308 | 200 |

## Automated checks

`npm test` verifies that:

- all seven approved mappings are present and exact;
- every configured redirect is permanent;
- sources are unique and normalized;
- destinations use HTTPS and an approved author-site host;
- no destination creates a configured chain or loop; and
- the redirect objects passed to Next.js agree with the manifest.

## Local response checks

The production build was started locally and each source was requested with
redirect following disabled. Every source returned `308` with the approved
`Location` value. A sample `?source=test` query was retained on every
destination, including destinations with fragments, confirming Next.js's
documented query-string preservation behavior.

Trailing-slash requests are normalized by the application before the legacy
redirect is applied. Public HTTP/HTTPS and `www`/non-`www` behavior cannot be
fully exercised until the separately approved cutover configuration exists.

## Unresolved inventory

This batch does not decide or configure individual book pages, posts, media,
attachments, forms, downloads, duplicate pages, or other WordPress URLs.
Those items remain unresolved until reviewed against the WordPress inventory.

Guardians of Gaeland, Tinker/Knight Adventures, and Pale Ship do not have
independent legacy series landing URLs in the current inventory. They therefore
do not receive separate series redirects in this batch; their book and content
URLs still require item-level review.
