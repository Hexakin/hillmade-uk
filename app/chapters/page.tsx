import Link from "next/link";
import { ChapterList, Newsletter } from "@/components/Editorial";
import { getContent } from "@/lib/content";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "Draft chapters",
  "Read the publicly available draft chapters of Jonathan Hill's novel, in order. Drafts can change; their history stays.",
  "/chapters",
);
export default function ChaptersPage() {
  const { chapters, book } = getContent();
  return (
    <main id="main" tabIndex={-1}>
      <header className="page-heading shell">
        <p className="meta">The manuscript / Public drafts</p>
        <h1>
          Chapter by chapter<span className="red-period">.</span>
        </h1>
        <p>
          Read the story as it stands. These are drafts: scenes can change,
          chapters can be revised, and nothing here is quite finished.
        </p>
      </header>
      <div className="shell">
        {!book.fullTextEnabled && (
          <p className="content-note">
            The full manuscript drafts are currently withdrawn. Their titles,
            revision notes and places in the writing history remain.
          </p>
        )}
        {chapters.length ? (
          <ChapterList chapters={chapters} />
        ) : (
          <div className="chapters-empty">
            <span aria-hidden="true">§</span>
            <h2>The first chapter is still ahead.</h2>
            <p>
              There aren&apos;t any public draft chapters yet. When a chapter is
              ready to share, you&apos;ll find it here, in reading order.
            </p>
            <Link href="/archive" className="text-link">
              In the meantime, the writing notebook{" "}
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        )}
      </div>
      <Newsletter />
    </main>
  );
}
