import {
  legacyBlogFeedRedirect,
  legacyBlogRedirectManifest,
} from "./legacy-blog-redirects.mjs";

export const legacySeriesRedirectManifest = [
  {
    source: "/junkyard-pirate-series",
    destination: "https://www.jamiemcfarlane.com/JunkyardPirate",
    status: 308,
    rationale: "The reader-facing Junkyard Pirate series page belongs to Jamie McFarlane.",
  },
  {
    source: "/spaceship-mechanic",
    destination: "https://www.jamiemcfarlane.com/SpaceshipMechanic",
    status: 308,
    rationale: "The reader-facing Spaceship Mechanic series page belongs to Jamie McFarlane.",
  },
  {
    source: "/oldest-starfighter-series",
    destination:
      "https://www.jamiemcfarlane.com/ScienceFictionAdventures#oldest-starfighter",
    status: 308,
    rationale: "Oldest Starfighter is presented in Jamie McFarlane's science-fiction hub.",
  },
  {
    source: "/privateer-tales-series",
    destination: "https://www.jamiemcfarlane.com/PrivateerTales",
    status: 308,
    rationale: "The reader-facing Privateer Tales series page belongs to Jamie McFarlane.",
  },
  {
    source: "/afterwar-saga",
    destination: "https://www.jamiemcfarlane.com/PrivateerTales#afterwar",
    status: 308,
    rationale: "Afterwar Saga is presented with its parent Privateer Tales universe.",
  },
  {
    source: "/books-witchy-world-series",
    destination: "https://www.jamiemcfarlane.com/WitchyWorld",
    status: 308,
    rationale: "The reader-facing Witchy World series page belongs to Jamie McFarlane.",
  },
  {
    source: "/henry-biggston-thriller-series",
    destination: "https://www.macworden.com/HenryBiggston",
    status: 308,
    rationale: "The current Henry Biggston reader-facing destination belongs to Mac Worden.",
  },
];

