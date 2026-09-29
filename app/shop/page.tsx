import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SITE_ORIGIN, serializeJsonLd } from "@/config/seo.mjs";
import {
  AVAILABILITY_COPY,
  CUSTOMER_SERVICE_EMAIL,
  RETURNS_SUMMARY,
  SHIPPING_TERMS,
  SHOP_NAME,
  SIGNATURE_NOTE,
  STOREWIDE_AVAILABILITY,
  formatPrice,
  setSavingsCents,
  type ShopAvailability,
} from "@/config/shop.mjs";
import { SiteFooter } from "@/app/ui/site-footer";
import { SiteHeader } from "@/app/ui/site-header";
import { staticPageMetadata } from "@/lib/seo";
import { getStorefront, type ShopBookView } from "@/lib/shop";
import styles from "./shop.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const base = staticPageMetadata("shop");
  const { books } = await getStorefront();
  const covers = books
    .filter((entry) => entry.book?.cover_url)
    .map((entry) => ({
      url: entry.book!.cover_url!,
      alt: `${entry.title} by Mac Worden, signed paperback`,
    }));

  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      images: covers.length > 0 ? covers : base.openGraph?.images,
    },
  };
}

const dispatchText = `Ships within ${SHIPPING_TERMS.dispatchBusinessDays} business days`;

function AvailabilityBadge({ state }: { state: ShopAvailability }) {
  const copy = AVAILABILITY_COPY[state];

  return (
    <p className={styles.availability} data-state={state}>
      <span className={styles.availabilityIcon} aria-hidden="true" />
      <strong>{copy.label}</strong>
      <span className={styles.availabilityDetail}>{copy.detail}</span>
    </p>
  );
}

function PurchaseAction({ state, label }: { state: ShopAvailability; label: string }) {
  if (state === "coming_soon") {
    return (
      <button className={styles.buyButton} type="button" disabled aria-describedby="shop-status">
        Ordering opens soon
      </button>
    );
  }

  if (!AVAILABILITY_COPY[state].purchasable) {
    return (
      <button className={styles.buyButton} type="button" disabled>
        {AVAILABILITY_COPY[state].label}
      </button>
    );
  }

  // Square-hosted checkout is connected in #33.
  return (
    <button className={styles.buyButton} type="button" disabled aria-label={`${label} — checkout coming soon`}>
      Checkout coming soon
    </button>
  );
}

function Cover({
  entry,
  sizes,
  priority = false,
  decorative = false,
}: {
  entry: ShopBookView;
  sizes: string;
  priority?: boolean;
  decorative?: boolean;
}) {
  if (!entry.book?.cover_url) {
    return <div className={styles.coverFallback}>{entry.title}</div>;
  }

  return (
    <Image
      className={styles.cover}
      src={entry.book.cover_url}
      alt={decorative ? "" : (entry.book.cover_alt ?? `${entry.title} cover`)}
      width={800}
      height={1200}
      sizes={sizes}
      priority={priority}
    />
  );
}

function descriptionLines(entry: ShopBookView) {
  const text = entry.book?.card_description?.trim() || entry.book?.tagline?.trim();
  return text ? text.split(/\n+/).map((line) => line.trim()).filter(Boolean) : [];
}

