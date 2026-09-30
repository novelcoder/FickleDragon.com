// Reports problems in the shared Appwrite catalog's editions and listings.
// Read-only. Run with: npm run catalog:validate (needs CATALOG_API_KEY, from the
// environment or .env.local). Exits 1 when any check finds a problem.
import { readFileSync } from "node:fs";
import { validateCatalog } from "../config/catalog-validation.mjs";

const ENDPOINT = "https://sfo.cloud.appwrite.io/v1";
const PROJECT_ID = "6a0b4638002a71c2b8ec";
const DATABASE_ID = "6a0b628900008b8506e3";

function loadApiKey() {
  if (process.env.CATALOG_API_KEY) return process.env.CATALOG_API_KEY;

  try {
    const line = readFileSync(new URL("../.env.local", import.meta.url), "utf8")
      .split("\n")
      .find((entry) => entry.startsWith("CATALOG_API_KEY="));
    if (line) return line.slice("CATALOG_API_KEY=".length).trim().replace(/^["']|["']$/g, "");
  } catch {
    // No .env.local; fall through to the error below.
  }

  console.error("CATALOG_API_KEY is required (set it in the environment or .env.local).");
  process.exit(2);
}

const apiKey = loadApiKey();

async function loadRows(table, select) {
  const rows = [];
  let total = 100;

  while (rows.length < total) {
    const queries = [
      { method: "limit", values: [100] },
      { method: "offset", values: [rows.length] },
      { method: "select", values: select },
    ]
      .map((entry) => `queries[]=${encodeURIComponent(JSON.stringify(entry))}`)
      .join("&");
    const response = await fetch(
      `${ENDPOINT}/tablesdb/${DATABASE_ID}/tables/${table}/rows?${queries}`,
      { headers: { "X-Appwrite-Key": apiKey, "X-Appwrite-Project": PROJECT_ID } },
    );

    if (!response.ok) throw new Error(`${table} request failed with status ${response.status}.`);

    const result = await response.json();
    rows.push(...result.rows);
    total = result.total;
    if (result.rows.length === 0 && rows.length < total) throw new Error(`${table} pagination stopped early.`);
  }

  return rows;
}

const [books, editions] = await Promise.all([
  loadRows("books", ["*", "series_id.*"]),
  loadRows("book_editions", ["*", "listings.*", "book.$id"]),
]);
const report = validateCatalog({ books, editions });
const labels = {
  editionsWithoutBook: "Editions with no book",
  publicBooksWithoutEditions: "Public books with no editions",
  availableEditionsWithoutActiveListing: "Available editions with no active listing",
  duplicateIsbns: "Duplicate ISBNs",
  invalidIsbns: "ISBNs that fail the ISBN-13 check digit",
};

console.log(`Checked ${books.length} books and ${editions.length} editions.`);
let problems = 0;
for (const [key, label] of Object.entries(labels)) {
  const found = report[key];
  problems += found.length;
  console.log(`\n${found.length === 0 ? "OK  " : "FAIL"} ${label}: ${found.length}`);
  for (const item of found) console.log(`  - ${typeof item === "string" ? item : JSON.stringify(item)}`);
}

process.exit(problems === 0 ? 0 : 1);
