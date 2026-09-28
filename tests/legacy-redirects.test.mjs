import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import test from "node:test";

import {
  legacyBlogFeedRedirect,
  legacyBlogRedirectManifest,
} from "../config/legacy-blog-redirects.mjs";
import {
  canonicalBookTrailingSlashRedirect,
  legacyBookRedirectManifest,
  legacyRedirectManifest,
  legacyRedirectsForNext,
  legacySeriesRedirectManifest,
} from "../config/legacy-redirects.mjs";
import { SITE_ORIGIN } from "../config/seo.mjs";

const expectedSeriesMappings = new Map([
  [
    "/junkyard-pirate-series",
    "https://www.jamiemcfarlane.com/JunkyardPirate",
  ],
  [
    "/spaceship-mechanic",
    "https://www.jamiemcfarlane.com/SpaceshipMechanic",
  ],
  [
    "/oldest-starfighter-series",
    "https://www.jamiemcfarlane.com/ScienceFictionAdventures#oldest-starfighter",
  ],
  [
    "/privateer-tales-series",
    "https://www.jamiemcfarlane.com/PrivateerTales",
  ],
  [
    "/afterwar-saga",
    "https://www.jamiemcfarlane.com/PrivateerTales#afterwar",
  ],
  [
    "/books-witchy-world-series",
    "https://www.jamiemcfarlane.com/WitchyWorld",
  ],
  [
    "/henry-biggston-thriller-series",
    "https://www.macworden.com/HenryBiggston",
  ],
]);

const expectedBookMappings = new Map([
  ["/junkyard-pirate", "/books/junkyard-pirate"],
  ["/junkyard-pirate-2", "/books/junkyard-pirate"],
  ["/old-dogs", "/books/old-dogs-older-tricks"],
  ["/junkyard-spaceship", "/books/junkyard-spaceship"],
  ["/junkyard-veterans", "/books/junkyard-veterans"],
  ["/junkyard-raiders", "/books/junkyard-raiders"],
  ["/junkyard-ghost-ship", "/books/junkyard-ghost-ship"],
  ["/junkyard-commandos", "/books/junkyard-commandos"],
  ["/junkyard-mercenary", "/books/junkyard-mercenary"],
  ["/junkyard-saboteur", "/books/junkyard-saboteur"],
  ["/boltguns-and-ducttape", "/books/boltguns-and-duct-tape"],
  [
    "/jump-drives-and-coffee-stains",
    "/books/jump-drives-and-coffee-stains",
  ],
  ["/rayguns-latefees", "/books/ray-guns-and-late-fees"],
  [
    "/flying-saucers-and-chrome-plate",
    "/books/flying-saucers-and-chrome-plate",
  ],
  ["/oldest-starfighter", "/books/oldest-starfighter"],
  ["/rogue-commander", "/books/rogue-commander"],
  ["/rookie-privateer", "/books/rookie-privateer"],
  ["/fool-me-once", "/books/fool-me-once"],
  ["/parley", "/books/parley"],
  ["/big-pete", "/books/big-pete"],
  ["/smugglers-dilemma", "/books/smugglers-dilemma"],
  ["/cutpurse", "/books/cutpurse"],
  ["/out-of-the-tank-3", "/books/out-of-the-tank"],
  ["/buccaneers-2", "/books/buccaneers"],
  ["/a-matter-of-honor", "/books/a-matter-of-honor"],
  ["/givenoquarter", "/books/give-no-quarter"],
  ["/blockade-runner", "/books/blockade-runner"],
  ["/corsair-menace", "/books/corsair-menace"],
  ["/pursuit-of-the-bold", "/books/pursuit-of-the-bold"],
  ["/fury-of-the-bold", "/books/fury-of-the-bold"],
  ["/judgment-of-the-bold", "/books/judgment-of-the-bold"],
  ["/privateers-in-exile", "/books/privateers-in-exile"],
  ["/incursion-at-elea-station", "/books/incursion-at-elea-station"],
  ["/freebooters", "/books/freebooters-hold"],
  ["/blackcutlass", "/books/black-cutlass"],
  ["/privateers-supremacy", "/books/privateers-supremacy"],
  ["/brigands-choice", "/books/brigands-choice"],
  ["/hostile-legacy", "/books/hostile-legacy"],
  ["/forsaken-colony", "/books/forsaken-colony"],
  ["/wizard-in-a-witchy-world", "/books/wizard-in-a-witchy-world"],
  ["/wicked-folk", "/books/wicked-folk"],
  ["/wizard-unleashed", "/books/wizard-unleashed"],
  ["/when-justice-calls", "/books/when-justice-calls"],
  ["/deputy-in-the-crosshairs", "/books/deputy-crosshairs"],
  ["/manhunt-at-sage-creek", "/books/manhunt-sage-creek"],
  ["/lesser-prince-2", "/books/lesser-prince"],
  ["/lesser-prince", "/books/lesser-prince"],
  ["/uncommon-bravery", "/books/uncommon-bravery"],
  ["/pale-ship", "/books/on-a-pale-ship"],
  ["/pete-popeye-olive", "/books/pete-popeye-and-olive"],
  [
    "/grave-consideration-witchy-world",
    "/books/grave-consideration",
  ],
]);