const legacyBookRedirectDefinitions = [
  ["/junkyard-pirate", "junkyard-pirate", "Junkyard Pirate"],
  [
    "/junkyard-pirate-2",
    "junkyard-pirate",
    "the duplicate Junkyard Pirate page",
  ],
  ["/old-dogs", "old-dogs-older-tricks", "Old Dogs, Older Tricks"],
  ["/junkyard-spaceship", "junkyard-spaceship", "Junkyard Spaceship"],
  ["/junkyard-veterans", "junkyard-veterans", "Junkyard Veterans"],
  ["/junkyard-raiders", "junkyard-raiders", "Junkyard Raiders"],
  ["/junkyard-ghost-ship", "junkyard-ghost-ship", "Junkyard Ghost Ship"],
  ["/junkyard-commandos", "junkyard-commandos", "Junkyard Commandos"],
  ["/junkyard-mercenary", "junkyard-mercenary", "Junkyard Mercenary"],
  ["/junkyard-saboteur", "junkyard-saboteur", "Junkyard Saboteur"],
  [
    "/boltguns-and-ducttape",
    "boltguns-and-duct-tape",
    "Boltguns and Duct Tape",
  ],
  [
    "/jump-drives-and-coffee-stains",
    "jump-drives-and-coffee-stains",
    "Jump Drives and Coffee Stains",
  ],
  ["/rayguns-latefees", "ray-guns-and-late-fees", "Ray Guns and Late Fees"],
  ["/oldest-starfighter", "oldest-starfighter", "The Oldest Starfighter"],
  ["/rogue-commander", "rogue-commander", "Rogue Commander"],
  ["/rookie-privateer", "rookie-privateer", "Rookie Privateer"],
  ["/fool-me-once", "fool-me-once", "Fool Me Once"],
  ["/parley", "parley", "Parley"],
  ["/big-pete", "big-pete", "Big Pete"],
  ["/smugglers-dilemma", "smugglers-dilemma", "Smuggler's Dilemma"],
  ["/cutpurse", "cutpurse", "Cutpurse"],
  ["/out-of-the-tank-3", "out-of-the-tank", "Out of the Tank"],
  ["/buccaneers-2", "buccaneers", "Buccaneers"],
  ["/a-matter-of-honor", "a-matter-of-honor", "A Matter of Honor"],
  ["/givenoquarter", "give-no-quarter", "Give No Quarter"],
  ["/blockade-runner", "blockade-runner", "Blockade Runner"],
  ["/corsair-menace", "corsair-menace", "Corsair Menace"],
  ["/pursuit-of-the-bold", "pursuit-of-the-bold", "Pursuit of the Bold"],
  ["/fury-of-the-bold", "fury-of-the-bold", "Fury of the Bold"],
  [
    "/judgment-of-the-bold",
    "judgment-of-the-bold",
    "Judgment of the Bold",
  ],
  ["/privateers-in-exile", "privateers-in-exile", "Privateers in Exile"],
  [
    "/incursion-at-elea-station",
    "incursion-at-elea-station",
    "Incursion at Elea Station",
  ],
  ["/freebooters", "freebooters-hold", "Freebooter's Hold"],
  ["/blackcutlass", "black-cutlass", "Black Cutlass"],
  [
    "/privateers-supremacy",
    "privateers-supremacy",
    "Privateer's Supremacy",
  ],
  ["/brigands-choice", "brigands-choice", "Brigand's Choice"],
  ["/hostile-legacy", "hostile-legacy", "Hostile Legacy"],
  ["/forsaken-colony", "forsaken-colony", "Forsaken Colony"],
  [
    "/wizard-in-a-witchy-world",
    "wizard-in-a-witchy-world",
    "Wizard in a Witchy World",
  ],
  ["/wicked-folk", "wicked-folk", "Wicked Folk"],
  ["/wizard-unleashed", "wizard-unleashed", "Wizard Unleashed"],
  ["/when-justice-calls", "when-justice-calls", "When Justice Calls"],
  [
    "/deputy-in-the-crosshairs",
    "deputy-crosshairs",
    "Deputy in the Crosshairs",
  ],
  ["/manhunt-at-sage-creek", "manhunt-sage-creek", "Manhunt at Sage Creek"],
  ["/lesser-prince-2", "lesser-prince", "Lesser Prince"],
  [
    "/lesser-prince",
    "lesser-prince",
    "the Guardians of Gaeland placeholder for Lesser Prince",
  ],
  ["/uncommon-bravery", "uncommon-bravery", "Uncommon Bravery"],
  ["/pale-ship", "on-a-pale-ship", "On a Pale Ship"],
  [
    "/pete-popeye-olive",
    "pete-popeye-and-olive",
    "Pete, Popeye and Olive",
  ],
  [
    "/grave-consideration-witchy-world",
    "grave-consideration",
    "Grave Consideration",
  ],
];

export const legacyBookRedirectManifest = legacyBookRedirectDefinitions.map(
  ([source, slug, title]) => ({
    source,
    destination: `/books/${slug}`,
    status: 308,
    rationale: `${title} now has a canonical Fickle Dragon publisher book record.`,
  }),
);

const flyingSaucersCanonicalUrl =
  "https://www.jamiemcfarlane.com/books/flying-saucers-and-chrome-plate";

export const authorBookRedirectManifest = [
  {
    source: "/flying-saucers-and-chrome-plate",
    destination: flyingSaucersCanonicalUrl,
    status: 308,
    rationale:
      "Flying Saucers and Chrome Plate belongs at Jamie McFarlane's canonical book page.",
  },
  {
    source: "/books/flying-saucers-and-chrome-plate",
    destination: flyingSaucersCanonicalUrl,
    status: 308,
    rationale:
      "Jamie McFarlane's book page is the sole canonical URL for Flying Saucers and Chrome Plate.",
  },
];

