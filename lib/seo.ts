import type { Metadata } from "next";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_SOCIAL_IMAGE,
  ORGANIZATION_NAME,
  SITE_NAME,
  SITE_ORIGIN,
  STATIC_PAGE_SEO,
  absoluteUrl,
  isIndexingEnabled,
} from "@/config/seo.mjs";
import type { CatalogBook } from "@/lib/catalog";

type StaticPage = keyof typeof STATIC_PAGE_SEO;

const indexableRobots: Metadata["robots"] = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};

const nonIndexableRobots: Metadata["robots"] = {
  index: false,
  follow: false,
  googleBot: {
    index: false,
    follow: false,
    noimageindex: true,
  },
};

function socialTitle(title: string) {
  return title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;
}

export function staticPageMetadata(pageKey: StaticPage): Metadata {
  const page = STATIC_PAGE_SEO[pageKey];
  const title = socialTitle(page.title);

  return {
    title: pageKey === "home" ? { absolute: page.title } : page.title,
    description: page.description,
    alternates: { canonical: page.path },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: SITE_NAME,
      url: page.path,
      title,
      description: page.description,
      images: [DEFAULT_SOCIAL_IMAGE],
    },
  };
}

function metadataDescription(book: CatalogBook) {
  const source =
    book.card_description?.trim() || book.tagline?.trim() || book.blurb?.trim();

  if (!source || source.length <= 160) return source;
  return `${source.slice(0, 157).trimEnd()}…`;
}

export function bookMetadata(book: CatalogBook): Metadata {
  const description = metadataDescription(book);
  const canonical = `/books/${book.slug}`;
  const images = book.cover_url
    ? [{ url: book.cover_url, alt: book.cover_alt ?? `${book.title} cover` }]
    : [DEFAULT_SOCIAL_IMAGE];

  return {
    title: book.title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "book",
      locale: "en_US",
      siteName: SITE_NAME,
      url: canonical,
      title: book.title,
      description,
      images,
    },
  };
}

export const rootMetadata: Metadata = {
  ...staticPageMetadata("home"),
  metadataBase: new URL(SITE_ORIGIN),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  publisher: ORGANIZATION_NAME,
  icons: {
    icon: [
      {
        url: "/images/brand/fickle-dragon-favicon-32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/images/brand/fickle-dragon-favicon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: "/images/brand/fickle-dragon-favicon-512.png",
  },
  robots: isIndexingEnabled() ? indexableRobots : nonIndexableRobots,
};

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_ORIGIN}/#organization`,
  name: ORGANIZATION_NAME,
  url: SITE_ORIGIN,
  logo: absoluteUrl("/images/brand/fickle-dragon-mark-color.png"),
};