function BookCard({ entry, index }: { entry: ShopBookView; index: number }) {
  const headingId = `shop-${entry.catalogSlug}`;
  const series = entry.book?.series_id?.name;
  const lines = descriptionLines(entry);

  return (
    <article className={styles.bookCard} aria-labelledby={headingId}>
      <div className={styles.bookCover}>
        <Cover entry={entry} sizes="(max-width: 760px) 60vw, 260px" priority={index === 0} />
      </div>
      <div className={styles.bookCopy}>
        {series && <p className={styles.series}>{series}</p>}
        <h3 id={headingId}>{entry.title}</h3>
        <p className={styles.byline}>by Mac Worden</p>
        {entry.book?.tagline && <p className={styles.tagline}>{entry.book.tagline}</p>}
        {lines.length > 0 && (
          <div className={styles.description}>
            {lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        )}

        <dl className={styles.facts}>
          <div>
            <dt>Edition</dt>
            <dd>Signed paperback</dd>
          </div>
          {entry.isbn13 && (
            <div>
              <dt>ISBN</dt>
              <dd>{entry.isbn13}</dd>
            </div>
          )}
          <div>
            <dt>Shipping</dt>
            <dd>Free · {SHIPPING_TERMS.regionShort}</dd>
          </div>
        </dl>

        <div className={styles.buyRow}>
          <p className={styles.price}>
            <span className={styles.srOnly}>Price: </span>
            {formatPrice(entry.priceCents)}
          </p>
          <PurchaseAction state={entry.availability} label={entry.title} />
        </div>
        <AvailabilityBadge state={entry.availability} />
        {entry.book && (
          <Link className={styles.moreLink} href={`/books/${entry.book.slug}`}>
            More about {entry.title}
          </Link>
        )}
      </div>
    </article>
  );
}

function bookJsonLd(entry: ShopBookView) {
  const availability = AVAILABILITY_COPY[entry.availability];

  return {
    "@type": "Book",
    name: `${entry.title} (signed paperback)`,
    url: `${SITE_ORIGIN}/shop#shop-${entry.catalogSlug}`,
    image: entry.book?.cover_url,
    author: { "@type": "Person", name: "Mac Worden", url: "https://macworden.com" },
    bookFormat: "https://schema.org/Paperback",
    isbn: entry.isbn13 ?? undefined,
    sku: entry.sku,
    // Only advertise an offer once orders can actually be taken or are sold out.
    offers:
      entry.availability === "coming_soon" || entry.availability === "unavailable"
        ? undefined
        : {
            "@type": "Offer",
            price: (entry.priceCents / 100).toFixed(2),
            priceCurrency: "USD",
            availability: availability.schema,
            url: `${SITE_ORIGIN}/shop`,
          },
  };
}

export default async function ShopPage() {
  const { books, set, catalogAvailable } = await getStorefront();
  const savings = setSavingsCents();
  const storeComingSoon = STOREWIDE_AVAILABILITY === "coming_soon";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${SHOP_NAME} signed books`,
    url: `${SITE_ORIGIN}/shop`,
    itemListElement: books.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: bookJsonLd(entry),
    })),
  };

  return (
    <div className="site-shell">
      <SiteHeader />

      <main className={styles.main}>
        <section className={styles.hero} aria-labelledby="shop-heading">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>{SHOP_NAME}</p>
            <h1 id="shop-heading">Signed mysteries, straight from our shelf to yours.</h1>
            <p className={styles.intro}>
              Signed paperback editions of Mac Worden&apos;s mysteries, packed by
              hand and shipped free within the contiguous United States.
            </p>
          </div>
          <ul className={styles.heroFacts} aria-label="Shop highlights">
            <li>{SIGNATURE_NOTE}</li>
            <li>Free {SHIPPING_TERMS.method}</li>
            <li>{dispatchText}</li>
          </ul>
        </section>

        <div className={styles.content}>
          {storeComingSoon && (
            <div className={styles.notice} id="shop-status" role="status">
              <strong>Signed copies are almost ready.</strong>
              <span>
                The first signed printing is on its way. Ordering opens here as
                soon as the books arrive.
              </span>
            </div>
          )}

          {!catalogAvailable && (
            <div className={styles.notice} role="status">
              <strong>Some book details are temporarily unavailable.</strong>
              <span>Please check back shortly.</span>
            </div>
          )}

          <section className={styles.setCard} aria-labelledby="shop-set-heading">
            <div className={styles.setCovers} aria-hidden="true">
              {set.books.map((entry) => (
                <div className={styles.setCover} key={entry.catalogSlug}>
                  <Cover entry={entry} sizes="(max-width: 760px) 40vw, 220px" decorative />
                </div>
              ))}
            </div>
            <div className={styles.setCopy}>
              <p className={styles.eyebrowWarm}>The two-book set</p>
              <h2 id="shop-set-heading">{set.title}</h2>
              <p className={styles.setIntro}>
                One signed copy each of{" "}
                {set.books.map((entry, index) => (
                  <span key={entry.catalogSlug}>
                    {index > 0 && " and "}
                    <cite>{entry.title}</cite>
                  </span>
                ))}
                , shipped together.
              </p>
              <div className={styles.buyRow}>
                <p className={styles.price}>
                  <span className={styles.srOnly}>Price: </span>
                  {formatPrice(set.priceCents)}
                  {savings > 0 && (
                    <span className={styles.savings}>Save {formatPrice(savings)}</span>
                  )}
                </p>
                <PurchaseAction state={set.availability} label={set.title} />
              </div>
              <AvailabilityBadge state={set.availability} />
            </div>
          </section>

          <section className={styles.books} aria-labelledby="shop-books-heading">
            <h2 id="shop-books-heading">Signed books</h2>
            <div className={styles.bookGrid}>
              {books.map((entry, index) => (
                <BookCard entry={entry} index={index} key={entry.catalogSlug} />
              ))}
            </div>
          </section>

          <section className={styles.terms} aria-labelledby="shop-terms-heading">
            <h2 id="shop-terms-heading">How signed orders work</h2>
            <div className={styles.termsGrid}>
              <div>
                <h3>Signed, not personalized</h3>
                <p>
                  Every copy is signed by the author before it ships. We
                  aren&apos;t able to add personal inscriptions.
                </p>
              </div>
              <div>
                <h3>Free shipping</h3>
                <p>
                  Orders ship free by {SHIPPING_TERMS.method} to{" "}
                  {SHIPPING_TERMS.region}, within {SHIPPING_TERMS.dispatchBusinessDays}{" "}
                  business days. Media Mail is economical but can take a little
                  longer to arrive.
                </p>
              </div>
              <div>
                <h3>Final sale</h3>
                <p>{RETURNS_SUMMARY}</p>
              </div>
              <div>
                <h3>Questions</h3>
                <p>
                  Email{" "}
                  <a href={`mailto:${CUSTOMER_SERVICE_EMAIL}`}>{CUSTOMER_SERVICE_EMAIL}</a>{" "}
                  about an order, a damaged book, or anything else.
                </p>
              </div>
            </div>
            <p className={styles.retailerNote}>
              Looking for ebooks, audiobooks, or unsigned copies? Find every
              Mac Worden book at <a href="https://macworden.com">macworden.com</a>.
            </p>
          </section>
        </div>
      </main>

      <SiteFooter />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
    </div>
  );
}
