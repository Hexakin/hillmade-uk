import { getContent, readSources, type Book } from "./content";
import { absoluteUrl } from "./site";
export function publicationReport(root?: string) {
  const source = readSources(root);
  const content = getContent(root);
  return {
    generatedAt: new Date().toISOString(),
    fullTextEnabled: source.book.fullTextEnabled,
    fullTextChapterPages: content.chapters
      .filter((chapter) => chapter.bodyAvailable)
      .map((chapter) => ({
        id: chapter.id,
        file: chapter.file,
        url: absoluteUrl(`/chapters/${chapter.slug}`),
      })),
    survivingChapterExcerpts: content.chapters
      .filter((chapter) => chapter.excerpt)
      .map((chapter) => ({ id: chapter.id, file: chapter.file })),
    manuscriptArchiveMaterial: content.archive
      .filter(
        (entry) =>
          entry.manuscriptExcerpt || (entry.manuscriptBody && entry.body),
      )
      .map((entry) => ({
        id: entry.id,
        file: entry.file,
        url: absoluteUrl(`/archive/${entry.slug}`),
      })),
    externalReferences: [
      ...source.chapters.flatMap((chapter) =>
        chapter.xArticleUrl
          ? [
              {
                kind: "chapter",
                id: chapter.id,
                url: chapter.xArticleUrl,
                localPublished: chapter.published,
                verifyManually: true,
              },
            ]
          : [],
      ),
      ...source.archive.flatMap((entry) =>
        [entry.xUrl, entry.xArticleUrl]
          .filter((url): url is string => Boolean(url))
          .map((url) => ({
            kind: "archive",
            id: entry.id,
            url,
            localPublished: entry.published,
            verifyManually: true,
          })),
      ),
    ],
    manualChecks: [
      "Review every archive body, summary, image and excerpt for unmarked manuscript material.",
      "Review external X posts and Articles; local withdrawal does not remove them.",
      "Review other websites, social media, feeds, cached pages, downloads and previous deployments.",
      "Rebuild and deploy, then verify live URLs, HTML and RSC payloads.",
      "Verify Amazon's current terms directly before any KDP Select enrolment; this report is not a compliance guarantee.",
    ],
  };
}
export function changeFullText(book: Book, enabled: boolean): Book {
  return { ...book, fullTextEnabled: enabled };
}