const intentionallyExcludedSources = [
  "/privateer-tales-the-beginning",
  "/belirand-menace",
  "/books",
  "/fantasy-books",
  "/books/privateer-tales",
];

test("the approved series mappings are exact and permanent", () => {
  assert.equal(legacySeriesRedirectManifest.length, expectedSeriesMappings.size);

  for (const redirect of legacySeriesRedirectManifest) {
    assert.equal(redirect.destination, expectedSeriesMappings.get(redirect.source));
    assert.equal(redirect.status, 308);
    assert.ok(redirect.rationale.length > 0);
  }
});

test("the approved book mappings are exact and permanent", () => {
  assert.equal(legacyBookRedirectManifest.length, expectedBookMappings.size);

  for (const redirect of legacyBookRedirectManifest) {
    assert.equal(redirect.destination, expectedBookMappings.get(redirect.source));
    assert.equal(redirect.status, 308);
    assert.ok(redirect.rationale.length > 0);
  }
});

test("the migrated blog mapping is complete and unchanged", () => {
  assert.equal(legacyBlogRedirectManifest.length, 156);

  const mappingDigest = createHash("sha256")
    .update(
      legacyBlogRedirectManifest
        .map(({ source, destination }) => `${source} -> ${destination}`)
        .join("\n"),
    )
    .digest("hex");

  assert.equal(
    mappingDigest,
    "d3454c3c80776e48213224916cbf619237cc887202f0fa12b8220fd36821c5bf",
  );

  for (const redirect of legacyBlogRedirectManifest) {
    assert.match(
      redirect.source,
      /^\/\d{4}\/\d{2}\/\d{2}\/[a-z0-9]+(?:-[a-z0-9]+)*$/,
    );
    assert.match(
      redirect.destination,
      /^https:\/\/www\.jamiemcfarlane\.com\/news\/[a-z0-9]+(?:-[a-z0-9]+)*$/,
    );
    assert.equal(redirect.status, 308);
    assert.ok(redirect.rationale.length > 0);
  }
});

test("the legacy feed redirects directly to Jamie's canonical feed", () => {
  assert.deepEqual(legacyBlogFeedRedirect, {
    source: "/feed",
    destination: "https://www.jamiemcfarlane.com/feed",
    status: 308,
    rationale: "Jamie McFarlane's RSS feed is the canonical author-news feed.",
  });
});

test("the manifest has unique normalized sources and safe destinations", () => {
  const sources = legacyRedirectManifest.map(({ source }) => source);
  assert.equal(new Set(sources).size, sources.length);

  for (const { source, destination } of legacyRedirectManifest) {
    assert.match(
      source,
      /^\/(?:[a-z0-9]+(?:-[a-z0-9]+)*|\d{4}\/\d{2}\/\d{2}\/[a-z0-9]+(?:-[a-z0-9]+)*)$/,
    );

    if (destination.startsWith("/")) {
      assert.match(destination, /^\/books\/[a-z0-9]+(?:-[a-z0-9]+)*$/);
    } else {
      const target = new URL(destination);
      assert.equal(target.protocol, "https:");
      assert.ok(
        ["www.jamiemcfarlane.com", "www.macworden.com"].includes(target.hostname),
      );
    }
  }
});

test("intentionally excluded legacy paths stay out of issue #2", () => {
  const sources = new Set(legacyRedirectManifest.map(({ source }) => source));

  for (const source of intentionallyExcludedSources) {
    assert.ok(!sources.has(source));
  }
});

test("no configured destination creates a redirect chain or loop", () => {
  const sources = new Set(legacyRedirectManifest.map(({ source }) => source));

  for (const { destination } of legacyRedirectManifest) {
    const target = new URL(destination, SITE_ORIGIN);
    if (target.origin === SITE_ORIGIN) {
      assert.ok(!sources.has(target.pathname));
    }
  }
});

test("Next.js receives the exact permanent redirect configuration", () => {
  assert.deepEqual(
    legacyRedirectsForNext(),
    [
      ...legacyRedirectManifest.flatMap(({ source, destination }) => [
        {
          source,
          destination,
          permanent: true,
        },
        {
          source: `${source}/`,
          destination,
          permanent: true,
        },
      ]),
      canonicalBookTrailingSlashRedirect,
    ],
  );
});
