import Link from "next/link";
import {
  ArchiveTimeline,
  BookStatus,
  EmptyArchive,
  Newsletter,
  StartHereList,
} from "@/components/Editorial";
import { getContent } from "@/lib/content";
import { pageMetadata, lifecycleCopy } from "@/lib/site";

export function generateMetadata() {
  const { book } = getContent();
  const copy = lifecycleCopy[book.phase];
  return pageMetadata(
    book.workingTitle || `${copy.lines.join(" ")} ${copy.subtitle}`,
    book.premise || copy.description,
    "/",
  );
}
export default function Home() {
  const { book, archive, chapters, start } = getContent();
  const latestChapter = chapters
    .filter((chapter) => chapter.bodyAvailable)
    .sort(
      (a, b) =>
        (b.updatedAt || b.firstPublishedAt || "").localeCompare(
          a.updatedAt || a.firstPublishedAt || "",
        ) || b.number - a.number,
    )[0];
  const copy = lifecycleCopy[book.phase];
  return (
    <main id="main" tabIndex={-1}>
      <section className="hero shell" aria-labelledby="hero-title">
        <div className="hero-main">
          <p className="meta hero-kicker">
            <span className="red-line" />
            {copy.kicker}
          </p>
          <h1 id="hero-title">
            {copy.lines[0]}
            <br />
            {copy.lines[1].slice(0, -1)}
            <span className="red-period">.</span>
          </h1>
          <p className="hero-subtitle">
            {book.phase === "writing" ? (
              <>
                You can watch me <em>do it.</em>
              </>
            ) : (
              copy.subtitle
            )}
          </p>
          <p className="hero-copy">
            {book.phase === "writing" ? (
              <>
                Excerpts, discoveries, characters, wrong turns.
                <br className="desktop-break" /> I&apos;m sharing the work as
                the story takes shape.
                <br className="desktop-break" /> This is the record of the book
                becoming itself.
              </>
            ) : (
              copy.description
            )}
          </p>
          <div className="hero-actions">
            <Link href={chapters[0] ? `/chapters/${chapters[0].slug}` : "/start"} className="button-paper">
              {chapters[0] ? "Start with Chapter One" : "Start at the beginning"} <span aria-hidden="true">↗</span>
            </Link>
            <Link
              href={archive[0] ? `/archive/${archive[0].slug}` : "/archive"}
              className="text-link"
            >
              {archive[0] ? "Read the latest update" : "Explore the notebook"}
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <p className="hero-byline">
            By Jonathan Hill <span aria-hidden="true">·</span>{" "}
            <a href="https://x.com/hexakin">
              @hexakin on X <span aria-hidden="true">↗</span>
            </a>
          </p>
        </div>
        <BookStatus book={book} />
      </section>
      <div className="revision-rule shell">
        <p>
          <span className="revision-strike">The finished story.</span>{" "}
          <span className="revision-hand">The story becoming itself.</span>
        </p>
        <span className="meta">Drafts change. The record stays.</span>
      </div>
      <section className="writing-desk shell" aria-labelledby="desk-title">
        <div className="desk-main">
          <div className="section-heading">
            <div>
              <p className="meta section-label">The public notebook</p>
              <h2 id="desk-title">From the writing desk</h2>
            </div>
            <Link href="/archive" className="text-link">
              View archive <span aria-hidden="true">↗</span>
            </Link>
          </div>
          {archive.length ? (
            <ArchiveTimeline entries={archive.slice(0, 3)} heading="h3" />
          ) : (
            <EmptyArchive heading="h3" />
          )}
        </div>
        <aside className="chapter-preview">
          <p className="meta section-label">
            {latestChapter ? "The latest draft chapter" : "The manuscript"}
          </p>
          <span className="sheet-number" aria-hidden="true">
            {latestChapter
              ? String(latestChapter.number).padStart(2, "0")
              : "§"}
          </span>
          <h2>{latestChapter ? latestChapter.title : "Chapter by chapter."}</h2>
          <p>
            {latestChapter
              ? latestChapter.description
              : "Full draft chapters will live here as they're ready to share. Still rough. Still changing."}
          </p>
          <Link
            href={
              latestChapter ? `/chapters/${latestChapter.slug}` : "/chapters"
            }
            className="text-link"
          >
            {latestChapter ? "Read the chapter" : "The chapter index"}
            <span aria-hidden="true">↗</span>
          </Link>
          <span className="sheet-foot meta">
            A work in progress /{" "}
            {latestChapter ? `Working draft v${latestChapter.version}` : "Not yet published"}
          </span>
        </aside>
      </section>
      <section className="start-section shell" aria-labelledby="start-title">
        <div>
          <p className="meta section-label">A place to begin</p>
          <h2 id="start-title">
            Arrived halfway
            <br />
            through a thought?
          </h2>
          <p>
            You don&apos;t have to catch up with a whole timeline.
            <br />
            Here&apos;s a way into the story.
          </p>
        </div>
        <StartHereList items={start} />
      </section>
      {book.releaseUrl && (
        <p className="shell release-link">
          <a className="button-paper" href={book.releaseUrl}>
            Find the finished book <span aria-hidden="true">↗</span>
          </a>
        </p>
      )}
      <Newsletter />
    </main>
  );
}
