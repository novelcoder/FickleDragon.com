import Image from "next/image";
import Link from "next/link";

import { AMAZON_ASSOCIATE_DISCLOSURE } from "@/config/affiliate-disclosure.mjs";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <Image
          src="/images/brand/fickle-dragon-favicon-32.png"
          alt=""
          width={32}
          height={32}
        />
        <span>Fickle Dragon Publishing LLC · An independent press</span>
      </div>
      <div className="footer-links" aria-label="Footer links">
        <Link href="/shop">Signed books</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/rights">Rights &amp; trade</Link>
        <Link href="/privacy">Privacy</Link>
        <a href="https://jamiemcfarlane.com">Jamie McFarlane</a>
        <a href="https://macworden.com">Mac Worden</a>
      </div>
      <p className="footer-disclosure">{AMAZON_ASSOCIATE_DISCLOSURE}</p>
    </footer>
  );
}
