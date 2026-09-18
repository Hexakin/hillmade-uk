import Link from "next/link";
import { notFound } from "next/navigation";
import { Newsletter, Prose } from "@/components/Editorial";
import { formatDate, getContent } from "@/lib/content";
import { pageMetadata } from "@/lib/site";
import { chapterStructuredData, jsonLd } from "@/lib/structured-data";
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
        <nav className="chapter-pagination" aria-label="Chapter reading order">
          {previous ? (
            <Link
              href={`/chapters/${previous.slug}`}
              className="text-link"
            >
              ← Chapter {previous.number}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/chapters/${next.slug}`}
              className="button-paper chapter-continue"
            >
              Continue to Chapter {next.number}{" "}
              <span aria-hidden="true">→</span>
            </Link>
          ) : (
            <Link href="/#newsletter" className="button-paper chapter-continue">
              Follow the next chapters <span aria-hidden="true">↗</span>
            </Link>
          )}
        </nav>
      </div>
      <Newsletter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(chapterStructuredData(chapter, book)),
        }}
      />
    </main>
  );
}
