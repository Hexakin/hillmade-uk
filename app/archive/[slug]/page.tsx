import { notFound } from "next/navigation";
import Link from "next/link";
import { MetadataLine, Newsletter, Prose } from "@/components/Editorial";
import { getContent } from "@/lib/content";
import { pageMetadata, absoluteUrl } from "@/lib/site";
export function generateStaticParams() {
  return getContent().archive.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getContent().archive.find((entry) => entry.slug === slug);
  if (!entry) notFound();
  return pageMetadata(entry.title, entry.summary, `/archive/${slug}`, {
    article: true,
    date: entry.date,
  });
}
export default async function EntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { archive, chapters } = getContent();
  const index = archive.findIndex((entry) => entry.slug === slug);
  if (index === -1) notFound();
  const entry = archive[index];
  const chapter = chapters.find((chapter) => chapter.id === entry.chapter);
  const structured = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: entry.title,
    description: entry.summary,
    datePublished: entry.date,
    author: { "@type": "Person", name: "Jonathan Hill" },
    mainEntityOfPage: absoluteUrl(`/archive/${slug}`),
  };
  return (
    <main id="main" tabIndex={-1}>
      <article className="article-shell">
        <header className="article-heading">
          <Link className="text-link" href="/archive">
            ← Back to the notebook
          </Link>
          <MetadataLine entry={entry} />
          <h1>{entry.title}</h1>
          <p className="article-summary">{entry.summary}</p>
        </header>
        <div className="article-body">
          {entry.spoilerLevel !== "none" && (
            <p className="content-note">
              This entry contains {entry.spoilerLevel} story spoilers.
            </p>
          )}
          {entry.manuscriptExcerpt && (
            <blockquote className="manuscript-excerpt">
              {entry.manuscriptExcerpt}
            </blockquote>
          )}
          {entry.body ? (
            <Prose body={entry.body} />
          ) : (
            <p className="content-note">
              The manuscript material in this entry has been withdrawn. Its
              place in the writing record remains.
            </p>
          )}
          {entry.tags.length > 0 && (
            <p className="meta article-tags">
              Filed under / {entry.tags.join(" · ")}
            </p>
          )}
          <div className="article-references">
            {entry.xUrl && (
              <a className="text-link" href={entry.xUrl}>
                Read / discuss this on X <span aria-hidden="true">↗</span>
              </a>
            )}
            {entry.xArticleUrl && (
              <a className="text-link" href={entry.xArticleUrl}>
                X Article <span aria-hidden="true">↗</span>
              </a>
            )}
            {chapter && (
              <Link className="text-link" href={`/chapters/${chapter.slug}`}>
                Related chapter: {chapter.title}{" "}
                <span aria-hidden="true">↗</span>
              </Link>
            )}
          </div>
          <nav
            className="chapter-pagination"
            aria-label="Neighbouring archive entries"
          >
            {archive[index + 1] && (
              <Link
                href={`/archive/${archive[index + 1].slug}`}
                className="text-link"
              >
                ← Previous entry
              </Link>
            )}
            {archive[index - 1] && (
              <Link
                href={`/archive/${archive[index - 1].slug}`}
                className="text-link"
              >
                Next entry →
              </Link>
            )}
          </nav>
        </div>
      </article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structured).replaceAll("<", "\\u003c"),
        }}
      />
      <Newsletter />
    </main>
  );
}
