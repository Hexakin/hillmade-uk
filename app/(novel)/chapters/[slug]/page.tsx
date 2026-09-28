import Link from "next/link";
import { notFound } from "next/navigation";
import { Prose } from "@/components/Editorial";
import { NewsletterForm } from "@/components/NewsletterForm";
import { newsletterState } from "@/lib/newsletter";
import { formatDate, getContent } from "@/lib/content";
import { pageMetadata } from "@/lib/site";
import { chapterStructuredData, jsonLd } from "@/lib/structured-data";
import { RememberChapter } from "@/components/ContinueReading";
export function generateStaticParams() {
  return getContent().chapters.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { book, chapters } = getContent();
  const chapter = chapters.find((chapter) => chapter.slug === slug);
  if (!chapter) notFound();
  const title = book.workingTitle
    ? `${chapter.title} · ${book.workingTitle}`
    : `Chapter ${chapter.number}: ${chapter.title}`;
  return pageMetadata(title, chapter.description, `/chapters/${slug}`, {
    article: true,
    date: chapter.firstPublishedAt,
    updated: chapter.updatedAt,
  });
}
export default async function ChapterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { book, chapters } = getContent();
  const index = chapters.findIndex((chapter) => chapter.slug === slug);
  if (index === -1) notFound();
  const chapter = chapters[index];
  const previous = chapters[index - 1];
  const next = chapters[index + 1];
  return (
    <main id="main" tabIndex={-1}>
      <header className="article-heading article-shell">
        <Link className="text-link" href="/chapters">
          ← All draft chapters
        </Link>
        <p className="meta metadata-line">
          <span className="type-mark">
            Chapter {String(chapter.number).padStart(2, "0")} · v
            {chapter.version}
          </span>
          <span>
            {chapter.status === "withdrawn" ||
            (chapter.status !== "upcoming" && !chapter.bodyAvailable)
              ? "Draft withdrawn"
              : chapter.status === "upcoming"
                ? "Upcoming"
                : chapter.status === "revised"
                  ? "Revised working draft"
                  : "Working draft"}
          </span>
          {chapter.firstPublishedAt && (
            <time dateTime={chapter.firstPublishedAt}>
              {formatDate(chapter.firstPublishedAt)}
            </time>
          )}
          {chapter.readingMinutes > 0 && (
            <span>{chapter.readingMinutes} min read</span>
          )}
        </p>
        <h1>{chapter.title}</h1>
        <p className="article-summary">{chapter.description}</p>
        {chapter.updatedAt && (
          <p className="meta archive-count">
            Last public revision /{" "}
            <time dateTime={chapter.updatedAt}>
              {formatDate(chapter.updatedAt)}
            </time>
          </p>
        )}
        {chapter.revisionNote && (
          <p className="content-note">{chapter.revisionNote}</p>
        )}
        {chapter.bodyAvailable && chapter.number === 1 && (
          <p className="content-note chapter-welcome">
            Working draft of{" "}
            {book.workingTitle ? (
              <em>{book.workingTitle}</em>
            ) : (
              "the novel"
            )}
            . Contains strong language, coercion and family violence.{" "}
            <Link href="/start">How versions work ↗</Link>
          </p>
        )}
      </header>
      {chapter.bodyAvailable ? (
        <article
          className="reader-sheet"
          aria-label={`Chapter ${chapter.number} manuscript`}
        >
          <Prose body={chapter.body} />
          <p className="meta reader-colophon">
            End of chapter {String(chapter.number).padStart(2, "0")} / v
            {chapter.version} / Working draft
          </p>
        </article>
      ) : (
        <article className="article-shell article-body">
          <p className="content-note">
            {chapter.status === "upcoming"
              ? "This chapter isn't public yet. Its draft will appear here when it's ready to share."
              : `Chapter ${chapter.number} was shared while the novel was being written in public. The full draft has now been withdrawn. This page preserves its place in the writing history.`}
          </p>
          {chapter.excerpt && (
            <blockquote className="manuscript-excerpt">
              {chapter.excerpt}
            </blockquote>
          )}
        </article>
      )}
      <div className="article-shell chapter-after">
        {chapter.xArticleUrl && (
          <p className="content-note">
            <a href={chapter.xArticleUrl}>
              Originally shared as an X Article ↗
            </a>
            . External availability may differ from this archive.
          </p>
        )}
      </div>
      <section
        id="newsletter"
        className="chapter-end"
        aria-label="After this chapter"
      >
        {next ? (
          <Link href={`/chapters/${next.slug}`} className="chapter-end-next">
            <span className="kicker">Next chapter</span>
            <span className="chapter-end-title">
              {next.number} · {next.title}
            </span>
            <span className="chapter-end-cta">
              Read on <span aria-hidden="true">→</span>
            </span>
          </Link>
        ) : (
          <div className="chapter-end-next">
            <span className="kicker">You&apos;re up to date</span>
            <span className="chapter-end-title">
              {book.phase === "writing"
                ? `Chapter ${chapter.number + 1} is being written.`
                : "That's the latest chapter."}
            </span>
          </div>
        )}
        <div className="chapter-end-signup">
          <h2>{next ? "New chapters by email." : "Get it the day it lands."}</h2>
          <p>
            Free, sent when a chapter is ready. Unsubscribe any time.
          </p>
          <NewsletterForm {...newsletterState()} />
        </div>
      </section>
      <nav className="chapter-end-links" aria-label="Chapter reading order">
        {previous ? (
          <Link href={`/chapters/${previous.slug}`}>
            ← Chapter {previous.number}: {previous.title}
          </Link>
        ) : (
          <span />
        )}
        <Link href="/chapters">All chapters</Link>
      </nav>
      {chapter.bodyAvailable && (
        <RememberChapter
          chapter={{
            slug: chapter.slug,
            number: chapter.number,
            title: chapter.title,
            total: chapters.length,
          }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(chapterStructuredData(chapter, book)),
        }}
      />
    </main>
  );
}
