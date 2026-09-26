import Image from "next/image";
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Fickle Dragon Publishing home">
        <Image
          src="/images/brand/fickle-dragon-favicon-512.png"
          alt=""
          width={54}
          height={54}
          priority
        />
        <span>
          <strong>Fickle Dragon</strong>
          <small>Publishing LLC</small>
        </span>
      </Link>
      <nav aria-label="Primary navigation">
        <Link href="/#series">Books</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </nav>
    </header>
  );
}
