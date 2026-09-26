import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "@/app/ui/business-page.module.css";

export const metadata: Metadata = {
  title: "About | Fickle Dragon Publishing",
  description:
    "Meet Fickle Dragon Publishing, an independent press for science fiction, fantasy, and mystery readers.",
};

export default function AboutPage() {
  return (
    <main className={styles.main}>
      <section className={styles.hero} aria-labelledby="about-heading">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>About Fickle Dragon</p>
          <h1 id="about-heading">A small press with a lot of stories.</h1>
          <p className={styles.intro}>
            Fickle Dragon Publishing is an independent publisher built around
            enduring series, clear book records, and an easy path from one good
            story to the next.
          </p>
        </div>
        <div className={styles.heroMark} aria-hidden="true">
          <Image
            src="/images/brand/fickle-dragon-mark-color.png"
            alt=""
            width={1254}
            height={1254}
            priority
          />
        </div>
      </section>

      <div className={styles.content}>
        <div className={styles.leadGrid}>
          <section className={styles.section}>
            <h2>Independent by design</h2>
            <p>
              We publish science fiction adventures, fantasy, and mysteries with
              room for characters and worlds to grow across many books. More than
              fifty titles call Fickle Dragon home, from long-running universes to
              newer series just getting started.
            </p>
            <p>
              The publisher site keeps the practical side simple: dependable book
              information, a catalog readers and booksellers can explore, and a
              clear place to ask about rights, review copies, or ordering.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Two names, distinct shelves</h2>
            <p>
              Jamie McFarlane is the home for science fiction, working crews,
              found families, and far-reaching adventures. Mac Worden is the home
              for fantasy and mysteries shaped by stubborn heroes, complicated
              loyalties, and memorable places.
            </p>
            <p>
              Their reader-facing sites carry the deeper series experience,
              author news, and community. Fickle Dragon remains the publishing
              home connecting those books and the people who need reliable
              information about them.
            </p>
          </section>
        </div>

        <div className={styles.cardGrid}>
          <article className={styles.card}>
            <h2>Jamie McFarlane</h2>
            <p>
              Science fiction adventures ranging from salvage yards and starships
              to privateers at the edge of known space.
            </p>
            <a href="https://jamiemcfarlane.com">Visit Jamie McFarlane</a>
          </article>
          <article className={styles.card}>
            <h2>Mac Worden</h2>
            <p>
              Fantasy and mystery stories with sharp stakes, lived-in settings,
              and characters worth following home.
            </p>
            <a href="https://macworden.com">Visit Mac Worden</a>
          </article>
        </div>

        <div className={styles.contactPanel}>
          <div>
            <h2>Looking for a particular book?</h2>
            <p>
              Start with the featured series, or get in touch if you need
              publishing, ordering, or rights information.
            </p>
          </div>
          <Link href="/contact">Contact the press</Link>
        </div>
      </div>
    </main>
  );
}
