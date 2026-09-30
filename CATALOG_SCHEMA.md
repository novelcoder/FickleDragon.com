# Catalog editions schema

Documents the `book_editions` and `edition_listings` tables added for issue #37.
This is the schema as built on 2026-09-30, not a substitute for reading the live
schema. Both tables live in database `6a0b628900008b8506e3`, next to `books`.

An **edition** is one format of one book (its ISBN, trim size, printer). A
**listing** is one place that edition can be bought. Each fact lives in one row.

## `book_editions`

| column | type | notes |
| --- | --- | --- |
| `book` | relationship to `books`, many-to-one, two-way (`books.editions`) | deleting a book is restricted while it has editions |
| `format` | enum `ebook`, `paperback`, `hardcover`, `audiobook` | required |
| `isbn13` | varchar(13) | digits only; unique index; empty for most ebooks |
| `asin` | varchar(10) | Amazon identifier for this edition |
| `trim_size` | varchar(32) | e.g. `6 x 9` |
| `page_count` | integer | |
| `printer` | enum `ingramspark`, `kdp`, `none` | `none` for digital editions |
| `unit_cost_cents` | integer | last known print cost per copy, US cents |
| `status` | enum `draft`, `coming_soon`, `available`, `out_of_print` | default `draft` |
| `release_date` | datetime | set for scheduled releases |
| `ingram_title_id` | varchar(20) | IngramSpark title ID, e.g. `CSS9695633`; each format is its own IngramSpark title |
| `notes` | varchar(1000) | list price, imprint, ISBN provenance and similar |

## `edition_listings`

| column | type | notes |
| --- | --- | --- |
| `edition` | relationship to `book_editions`, many-to-one, two-way (`book_editions.listings`) | deleting an edition is restricted while it has listings |
| `retailer` | enum `amazon`, `barnes_noble`, `bookshop_org`, `kobo`, `apple_books`, `google_play`, `ingramspark_direct`, `fickle_dragon_shop` | required |
| `url` | varchar(1024) | public product page |
| `retailer_sku` | varchar(64) | ASIN, retailer id, or shop SKU |
| `label` | varchar(64) | button text override |
| `status` | enum `active`, `inactive` | default `active` |
| `is_primary` | boolean | the listing a site links by default |

Indexes: `book_editions.isbn13_unique` (unique) and `edition_listings.idx_retailer_sku`.

## Differences from the issue text

- `status` on both tables is optional with a default, because Appwrite does not allow a
  default on a required column. `book_editions.status` also has `coming_soon`.
- The `book` and `edition` relationships are not required, for the same reason.
- There is no `other` retailer.
- Appwrite cannot index relationship columns, so the (`book`, `format`) and
  (`edition`, `retailer`) indexes were not created. Tables are small; filter in code.
- Appwrite could not reliably filter rows by a relationship column, so
  `getBookEditions()` in `lib/catalog.ts` loads all editions and filters by `book.$id`.

## Data notes

- Loaded from the Bowker export, the KDP Bookshelf and IngramSpark, September 2026.
- Amazon listings use `https://www.amazon.com/dp/<ASIN>`. The existing
  `books.store_url` links (often Geniuslink short links) are unchanged and still what
  the sites use.
- Not stored as fields, only in `notes`: US list price, Expanded Distribution, imprint.

## Checking the catalog

`npm run catalog:validate` reads the live catalog (with `CATALOG_API_KEY`, from the
environment or `.env.local`) and reports public books with no editions, available
editions with no active listing, duplicate ISBNs and ISBNs with a bad check digit.
It exits 1 when it finds a problem.
