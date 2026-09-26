import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { findPublicBookBySlug } from "@/lib/catalog";
import styles from "./book.module.css";

type BookPageProps = {
  params: Promise<{ slug: string }>;
};

const SITE_URL = "https://fickledragon.com";

function formatReleaseDate(value?: string) {
  if (!value) return null;

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(value));
}

function metadataDescription(book: NonNullable<Awaited<ReturnType<typeof findPublicBookBySlug>>>) {
  const source =
    book.card_description?.trim() || book.tagline?.trim() || book.blurb?.trim();

  if (!source || source.length <= 160) return source;
  return `${source.slice(0, 157).trimEnd()}…`;
}

export async function generateMetadata({ params }: BookPageProps): Promise<Metadata> {
  const { slug } = await params;
  const book = await findPublicBookBySlug(slug);

  if (!book) {
    return { title: "Book not found | Fickle Dragon Publishing" };
  }

  const description = metadataDescription(book);
  const canonical = `/books/${book.slug}`;

  return {
    title: `${book.title} | Fickle Dragon Publishing`,
    description,
    alternates: { canonical },
    openGraph: {
      type: "book",
      url: canonical,
      title: book.title,
      description,
      images: book.cover_url
        ? [{ url: book.cover_url, alt: book.cover_alt ?? `${book.title} cover` }]
        : undefined,
    },
  };
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
    name: book.title,
    url: `${SITE_URL}/books/${book.slug}`,
    image: book.cover_url,
    description: book.card_description?.trim() || book.blurb?.trim(),
    datePublished: book.release_date,
    author: authors.map((author) => ({
      "@type": "Person",
      name: author.name,
      url: author.canonical_url || undefined,
    })),
    publisher: {
      "@type": "Organization",
      name: "Fickle Dragon Publishing LLC",
      url: SITE_URL,
    },
  };

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/" aria-label="Fickle Dragon Publishing home">
          <Image
            src="/images/brand/fickle-dragon-favicon-512.png"
            alt=""
            width={48}
            height={48}
            priority
          />
          <span>
            <strong>Fickle Dragon</strong>
            <small>Publishing LLC</small>
          </span>
        </Link>
        <nav aria-label="Book page navigation">
          <Link href="/#series">Popular series</Link>
          <Link href="/#catalogs">Author catalogs</Link>
        </nav>
      </header>

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
            <p className={styles.eyebrow}>{seriesLabel ?? "A Fickle Dragon title"}</p>
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

      <footer className={styles.footer}>
        <span>Fickle Dragon Publishing LLC · An independent press</span>
        <a href="mailto:jamie@fickledragon.com">jamie@fickledragon.com</a>
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(bookJsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </div>
  );
}
