import fs from "node:fs";
import path from "node:path";

export const privateSentinel = "PRIVATE_BODY_SENTINEL_7da20";
export const withdrawnSentinel = "WITHDRAWN_BODY_SENTINEL_9ca31";
export const publicSentinel = "PUBLIC_BODY_SENTINEL_3aa62";
export function writeMarkdown(
  root: string,
  folder: string,
  name: string,
  data: Record<string, unknown>,
  body: string,
) {
  fs.mkdirSync(path.join(root, folder), { recursive: true });
  const frontmatter = Object.entries(data)
    .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
    .join("\n");
  fs.writeFileSync(
    path.join(root, folder, name),
    `---\n${frontmatter}\n---\n\n${body}\n`,
  );
}
export function createFixtures(root: string) {
  for (const folder of ["book", "pages", "archive", "chapters"])
    fs.mkdirSync(path.join(root, folder), { recursive: true });
  fs.writeFileSync(
    path.join(root, "book/book.json"),
    JSON.stringify(
      {
        workingTitle: null,
        premise: null,
        startedAt: null,
        phase: "writing",
        status: "At the beginning",
        fullTextEnabled: true,
        wordCount: null,
        releaseUrl: null,
      },
      null,
      2,
    ),
  );
  for (const name of ["start", "about"])
    writeMarkdown(
      root,
      "pages",
      `${name}.md`,
      {
        title: `LOCAL TEST FIXTURE — ${name}`,
        description: "Local test page, not production writing content.",
      },
      "LOCAL TEST FIXTURE. This page exists to test the content interface.",
    );
  fs.writeFileSync(
    path.join(root, "pages/start-here.json"),
    JSON.stringify([
      {
        kind: "page",
        target: "/archive?order=oldest",
        label: "Test chronological reading",
        note: "Local test fixture",
      },
      {
        kind: "chapter",
        target: "qa-public",
        label: "Test the public chapter",
        note: "Local test fixture",
      },
    ]),
  );
  const baseEntry = {
    published: true,
    date: "2000-01-01",
    type: "note",
    summary:
      "LOCAL TEST FIXTURE — checking the writing archive. This is not novel content.",
  };
  writeMarkdown(
    root,
    "archive",
    "01-qa-first.md",
    {
      ...baseEntry,
      id: "qa-first",
      slug: "qa-first",
      title: "LOCAL TEST FIXTURE — the first notebook entry",
      day: 1,
    },
    "This is a local test of the archive reader. No story or publication history is represented.\n\n## A test of reading typography\n\nA paragraph of ordinary test text, with **emphasis** and a [chapter link](/chapters/qa-public). The page should stay comfortable to read on a phone.",
  );
  writeMarkdown(
    root,
    "archive",
    "02-qa-change.md",
    {
      ...baseEntry,
      id: "qa-change",
      slug: "qa-change",
      title:
        "LOCAL TEST FIXTURE — a deliberately long title to check how the archive handles wrapping on a narrow mobile screen",
      type: "revision",
      chapter: "qa-public",
      tags: ["test fixture"],
      spoilerLevel: "mild",
    },
    "This local fixture checks long titles, relation links, spoiler labels and revision filtering.\n\n> A test annotation, rather than a piece of manuscript.",
  );
  writeMarkdown(
    root,
    "archive",
    "03-qa-excerpt.md",
    {
      ...baseEntry,
      id: "qa-excerpt",
      slug: "qa-excerpt",
      date: "2000-01-02",
      title: "LOCAL TEST FIXTURE — manuscript visibility",
      type: "excerpt",
      manuscriptExcerpt: "EXCERPT_SENTINEL_54db3 — local typography fixture.",
      manuscriptBody: true,
    },
    "ARCHIVE_MANUSCRIPT_SENTINEL_44cc1 — local fixture text.",
  );
  writeMarkdown(
    root,
    "archive",
    "04-private.md",
    {
      ...baseEntry,
      id: "qa-private",
      slug: "qa-private",
      published: false,
      title: "PRIVATE_TITLE_SENTINEL_8ac24",
    },
    privateSentinel,
  );
  const baseChapter = {
    published: true,
    firstPublishedAt: "2000-01-01",
    description:
      "LOCAL TEST FIXTURE. This is a reader-layout check, not a chapter of the novel.",
  };
  writeMarkdown(
    root,
    "chapters",
    "01-qa-public.md",
    {
      ...baseChapter,
      id: "qa-public",
      slug: "qa-public",
      number: 1,
      title: "LOCAL TEST FIXTURE — a chapter reader",
      status: "revised",
      updatedAt: "2000-01-02",
      revisionNote: "Local fixture for revision metadata.",
      excerpt: "TEST_CHAPTER_EXCERPT_8ed2",
    },
    `${publicSentinel}\n\nThis is deliberately plain test material for the chapter reader. It isn't a draft of the novel.\n\n${Array.from({ length: 10 }, (_, i) => `Paragraph ${i + 1}. A long chapter needs a readable line length, a calm background and enough room between paragraphs. This local test text repeats to make scrolling, reading order and mobile typography easy to inspect.`).join("\n\n")}\n\n* * *\n\nThe end of the local typography test.`,
  );
  writeMarkdown(
    root,
    "chapters",
    "02-qa-withdrawn.md",
    {
      ...baseChapter,
      id: "qa-withdrawn",
      slug: "qa-withdrawn",
      number: 2,
      title: "LOCAL TEST FIXTURE — withdrawn history",
      status: "withdrawn",
    },
    withdrawnSentinel,
  );
  writeMarkdown(
    root,
    "chapters",
    "03-qa-private.md",
    {
      ...baseChapter,
      id: "qa-private-chapter",
      slug: "qa-private-chapter",
      number: 3,
      title: "PRIVATE_CHAPTER_TITLE_2a4b1",
      status: "public",
      published: false,
    },
    privateSentinel,
  );
}
