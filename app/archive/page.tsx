import Link from "next/link";
import {
  ArchiveTimeline,
  EmptyArchive,
  Newsletter,
} from "@/components/Editorial";
import { filterGroups, getContent, selectArchive } from "@/lib/content";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "The writing archive",
  "A chronological notebook of Jonathan Hill's novel in public: excerpts, characters, lore, revisions and draft chapters.",
  "/archive",
);
export default async function ArchivePage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; order?: string }>;
}) {
  const params = await searchParams;
  const type =
    params.type && Object.hasOwn(filterGroups, params.type)
      ? params.type
      : "all";
  const order = params.order === "oldest" ? "oldest" : "newest";
  const { archive } = getContent();
  const entries = selectArchive(archive, type, order);
  function href(nextType: string, nextOrder: string) {
    const query = new URLSearchParams();
    if (nextType !== "all") query.set("type", nextType);
    if (nextOrder === "oldest") query.set("order", "oldest");
    return `/archive${query.size ? `?${query}` : ""}`;
  }
  return (
    <main id="main" tabIndex={-1}>
      <header className="page-heading shell">
        <p className="meta">The book becoming itself</p>
        <h1>
          The writing archive<span className="red-period">.</span>
        </h1>
        <p>
          A public notebook. What I wrote, what I discovered, and what I changed
          my mind about. Earlier pages may tell a different story.
        </p>
      </header>
      <div className="shell">
        <div className="archive-controls">
          <nav className="archive-filters" aria-label="Filter archive by type">
            {Object.entries(filterGroups).map(([key, group]) => (
              <Link
                key={key}
                href={href(key, order)}
                aria-current={key === type ? "true" : undefined}
                scroll={false}
              >
                {group.label}
              </Link>
            ))}
          </nav>
          <nav className="archive-order" aria-label="Archive reading order">
            <Link
              href={href(type, "newest")}
              aria-current={order === "newest" ? "true" : undefined}
              scroll={false}
            >
              Newest first
            </Link>
            <Link
              href={href(type, "oldest")}
              aria-current={order === "oldest" ? "true" : undefined}
              scroll={false}
            >
              Oldest first
            </Link>
          </nav>
        </div>
        <p className="meta archive-count">
          {entries.length
            ? `${entries.length} ${entries.length === 1 ? "entry" : "entries"} / ${order} first`
            : archive.length
              ? "No entries of this type yet"
              : "The record starts with the first entry"}
        </p>
        <div className="archive-content">
          {entries.length ? (
            <ArchiveTimeline entries={entries} />
          ) : archive.length ? (
            <p className="content-note">
              Nothing under this heading yet.{" "}
              <Link href={href("all", order)}>Read all entries ↗</Link>
            </p>
          ) : (
            <EmptyArchive />
          )}
        </div>
      </div>
      <Newsletter />
    </main>
  );
}
