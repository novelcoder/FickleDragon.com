import { isPublicCatalogBook } from "./catalog-policy.mjs";

/** True when `value` is 13 digits with a correct ISBN-13 check digit. */
export function isValidIsbn13(value) {
  if (typeof value !== "string" || !/^\d{13}$/.test(value)) return false;

  const sum = [...value.slice(0, 12)].reduce(
    (total, digit, index) => total + Number(digit) * (index % 2 === 0 ? 1 : 3),
    0,
  );

  return (10 - (sum % 10)) % 10 === Number(value[12]);
}

/**
 * Checks the catalog's editions and listings.
 *
 * `books` and `editions` are Appwrite rows. Each edition needs `book.$id` and its
 * `listings`. Returns one array per check; all arrays empty means the catalog is clean.
 */
export function validateCatalog({ books, editions }) {
  const editionsByBook = new Map();
  for (const edition of editions) {
    const bookId = edition.book?.$id;
    if (!bookId) continue;
    editionsByBook.set(bookId, [...(editionsByBook.get(bookId) ?? []), edition]);
  }

  const isbnOwners = new Map();
  for (const edition of editions) {
    if (!edition.isbn13) continue;
    isbnOwners.set(edition.isbn13, [...(isbnOwners.get(edition.isbn13) ?? []), edition.$id]);
  }

  return {
    editionsWithoutBook: editions
      .filter((edition) => !edition.book?.$id)
      .map((edition) => edition.$id),
    publicBooksWithoutEditions: books
      .filter((book) => isPublicCatalogBook(book) && !editionsByBook.has(book.$id))
      .map((book) => book.slug),
    availableEditionsWithoutActiveListing: editions
      .filter(
        (edition) =>
          edition.status === "available" &&
          !(edition.listings ?? []).some((listing) => (listing.status ?? "active") === "active"),
      )
      .map((edition) => ({
        edition: edition.$id,
        book: edition.book?.$id,
        format: edition.format,
      })),
    duplicateIsbns: [...isbnOwners]
      .filter(([, owners]) => owners.length > 1)
      .map(([isbn13, owners]) => ({ isbn13, editions: owners })),
    invalidIsbns: editions
      .filter((edition) => edition.isbn13 && !isValidIsbn13(edition.isbn13))
      .map((edition) => ({ edition: edition.$id, isbn13: edition.isbn13 })),
  };
}
