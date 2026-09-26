# Legacy Redirect Test Report

Snapshot date: September 26, 2026

This report covers the approved redirect batches for issues #2 and #17. It is
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

## Blog and newsletter redirect batch

All 156 published legacy posts in the live migration catalog have a direct canonical Jamie McFarlane destination. Each local source and trailing-slash variant returns a permanent redirect; the destination checks below were performed against the live Jamie site.

The legacy feed also redirects directly:

| Legacy source | Canonical destination | Local result | Destination result |
| --- | --- | ---: | ---: |
| `/feed` | `https://www.jamiemcfarlane.com/feed` | 308 | 200 |

| Legacy source | Canonical destination | Local result | Destination result |
| --- | --- | ---: | ---: |
| `/2014/03/12/a-new-brand` | `https://www.jamiemcfarlane.com/news/a-new-brand` | 308 | 200 |
| `/2014/03/12/the-hard-life-of-a-graphic-artist` | `https://www.jamiemcfarlane.com/news/the-hard-life-of-a-graphic-artist` | 308 | 200 |
| `/2014/03/14/cover-artist-selected` | `https://www.jamiemcfarlane.com/news/cover-artist-selected` | 308 | 200 |
| `/2014/03/14/rookie-privateer-summary` | `https://www.jamiemcfarlane.com/news/rookie-privateer-summary` | 308 | 200 |
| `/2014/03/21/second-book-20-written` | `https://www.jamiemcfarlane.com/news/second-book-20-written` | 308 | 200 |
| `/2014/03/23/wringing-wet-washcloth-in-space` | `https://www.jamiemcfarlane.com/news/wringing-wet-washcloth-in-space` | 308 | 200 |
| `/2014/03/26/waiting-for-readers-to-finish` | `https://www.jamiemcfarlane.com/news/waiting-for-readers-to-finish` | 308 | 200 |
| `/2014/04/01/cover-artwork` | `https://www.jamiemcfarlane.com/news/cover-artwork` | 308 | 200 |
| `/2014/04/02/naughty-is-hard-to-forget` | `https://www.jamiemcfarlane.com/news/naughty-is-hard-to-forget` | 308 | 200 |
| `/2014/04/04/rookie-privateer-final-editing` | `https://www.jamiemcfarlane.com/news/rookie-privateer-final-editing` | 308 | 200 |
| `/2014/04/05/fiction-work-classifications-by-word-count` | `https://www.jamiemcfarlane.com/news/fiction-work-classifications-by-word-count` | 308 | 200 |
| `/2014/04/08/rookie-privateer` | `https://www.jamiemcfarlane.com/news/rookie-privateer` | 308 | 200 |
| `/2014/04/13/rookie-privateer-back-to-my-editor` | `https://www.jamiemcfarlane.com/news/rookie-privateer-back-to-my-editor` | 308 | 200 |
| `/2014/04/20/rookie-privateer-now-available` | `https://www.jamiemcfarlane.com/news/rookie-privateer-now-available` | 308 | 200 |
| `/2014/04/21/wrapping-up-rookie-privateer` | `https://www.jamiemcfarlane.com/news/wrapping-up-rookie-privateer` | 308 | 200 |
| `/2014/04/22/sterras-gift-ship-layout-rookie-privateer` | `https://www.jamiemcfarlane.com/news/sterras-gift-ship-layout-rookie-privateer` | 308 | 200 |
| `/2014/04/24/privateer-tales-1-5-deleting-2-chapters` | `https://www.jamiemcfarlane.com/news/privateer-tales-1-5-deleting-2-chapters` | 308 | 200 |
| `/2014/04/26/rookie-privateer-paperbacks` | `https://www.jamiemcfarlane.com/news/rookie-privateer-paperbacks` | 308 | 200 |
| `/2014/04/27/ratings-and-reviews` | `https://www.jamiemcfarlane.com/news/ratings-and-reviews` | 308 | 200 |
| `/2014/04/30/rookie-privateer-swag` | `https://www.jamiemcfarlane.com/news/rookie-privateer-swag` | 308 | 200 |
| `/2014/05/02/free-paperback-giveaway-on-goodreads-may-2014` | `https://www.jamiemcfarlane.com/news/free-paperback-giveaway-on-goodreads-may-2014` | 308 | 200 |
| `/2014/05/04/privateer-tales-insider-information` | `https://www.jamiemcfarlane.com/news/privateer-tales-insider-information` | 308 | 200 |
| `/2014/05/07/privateer-tales-1-5-last-chapter-and-title` | `https://www.jamiemcfarlane.com/news/privateer-tales-1-5-last-chapter-and-title` | 308 | 200 |
| `/2014/05/09/rookie-privateer-weekend-read-off` | `https://www.jamiemcfarlane.com/news/rookie-privateer-weekend-read-off` | 308 | 200 |
| `/2014/05/11/title-chosen-fool-me-once-privateer-tales-series-1-5` | `https://www.jamiemcfarlane.com/news/title-chosen-fool-me-once-privateer-tales-series-1-5` | 308 | 200 |
| `/2014/05/13/words-of-encouragement` | `https://www.jamiemcfarlane.com/news/words-of-encouragement` | 308 | 200 |
| `/2014/05/16/fool-me-once-privateer-tales-2-off-to-beta-readers` | `https://www.jamiemcfarlane.com/news/fool-me-once-privateer-tales-2-off-to-beta-readers` | 308 | 200 |
| `/2014/05/20/looking-for-that-sweet-spot-as-a-writer` | `https://www.jamiemcfarlane.com/news/looking-for-that-sweet-spot-as-a-writer` | 308 | 200 |
| `/2014/05/22/freebooksy-readers-welcome-rookie-privateer-giveaway` | `https://www.jamiemcfarlane.com/news/freebooksy-readers-welcome-rookie-privateer-giveaway` | 308 | 200 |
| `/2014/05/24/fool-me-once-2-and-parley3-progress` | `https://www.jamiemcfarlane.com/news/fool-me-once-2-and-parley3-progress` | 308 | 200 |
| `/2014/05/25/sterras-gift-artwork-commissioned` | `https://www.jamiemcfarlane.com/news/sterras-gift-artwork-commissioned` | 308 | 200 |
| `/2014/05/26/fool-me-once-beta-readers-complete` | `https://www.jamiemcfarlane.com/news/fool-me-once-beta-readers-complete` | 308 | 200 |
| `/2014/05/28/drilling-in-on-sterras-gift-drawing` | `https://www.jamiemcfarlane.com/news/drilling-in-on-sterras-gift-drawing` | 308 | 200 |
| `/2014/05/30/sterras-gift-drawing-completed` | `https://www.jamiemcfarlane.com/news/sterras-gift-drawing-completed` | 308 | 200 |
| `/2014/06/01/fool-me-once-privateer-tales-2-book-released` | `https://www.jamiemcfarlane.com/news/fool-me-once-privateer-tales-2-book-released` | 308 | 200 |
| `/2014/06/03/map-of-puskar-stellar-mars` | `https://www.jamiemcfarlane.com/news/map-of-puskar-stellar-mars` | 308 | 200 |
| `/2014/06/07/rookie-privateer-fool-me-once-goodreads-giveaway` | `https://www.jamiemcfarlane.com/news/rookie-privateer-fool-me-once-goodreads-giveaway` | 308 | 200 |
| `/2014/06/13/parley-book-3-progress` | `https://www.jamiemcfarlane.com/news/parley-book-3-progress` | 308 | 200 |
| `/2014/06/15/new-look-for-website` | `https://www.jamiemcfarlane.com/news/new-look-for-website` | 308 | 200 |
| `/2014/06/20/real-science-seems-like-fiction` | `https://www.jamiemcfarlane.com/news/real-science-seems-like-fiction` | 308 | 200 |
| `/2014/06/21/privateer-tales-replicators-already` | `https://www.jamiemcfarlane.com/news/privateer-tales-replicators-already` | 308 | 200 |
| `/2014/07/02/parley-progress-update` | `https://www.jamiemcfarlane.com/news/parley-progress-update` | 308 | 200 |
| `/2014/07/10/free-signed-copies-privateer-tales` | `https://www.jamiemcfarlane.com/news/free-signed-copies-privateer-tales` | 308 | 200 |
| `/2014/07/11/parley-rough-draft-complete` | `https://www.jamiemcfarlane.com/news/parley-rough-draft-complete` | 308 | 200 |
| `/2014/07/16/new-writing-project-henry-biggston` | `https://www.jamiemcfarlane.com/news/new-writing-project-henry-biggston` | 308 | 200 |
| `/2014/07/24/fool-hanging-wall` | `https://www.jamiemcfarlane.com/news/fool-hanging-wall` | 308 | 200 |
| `/2014/07/28/lesser-prince-dusting-old-manuscript` | `https://www.jamiemcfarlane.com/news/lesser-prince-dusting-old-manuscript` | 308 | 200 |
| `/2014/08/02/parley-privateer-tales-3-cover-complete` | `https://www.jamiemcfarlane.com/news/parley-privateer-tales-3-cover-complete` | 308 | 200 |
| `/2014/08/09/parley-privateer-tales-book-3-back-cover` | `https://www.jamiemcfarlane.com/news/parley-privateer-tales-book-3-back-cover` | 308 | 200 |
| `/2014/08/24/parley-release-sept-5th-2014` | `https://www.jamiemcfarlane.com/news/parley-release-sept-5th-2014` | 308 | 200 |
| `/2014/09/08/rookie-privateer-best-seller` | `https://www.jamiemcfarlane.com/news/rookie-privateer-best-seller` | 308 | 200 |
| `/2014/09/14/short-story-big-pete` | `https://www.jamiemcfarlane.com/news/short-story-big-pete` | 308 | 200 |
| `/2014/10/09/october-progress` | `https://www.jamiemcfarlane.com/news/october-progress` | 308 | 200 |
| `/2014/10/18/big-pete-released` | `https://www.jamiemcfarlane.com/news/big-pete-released` | 308 | 200 |
| `/2014/10/25/lesser-prince-beta-readers` | `https://www.jamiemcfarlane.com/news/lesser-prince-beta-readers` | 308 | 200 |
| `/2014/11/17/new-spaceship-hotspur` | `https://www.jamiemcfarlane.com/news/new-spaceship-hotspur` | 308 | 200 |
| `/2014/11/29/success-not-destination` | `https://www.jamiemcfarlane.com/news/success-not-destination` | 308 | 200 |
| `/2014/12/21/first-year-lessons-learned-part-1` | `https://www.jamiemcfarlane.com/news/first-year-lessons-learned-part-1` | 308 | 200 |
| `/2014/12/23/attitude-gratitude-free-books` | `https://www.jamiemcfarlane.com/news/attitude-gratitude-free-books` | 308 | 200 |
| `/2014/12/25/share-joy` | `https://www.jamiemcfarlane.com/news/share-joy` | 308 | 200 |
| `/2015/01/01/first-year-lessons-learned-part-2` | `https://www.jamiemcfarlane.com/news/first-year-lessons-learned-part-2` | 308 | 200 |
| `/2015/01/11/going-rogue-writing-complete` | `https://www.jamiemcfarlane.com/news/going-rogue-writing-complete` | 308 | 200 |
| `/2015/02/20/smugglers-dilemma-home-stretch` | `https://www.jamiemcfarlane.com/news/smugglers-dilemma-home-stretch` | 308 | 200 |
| `/2015/03/06/smugglers-dilemma-released` | `https://www.jamiemcfarlane.com/news/smugglers-dilemma-released` | 308 | 200 |
| `/2015/03/22/privateer-tales-after-red-houzi` | `https://www.jamiemcfarlane.com/news/privateer-tales-after-red-houzi` | 308 | 200 |
| `/2015/03/25/tipperary` | `https://www.jamiemcfarlane.com/news/tipperary` | 308 | 200 |
| `/2015/03/30/rookie-privateer-new-cover` | `https://www.jamiemcfarlane.com/news/rookie-privateer-new-cover` | 308 | 200 |
| `/2015/04/04/cutpurse-released-to-amazon` | `https://www.jamiemcfarlane.com/news/cutpurse-released-to-amazon` | 308 | 200 |
| `/2015/04/12/why-write` | `https://www.jamiemcfarlane.com/news/why-write` | 308 | 200 |
| `/2015/05/05/pirates-attack-no-really` | `https://www.jamiemcfarlane.com/news/pirates-attack-no-really` | 308 | 200 |
| `/2015/05/31/buccaneers-preview` | `https://www.jamiemcfarlane.com/news/buccaneers-preview` | 308 | 200 |
| `/2015/06/12/pirate-grounded` | `https://www.jamiemcfarlane.com/news/pirate-grounded` | 308 | 200 |
| `/2015/07/14/rookie-privateer-free` | `https://www.jamiemcfarlane.com/news/rookie-privateer-free` | 308 | 200 |
| `/2015/07/20/out-of-the-tank-nearing-release` | `https://www.jamiemcfarlane.com/news/out-of-the-tank-nearing-release` | 308 | 200 |
| `/2015/09/11/busy-summer-as-a-science-fiction-writer` | `https://www.jamiemcfarlane.com/news/busy-summer-as-a-science-fiction-writer` | 308 | 200 |
| `/2015/09/24/amazons-amazing-quality-control` | `https://www.jamiemcfarlane.com/news/amazons-amazing-quality-control` | 308 | 200 |
| `/2015/09/26/out-of-the-tank-liams-perspective` | `https://www.jamiemcfarlane.com/news/out-of-the-tank-liams-perspective` | 308 | 200 |
| `/2015/10/20/a-matter-of-honor` | `https://www.jamiemcfarlane.com/news/a-matter-of-honor` | 308 | 200 |
| `/2015/11/12/rookie-privateer-audio-book-auditions` | `https://www.jamiemcfarlane.com/news/rookie-privateer-audio-book-auditions` | 308 | 200 |
| `/2015/11/21/privateer-tales-99-cent-sale` | `https://www.jamiemcfarlane.com/news/privateer-tales-99-cent-sale` | 308 | 200 |
| `/2015/11/22/a-matter-of-honor-released` | `https://www.jamiemcfarlane.com/news/a-matter-of-honor-released` | 308 | 200 |
| `/2015/12/05/warlord-chapter-missing-text` | `https://www.jamiemcfarlane.com/news/warlord-chapter-missing-text` | 308 | 200 |
| `/2015/12/26/life-of-a-miner` | `https://www.jamiemcfarlane.com/news/life-of-a-miner` | 308 | 200 |
| `/2016/01/02/2016-goals` | `https://www.jamiemcfarlane.com/news/2016-goals` | 308 | 200 |
| `/2016/01/08/rookie-privateer-audio-in-production` | `https://www.jamiemcfarlane.com/news/rookie-privateer-audio-in-production` | 308 | 200 |
| `/2016/01/14/life-of-a-miner-chapter-02` | `https://www.jamiemcfarlane.com/news/life-of-a-miner-chapter-02` | 308 | 200 |
| `/2016/01/18/thats-not-a-corvette` | `https://www.jamiemcfarlane.com/news/thats-not-a-corvette` | 308 | 200 |
| `/2016/01/31/life-miner-chapter-04-never-judge-book` | `https://www.jamiemcfarlane.com/news/life-miner-chapter-04-never-judge-book` | 308 | 200 |
| `/2016/01/31/life-of-a-miner-chapter-03` | `https://www.jamiemcfarlane.com/news/life-of-a-miner-chapter-03` | 308 | 200 |
| `/2016/02/11/1609` | `https://www.jamiemcfarlane.com/news/1609` | 308 | 200 |
| `/2016/02/18/wizard-in-a-witch-world-cover-preview` | `https://www.jamiemcfarlane.com/news/wizard-in-a-witch-world-cover-preview` | 308 | 200 |
| `/2016/03/04/life-miner-chapter-05-scuttled` | `https://www.jamiemcfarlane.com/news/life-miner-chapter-05-scuttled` | 308 | 200 |
| `/2016/04/12/chapter-06-will-o-wisp` | `https://www.jamiemcfarlane.com/news/chapter-06-will-o-wisp` | 308 | 200 |
| `/2016/04/25/foundry-merrie-can-do-it` | `https://www.jamiemcfarlane.com/news/foundry-merrie-can-do-it` | 308 | 200 |
| `/2016/04/25/life-of-a-miner-chapter-07-theft` | `https://www.jamiemcfarlane.com/news/life-of-a-miner-chapter-07-theft` | 308 | 200 |
| `/2016/05/01/my-favorite-place` | `https://www.jamiemcfarlane.com/news/my-favorite-place` | 308 | 200 |
| `/2016/05/05/life-of-a-miner-chapter-08-weight-of-dishonesty` | `https://www.jamiemcfarlane.com/news/life-of-a-miner-chapter-08-weight-of-dishonesty` | 308 | 200 |
| `/2016/05/15/life-miner-chapter-09-demetria` | `https://www.jamiemcfarlane.com/news/life-miner-chapter-09-demetria` | 308 | 200 |
| `/2016/05/15/life-miner-chapter-10-trust-earned` | `https://www.jamiemcfarlane.com/news/life-miner-chapter-10-trust-earned` | 308 | 200 |
| `/2016/05/15/life-miner-chapter-11-epilogue` | `https://www.jamiemcfarlane.com/news/life-miner-chapter-11-epilogue` | 308 | 200 |
| `/2016/05/20/recruiting-privateers` | `https://www.jamiemcfarlane.com/news/recruiting-privateers` | 308 | 200 |
| `/2016/06/28/pirates-and-rescues` | `https://www.jamiemcfarlane.com/news/pirates-and-rescues` | 308 | 200 |
| `/2016/07/25/fool-audio-book-release` | `https://www.jamiemcfarlane.com/news/fool-audio-book-release` | 308 | 200 |
| `/2016/07/31/privateer-tales-characters` | `https://www.jamiemcfarlane.com/news/privateer-tales-characters` | 308 | 200 |
| `/2016/08/12/art-arts-sake` | `https://www.jamiemcfarlane.com/news/art-arts-sake` | 308 | 200 |
| `/2016/08/19/summer-projects` | `https://www.jamiemcfarlane.com/news/summer-projects` | 308 | 200 |
| `/2016/08/28/tween-time` | `https://www.jamiemcfarlane.com/news/tween-time` | 308 | 200 |
| `/2016/09/03/wicked-folk-released` | `https://www.jamiemcfarlane.com/news/wicked-folk-released` | 308 | 200 |
| `/2016/09/17/pantser` | `https://www.jamiemcfarlane.com/news/pantser` | 308 | 200 |
| `/2016/09/24/modern-day-wizard` | `https://www.jamiemcfarlane.com/news/modern-day-wizard` | 308 | 200 |
| `/2016/10/03/jamie-interview` | `https://www.jamiemcfarlane.com/news/jamie-interview` | 308 | 200 |
| `/2016/11/19/cooperative-story-writing` | `https://www.jamiemcfarlane.com/news/cooperative-story-writing` | 308 | 200 |
| `/2016/11/23/thankful` | `https://www.jamiemcfarlane.com/news/thankful` | 308 | 200 |
| `/2016/12/13/wizard-audition` | `https://www.jamiemcfarlane.com/news/wizard-audition` | 308 | 200 |
| `/2017/01/02/blockade-runner-released` | `https://www.jamiemcfarlane.com/news/blockade-runner-released` | 308 | 200 |
| `/2017/01/20/january-giveaway` | `https://www.jamiemcfarlane.com/news/january-giveaway` | 308 | 200 |
| `/2017/01/29/marque-restored` | `https://www.jamiemcfarlane.com/news/marque-restored` | 308 | 200 |
| `/2017/02/25/a-blank-sheet` | `https://www.jamiemcfarlane.com/news/a-blank-sheet` | 308 | 200 |
| `/2017/04/11/witchy-world-giveaway` | `https://www.jamiemcfarlane.com/news/witchy-world-giveaway` | 308 | 200 |
| `/2017/04/23/swapping-stories` | `https://www.jamiemcfarlane.com/news/swapping-stories` | 308 | 200 |
| `/2017/04/28/e-book-reader` | `https://www.jamiemcfarlane.com/news/e-book-reader` | 308 | 200 |
| `/2017/11/10/choose-my-next-project` | `https://www.jamiemcfarlane.com/news/choose-my-next-project` | 308 | 200 |
| `/2018/01/02/trilogy-gambit` | `https://www.jamiemcfarlane.com/news/trilogy-gambit` | 308 | 200 |
| `/2018/02/11/bold-trilogy-update-2-editing` | `https://www.jamiemcfarlane.com/news/bold-trilogy-update-2-editing` | 308 | 200 |
| `/2018/03/22/new-resource-privateer-tale-characters` | `https://www.jamiemcfarlane.com/news/new-resource-privateer-tale-characters` | 308 | 200 |
| `/2018/06/01/judgment-delayed-only-in-u-s` | `https://www.jamiemcfarlane.com/news/judgment-delayed-only-in-u-s` | 308 | 200 |
| `/2018/12/02/junkyard-pirate` | `https://www.jamiemcfarlane.com/news/junkyard-pirate` | 308 | 200 |
| `/2019/02/10/2019-reader-survey` | `https://www.jamiemcfarlane.com/news/2019-reader-survey` | 308 | 200 |
| `/2019/08/01/2019-biggston-tour-day-1` | `https://www.jamiemcfarlane.com/news/2019-biggston-tour-day-1` | 308 | 200 |
| `/2019/08/09/2019-biggston-tour-day-two` | `https://www.jamiemcfarlane.com/news/2019-biggston-tour-day-two` | 308 | 200 |
| `/2020/03/24/crow-flies-audio` | `https://www.jamiemcfarlane.com/news/crow-flies-audio` | 308 | 200 |
| `/2020/05/01/old-dogs-released` | `https://www.jamiemcfarlane.com/news/old-dogs-released` | 308 | 200 |
| `/2020/07/12/black-cutlass-announcemen` | `https://www.jamiemcfarlane.com/news/black-cutlass-announcemen` | 308 | 200 |
| `/2020/11/10/junkyard-spaceship-art-preview` | `https://www.jamiemcfarlane.com/news/junkyard-spaceship-art-preview` | 308 | 200 |
| `/2020/11/17/2020-winter-writing-projects` | `https://www.jamiemcfarlane.com/news/2020-winter-writing-projects` | 308 | 200 |
| `/2021/01/22/junkyard-spaceship-audio` | `https://www.jamiemcfarlane.com/news/junkyard-spaceship-audio` | 308 | 200 |
| `/2021/04/19/april-21-newsletter` | `https://www.jamiemcfarlane.com/news/april-21-newsletter` | 308 | 200 |
| `/2021/10/21/drakon-litrpg` | `https://www.jamiemcfarlane.com/news/drakon-litrpg` | 308 | 200 |
| `/2021/12/09/dec-newsletter-junkyard-raiders-released` | `https://www.jamiemcfarlane.com/news/dec-newsletter-junkyard-raiders-released` | 308 | 200 |
| `/2022/01/11/rebels-strike-released` | `https://www.jamiemcfarlane.com/news/rebels-strike-released` | 308 | 200 |
| `/2022/02/02/western-aeratroas-dwingeloo-galaxy` | `https://www.jamiemcfarlane.com/news/western-aeratroas-dwingeloo-galaxy` | 308 | 200 |
| `/2022/02/04/tamu-system` | `https://www.jamiemcfarlane.com/news/tamu-system` | 308 | 200 |
| `/2022/02/06/mhina-system` | `https://www.jamiemcfarlane.com/news/mhina-system` | 308 | 200 |
| `/2023/01/05/a-new-generation-of-privateers` | `https://www.jamiemcfarlane.com/news/a-new-generation-of-privateers` | 308 | 200 |
| `/2023/01/25/afterwar-preview` | `https://www.jamiemcfarlane.com/news/afterwar-preview` | 308 | 200 |
| `/2025/10/05/boltguns-and-duct-tape-video` | `https://www.jamiemcfarlane.com/news/boltguns-and-duct-tape-video` | 308 | 200 |
| `/2025/10/11/boltguns-bestseller` | `https://www.jamiemcfarlane.com/news/boltguns-bestseller` | 308 | 200 |
| `/2025/10/28/i-met-this-girl` | `https://www.jamiemcfarlane.com/news/i-met-this-girl` | 308 | 200 |
| `/2025/11/14/taking-risks` | `https://www.jamiemcfarlane.com/news/taking-risks` | 308 | 200 |
| `/2025/11/27/found-family` | `https://www.jamiemcfarlane.com/news/found-family` | 308 | 200 |
| `/2025/12/11/jump-drives-prerelease` | `https://www.jamiemcfarlane.com/news/jump-drives-prerelease` | 308 | 200 |
| `/2026/01/27/winter-struggles` | `https://www.jamiemcfarlane.com/news/winter-struggles` | 308 | 200 |
| `/2026/02/02/jumpdrives-release` | `https://www.jamiemcfarlane.com/news/jumpdrives-release` | 308 | 200 |
| `/2026/03/06/rix-is-back` | `https://www.jamiemcfarlane.com/news/rix-is-back` | 308 | 200 |
| `/2026/04/12/wedding-bells-ray-guns` | `https://www.jamiemcfarlane.com/news/wedding-bells-ray-guns` | 308 | 200 |
| `/2026/06/01/ray-guns-and-late-fees-new-release` | `https://www.jamiemcfarlane.com/news/ray-guns-and-late-fees-new-release` | 308 | 200 |

## Automated checks

`npm test` verifies that:

- all seven approved series mappings are present and exact;
- all 51 approved book mappings are present and exact;
- all 156 live migrated-post mappings are present and protected by a stable
  mapping digest;
- the legacy feed maps directly to Jamie's canonical feed;
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

The September 26, 2026 run passed all five HTTP test groups: 215 exact source
mappings, 213 unique direct destinations, query-string preservation for all
215 mappings, uppercase and trailing-slash variants for all 215 mappings, and
the unknown-path control. Trailing-slash variants redirect directly to the
final destination without an intermediate normalization hop.

Public HTTP/HTTPS and `www`/non-`www` behavior cannot be fully exercised until
the separately approved cutover configuration exists.

## Unresolved legacy URLs

No unresolved page or book URL remains in issue #2. All 156 published post
records returned by the live Jamie migration catalog have a source URL and a
verified canonical destination, so issue #17 has no unresolved migrated-post
redirects in this snapshot.

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
