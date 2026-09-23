import { type ArchiveEntry, type Chapter } from "./content";
import { absoluteUrl, siteName } from "./site";
export const xml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

type FeedItem = {
  title: string;
  link: string;
  guid: string;
  date: string;
  description: string;
  category: string;
  order: string;
};

/** "Chapter 3" stays as-is; "The Mirror" becomes "Chapter 2: The Mirror". */
export function chapterFeedTitle(chapter: Pick<Chapter, "number" | "title">) {
  return /^chapter\s+\d+$/i.test(chapter.title.trim())
    ? chapter.title
    : `Chapter ${chapter.number}: ${chapter.title}`;
}

/** Chapters appear once per public edition (new guid when a revision is published). */
export function feedItems(entries: ArchiveEntry[], chapters: Chapter[] = []) {
  const items: FeedItem[] = [
    ...entries
      .filter((entry) => !entry.preview && entry.date)
      .map((entry) => ({
        title: entry.title,
        link: absoluteUrl(`/archive/${entry.slug}`),
        guid: absoluteUrl(`/archive/id/${entry.id}`),
        date: entry.date!,
        description: entry.summary,
        category: entry.type,
        order: `a-${entry.id}`,
      })),
    ...chapters
      .filter(
        (chapter) =>
          !chapter.preview &&
          chapter.bodyAvailable &&
          (chapter.updatedAt || chapter.firstPublishedAt),
      )
      .map((chapter) => ({
        title:
          chapter.status === "revised"
            ? `${chapterFeedTitle(chapter)} (revised, v${chapter.version})`
            : chapterFeedTitle(chapter),
        link: absoluteUrl(`/chapters/${chapter.slug}`),
        guid: absoluteUrl(`/chapters/id/${chapter.id}/v${chapter.version}`),
        date: (chapter.status === "revised" && chapter.updatedAt) ||
          chapter.firstPublishedAt ||
          chapter.updatedAt!,
        description:
          chapter.status === "revised" && chapter.revisionNote
            ? `${chapter.description} Revision: ${chapter.revisionNote}`
            : chapter.description,
        category: "chapter",
        order: `c-${String(chapter.number).padStart(4, "0")}`,
      })),
  ];
  // Newest first; same-day ties keep a stable, readable order (later chapters first).
  return items.sort(
    (a, b) => b.date.localeCompare(a.date) || b.order.localeCompare(a.order),
  );
}

export function generateFeed(entries: ArchiveEntry[], chapters: Chapter[] = []) {
  const items = feedItems(entries, chapters)
    .map(
      (item) =>
        `<item><title>${xml(item.title)}</title><link>${item.link}</link><guid isPermaLink="false">${item.guid}</guid><pubDate>${new Date(`${item.date}T00:00:00Z`).toUTCString()}</pubDate><description>${xml(item.description)}</description><category>${xml(item.category)}</category></item>`,
    )
    .join("");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${xml(siteName)}</title><link>${absoluteUrl("/")}</link><description>New draft chapters and notebook entries from a novel being written in public.</description><language>en-gb</language><atom:link href="${absoluteUrl("/feed.xml")}" rel="self" type="application/rss+xml"/>${items}</channel></rss>`;
}
