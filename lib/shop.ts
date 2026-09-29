import "server-only";
import {
  AVAILABILITY_COPY,
  SHOP_BOOKS,
  SHOP_SET,
  effectiveAvailability,
  type ShopAvailability,
} from "@/config/shop.mjs";
import { getPublicBooks, type CatalogBook } from "@/lib/catalog";

export type ShopBookView = {
  sku: string;
  title: string;
  catalogSlug: string;
  priceCents: number;
  isbn13: string | null;
  availability: ShopAvailability;
  book: CatalogBook | null;
};

export type ShopSetView = {
  sku: string;
  title: string;
  priceCents: number;
  availability: ShopAvailability;
  books: ShopBookView[];
};

export type Storefront = {
  books: ShopBookView[];
  set: ShopSetView;
  catalogAvailable: boolean;
};

async function loadCatalog() {
  try {
    return { books: await getPublicBooks(), ok: true };
  } catch (error) {
    console.error("Storefront could not load the publishing catalog.", error);
    return { books: [] as CatalogBook[], ok: false };
  }
}

/**
 * Joins the shop's offer configuration with authoritative catalog facts. A
 * shop book whose catalog record is missing or non-public is shown as
 * unavailable rather than hidden, so the page never silently changes shape.
 */
export async function getStorefront(): Promise<Storefront> {
  const catalog = await loadCatalog();

  const books: ShopBookView[] = SHOP_BOOKS.map((item) => {
    const book = catalog.books.find((entry) => entry.slug === item.catalogSlug) ?? null;
    const own: ShopAvailability = book ? item.availability : "unavailable";

    return {
      sku: item.editions.paperback.sku,
      title: item.title,
      catalogSlug: item.catalogSlug,
      priceCents: item.priceCents,
      isbn13: item.editions.paperback.isbn13,
      availability: effectiveAvailability(own),
      book,
    };
  });

  const setBooks = SHOP_SET.includes
    .map((slug) => books.find((entry) => entry.catalogSlug === slug))
    .filter((entry): entry is ShopBookView => Boolean(entry));

  // A set can only be sold while every book in it can be.
  const blocked = setBooks.find((entry) => !AVAILABILITY_COPY[entry.availability].purchasable);
  const setAvailability = effectiveAvailability(
    blocked && (blocked.availability === "sold_out" || blocked.availability === "unavailable")
      ? blocked.availability
      : SHOP_SET.availability,
  );

  return {
    books,
    set: {
      sku: SHOP_SET.sku,
      title: SHOP_SET.title,
      priceCents: SHOP_SET.priceCents,
      availability: setAvailability,
      books: setBooks,
    },
    catalogAvailable: catalog.ok,
  };
}
