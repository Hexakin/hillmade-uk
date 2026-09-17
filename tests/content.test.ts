import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { after, test } from "node:test";
import {
  archiveSchema,
  bookSchema,
  chapterSchema,
  getContent,
  readSources,
  selectArchive,
} from "../lib/content";
import { shareImage, shareKeys } from "../lib/share-image";
import { generateFeed } from "../lib/feed";
import { renderMarkdown } from "../lib/markdown";
import { changeFullText, publicationReport } from "../lib/publication";
import {
  createFixtures,
  privateSentinel,
  withdrawnSentinel,
  writeMarkdown,
} from "./fixtures";
const root = fs.mkdtempSync(path.join(os.tmpdir(), "hillmade-content-test-"));
createFixtures(root);
after(() => {
  assert.equal(path.dirname(root), os.tmpdir());
  assert.ok(path.basename(root).startsWith("hillmade-content-test-"));
  fs.rmSync(root, { recursive: true, force: true });
});
test("unset book values remain unset rather than acquiring invented dates or counts", () => {
  const content = getContent(root);
  assert.equal(content.book.startedAt, null);
  assert.equal(content.book.wordCount, null);
});
test("archive sorts deterministically by date, then ID", () => {
  const entries = getContent(root).archive;
  assert.deepEqual(
    entries.map((entry) => entry.id),
    ["qa-excerpt", "qa-first", "qa-change"],
  );
  assert.deepEqual(
    selectArchive(entries, "all", "oldest").map((entry) => entry.id),
    ["qa-change", "qa-first", "qa-excerpt"],
  );
});
test("filters preserve sorting and handle unknown types", () => {
  const entries = getContent(root).archive;
  assert.equal(selectArchive(entries, "changes", "newest")[0].id, "qa-change");
  assert.equal(
    selectArchive(entries, "excerpts", "oldest")[0].id,
    "qa-excerpt",
  );
  assert.equal(selectArchive(entries, "not-a-type", "newest").length, 3);
});
test("private records never enter the public projection", () => {
  const publicContent = JSON.stringify(getContent(root));
  assert.ok(!publicContent.includes(privateSentinel));
  assert.ok(!publicContent.includes("PRIVATE_TITLE"));
  assert.ok(!publicContent.includes("PRIVATE_CHAPTER_TITLE"));
});
test("withdrawn chapter bodies are removed before rendering", () => {
  const chapter = getContent(root).chapters.find(
    (chapter) => chapter.status === "withdrawn",
  )!;
  assert.equal(chapter.body, "");
  assert.equal(chapter.bodyAvailable, false);
  assert.ok(!JSON.stringify(getContent(root)).includes(withdrawnSentinel));
  assert.ok(
    readSources(root).chapters.some(
      (chapter) => chapter.body === withdrawnSentinel,
    ),
  );
});
test("global withdrawal suppresses all manuscript fields and is reversible", () => {
  const bookPath = path.join(root, "book/book.json");
  const original = fs.readFileSync(bookPath, "utf8");
  try {
    fs.writeFileSync(
      bookPath,
      JSON.stringify(changeFullText(readSources(root).book, false)),
    );
    const publicContent = getContent(root);
    assert.ok(
      publicContent.chapters.every(
        (chapter) => !chapter.body && !chapter.excerpt,
      ),
    );
    assert.ok(!JSON.stringify(publicContent).includes("EXCERPT_SENTINEL"));
    assert.ok(
      !JSON.stringify(publicContent).includes("ARCHIVE_MANUSCRIPT_SENTINEL"),
    );
    assert.equal(publicContent.chapters.length, 2);
    assert.equal(publicContent.archive.length, 3);
    assert.equal(publicationReport(root).fullTextChapterPages.length, 0);
  } finally {
    fs.writeFileSync(bookPath, original);
  }
  assert.equal(getContent(root).chapters[0].bodyAvailable, true);
});
test("report identifies public full text and retains private external references for review", () => {
  assert.equal(publicationReport(root).fullTextChapterPages.length, 1);
  assert.equal(publicationReport(root).manuscriptArchiveMaterial.length, 1);
  assert.ok(
    publicationReport(root).manualChecks.some((item) =>
      item.includes("Amazon"),
    ),
  );
});
test("schema rejects bad dates, unknown fields and non-X references", () => {
  const item = readSources(root).archive[0];
  const { body, file, ...frontmatter } = item;
  void body;
  void file;
  assert.equal(
    archiveSchema.safeParse({ ...frontmatter, date: "2000-02-31" }).success,
    false,
  );
  assert.equal(
    archiveSchema.safeParse({ ...frontmatter, privateNotes: "not public" })
      .success,
    false,
  );
  assert.equal(
    archiveSchema.safeParse({ ...frontmatter, xUrl: "https://example.com" })
      .success,
    false,
  );
  assert.equal(
    bookSchema.safeParse({ ...readSources(root).book, wordCount: -1 }).success,
    false,
  );
});
test("released chapter history requires genuine dates", () => {
  assert.equal(
    chapterSchema.safeParse({
      id: "test",
      slug: "test",
      number: 1,
      title: "Test",
      status: "withdrawn",
      description: "Test",
    }).success,
    false,
  );
});
test("RSS uses absolute URLs, escapes XML and carries no manuscript bodies", () => {
  const entries = getContent(root).archive;
  const feed = generateFeed([
    { ...entries[0], title: "A & B <test>" },
    ...entries.slice(1),
  ]);
  assert.ok(feed.startsWith('<?xml version="1.0"'));
  assert.ok(feed.includes("A &amp; B &lt;test&gt;"));
  assert.ok(feed.includes("https://hillmade.uk/archive/qa-excerpt"));
  assert.ok(!feed.includes("ARCHIVE_MANUSCRIPT_SENTINEL"));
  assert.ok(!feed.includes(privateSentinel));
});
test("missing archive and chapter folders do not throw, and unknown share keys stay 404", () => {
  const emptyRoot = fs.mkdtempSync(
    path.join(os.tmpdir(), "hillmade-empty-content-"),
  );
  try {
    fs.mkdirSync(path.join(emptyRoot, "book"));
    fs.mkdirSync(path.join(emptyRoot, "pages"));
    fs.writeFileSync(
      path.join(emptyRoot, "book/book.json"),
      JSON.stringify({
        workingTitle: null,
        premise: null,
        startedAt: null,
        phase: "writing",
        status: "At the beginning",
        fullTextEnabled: true,
        wordCount: null,
        releaseUrl: null,
      }),
    );
    writeMarkdown(
      emptyRoot,
      "pages",
      "start.md",
      {
        title: "LOCAL TEST FIXTURE — start",
        description: "Local test page, not production writing content.",
      },
      "LOCAL TEST FIXTURE.",
    );
    writeMarkdown(
      emptyRoot,
      "pages",
      "about.md",
      {
        title: "LOCAL TEST FIXTURE — about",
        description: "Local test page, not production writing content.",
      },
      "LOCAL TEST FIXTURE.",
    );
    fs.writeFileSync(
      path.join(emptyRoot, "pages/start-here.json"),
      JSON.stringify([
        {
          kind: "page",
          target: "/archive",
          label: "Test empty archive",
          note: "Local test fixture",
        },
      ]),
    );
    const sources = readSources(emptyRoot);
    assert.deepEqual(sources.archive, []);
    assert.deepEqual(sources.chapters, []);
    const content = getContent(emptyRoot);
    assert.deepEqual(content.archive, []);
    assert.deepEqual(content.chapters, []);
    assert.ok(shareKeys(emptyRoot).includes("home"));
    assert.equal(
      shareKeys(emptyRoot).some((key) => key.startsWith("archive--")),
      false,
    );
    assert.equal(shareImage("test", emptyRoot), null);
    assert.equal(shareImage("not-a-share-page", emptyRoot), null);
  } finally {
    assert.equal(path.dirname(emptyRoot), os.tmpdir());
    assert.ok(path.basename(emptyRoot).startsWith("hillmade-empty-content-"));
    fs.rmSync(emptyRoot, { recursive: true, force: true });
  }
});
test("Markdown strips scripts, dangerous links and event handlers", () => {
  const html = renderMarkdown(
    '<script>secret()</script>\n\n[bad](javascript:alert(1))\n\n<img src="/test.png" alt="Meaningful description" onerror="alert(1)">\n\n## A heading',
  );
  assert.ok(!html.includes("<script"));
  assert.ok(!html.includes("javascript:"));
  assert.ok(!html.includes("onerror"));
  assert.ok(html.includes('alt="Meaningful description"'));
  assert.ok(html.includes('loading="lazy"'));
  assert.ok(html.includes("<h2>A heading</h2>"));
});
