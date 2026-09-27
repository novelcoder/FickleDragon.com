import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/app/ui/site-footer";
import { SiteHeader } from "@/app/ui/site-header";

const series = [
  {
    name: "Spaceship Mechanic",
    author: "Jamie McFarlane",
    genre: "Science fiction adventure",
    hook: "Machines, misfits, and impossible repairs.",
    className: "series-space",
    image: "/images/series/spaceship-mechanic.jpg",
    imageAlt: "Retro-futurist spaceship hovering beside a desert gas station",
    imagePosition: "center",
  },
  {
    name: "Crownlocked Heirs",
    author: "Mac Worden",
    genre: "Fantasy adventure",
    hook: "Magic, fellowship, and dangerous promises.",
    className: "series-crown",
    image: "/images/series/crownlocked-heirs.jpg",
    imageAlt: "Dark castle under a lightning-filled sky",
    imagePosition: "68% center",
  },
  {
    name: "Jack and Cocoa Mysteries",
    author: "Mac Worden",
    genre: "Mystery",
    hook: "Sharp cases and harder consequences.",
    className: "series-jack",
    image: "/images/series/jack-and-coke-clean.jpg",
    imageAlt: "Snowy small-town mystery scene with a man, Jeep, mansion, and dog",
    imagePosition: "center 8%",
  },
  {
    name: "Junkyard Pirate",
    author: "Jamie McFarlane",
    genre: "Science fiction adventure",
    hook: "Veterans, salvage, and alien trouble.",
    className: "series-junkyard",
    image: "/images/series/junkyard-pirate.jpg",
    imageAlt: "Science-fiction junkyard filled with salvaged spacecraft",
    imagePosition: "right center",
  },
];

export default function Home() {
  return (
    <div className="site-shell">
      <SiteHeader />

      <main id="top">
        <section className="hero" aria-labelledby="hero-heading">
          <div className="hero-copy">
            <p className="eyebrow">A small press with a lot of stories</p>
            <h1 id="hero-heading">Come find your next favorite series.</h1>
            <p className="hero-intro">
              Science fiction, fantasy, and mysteries by Jamie McFarlane and Mac
              Worden.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#series">
                Explore popular series
              </a>
              <a className="button button-secondary" href="#catalogs">
                Choose a catalog
              </a>
            </div>
          </div>
          <div className="hero-mark" aria-hidden="true">
            <span className="orbit orbit-one" />
            <span className="orbit orbit-two" />
            <Image
              src="/images/brand/fickle-dragon-mark-color.png"
              alt=""
              width={1254}
              height={1254}
              priority
            />
          </div>
        </section>

        <div className="story-line" aria-label="Catalog summary">
          <span>More than fifty books</span>
          <span>Science fiction &amp; adventure</span>
          <span>Fantasy &amp; mystery</span>
        </div>

        <section className="section series-section" id="series" aria-labelledby="series-heading">
          <div className="section-heading">
            <div>
              <p className="eyebrow warm">Where readers start</p>
              <h2 id="series-heading">Popular series</h2>
            </div>
            <p className="section-note">
              Four welcoming doorways into a much larger catalog.
            </p>
          </div>
          <div className="series-grid">
            {series.map((item) => (
              <article className="series-card" key={item.name}>
                <div className={`series-art ${item.className}`}>
                  <Image
                    className="series-image"
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="(max-width: 480px) 100vw, (max-width: 1020px) 50vw, 25vw"
                    style={{ objectPosition: item.imagePosition }}
                  />
                  <span>{item.genre}</span>
                  <h3>{item.name}</h3>
                  <small>{item.author}</small>
                </div>
                <p>{item.hook}</p>
                <span className="coming-link">Series pages arrive in the catalog phase</span>
              </article>
            ))}
          </div>
        </section>

        <section className="section catalog-section" id="catalogs" aria-labelledby="catalogs-heading">
          <div className="section-heading">
            <div>
              <p className="eyebrow warm">Pick your shelf</p>
              <h2 id="catalogs-heading">Follow the stories you came for.</h2>
            </div>
          </div>
          <div className="catalog-grid">
            <article className="catalog-card catalog-jamie">
              <Image
                className="catalog-image"
                src="/images/authors/jamie-mcfarlane-calypso-chrome-space.png"
                alt=""
                fill
                sizes="(max-width: 700px) 100vw, 50vw"
              />
              <div className="catalog-copy">
                <p className="catalog-label">Science fiction · Adventure</p>
                <h3>Jamie McFarlane</h3>
                <p>
                  Big universes, working crews, found families, and fast-moving
                  adventures built for readers who love a long series.
                </p>
                <a href="https://jamiemcfarlane.com">Step into Jamie&apos;s worlds</a>
              </div>
            </article>
            <article className="catalog-card catalog-mac">
              <Image
                className="catalog-image"
                src="/images/authors/mac-worden-summer-mansion.png"
                alt=""
                fill
                sizes="(max-width: 700px) 100vw, 50vw"
              />
              <div className="catalog-copy">
                <p className="catalog-label">Fantasy · Mystery</p>
                <h3>Mac Worden</h3>
                <p>
                  Character-first fantasy and mysteries full of stubborn heroes,
                  complicated loyalties, and places worth revisiting.
                </p>
                <a href="https://macworden.com">Discover Mac&apos;s books</a>
              </div>
            </article>
          </div>
        </section>

        <section className="section about-section" id="about" aria-labelledby="about-heading">
          <div className="about-copy">
            <p className="eyebrow light">Behind the books</p>
            <h2 id="about-heading">Independent by design.</h2>
            <p>
              Fickle Dragon Publishing is a small independent press built to give
              every series a long life, keep the catalog easy to explore, and put
              readers one click away from the stories they want.
            </p>
            <Link className="text-link text-link-light" href="/about">
              More about Fickle Dragon
            </Link>
          </div>
          <div className="about-mark" aria-hidden="true">
            <Image
              src="/images/brand/fickle-dragon-mark-color.png"
              alt=""
              width={220}
              height={220}
            />
          </div>
        </section>

        <section className="section business-section" aria-labelledby="business-heading">
          <div>
            <p className="eyebrow warm">For the book trade</p>
            <h2 id="business-heading">Need details beyond the jacket copy?</h2>
          </div>
          <div className="business-invitation">
            <p>
              Booksellers, librarians, reviewers, media contacts, and prospective
              rights partners are welcome to ask for current, title-specific
              information.
            </p>
            <div className="business-actions">
              <Link className="text-link" href="/rights">
                Rights &amp; trade information
              </Link>
              <Link className="text-link" href="/contact">
                Contact the press
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
