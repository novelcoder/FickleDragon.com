/**
 * Signed-book storefront configuration (issue #31).
 *
 * Square owns live price, inventory, and checkout once #30 and #33 land. Until
 * then this file is the single source for what the shop offers. Book facts
 * (cover, series, description) come from the shared Appwrite catalog through
 * `catalogSlug`; nothing here should duplicate catalog data.
 *
 * Keep secrets out of this file. Square application, location, and catalog
 * object IDs are not secret and will be added here in #30.
 */

/** @typedef {"coming_soon" | "available" | "low_stock" | "sold_out" | "unavailable"} ShopAvailability */
/** @typedef {"paperback" | "hardcover"} ShopFormat */

export const SHOP_NAME = "Fickle Dragon Bookshop";

/** Every copy sold through the shop is signed. Personalized inscriptions are out of scope. */
export const SIGNATURE_NOTE = "Signed by the author";

export const SHIPPING_TERMS = Object.freeze({
  region: "the contiguous United States",
  regionShort: "Contiguous U.S. only",
  method: "USPS Media Mail",
  costCents: 0,
  dispatchBusinessDays: 3,
});

export const RETURNS_SUMMARY =
  "Signed copies are final sale. If your order arrives damaged or we sent the wrong book, we will make it right.";

export const CUSTOMER_SERVICE_EMAIL = "jamie@fickledragon.com";

/**
 * Hardcover editions are planned but not yet available: they need their own
 * ISBNs and case-wrap artwork. Flip `enabled` only when both exist.
 */
export const FORMATS = Object.freeze({
  paperback: Object.freeze({ label: "Paperback", surchargeCents: 0, enabled: true }),
  hardcover: Object.freeze({ label: "Hardcover", surchargeCents: 500, enabled: false }),
});

/**
 * Storewide switch. `coming_soon` shows every product without purchase
 * actions while the first signed print run is prepared.
 * @type {ShopAvailability | null}
 */
export const STOREWIDE_AVAILABILITY = "coming_soon";

export const SHOP_BOOKS = Object.freeze([
  Object.freeze({
    kind: "book",
    catalogSlug: "stray-evidence",
    title: "Stray Evidence",
    priceCents: 2250,
    availability: "available",
    editions: Object.freeze({
      paperback: Object.freeze({ sku: "FD-SGN-STRAY-EVIDENCE-PB", isbn13: null }),
    }),
  }),
  Object.freeze({
    kind: "book",
    catalogSlug: "bitter-lake-letters",
    title: "Bitter Lake Letters",
    priceCents: 1750,
    availability: "available",
    editions: Object.freeze({
      paperback: Object.freeze({ sku: "FD-SGN-BITTER-LAKE-LETTERS-PB", isbn13: null }),
    }),
  }),
]);

/** Set price in paperback; each hardcover chosen adds that format's surcharge (formats may be mixed). */
export const SHOP_SET = Object.freeze({
  kind: "set",
  slug: "mac-worden-signed-mystery-set",
  title: "Mac Worden Signed Mystery Set",
  priceCents: 3500,
  availability: "available",
  includes: Object.freeze(["stray-evidence", "bitter-lake-letters"]),
  sku: "FD-SGN-MAC-WORDEN-SET-PB",
});

export const AVAILABILITY_COPY = Object.freeze({
  coming_soon: Object.freeze({
    label: "Coming soon",
    detail: "Signed copies are being prepared. Ordering opens soon.",
    purchasable: false,
    schema: "https://schema.org/PreOrder",
  }),
  available: Object.freeze({
    label: "In stock",
    detail: "Signed and ready to ship.",
    purchasable: true,
    schema: "https://schema.org/InStock",
  }),
  low_stock: Object.freeze({
    label: "Only a few left",
    detail: "Limited signed copies remain.",
    purchasable: true,
    schema: "https://schema.org/LimitedAvailability",
  }),
  sold_out: Object.freeze({
    label: "Sold out",
    detail: "This signed printing is sold out.",
    purchasable: false,
    schema: "https://schema.org/SoldOut",
  }),
  unavailable: Object.freeze({
    label: "Unavailable",
    detail: "Signed copies can’t be ordered right now.",
    purchasable: false,
    schema: "https://schema.org/Discontinued",
  }),
});

/**
 * The storewide state overrides an item's own state unless the item is sold
 * out or unavailable, which are always shown truthfully.
 * @param {ShopAvailability} itemAvailability
 * @param {ShopAvailability | null} [storewide]
 * @returns {ShopAvailability}
 */
export function effectiveAvailability(itemAvailability, storewide = STOREWIDE_AVAILABILITY) {
  if (itemAvailability === "sold_out" || itemAvailability === "unavailable") {
    return itemAvailability;
  }

  return storewide ?? itemAvailability;
}

/** @param {number} cents */
export function formatPrice(cents) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100);
}

/** @param {ShopFormat} format @param {number} basePriceCents @param {number} [books=1] */
export function priceForFormat(format, basePriceCents, books = 1) {
  const definition = FORMATS[format];
  if (!definition) throw new Error(`Unknown shop format: ${format}`);
  return basePriceCents + definition.surchargeCents * books;
}

/** Savings of the set against buying its books individually, in paperback. */
export function setSavingsCents() {
  const individual = SHOP_SET.includes.reduce((total, slug) => {
    const book = SHOP_BOOKS.find((item) => item.catalogSlug === slug);
    if (!book) throw new Error(`Set includes unknown book: ${slug}`);
    return total + book.priceCents;
  }, 0);

  return individual - SHOP_SET.priceCents;
}

export function enabledFormats() {
  return Object.entries(FORMATS)
    .filter(([, definition]) => definition.enabled)
    .map(([format]) => /** @type {ShopFormat} */ (format));
}
