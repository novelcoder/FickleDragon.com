import type { Metadata } from "next";
import styles from "@/app/ui/business-page.module.css";

export const metadata: Metadata = {
  title: "Contact | Fickle Dragon Publishing",
  description:
    "Contact Fickle Dragon Publishing about books, rights, review copies, media, or website questions.",
};

export default function ContactPage() {
  return (
    <main className={styles.main}>
      <section className={styles.hero} aria-labelledby="contact-heading">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Contact</p>
          <h1 id="contact-heading">Let&apos;s get your question to the right place.</h1>
          <p className={styles.intro}>
            For publishing, bookseller, library, review, media, rights, website,
            or order questions, write to us directly.
          </p>
        </div>
        <div className={styles.heroMark} aria-hidden="true">
          <span className="contact-monogram">FD</span>
        </div>
      </section>

      <div className={styles.content}>
        <section className={styles.section}>
          <h2>Email Fickle Dragon</h2>
          <p>
            <a className={styles.contactLink} href="mailto:jamie@fickledragon.com">
              jamie@fickledragon.com
            </a>
          </p>
          <p>
            A short subject line with the book or series name helps us route and
            answer your message. There is no submission form or public mailing
            address on this site.
          </p>
        </section>

        <div className={styles.cardGrid}>
          <article className={styles.card}>
            <h2>Booksellers &amp; libraries</h2>
            <p>
              Include the title, format or ISBN when known, your organization,
              and any ordering or event deadline.
            </p>
          </article>
          <article className={styles.card}>
            <h2>Reviewers &amp; media</h2>
            <p>
              Tell us the title, outlet or channel, preferred format, coverage
              plan, and deadline. Review materials are considered by request.
            </p>
          </article>
          <article className={styles.card}>
            <h2>Rights &amp; licensing</h2>
            <p>
              Identify the title, rights requested, language, territory, format,
              intended use, and timing. See our <a href="/rights">rights page</a>
              for more detail.
            </p>
          </article>
          <article className={styles.card}>
            <h2>Website &amp; order questions</h2>
            <p>
              Include the page or retailer involved, the device or browser if
              relevant, and enough detail for us to reproduce the problem.
            </p>
          </article>
        </div>

        <section className={styles.section}>
          <h2>Author news and reader questions</h2>
          <p>
            Jamie McFarlane and Mac Worden maintain separate reader-facing homes
            for series details, news, and author updates. Visit the author site
            that matches the books you follow.
          </p>
          <p>
            <a href="https://jamiemcfarlane.com">Jamie McFarlane</a>
            {" · "}
            <a href="https://macworden.com">Mac Worden</a>
          </p>
        </section>
      </div>
    </main>
  );
}
