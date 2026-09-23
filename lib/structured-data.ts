import type { ArchiveEntry, Book, Chapter } from "./content";
import { absoluteUrl, contactEmail, siteName, siteUrl, xProfile } from "./site";

const person = {
  "@type": "Person",
  "@id": `${siteUrl}/#author`,
  name: "Jonathan Hill",
  url: absoluteUrl("/about"),
  email: contactEmail,
  sameAs: [xProfile],
  jobTitle: "Writer",
  homeLocation: {
    "@type": "Place",
    name: "Stockport, England",
  },
} as const;

export function homeStructuredData(book: Book) {
  const graph: Record<string, unknown>[] = [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: siteName,
      description:
        book.premise ||
        "A novel written in public: draft chapters and a writing notebook.",
      inLanguage: "en-GB",
      publisher: { "@id": `${siteUrl}/#author` },
      author: { "@id": `${siteUrl}/#author` },
    },
    person,
  ];
  if (book.workingTitle) {
    graph.push({
      "@type": "Book",
      "@id": `${siteUrl}/#book`,
      name: book.workingTitle,
      url: absoluteUrl("/chapters"),
      description: book.premise || book.status,
      inLanguage: "en-GB",
      bookFormat: "https://schema.org/EBook",
      author: { "@id": `${siteUrl}/#author` },
      creativeWorkStatus: book.phase === "released" ? "Published" : "Draft",
      isAccessibleForFree: true,
    });
  }
  return { "@context": "https://schema.org", "@graph": graph };
}

export function chapterStructuredData(chapter: Chapter, book: Book) {
  return {
    "@context": "https://schema.org",
    "@type": "Chapter",
    "@id": absoluteUrl(`/chapters/${chapter.slug}`),
    url: absoluteUrl(`/chapters/${chapter.slug}`),
    name: chapter.title,
    headline: `Chapter ${chapter.number}: ${chapter.title}`,
    description: chapter.description,
    inLanguage: "en-GB",
    isAccessibleForFree: true,
    author: person,
    isPartOf: book.workingTitle
      ? {
          "@type": "Book",
          "@id": `${siteUrl}/#book`,
          name: book.workingTitle,
          url: absoluteUrl("/chapters"),
        }
      : { "@type": "CreativeWorkSeries", name: siteName, url: siteUrl },
    position: chapter.number,
    ...(chapter.firstPublishedAt
      ? { datePublished: chapter.firstPublishedAt }
      : {}),
    ...(chapter.updatedAt || chapter.firstPublishedAt
      ? {
          dateModified: chapter.updatedAt || chapter.firstPublishedAt,
        }
      : {}),
    version: String(chapter.version),
    ...(chapter.words
      ? { wordCount: chapter.words, timeRequired: `PT${chapter.readingMinutes}M` }
      : {}),
  };
}

export function archiveStructuredData(entry: ArchiveEntry) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: entry.title,
    description: entry.summary,
    ...(entry.date ? { datePublished: entry.date } : {}),
    author: person,
    mainEntityOfPage: absoluteUrl(`/archive/${entry.slug}`),
    isAccessibleForFree: true,
    inLanguage: "en-GB",
  };
}

export function jsonLd(data: unknown) {
  return JSON.stringify(data).replaceAll("<", "\\u003c");
}
