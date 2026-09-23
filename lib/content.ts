import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import { localPreview } from "./preview";
export { localPreview } from "./preview";

const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const date = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/)
  .refine((value) => {
    const parsed = new Date(`${value}T00:00:00Z`);
    return (
      !Number.isNaN(parsed.valueOf()) &&
      parsed.toISOString().slice(0, 10) === value
    );
  }, "Use a real calendar date in YYYY-MM-DD format");
const text = z.string().trim().min(1);
const xUrl = z
  .string()
  .url()
  .refine((value) => {
    const url = new URL(value);
    return (
      url.protocol === "https:" &&
      ["x.com", "www.x.com", "twitter.com", "www.twitter.com"].includes(
        url.hostname,
      )
    );
  }, "Use an HTTPS X/Twitter URL");

export const archiveTypes = [
  "excerpt",
  "scene",
  "character",
  "lore",
  "discovery",
  "decision",
  "revision",
  "cut",
  "problem",
  "breakthrough",
  "progress",
  "chapter",
  "note",
] as const;
export const archiveSchema = z
  .object({
    id: slug,
    slug,
    date: date.optional(),
    day: z.number().int().positive().optional(),
    type: z.enum(archiveTypes),
    title: text.max(180),
    summary: text.max(500),
    published: z.boolean().default(false),
    preview: z.boolean().default(false),
    xUrl: xUrl.optional(),
    xArticleUrl: xUrl.optional(),
    chapter: slug.optional(),
    tags: z.array(text.max(60)).max(8).default([]),
    spoilerLevel: z.enum(["none", "mild", "major"]).default("none"),
    manuscriptExcerpt: text.optional(),
    manuscriptBody: z.boolean().default(false),
  })
  .strict()
  .superRefine((value, ctx) => {
    if (!value.date && !value.preview)
      ctx.addIssue({ code: "custom", path: ["date"], message: "Archive releases need a real date" });
    if (value.preview && (value.published || value.date))
      ctx.addIssue({ code: "custom", path: ["preview"], message: "Local preview must be unpublished and undated" });
  });

export const chapterSchema = z
  .object({
    id: slug,
    slug,
    number: z.number().int().positive(),
    version: z.number().int().positive().default(1),
    title: text.max(180),
    published: z.boolean().default(false),
    preview: z.boolean().default(false),
    status: z.enum(["upcoming", "public", "revised", "withdrawn"]),
    firstPublishedAt: date.optional(),
    updatedAt: date.optional(),
    xArticleUrl: xUrl.optional(),
    excerpt: text.max(600).optional(),
    revisionNote: text.max(1000).optional(),
    description: text.max(500),
  })
  .strict()
  .superRefine((value, ctx) => {
    if (value.preview && (value.published || value.firstPublishedAt || value.updatedAt || value.status !== "public" || value.version !== 1))
      ctx.addIssue({ code: "custom", path: ["preview"], message: "Local preview must be an undated, unpublished first edition" });
    if (!value.preview && value.status !== "upcoming" && !value.firstPublishedAt)
      ctx.addIssue({
        code: "custom",
        path: ["firstPublishedAt"],
        message: "Released chapter history needs its first public date",
      });
    if (value.status === "public" && value.version !== 1)
      ctx.addIssue({ code: "custom", path: ["version"], message: "Later editions use revised status" });
    if (value.status === "revised" && (value.version < 2 || !value.revisionNote))
      ctx.addIssue({ code: "custom", path: ["version"], message: "Revised chapters need version 2 or later and a public revision note" });
    if (value.status === "revised" && !value.updatedAt)
      ctx.addIssue({
        code: "custom",
        path: ["updatedAt"],
        message: "Revised chapters need a revision date",
      });
    if (
      value.updatedAt &&
      value.firstPublishedAt &&
      value.updatedAt < value.firstPublishedAt
    )
      ctx.addIssue({
        code: "custom",
        path: ["updatedAt"],
        message: "Revision cannot precede first publication",
      });
  });