// Retired WordPress retailer paths (/<book>-amazon). The shared catalog used
// them as store links and they may be printed in book back matter, so they
// must keep resolving. Destinations are the untagged geni.us links: back
// matter must never carry the Amazon Associates tag, so never point these at
// an -afl (WEB-AFFILIATE) link.
const legacyAmazonRetailerDefinitions = [
  ["/junkyard-amazon", "junkyard-pirate", "Junkyard Pirate"],
  ["/olddogs-amazon", "olddogs", "Old Dogs, Older Tricks"],
  ["/junkyard-spaceship-amazon", "spaceship", "Junkyard Spaceship"],
  ["/veterans-amazon", "junkyardveterans", "Junkyard Veterans"],
  ["/junkyard-raiders-amazon", "junkyard-raiders", "Junkyard Raiders"],
  ["/ghostship-amazon", "ghostship", "Junkyard Ghost Ship"],
  ["/commandos-amazon", "commandos", "Junkyard Commandos"],
  ["/mercenary-amazon", "junkyard-mercenary", "Junkyard Mercenary"],
  ["/saboteur-amazon", "junkyard-saboteur", "Junkyard Saboteur"],
  ["/corsair-menace-amazon", "corsairmenace", "Corsair Menace"],
  ["/pursuit-amazon", "pursuitbold", "Pursuit of the Bold"],
  ["/exile-amazon", "privateersinexile", "Privateers in Exile"],
  ["/incursion-amazon", "incursionelea", "Incursion at Elea Station"],
  ["/freebooters-amazon", "freebooters", "Freebooter's Hold"],
  ["/blackcutlass-amazon", "blackcutlass", "Black Cutlass"],
  ["/supremacy-amazon", "supremacy", "Privateer's Supremacy"],
  ["/drakon-prince-amazon", "drakon-prince", "Drakon Prince"],
];

function legacyAmazonRetailerRedirects() {
  return legacyAmazonRetailerDefinitions.map(([source, code, title]) => ({
    source,
    destination: `https://geni.us/${code}`,
    status: 308,
    rationale: `${title} legacy retailer path from the retired WordPress site.`,
  }));
}

export const legacyRetailerRedirectManifest = [
  {
    source: "/stray-evidence-amazon",
    destination: "https://geni.us/stray-evidence",
    status: 308,
    rationale: "Stray Evidence retailer link used by the shared catalog.",
  },
  {
    // Matching ignores case, so this also serves /BitterLakeLetters-Amazon.
    source: "/bitterlakeletters-amazon",
    destination: "https://geni.us/BitterLakeLetters",
    status: 308,
    rationale: "Bitter Lake Letters retailer link used by the shared catalog.",
  },
  ...legacyAmazonRetailerRedirects(),
];

// Printed in the back matter of every book, so this path must never 404.
// It is temporary (307) on purpose: browsers never cache the destination,
// so the signup form can move without touching the books. No #free-books
// fragment: that anchor scrolls past the hero copy; the form is in the hero.
export const readerSignupRedirectManifest = [
  {
    source: "/keep-in-touch",
    destination: "https://www.jamiemcfarlane.com/",
    status: 307,
    rationale:
      "Book back matter sends readers here for the newsletter and free starter library, which live on Jamie McFarlane's site.",
  },
];

export const legacyRedirectManifest = [
  ...readerSignupRedirectManifest,
  ...legacySeriesRedirectManifest,
  ...legacyRetailerRedirectManifest,
  ...authorBookRedirectManifest,
  ...legacyBookRedirectManifest,
  ...legacyBlogRedirectManifest,
  legacyBlogFeedRedirect,
];

export const canonicalBookTrailingSlashRedirect = {
  source: "/books/:slug/",
  destination: "/books/:slug",
  permanent: true,
};

export function legacyRedirectsForNext() {
  return [
    ...legacyRedirectManifest.flatMap(({ source, destination, status }) => [
      {
        source,
        destination,
        permanent: status === 308,
      },
      {
        source: `${source}/`,
        destination,
        permanent: status === 308,
      },
    ]),
    canonicalBookTrailingSlashRedirect,
  ];
}
