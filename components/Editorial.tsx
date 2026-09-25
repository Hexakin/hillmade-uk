import Link from "next/link";
import {
  formatDate,
  type ArchiveEntry,
  type Chapter,
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
export function Newsletter({
  variant = "section",
}: {
  variant?: "section" | "strip";
} = {}) {
  return (
    <section
      id="newsletter"
      className={`newsletter newsletter-${variant}`}
      aria-labelledby="newsletter-title"
    >
      <div>
        <h2 id="newsletter-title">Read each chapter the day it lands.</h2>
        <p>
          New chapters and notes from the notebook, by email. Free, and you can
          unsubscribe any time.
        </p>
      </div>
      <NewsletterForm {...newsletterState()} />
    </section>
  );
}
