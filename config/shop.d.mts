export type ShopAvailability = "coming_soon" | "available" | "low_stock" | "sold_out" | "unavailable";
export type ShopFormat = "paperback" | "hardcover";

type Edition = { readonly sku: string; readonly isbn13: string | null };

export const SHOP_NAME: string;
export const SIGNATURE_NOTE: string;
export const SHIPPING_TERMS: {
  readonly region: string;
  readonly regionShort: string;
  readonly method: string;
  readonly costCents: number;
  readonly dispatchBusinessDays: number;
};
export const RETURNS_SUMMARY: string;
export const CUSTOMER_SERVICE_EMAIL: string;
export const FORMATS: Readonly<
  Record<ShopFormat, { readonly label: string; readonly surchargeCents: number; readonly enabled: boolean }>
>;
export const STOREWIDE_AVAILABILITY: ShopAvailability | null;
export const SHOP_BOOKS: ReadonlyArray<{
  readonly kind: "book";
  readonly catalogSlug: string;
  readonly title: string;
  readonly priceCents: number;
  readonly availability: ShopAvailability;
  readonly editions: { readonly paperback: Edition; readonly hardcover?: Edition };
}>;
export const SHOP_SET: {
  readonly kind: "set";
  readonly slug: string;
  readonly title: string;
  readonly priceCents: number;
  readonly availability: ShopAvailability;
  readonly includes: readonly string[];
  readonly sku: string;
};
export const AVAILABILITY_COPY: Readonly<
  Record<
    ShopAvailability,
    { readonly label: string; readonly detail: string; readonly purchasable: boolean; readonly schema: string }
  >
>;
export function effectiveAvailability(
  itemAvailability: ShopAvailability,
  storewide?: ShopAvailability | null,
): ShopAvailability;
export function formatPrice(cents: number): string;
export function priceForFormat(format: ShopFormat, basePriceCents: number, books?: number): number;
export function setSavingsCents(): number;
export function enabledFormats(): ShopFormat[];
