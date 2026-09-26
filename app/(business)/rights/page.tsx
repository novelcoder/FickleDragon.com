import styles from "@/app/ui/business-page.module.css";
import { staticPageMetadata } from "@/lib/seo";

export const metadata = staticPageMetadata("rights");

export default function RightsPage() {
  return (
    <main className={styles.main}>
      <section className={styles.hero} aria-labelledby="rights-heading">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Rights &amp; trade</p>
          <h1 id="rights-heading">Let&apos;s put the right book in the right hands.</h1>
          <p className={styles.intro}>
            We welcome practical inquiries from booksellers, librarians,
            reviewers, media professionals, and prospective rights partners.
          </p>
        </div>
        <div className={styles.heroMark} aria-hidden="true">
          <span className="contact-monogram">FD</span>
        </div>
      </section>

      <div className={styles.content}>
        <div className={styles.cardGrid}>
          <article className={styles.card}>
            <h2>Booksellers &amp; libraries</h2>
            <p>
              Ask about a title&apos;s current formats, identifiers, availability,
              or ordering information. Include the title, format, ISBN or ASIN
              when known, organization, quantity, and required date.
            </p>
          </article>
          <article className={styles.card}>
            <h2>Reviewers &amp; media</h2>
            <p>
              Review copies, cover files, factual book information, and media
              materials are available by request when appropriate. Tell us about
              your outlet, audience, requested title and format, and deadline.
            </p>
          </article>
          <article className={styles.card}>
            <h2>Rights &amp; licensing</h2>
            <p>
              For translation, audio, dramatic, adaptation, anthology, or other
              licensing inquiries, identify the title, requested rights,
              language, territory, format, term, intended use, and timing.
            </p>
          </article>
          <article className={styles.card}>
            <h2>Materials by request</h2>
            <p>
              We do not maintain undated public sell sheets or rights guides.
              Requesting what you need lets us provide current, title-specific
              information instead of a stale download.
            </p>
          </article>
        </div>

        <section className={styles.section}>
          <h2>Availability is title-specific</h2>
          <p>
            Rights, formats, territories, publication status, and distribution
            arrangements vary by title. A listing on this site does not by itself
            mean that every right or format is controlled by or available from
            Fickle Dragon Publishing.
          </p>
        </section>

        <div className={styles.contactPanel}>
          <div>
            <h2>Start the conversation</h2>
            <p>
              Put the title and inquiry type in the subject line, then include
              the practical details above.
            </p>
          </div>
          <a href="mailto:jamie@fickledragon.com">jamie@fickledragon.com</a>
        </div>
      </div>
    </main>
  );
}
