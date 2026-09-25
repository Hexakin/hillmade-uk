import Image, { getImageProps } from "next/image";
import Link from "next/link";
import { Newsletter, Prose } from "@/components/Editorial";
import { ContinueReadingCard } from "@/components/ContinueReading";
import { FilmFeature } from "@/components/Film";
import { homecoming } from "@/lib/films";
import { formatDate, getContent } from "@/lib/content";
import { pageMetadata, lifecycleCopy, patreonUrl, xProfile } from "@/lib/site";
import { homeStructuredData, jsonLd } from "@/lib/structured-data";

export function generateMetadata() {
  const { book } = getContent();
  const copy = lifecycleCopy[book.phase];
  const title = book.workingTitle
    ? `${book.workingTitle} · a novel in public`
    : `${copy.lines.join(" ")} ${copy.subtitle}`;
  const description = book.premise
    ? `${book.premise} Read the working draft chapters and writing notebook as the book becomes itself.`
    : copy.description;
  return pageMetadata(title, description, "/");
}

// The hero is a still from the Chapter One film: the 16:9 composition on wide
// screens and the 9:16 one on phones (each recomposed, not cropped).
function HeroPicture() {
  const alt =
    "A painted house on a hill at sunset, a winding path leading up to its glowing door. From the film of Chapter One.";
  const common = {
    alt,
    loading: "eager",
    fetchPriority: "high",
  } as const;
  const {
    props: { srcSet: wide },
  } = getImageProps({
    ...common,
    src: `${homecoming.base}-16x9.jpg`,
    width: 1280,
    height: 720,
    sizes: "60vw",
  });
  const {
    props: { srcSet: tall, ...rest },
  } = getImageProps({
    ...common,
    src: `${homecoming.base}-9x16.jpg`,
    width: 720,
    height: 1280,
    sizes: "100vw",
  });
  return (
    <picture>
      <source media="(min-width: 801px)" srcSet={wide} />
      <img {...rest} srcSet={tall} alt={alt} className="home-hero-image" />
    </picture>
  );
}

