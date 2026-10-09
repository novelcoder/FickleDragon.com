import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { AMAZON_ASSOCIATE_DISCLOSURE } from "../config/affiliate-disclosure.mjs";

const source = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("uses Amazon's required Associates wording verbatim", () => {
  assert.equal(
    AMAZON_ASSOCIATE_DISCLOSURE,
    "As an Amazon Associate I earn from qualifying purchases.",
  );
});

test("the site footer shows the disclosure on every page", () => {
  assert.match(source("app/ui/site-footer.tsx"), /\{AMAZON_ASSOCIATE_DISCLOSURE\}/);
});

test("book pages show the disclosure beside the store button", () => {
  const page = source("app/books/[slug]/page.tsx");
  assert.match(page, /book\.store_url && \(\s*<p className=\{styles\.affiliateNote\}>\{AMAZON_ASSOCIATE_DISCLOSURE\}/);
});