export const bookSchema = z
  .object({
    workingTitle: text.nullable(),
    premise: text.nullable(),
    startedAt: date.nullable(),
    phase: z.enum(["writing", "editing", "prepublication", "released"]),
    status: text,
    fullTextEnabled: z.boolean(),
    wordCount: z.number().int().nonnegative().nullable(),
    releaseUrl: z
      .string()
      .url()
      .refine((url) => url.startsWith("https://"))
      .nullable(),
  })
  .strict();
export const pageSchema = z
  .object({ title: text, description: text.max(500) })
  .strict();
export const startSchema = z.array(
  z
    .object({
      label: text,
      note: text,
      kind: z.enum(["page", "archive", "chapter"]),
      target: text,
    })
    .strict(),
);

export type ArchiveEntry = z.infer<typeof archiveSchema> & {
  body: string;
  file: string;
};
export type Chapter = z.infer<typeof chapterSchema> & {
  body: string;
  file: string;
  bodyAvailable: boolean;
  /** Word count of the public text (0 when withheld). */
  words: number;
  /** Estimated reading time in whole minutes at ~230 wpm (0 when withheld). */
  readingMinutes: number;
};
export type Book = z.infer<typeof bookSchema>;
export type StartItem = z.infer<typeof startSchema>[number] & { href: string };
export const contentRoot = () =>
  process.env.CONTENT_DIR
    ? path.resolve(/* turbopackIgnore: true */ process.env.CONTENT_DIR)
    : path.join(process.cwd(), "content");

function json(root: string, filename: string) {
  return JSON.parse(fs.readFileSync(path.join(root, filename), "utf8"));
}
function files(root: string, directory: string) {
  const folder = path.join(root, directory);
  let names: string[];
  try {
    names = fs.readdirSync(folder);
  } catch (error) {
    // Vercel NFT may omit empty content folders.
    if (error instanceof Error && "code" in error && error.code === "ENOENT")
      return [];
    throw error;
  }
  return names
    .filter((name) => name.endsWith(".md"))
    .sort()
    .map((name) => {
      const file = path.join(folder, name);
      const parsed = matter(fs.readFileSync(file, "utf8"));
      return {
        data: parsed.data,
        body: parsed.content.trim(),
        file: path.relative(root, file).replaceAll("\\", "/"),
      };
    });
}
function unique(items: { id: string; slug: string }[], name: string) {
  for (const key of ["id", "slug"] as const) {
    if (new Set(items.map((item) => item[key])).size !== items.length)
      throw new Error(`Duplicate ${name} ${key}`);
  }
}

/** Validate all sources; keep this filesystem reader out of client components. */
export function readSources(root = contentRoot()) {
  const book = bookSchema.parse(json(root, "book/book.json"));
  const archive = files(root, "archive").map(({ data, ...rest }) => ({
    ...archiveSchema.parse(data),
    ...rest,
  }));
  const chapters = files(root, "chapters").map(({ data, ...rest }) => ({
    ...chapterSchema.parse(data),
    ...rest,
  }));
  if ([...archive, ...chapters].some(item => item.preview) && !localPreview())
    throw new Error("Unapproved local preview content: use LOCAL_CONTENT_PREVIEW=1 only on loopback; publication approval and real release dates are required before deployment");
  unique(archive, "archive");
  unique(chapters, "chapter");
  if (new Set(chapters.map((item) => item.number)).size !== chapters.length)
    throw new Error("Duplicate chapter number");
  for (const entry of archive) {
    if (
      entry.chapter &&
      !chapters.some((chapter) => chapter.id === entry.chapter)
    )
      throw new Error(
        `${entry.file}: unknown related chapter ${entry.chapter}`,
      );
  }
  for (const chapter of chapters) {
    if (
      (chapter.published || chapter.preview) &&
      ["public", "revised"].includes(chapter.status) &&
      !chapter.body
    )
      throw new Error(`${chapter.file}: a public chapter needs Markdown text`);
  }
  const pages = Object.fromEntries(
    files(root, "pages").map(({ data, body, file }) => [
      path.basename(file, ".md"),
      { ...pageSchema.parse(data), body },
    ]),
  );
  for (const name of ["start", "about"])
    if (!pages[name]) throw new Error(`Missing content/pages/${name}.md`);
  const start = startSchema.parse(json(root, "pages/start-here.json"));
  const allowedPages = [
    "/start",
    "/archive",
    "/archive?order=oldest",
    "/chapters",
    "/about",
    "/#newsletter",
  ];
  for (const item of start) {
    const exists =
      item.kind === "page"
        ? allowedPages.includes(item.target)
        : (item.kind === "archive" ? archive : chapters).some(
            (entry) => entry.id === item.target && (entry.published || (localPreview() && entry.preview)),
          );
    if (!exists)
      throw new Error(
        `Start Here link '${item.label}' must point to an existing public destination`,
      );
  }
  return { book, archive, chapters, pages, start };
}

