import Link from "next/link";
import { notFound } from "next/navigation";
import { Newsletter, Prose } from "@/components/Editorial";
import { formatDate, getContent } from "@/lib/content";
import { pageMetadata } from "@/lib/site";
export function generateStaticParams() {
  return getContent().chapters.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const chapter = getContent().chapters.find(
    (chapter) => chapter.slug === slug,
  );
  if (!chapter) notFound();
  return pageMetadata(
    `Chapter ${chapter.number}: ${chapter.title}`,
    chapter.description,
    `/chapters/${slug}`,
    {
      article: true,
      date: chapter.firstPublishedAt,
      updated: chapter.updatedAt,
    },
  );
}
export default async function ChapterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { chapters } = getContent();
  const index = chapters.findIndex((chapter) => chapter.slug === slug);
  if (index === -1) notFound();
  const chapter = chapters[index];
  return (
    <main id="main" tabIndex={-1}>
      <header className="article-heading article-shell">
        <Link className="text-link" href="/chapters">
          ← All draft chapters
        </Link>
        <p className="meta metadata-line">
          <span className="type-mark">
            Chapter {String(chapter.number).padStart(2, "0")}
          </span>
          <span>
            {chapter.status === "withdrawn" ||
            (chapter.status !== "upcoming" && !chapter.bodyAvailable)
              ? "Draft withdrawn"
              : chapter.status === "upcoming"
                ? "Upcoming"
                : `${chapter.status} draft`}
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
      </header>
      {chapter.bodyAvailable ? (
        <article
          className="reader-sheet"
          aria-label={`Chapter ${chapter.number} manuscript`}
        >
          <Prose body={chapter.body} />
          <p className="meta reader-colophon">
            End of chapter {String(chapter.number).padStart(2, "0")} / A public
            working draft
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
      <div className="article-shell">
        {chapter.xArticleUrl && (
          <p className="content-note">
            <a href={chapter.xArticleUrl}>
              Originally shared as an X Article ↗
            </a>
            . External availability may differ from this archive.
          </p>
        )}
        <nav className="chapter-pagination" aria-label="Chapter reading order">
          {chapters[index - 1] && (
            <Link
              href={`/chapters/${chapters[index - 1].slug}`}
              className="text-link"
            >
              ← Chapter {chapters[index - 1].number}
            </Link>
          )}
          {chapters[index + 1] && (
            <Link
              href={`/chapters/${chapters[index + 1].slug}`}
              className="text-link"
            >
              Chapter {chapters[index + 1].number} →
            </Link>
          )}
        </nav>
      </div>
      <Newsletter />
    </main>
  );
}
