import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const logoUrl = new URL("../public/bimilogotiny.svg", import.meta.url);
const logo = readFileSync(logoUrl, "utf8");
const root = logo.match(/<svg\b[^>]*>/i)?.[0] ?? "";

test("the BIMI logo uses the required SVG Tiny PS document profile", () => {
  assert.match(root, /\bversion="1\.2"/);
  assert.match(root, /\bbaseProfile="tiny-ps"/);
  assert.match(root, /\bwidth="256"/);
  assert.match(root, /\bheight="256"/);
  assert.match(root, /\bviewBox="0 0 512 512"/);
  assert.doesNotMatch(root, /\s[xy]=/);
  assert.match(logo, /<title>Fickle Dragon Publishing<\/title>/);
  assert.match(logo, /<desc>[^<]+<\/desc>/);
});

test("the BIMI logo is self-contained, vector-only, and compact", () => {
  assert.ok(Buffer.byteLength(logo) <= 32 * 1024);
  assert.doesNotMatch(
    logo,
    /<(?:animate|audio|foreignObject|iframe|image|script|video)\b|\b(?:href|xlink:href)=|url\(/i,
  );
  assert.match(logo, /<rect\b/);
  assert.match(logo, /<path\b/);

  const fills = [...logo.matchAll(/\bfill="(#[0-9a-f]{6})"/gi)].map(
    ([, fill]) => fill.toLowerCase(),
  );
  assert.ok(new Set(fills).size >= 2);
});
