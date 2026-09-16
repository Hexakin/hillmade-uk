import { type ArchiveEntry } from "./content";
import { absoluteUrl, siteName } from "./site";
export const xml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
export function generateFeed(entries: ArchiveEntry[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${xml(siteName)}</title><link>${absoluteUrl("/archive")}</link><description>The public notebook of a novel being written.</description><language>en-gb</language><atom:link href="${absoluteUrl("/feed.xml")}" rel="self" type="application/rss+xml"/>${entries.filter(entry => !entry.preview && entry.date).map((entry) => `<item><title>${xml(entry.title)}</title><link>${absoluteUrl(`/archive/${entry.slug}`)}</link><guid isPermaLink="false">${absoluteUrl(`/archive/id/${entry.id}`)}</guid><pubDate>${new Date(`${entry.date}T00:00:00Z`).toUTCString()}</pubDate><description>${xml(entry.summary)}</description><category>${xml(entry.type)}</category></item>`).join("")}</channel></rss>`;
}
