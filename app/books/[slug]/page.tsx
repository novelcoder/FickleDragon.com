import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { SITE_ORIGIN, serializeJsonLd } from "@/config/seo.mjs";
import { SiteFooter } from "@/app/ui/site-footer";
import { SiteHeader } from "@/app/ui/site-header";
import { findPublicBookBySlug } from "@/lib/catalog";
import { bookMetadata } from "@/lib/seo";
import styles from "./book.module.css";

type BookPageProps = {
  params: Promise<{ slug: string }>;
};

function formatReleaseDate(value?: string) {
  if (!value) return null;

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(value));
}

export async function generateMetadata({ params }: BookPageProps): Promise<Metadata> {
  const { slug } = await params;
  const book = await findPublicBookBySlug(slug);

  if (!book) {
    return {
      title: "Book not found",
      robots: { index: false, follow: false },
    };
  }

  return bookMetadata(book);
}

export default async function BookPage({ params }: BookPageProps) {
  const { slug } = await params;
  const book = await findPublicBookBySlug(slug);

  if (!book) notFound();
  if (slug !== book.slug) permanentRedirect(`/books/${book.slug}`);

  const authors = book.authors ?? [];
  const releaseDate = formatReleaseDate(book.release_date);
  const seriesLabel = book.series_id
    ? `${book.series_id.name}${book.series_number ? ` · Book ${book.series_number}` : ""}`
    : null;
  const description = book.blurb?.trim() || book.card_description?.trim() || book.tagline?.trim();
  const bookJsonLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    "@id": `${SITE_ORIGIN}/books/${book.slug}#book`,
    name: book.title,
    url: `${SITE_ORIGIN}/books/${book.slug}`,
    image: book.cover_url,
    description,
    datePublished: book.release_date,
    author:
      authors.length > 0
        ? authors.map((author) => ({
            "@type": "Person",
            name: author.name,
            url: author.canonical_url || undefined,
          }))
        : undefined,
    isPartOf: book.series_id
      ? {
          "@type": "BookSeries",
          name: book.series_id.name,
        }
      : undefined,
    position: book.series_number,
    identifier: book.kindle_asin
      ? {
          "@type": "PropertyValue",
          propertyID: "ASIN",
          value: book.kindle_asin,
        }
      : undefined,
    publisher: {
      "@id": `${SITE_ORIGIN}/#organization`,
      "@type": "Organization",
      name: "Fickle Dragon Publishing LLC",
      url: SITE_ORIGIN,
    },
  };

  return (
    <div className={styles.shell}>
      <SiteHeader />

      <main className={styles.main}>
        <Link className={styles.backLink} href="/">
          ← Fickle Dragon Publishing
        </Link>

        <article className={styles.book}>
          <div className={styles.coverWrap}>
            {book.cover_url ? (
              <Image
                className={styles.cover}
                src={book.cover_url}
                alt={book.cover_alt ?? `${book.title} cover`}
                width={800}
                height={1200}
                sizes="(max-width: 720px) 72vw, 360px"
                priority
              />
            ) : (
              <div className={styles.coverFallback}>Cover coming soon</div>
            )}
          </div>

          <div className={styles.copy}>
            <p className={styles.eyebrow}>{seriesLabel ?? "Publisher catalog title"}</p>
            <h1>{book.title}</h1>
            <p className={styles.byline}>
              by{" "}
              {authors.length > 0
                ? authors.map((author, index) => (
                    <span key={author.$id}>
                      {index > 0 && (index === authors.length - 1 ? " and " : ", ")}
                      {author.canonical_url ? (
                        <a href={author.canonical_url}>{author.name}</a>
                      ) : (
                        author.name
                      )}
                    </span>
                  ))
                : "Fickle Dragon Publishing"}
            </p>

            {book.tagline && <p className={styles.tagline}>{book.tagline}</p>}

            <div className={styles.details} aria-label="Book details">
              {book.status === "coming_soon" && <span>Coming soon</span>}
              {releaseDate && (
                <span>
                  {book.status === "coming_soon" ? "Releases" : "Published"} {releaseDate}
                </span>
              )}
              {book.kindle_asin && <span>Kindle ASIN {book.kindle_asin}</span>}
            </div>

            {description && (
              <div className={styles.blurb}>
                {description.split(/\n\s*\n/).map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            )}

            <div className={styles.actions}>
              {book.store_url && (
                <a className={styles.primaryAction} href={book.store_url}>
                  {book.store_label ?? "Find this book"}
                </a>
              )}
              {book.audible_url && (
                <a className={styles.secondaryAction} href={book.audible_url}>
                  Listen on Audible
                </a>
              )}
            </div>
          </div>
        </article>
      </main>

      <SiteFooter />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(bookJsonLd),
        }}
      />
    </div>
  );
}
