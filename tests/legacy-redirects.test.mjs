import assert from "node:assert/strict";
import test from "node:test";

import {
  legacyRedirectManifest,
  legacyRedirectsForNext,
} from "../config/legacy-redirects.mjs";

const expectedMappings = new Map([
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

test("the approved series mappings are exact and permanent", () => {
  assert.equal(legacyRedirectManifest.length, expectedMappings.size);

  for (const redirect of legacyRedirectManifest) {
    assert.equal(redirect.destination, expectedMappings.get(redirect.source));
    assert.equal(redirect.status, 308);
    assert.ok(redirect.rationale.length > 0);
  }
});

test("the manifest has unique normalized sources and safe destinations", () => {
  const sources = legacyRedirectManifest.map(({ source }) => source);
  assert.equal(new Set(sources).size, sources.length);

  for (const { source, destination } of legacyRedirectManifest) {
    assert.match(source, /^\/[a-z0-9]+(?:-[a-z0-9]+)*$/);

    const target = new URL(destination);
    assert.equal(target.protocol, "https:");
    assert.ok(
      ["www.jamiemcfarlane.com", "www.macworden.com"].includes(target.hostname),
    );
  }
});

test("no configured destination creates a redirect chain or loop", () => {
  const sources = new Set(legacyRedirectManifest.map(({ source }) => source));

  for (const { destination } of legacyRedirectManifest) {
    const target = new URL(destination);
    assert.notEqual(target.hostname, "fickledragon.com");
    assert.notEqual(target.hostname, "www.fickledragon.com");
    assert.ok(!sources.has(target.pathname));
  }
});

test("Next.js receives the exact permanent redirect configuration", () => {
  assert.deepEqual(
    legacyRedirectsForNext(),
    legacyRedirectManifest.map(({ source, destination }) => ({
      source,
      destination,
      permanent: true,
    })),
  );
});
