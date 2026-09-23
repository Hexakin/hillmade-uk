import Link from "next/link";
import {
  formatDate,
  type ArchiveEntry,
  type Chapter,
  type Book,
  type StartItem,
} from "@/lib/content";
import { renderMarkdown } from "@/lib/markdown";
import { newsletterState } from "@/lib/newsletter";
import { NewsletterForm } from "./NewsletterForm";
export function Prose({ body }: { body: string }) {
  return (
    <div
      className="prose"
      dangerouslySetInnerHTML={{ __html: renderMarkdown(body) }}
    />
  );
}
export function MetadataLine({ entry }: { entry: ArchiveEntry }) {
  return (
    <p className="meta metadata-line">
      {entry.date && <time dateTime={entry.date}>{formatDate(entry.date)}</time>}
      {entry.day && <span>Day {String(entry.day).padStart(3, "0")}</span>}
      <span className="type-mark">
        {entry.type === "cut" ? "Cut material" : entry.type}
      </span>
      {entry.spoilerLevel !== "none" && (
        <span>{entry.spoilerLevel} spoilers</span>
      )}
    </p>
  );
}
export function ArchiveTimeline({
  entries,
  heading = "h2",
}: {
  entries: ArchiveEntry[];
  heading?: "h2" | "h3";
}) {
  const Heading = heading;
  return (
    <ol className="timeline">
      {entries.map((entry) => (
        <li key={entry.id}>
          <article>
            <MetadataLine entry={entry} />
            <Heading>
              <Link href={`/archive/${entry.slug}`}>
                {entry.title}
                <span aria-hidden="true">↗</span>
              </Link>
            </Heading>
            <p className="entry-summary">{entry.summary}</p>
            {entry.manuscriptExcerpt && (
              <blockquote className="desk-excerpt">
                {entry.manuscriptExcerpt}
              </blockquote>
            )}
          </article>
        </li>
      ))}
    </ol>
  );
}
export function EmptyArchive({
  heading = "h2",
}: { heading?: "h2" | "h3" } = {}) {
  const Heading = heading;
  return (
    <div className="empty-archive">
      <span className="empty-number" aria-hidden="true">
        —
      </span>
      <div>
        <p className="meta">The notebook is open</p>
        <Heading>The first entry will appear here.</Heading>
        <p>
          Excerpts, discoveries, wrong turns. A record of the story as it takes
          shape.
        </p>
        <a href="https://x.com/hexakin" className="text-link">
          Follow the writing on X <span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  );
}
export function ChapterList({ chapters }: { chapters: Chapter[] }) {
  return (
    <ol className="chapter-list">
      {chapters.map((chapter) => (
        <li key={chapter.id}>
          <Link href={`/chapters/${chapter.slug}`}>
            <span className="chapter-number">
              {String(chapter.number).padStart(2, "0")}
            </span>
            <span>
              <span className="chapter-title">{chapter.title}</span>
              <span className="chapter-description">{chapter.description}</span>
            </span>
            <span className="meta chapter-state">
              {chapter.status === "public" ? "Working draft" : chapter.status} · v{chapter.version}
              {chapter.readingMinutes > 0 && (
                <span className="chapter-time">
                  {" "}· {chapter.readingMinutes} min read
                </span>
              )}
              <span aria-hidden="true"> ↗</span>
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
export function BookStatus({
  book,
  chapterCount = 0,
  firstChapterHref,
}: {
  book: Book;
  chapterCount?: number;
  firstChapterHref?: string;
}) {
  return (
    <aside className="book-status">
      <p className="meta section-label">
        <span className="red-dot" />
        The current book
      </p>
      <h2>{book.workingTitle || "Working title"}</h2>
      <p className="book-premise">
        {book.premise ||
          "Premise coming soon. For now, a blank page and the work ahead."}
      </p>
      <dl>
        <div>
          <dt>Status</dt>
          <dd>{book.status}</dd>
        </div>
        <div>
          <dt>Manuscript</dt>
          <dd>
            {book.phase === "writing"
              ? "In progress"
              : book.phase === "editing"
                ? "In revision"
                : book.phase === "released"
                  ? "Released"
                  : "Preparing for publication"}
          </dd>
        </div>
        {chapterCount > 0 && (
          <div>
            <dt>Chapters</dt>
            <dd>{chapterCount} public</dd>
          </div>
        )}
        {book.startedAt && (
          <div>
            <dt>Began</dt>
            <dd>{formatDate(book.startedAt)}</dd>
          </div>
        )}
        {book.wordCount !== null && (
          <div>
            <dt>Words</dt>
            <dd>{book.wordCount.toLocaleString("en-GB")}</dd>
          </div>
        )}
      </dl>
      {firstChapterHref ? (
        <Link href={firstChapterHref} className="text-link book-status-link">
          Begin with Chapter One <span aria-hidden="true">↗</span>
        </Link>
      ) : (
        <p className="margin-note">
          Nothing is set in ink.<span aria-hidden="true"> ↙</span>
        </p>
      )}
    </aside>
  );
}
export function StartHereList({ items }: { items: StartItem[] }) {
  return (
    <ol className="start-list">
      {items.map((item, index) => (
        <li key={`${item.kind}-${item.target}`}>
          <span className="meta">{String(index + 1).padStart(2, "0")}</span>
          <Link href={item.href}>
            <span>{item.label}</span>
            <small>{item.note}</small>
          </Link>
          <span aria-hidden="true">↗</span>
        </li>
      ))}
    </ol>
  );
}
export function Newsletter() {
  return (
    <section
      id="newsletter"
      className="newsletter shell"
      aria-labelledby="newsletter-title"
    >
      <div>
        <p className="meta section-label">
          A letter, when there&apos;s something to tell
        </p>
        <h2 id="newsletter-title">
          Want to know how
          <br />
          the book is going?
        </h2>
        <p>
          New chapters, important changes, and eventually the finished book. A
          quiet way to keep your place.
        </p>
      </div>
      <NewsletterForm {...newsletterState()} />
    </section>
  );
}