export default function Home() {
  const { book, archive, chapters, pages } = getContent();
  const readable = chapters.filter((chapter) => chapter.bodyAvailable);
  const firstChapter = readable[0];
  const copy = lifecycleCopy[book.phase];
  const title = book.workingTitle ?? copy.lines.join(" ");
  const opening = firstChapter?.body
    .split(/\n\s*\n/)
    .filter((block) => block.trim())
    .slice(0, 4)
    .join("\n\n");
  const chapterNumber = new Map(chapters.map((c) => [c.id, c.number]));
  const notes = archive.slice(0, 4);
  return (
    <main id="main" tabIndex={-1}>
      <section className="home-hero" aria-labelledby="hero-title">
        <div className="home-hero-copy">
          <p className="kicker">
            {book.phase === "released"
              ? "A novel by Jonathan Hill"
              : "A novel, written in public"}
          </p>
          <h1 id="hero-title">{title}</h1>
          <p className="home-hero-premise">{book.premise ?? copy.description}</p>
          <div className="home-hero-actions">
            <Link
              href={firstChapter ? `/chapters/${firstChapter.slug}` : "/start"}
              className="button-ember"
            >
              {firstChapter ? "Start reading Chapter One" : "Start here"}
              <span aria-hidden="true">→</span>
            </Link>
            <a href="#film" className="button-outline">
              <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
                <path d="M7 4.5v15l12-7.5z" fill="currentColor" />
              </svg>
              Watch the film
            </a>
          </div>
          {chapters.length > 0 && (
            <p className="home-hero-meta">
              <span>{chapters.length} chapters</span>
              <span aria-hidden="true">·</span>
              <span>Free to read</span>
              <span aria-hidden="true">·</span>
              <span>
                {book.phase === "writing" ? "Working draft" : "Revised draft"}
              </span>
            </p>
          )}
        </div>
        <figure className="home-hero-figure">
          <HeroPicture />
          <figcaption>From the film of Chapter One</figcaption>
        </figure>
      </section>

      <Newsletter variant="strip" />

      {firstChapter && opening && (
        <section className="first-page" aria-labelledby="first-page-title">
          <div className="first-page-intro">
            <p className="kicker kicker-paper">The first page</p>
            <h2 id="first-page-title">{firstChapter.title}</h2>
            <p className="first-page-summary">{firstChapter.description}</p>
            <p className="first-page-note">
              <strong>
                Chapter One · v{firstChapter.version}
                {firstChapter.readingMinutes > 0 &&
                  ` · ${firstChapter.readingMinutes} min read`}
              </strong>
              A working draft. It contains strong language, coercion and family
              violence.
            </p>
          </div>
          <article className="first-page-sheet" aria-label="The opening of Chapter One">
            <p className="first-page-running">
              <span>Chapter One</span>
              <span>{firstChapter.title}</span>
            </p>
            <Prose body={opening} />
            <Link href={`/chapters/${firstChapter.slug}`} className="button-ink">
              Keep reading <span aria-hidden="true">→</span>
            </Link>
          </article>
        </section>
      )}

      {chapters.length > 0 && (
        <section className="home-chapters" aria-labelledby="chapters-title">
          <div className="home-section-head">
            <div>
              <p className="kicker kicker-paper">Chapters</p>
              <h2 id="chapters-title">{chapters.length} chapters so far</h2>
            </div>
            <ContinueReadingCard
              chapters={readable.map(
                ({ slug, number, title, description, version, readingMinutes }) => ({
                  slug,
                  number,
                  title,
                  description,
                  version,
                  readingMinutes,
                }),
              )}
            />
          </div>
          <ol className="home-chapter-grid">
            {chapters.map((chapter) => (
              <li key={chapter.id}>
                <Link href={`/chapters/${chapter.slug}`}>
                  <span className="home-chapter-number">
                    {String(chapter.number).padStart(2, "0")}
                  </span>
                  <span>{chapter.title}</span>
                </Link>
              </li>
            ))}
          </ol>
          <p className="home-chapters-note">
            Every chapter is free. When a chapter is revised in public it keeps
            its address and shows its new version.{" "}
            <Link href="/chapters">The chapter index</Link>
          </p>
        </section>
      )}

      <FilmFeature film={homecoming} />

      {notes.length > 0 && (
        <section className="home-notebook" aria-labelledby="notebook-title">
          <div className="home-section-head">
            <div>
              <p className="kicker">The notebook</p>
              <h2 id="notebook-title">How the book is being made</h2>
            </div>
            <Link href="/archive" className="text-link">
              All notebook entries <span aria-hidden="true">→</span>
            </Link>
          </div>
          <ol className="home-notebook-grid">
            {notes.map((entry) => {
              const number = entry.chapter && chapterNumber.get(entry.chapter);
              return (
                <li key={entry.id}>
                  <Link href={`/archive/${entry.slug}`}>
                    <span className="home-note-meta">
                      <span>{entry.type === "cut" ? "Cut material" : entry.type}</span>
                      {entry.date && (
                        <time dateTime={entry.date}>{formatDate(entry.date)}</time>
                      )}
                    </span>
                    <span className="home-note-title">{entry.title}</span>
                    <span className="home-note-summary">{entry.summary}</span>
                    <span className="home-note-boundary">
                      {entry.spoilerLevel === "none"
                        ? "No spoilers"
                        : number
                          ? `Safe after Chapter ${number}`
                          : `${entry.spoilerLevel} spoilers`}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </section>
      )}

      <section className="home-support" aria-labelledby="support-title">
        <p className="kicker kicker-paper">Come along for the rest</p>
        <h2 id="support-title">Follow the book all the way to print.</h2>
        <div className="home-support-grid">
          <div>
            <p className="home-support-label">Free</p>
            <h3>The newsletter</h3>
            <p>
              New chapters and notebook entries, sent when they&apos;re ready.
              The simplest way not to lose your place.
            </p>
            <a href="#newsletter" className="button-ink">
              Subscribe
            </a>
          </div>
          {patreonUrl && (
            <div>
              <p className="home-support-label">Patreon</p>
              <h3>Back the writing</h3>
              <p>
                Help a dad of four find the hours to finish the book.
              </p>
              <a href={patreonUrl} className="button-line">
                Become a patron
              </a>
            </div>
          )}
          <div>
            <p className="home-support-label">
              {book.releaseUrl ? "Out now" : "Not yet published"}
            </p>
            <h3>Own the finished book</h3>
            {book.releaseUrl ? (
              <>
                <p>
                  {book.workingTitle ?? "The novel"} is finished. Find it
                  wherever you like to buy books.
                </p>
                <a href={book.releaseUrl} className="button-line">
                  Buy the book
                </a>
              </>
            ) : (
              <>
                <p>
                  {book.workingTitle ?? "The novel"} is still being written.
                  Subscribers will be the first to hear when it&apos;s out, and
                  where to buy it.
                </p>
                <a href="#newsletter" className="button-line">
                  Tell me when it&apos;s out
                </a>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="home-about" aria-labelledby="about-title">
        <Image
          src="/jonathan-hill.jpg"
          alt="Jonathan Hill"
          width={800}
          height={1000}
          sizes="(max-width: 800px) 96px, 320px"
        />
        <div>
          <p className="kicker kicker-paper">About</p>
          <h2 id="about-title">{pages.about.title}</h2>
          <p className="home-about-copy">
            I&apos;m a dad of four from Stockport, writing my first novel.
            Instead of disappearing for a year and pretending the book arrived
            fully formed, I&apos;m showing the process as I go: the bits that
            work, the bits that don&apos;t, and the decisions that change
            everything.
          </p>
          <p className="home-about-links">
            <a href={xProfile}>Follow on X · @hexakin</a>
            <Link href="/about">More about me</Link>
          </p>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(homeStructuredData(book)),
        }}
      />
    </main>
  );
}
