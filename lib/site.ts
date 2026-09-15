import type { Metadata } from "next";

export const siteUrl = "https://hillmade.uk";
export const siteName = "Jonathan Hill · A novel in public";
export const xProfile = "https://x.com/hexakin";
export const contactEmail = "jonathan.hill@hillmade.uk";
export const lifecycleCopy = {
  writing: {
    lines: ["I'm writing", "a novel."],
    subtitle: "You can watch me do it.",
    kicker: "An open notebook. An unfinished story.",
    description:
      "Excerpts, discoveries, characters, wrong turns. I'm sharing the work as the story takes shape. This is the record of the book becoming itself.",
  },
  editing: {
    lines: ["The draft", "is finished."],
    subtitle: "Now the story gets rewritten.",
    kicker: "The first draft is done. The work continues.",
    description:
      "The public writing phase has reached its last page. Now comes revision. The notebook keeps the discoveries, wrong turns and changes that brought the story here.",
  },
  prepublication: {
    lines: ["The draft", "is finished."],
    subtitle: "Getting the book ready to meet you.",
    kicker: "The next page / Publication",
    description:
      "The novel is moving toward publication. Its making-of record stays here: the decisions, rewrites and discoveries that made it what it is.",
  },
  released: {
    lines: ["I wrote", "a novel."],
    subtitle: "You watched it become itself.",
    kicker: "The book, and how it was made",
    description:
      "The book is finished. This is the record of how it got here: the excerpts, discoveries, characters and wrong turns you watched along the way.",
  },
} as const;
export const absoluteUrl = (pathname: string) =>
  new URL(pathname, siteUrl).href;

export function pageMetadata(
  title: string,
  description: string,
  pathname: string,
  options: { article?: boolean; date?: string; updated?: string } = {},
): Metadata {
  const image = `/share/${encodeURIComponent(pathname === "/" ? "home" : pathname.slice(1).replaceAll("/", "--"))}`;
  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl(pathname),
      types: { "application/rss+xml": absoluteUrl("/feed.xml") },
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(pathname),
      siteName,
      locale: "en_GB",
      images: [
        { url: absoluteUrl(image), width: 1200, height: 630, alt: title },
      ],
      ...(options.article
        ? {
            type: "article",
            publishedTime: options.date,
            modifiedTime: options.updated,
            authors: ["Jonathan Hill"],
          }
        : { type: "website" }),
    },
    twitter: {
      card: "summary_large_image",
      creator: "@hexakin",
      title,
      description,
      images: [absoluteUrl(image)],
    },
  };
}