/** The sole public projection: withheld bodies never reach HTML, feeds or RSC props. */
export function getContent(root = contentRoot()) {
  const source = readSources(root);
  const chapters: Chapter[] = source.chapters
    .filter((item) => item.published || (localPreview() && item.preview))
    .map((item) => {
      const bodyAvailable =
        source.book.fullTextEnabled &&
        ["public", "revised"].includes(item.status);
      const words = bodyAvailable ? countWords(item.body) : 0;
      return {
        ...item,
        body: bodyAvailable ? item.body : "",
        bodyAvailable,
        words,
        readingMinutes: words ? Math.max(1, Math.round(words / 230)) : 0,
        excerpt: source.book.fullTextEnabled ? item.excerpt : undefined,
      };
    })
    .sort((a, b) => a.number - b.number || a.id.localeCompare(b.id, "en"));
  const archive: ArchiveEntry[] = source.archive
    .filter((item) => item.published || (localPreview() && item.preview))
    .map((item) => ({
      ...item,
      chapter: chapters.some((chapter) => chapter.id === item.chapter)
        ? item.chapter
        : undefined,
      body:
        !source.book.fullTextEnabled && item.manuscriptBody ? "" : item.body,
      manuscriptExcerpt: source.book.fullTextEnabled
        ? item.manuscriptExcerpt
        : undefined,
    }))
    .sort(
      (a, b) =>
        (b.date || "").localeCompare(a.date || "", "en") || b.id.localeCompare(a.id, "en"),
    );
  const start: StartItem[] = source.start.map((item) => ({
    ...item,
    href:
      item.kind === "page"
        ? item.target
        : `/${item.kind === "chapter" ? "chapters" : "archive"}/${(item.kind === "chapter" ? chapters : archive).find((entry) => entry.id === item.target)!.slug}`,
  }));
  return { book: source.book, archive, chapters, pages: source.pages, start };
}

export function countWords(markdown: string) {
  const plain = markdown
    .replace(/<[^>]+>/g, " ")
    .replace(/[*_#>`~\[\]()|-]+/g, " ");
  return plain.split(/\s+/).filter((word) => /[\p{L}\p{N}]/u.test(word)).length;
}
export function formatDate(value?: string) {
  if (!value) return "";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}
export const filterGroups = {
  all: { label: "All", types: archiveTypes },
  excerpts: { label: "Excerpts", types: ["excerpt", "scene"] },
  characters: { label: "Characters", types: ["character"] },
  lore: { label: "Lore", types: ["lore"] },
  changes: {
    label: "Changes",
    types: [
      "decision",
      "revision",
      "cut",
      "problem",
      "discovery",
      "breakthrough",
    ],
  },
  chapters: { label: "Chapters", types: ["chapter"] },
} as const;
export function selectArchive(
  entries: ArchiveEntry[],
  type: string,
  order: string,
) {
  const group = Object.hasOwn(filterGroups, type)
    ? filterGroups[type as keyof typeof filterGroups]
    : filterGroups.all;
  const selected = entries.filter((entry) =>
    (group.types as readonly string[]).includes(entry.type),
  );
  return order === "oldest" ? selected.toReversed() : selected;
}
