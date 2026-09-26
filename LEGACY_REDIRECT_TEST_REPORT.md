# Legacy Redirect Test Report

Snapshot date: September 25, 2026

This report covers the approved redirect batches for issue #2. It is
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

## Book redirect batch

| Legacy source | Approved destination | Local result | Destination result |
| --- | --- | ---: | ---: |
| `/junkyard-pirate` | `/books/junkyard-pirate` | 308 | 2xx |
| `/junkyard-pirate-2` | `/books/junkyard-pirate` | 308 | 2xx |
| `/old-dogs` | `/books/old-dogs-older-tricks` | 308 | 2xx |
| `/junkyard-spaceship` | `/books/junkyard-spaceship` | 308 | 2xx |
| `/junkyard-veterans` | `/books/junkyard-veterans` | 308 | 2xx |
| `/junkyard-raiders` | `/books/junkyard-raiders` | 308 | 2xx |
| `/junkyard-ghost-ship` | `/books/junkyard-ghost-ship` | 308 | 2xx |
| `/junkyard-commandos` | `/books/junkyard-commandos` | 308 | 2xx |
| `/junkyard-mercenary` | `/books/junkyard-mercenary` | 308 | 2xx |
| `/junkyard-saboteur` | `/books/junkyard-saboteur` | 308 | 2xx |
| `/boltguns-and-ducttape` | `/books/boltguns-and-duct-tape` | 308 | 2xx |
| `/jump-drives-and-coffee-stains` | `/books/jump-drives-and-coffee-stains` | 308 | 2xx |
| `/rayguns-latefees` | `/books/ray-guns-and-late-fees` | 308 | 2xx |
| `/flying-saucers-and-chrome-plate` | `/books/flying-saucers-and-chrome-plate` | 308 | 2xx |
| `/oldest-starfighter` | `/books/oldest-starfighter` | 308 | 2xx |
| `/rogue-commander` | `/books/rogue-commander` | 308 | 2xx |
| `/rookie-privateer` | `/books/rookie-privateer` | 308 | 2xx |
| `/fool-me-once` | `/books/fool-me-once` | 308 | 2xx |
| `/parley` | `/books/parley` | 308 | 2xx |
| `/big-pete` | `/books/big-pete` | 308 | 2xx |
| `/smugglers-dilemma` | `/books/smugglers-dilemma` | 308 | 2xx |
| `/cutpurse` | `/books/cutpurse` | 308 | 2xx |
| `/out-of-the-tank-3` | `/books/out-of-the-tank` | 308 | 2xx |
| `/buccaneers-2` | `/books/buccaneers` | 308 | 2xx |
| `/a-matter-of-honor` | `/books/a-matter-of-honor` | 308 | 2xx |
| `/givenoquarter` | `/books/give-no-quarter` | 308 | 2xx |
| `/blockade-runner` | `/books/blockade-runner` | 308 | 2xx |
| `/corsair-menace` | `/books/corsair-menace` | 308 | 2xx |
| `/pursuit-of-the-bold` | `/books/pursuit-of-the-bold` | 308 | 2xx |
| `/fury-of-the-bold` | `/books/fury-of-the-bold` | 308 | 2xx |
| `/judgment-of-the-bold` | `/books/judgment-of-the-bold` | 308 | 2xx |
| `/privateers-in-exile` | `/books/privateers-in-exile` | 308 | 2xx |
| `/incursion-at-elea-station` | `/books/incursion-at-elea-station` | 308 | 2xx |
| `/freebooters` | `/books/freebooters-hold` | 308 | 2xx |
| `/blackcutlass` | `/books/black-cutlass` | 308 | 2xx |
| `/privateers-supremacy` | `/books/privateers-supremacy` | 308 | 2xx |
| `/brigands-choice` | `/books/brigands-choice` | 308 | 2xx |
| `/hostile-legacy` | `/books/hostile-legacy` | 308 | 2xx |
| `/forsaken-colony` | `/books/forsaken-colony` | 308 | 2xx |
| `/wizard-in-a-witchy-world` | `/books/wizard-in-a-witchy-world` | 308 | 2xx |
| `/wicked-folk` | `/books/wicked-folk` | 308 | 2xx |
| `/wizard-unleashed` | `/books/wizard-unleashed` | 308 | 2xx |
| `/when-justice-calls` | `/books/when-justice-calls` | 308 | 2xx |
| `/deputy-in-the-crosshairs` | `/books/deputy-crosshairs` | 308 | 2xx |
| `/manhunt-at-sage-creek` | `/books/manhunt-sage-creek` | 308 | 2xx |
| `/lesser-prince-2` | `/books/lesser-prince` | 308 | 2xx |
| `/lesser-prince` | `/books/lesser-prince` | 308 | 2xx |
| `/uncommon-bravery` | `/books/uncommon-bravery` | 308 | 2xx |
| `/pale-ship` | `/books/on-a-pale-ship` | 308 | 2xx |
| `/pete-popeye-olive` | `/books/pete-popeye-and-olive` | 308 | 2xx |
| `/grave-consideration-witchy-world` | `/books/grave-consideration` | 308 | 2xx |

## Automated checks

`npm test` verifies that:

- all seven approved series mappings are present and exact;
- all 51 approved book mappings are present and exact;
- every configured redirect is permanent;
- sources are unique and normalized;
- destinations use HTTPS and an approved author-site host;
- book destinations use canonical local `/books/[slug]` routes;
- intentionally excluded legacy paths do not enter the manifest;
- no destination creates a configured chain or loop; and
- the redirect objects passed to Next.js agree with the manifest.

## Local response checks

Run the repeatable HTTP suite with:

```bash
npm run test:redirects:integration
```

The command builds and starts the standalone production server, then checks
every configured mapping with redirect following disabled. It verifies exact
`308` and `Location` values, direct destination success, query-string
preservation, case and trailing-slash variants, and unknown-path `404`
behavior. Author-site destinations are requested directly; publisher book
destinations are requested from the local production server.

The September 25, 2026 run passed all five HTTP test groups: 58 exact source
mappings, 56 unique direct destinations, query-string preservation for all 58
mappings, uppercase and trailing-slash variants for all 58 mappings, and the
unknown-path control. Trailing-slash variants redirect directly to the final
destination without an intermediate normalization hop.

Public HTTP/HTTPS and `www`/non-`www` behavior cannot be fully exercised until
the separately approved cutover configuration exists.

## Unresolved legacy URLs

No unresolved page or book URL remains in issue #2. Legacy blog and newsletter
post URLs remain pending outside this issue: `jamiemcfarlane.com` issue #44 owns
their inventory, migrated destinations, and approved source-to-destination
mapping. Fickle Dragon redirects for those posts must not be added until that
mapping is supplied.

## Intentionally excluded from issue #2

The following legacy pages have an explicit no-redirect disposition and do not
block completion:

| Legacy source | Disposition | Reason |
| --- | --- | --- |
| `/privateer-tales-the-beginning/` | No redirect | The boxed set has no catalog record. |
| `/belirand-menace/` | No redirect | Its identity and destination are not established. |
| `/books/` | No redirect | The legacy page is empty and `/catalog` does not exist. |
| `/fantasy-books/` | No redirect | No approved catalog destination exists. |
| `/books/privateer-tales/` | No redirect | No destination decision was approved for issue #2. |

Unless another issue assigns them a disposition before launch, these paths
will return the site's normal not-found response after cutover.

Guardians of Gaeland, Tinker/Knight Adventures, and Pale Ship do not have
independent legacy series landing URLs in the current inventory. Their legacy
book URLs are included in the 51-book redirect batch.
