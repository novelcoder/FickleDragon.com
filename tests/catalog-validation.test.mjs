import assert from "node:assert/strict";
import test from "node:test";
import { isValidIsbn13, validateCatalog } from "../config/catalog-validation.mjs";

const book = (id, extra = {}) => ({ $id: id, slug: id, status: "published", ...extra });
const edition = (id, bookId, extra = {}) => ({
  $id: id,
  format: "paperback",
  status: "available",
  book: bookId ? { $id: bookId } : undefined,
  listings: [{ $id: `${id}-l`, retailer: "amazon", status: "active" }],
  ...extra,
});

test("isValidIsbn13 accepts real ISBNs and rejects bad digits", () => {
  assert.equal(isValidIsbn13("9781943792290"), true);
  assert.equal(isValidIsbn13("9781943792313"), true);
  assert.equal(isValidIsbn13("9781943792291"), false);
  assert.equal(isValidIsbn13("978-1-943792-29-0"), false);
  assert.equal(isValidIsbn13("97819437922"), false);
  assert.equal(isValidIsbn13(undefined), false);
});

test("a clean catalog reports nothing", () => {
  const report = validateCatalog({
    books: [book("a")],
    editions: [edition("e1", "a", { isbn13: "9781943792290" })],
  });
  assert.deepEqual(Object.values(report).flat(), []);
});

test("flags public books with no editions, but not private or excluded ones", () => {
  const report = validateCatalog({
    books: [
      book("has", {}),
      book("none"),
      book("private", { status: "draft" }),
      book("outside", { series_id: { slug: "space-troopers" } }),
    ],
    editions: [edition("e1", "has")],
  });
  assert.deepEqual(report.publicBooksWithoutEditions, ["none"]);
});

test("flags available editions without an active listing", () => {
  const report = validateCatalog({
    books: [book("a")],
    editions: [
      edition("no-listing", "a", { listings: [] }),
      edition("inactive", "a", { listings: [{ $id: "x", status: "inactive" }] }),
      edition("draft", "a", { status: "draft", listings: [] }),
      edition("ok", "a"),
    ],
  });
  assert.deepEqual(
    report.availableEditionsWithoutActiveListing.map((entry) => entry.edition),
    ["no-listing", "inactive"],
  );
});

test("flags duplicate and invalid ISBNs and editions with no book", () => {
  const report = validateCatalog({
    books: [book("a")],
    editions: [
      edition("e1", "a", { isbn13: "9781943792290" }),
      edition("e2", "a", { isbn13: "9781943792290" }),
      edition("e3", "a", { isbn13: "9781943792291" }),
      edition("orphan", null),
    ],
  });
  assert.deepEqual(report.duplicateIsbns, [{ isbn13: "9781943792290", editions: ["e1", "e2"] }]);
  assert.deepEqual(report.invalidIsbns, [{ edition: "e3", isbn13: "9781943792291" }]);
  assert.deepEqual(report.editionsWithoutBook, ["orphan"]);
});
