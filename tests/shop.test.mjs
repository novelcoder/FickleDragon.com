import assert from "node:assert/strict";
import test from "node:test";

import {
  AVAILABILITY_COPY,
  FORMATS,
  SHIPPING_TERMS,
  SHOP_BOOKS,
  SHOP_SET,
  effectiveAvailability,
  enabledFormats,
  formatPrice,
  priceForFormat,
  setSavingsCents,
} from "../config/shop.mjs";

test("signed paperback prices match the approved offer", () => {
  const prices = Object.fromEntries(SHOP_BOOKS.map((book) => [book.catalogSlug, book.priceCents]));
  assert.deepEqual(prices, { "stray-evidence": 2250, "bitter-lake-letters": 1750 });
  assert.equal(SHOP_SET.priceCents, 3500);
  assert.equal(setSavingsCents(), 500);
});

test("the set contains exactly the two signed books", () => {
  assert.deepEqual([...SHOP_SET.includes].sort(), ["bitter-lake-letters", "stray-evidence"]);
});

test("Bitter Lake Letters uses its exact title", () => {
  assert.ok(SHOP_BOOKS.some((book) => book.title === "Bitter Lake Letters"));
});

test("SKUs are unique and stable-looking", () => {
  const skus = [
    SHOP_SET.sku,
    ...SHOP_BOOKS.flatMap((book) => Object.values(book.editions).map((edition) => edition.sku)),
  ];
  assert.equal(new Set(skus).size, skus.length);
  for (const sku of skus) assert.match(sku, /^FD-SGN-[A-Z0-9-]+$/);
});

test("hardcover adds five dollars per book and stays hidden until enabled", () => {
  assert.equal(priceForFormat("hardcover", 2250), 2750);
  assert.equal(priceForFormat("hardcover", SHOP_SET.priceCents, 2), 4500);
  assert.equal(priceForFormat("paperback", 1750), 1750);
  assert.equal(FORMATS.hardcover.enabled, false);
  assert.deepEqual(enabledFormats(), ["paperback"]);
});

test("shipping is free Media Mail to the contiguous United States within three business days", () => {
  assert.equal(SHIPPING_TERMS.costCents, 0);
  assert.equal(SHIPPING_TERMS.method, "USPS Media Mail");
  assert.equal(SHIPPING_TERMS.dispatchBusinessDays, 3);
});

test("every availability state has text that does not rely on color", () => {
  for (const [state, copy] of Object.entries(AVAILABILITY_COPY)) {
    assert.ok(copy.label.length > 0, state);
    assert.ok(copy.detail.length > 0, state);
  }
});

test("the storewide state never hides a sold-out or unavailable item", () => {
  assert.equal(effectiveAvailability("available", "coming_soon"), "coming_soon");
  assert.equal(effectiveAvailability("sold_out", "coming_soon"), "sold_out");
  assert.equal(effectiveAvailability("unavailable", "coming_soon"), "unavailable");
  assert.equal(effectiveAvailability("low_stock", null), "low_stock");
});

test("prices format as whole or two-decimal dollars", () => {
  assert.equal(formatPrice(3500), "$35");
  assert.equal(formatPrice(2250), "$22.50");
});
