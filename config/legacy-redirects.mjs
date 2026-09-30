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
  [
    "/flying-saucers-and-chrome-plate",
    "flying-saucers-and-chrome-plate",
    "Flying Saucers and Chrome Plate",
  ],
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

// Ebook retailer links for the shared catalog: fickledragon.com/{name}-amazon -> existing geni.us link.
// Several codes predate the {slug} convention; reusing them keeps click history intact.
const amazonRetailerLinks = [
  ["/when-justice-calls-amazon", "justicecalls", "when-justice-calls"],
  ["/deputy-crosshairs-amazon", "deputy", "deputy-crosshairs"],
  ["/manhunt-sage-creek-amazon", "manhuntsagecreek", "manhunt-sage-creek"],
  ["/junkyard-amazon", "junkyard-pirate", "junkyard-pirate"],
  ["/olddogs-amazon", "olddogs", "old-dogs-older-tricks"],
  ["/junkyard-spaceship-amazon", "spaceship", "junkyard-spaceship"],
  ["/veterans-amazon", "junkyardveterans", "junkyard-veterans"],
  ["/junkyard-raiders-amazon", "junkyard-raiders", "junkyard-raiders"],
  ["/ghostship-amazon", "ghostship", "junkyard-ghost-ship"],
  ["/commandos-amazon", "commandos", "junkyard-commandos"],
  ["/mercenary-amazon", "mercenary-amazon", "junkyard-mercenary"],
  ["/saboteur-amazon", "junkyard-saboteur", "junkyard-saboteur"],
  ["/rookie-privateer-amazon", "rookieprivateer", "rookie-privateer"],
  ["/fool-me-once-amazon", "foolmeonce", "fool-me-once"],
  ["/parley-amazon", "parley", "parley"],
  ["/big-pete-amazon", "bigpete", "big-pete"],
  ["/smugglers-dilemma-amazon", "smugglersdilemma", "smugglers-dilemma"],
  ["/cutpurse-amazon", "cutpurse", "cutpurse"],
  ["/out-of-the-tank-amazon", "outofthetank", "out-of-the-tank"],
  ["/buccaneers-amazon", "buccaneers-amazon", "buccaneers"],
  ["/a-matter-of-honor-amazon", "matterofhonor", "a-matter-of-honor"],
  ["/give-no-quarter-amazon", "givenoquarter", "give-no-quarter"],
  ["/blockade-runner-amazon", "blockaderunner", "blockade-runner"],
  ["/corsair-menace-amazon", "corsairmenace", "corsair-menace"],
  ["/pursuit-amazon", "pursuitbold", "pursuit-of-the-bold"],
  ["/fury-of-the-bold-amazon", "furybold", "fury-of-the-bold"],
  ["/judgment-of-the-bold-amazon", "judgmentbold", "judgment-of-the-bold"],
  ["/exile-amazon", "privateersinexile", "privateers-in-exile"],
  ["/incursion-amazon", "incursionelea", "incursion-at-elea-station"],
  ["/freebooters-amazon", "freebooters", "freebooters-hold"],
  ["/blackcutlass-amazon", "blackcutlass", "black-cutlass"],
  ["/supremacy-amazon", "supremacy", "privateers-supremacy"],
  ["/drakon-prince-amazon", "drakon-prince", "drakon-prince"],
  ["/wizard-prince-amazon", "wizard-prince", "wizard-prince"],
  ["/the-unexpected-fellowship-amazon", "unexpected-fellowship", "the-unexpected-fellowship"],
  ["/wizard-in-a-witchy-world-amazon", "wizwitchy", "wizard-in-a-witchy-world"],
  ["/wicked-folk-amazon", "wickedfolk", "wicked-folk"],
  ["/wizard-unleashed-amazon", "wizardunleashed", "wizard-unleashed"],
  ["/boltguns-and-duct-tape-amazon", "boltguns-ducttape", "boltguns-and-duct-tape"],
  ["/jump-drives-and-coffee-stains-amazon", "jumpdrives", "jump-drives-and-coffee-stains"],
  ["/ray-guns-and-late-fees-amazon", "rayguns-latefees", "ray-guns-and-late-fees"],
  ["/flying-saucers-and-chrome-plate-amazon", "flying-saucers", "flying-saucers-and-chrome-plate"],
  ["/oldest-starfighter-amazon", "oldest-starfighter", "oldest-starfighter"],
  ["/rogue-commander-amazon", "rogue-commander", "rogue-commander"],
  ["/brigands-choice-amazon", "brigands-choice", "brigands-choice"],
  ["/hostile-legacy-amazon", "hostile-legacy", "hostile-legacy"],
  ["/forsaken-colony-amazon", "forsaken-colony", "forsaken-colony"],
  ["/lesser-prince-amazon", "lesserprince", "lesser-prince"],
  ["/uncommon-bravery-amazon", "uncommonbravery", "uncommon-bravery"],
  ["/on-a-pale-ship-amazon", "paleship", "on-a-pale-ship"],
  ["/life-of-a-miner-amazon", "life-of-a-miner", "life-of-a-miner"],
  ["/pete-popeye-and-olive-amazon", "pete-popeye-and-olive", "pete-popeye-and-olive"],
  ["/grave-consideration-amazon", "grave-consideration", "grave-consideration"],
];

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
  ...amazonRetailerLinks.map(([source, code, slug]) => ({
    source,
    destination: `https://geni.us/${code}`,
    status: 308,
    rationale: `Amazon ebook link for ${slug} used by the shared catalog.`,
  })),
];

export const legacyRedirectManifest = [
  ...legacySeriesRedirectManifest,
  ...legacyRetailerRedirectManifest,
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
