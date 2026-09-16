import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";
import { archiveSchema, chapterSchema, getContent } from "../lib/content";
import { generateFeed } from "../lib/feed";
import { createFixtures, writeMarkdown } from "./fixtures";
test("undated local preview is explicit, never a release, and fails closed outside local mode", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "hillmade-preview-"));
  const prior = process.env.LOCAL_CONTENT_PREVIEW;
  try {
    createFixtures(root);
    const chapter = { id: "preview", slug: "preview", number: 4, version: 1, title: "Preview", description: "Working draft", status: "public", published: false, preview: true };
    assert.equal(chapterSchema.safeParse(chapter).success, true);
    assert.equal(chapterSchema.safeParse({ ...chapter, published: true }).success, false);
    assert.equal(chapterSchema.safeParse({ ...chapter, preview: false }).success, false);
    const entry = { id: "preview", slug: "preview", type: "note", title: "Preview", summary: "Preview", preview: true, published: false };
    assert.equal(archiveSchema.safeParse(entry).success, true);
    assert.equal(archiveSchema.safeParse({ ...entry, preview: false }).success, false);
    writeMarkdown(root, "chapters", "preview.md", chapter, "PREVIEW_MANUSCRIPT");
    writeMarkdown(root, "archive", "preview.md", entry, "Preview note");
    delete process.env.LOCAL_CONTENT_PREVIEW;
    assert.throws(() => getContent(root), /local preview/i);
    process.env.LOCAL_CONTENT_PREVIEW = "1";
    const content = getContent(root);
    assert.equal(content.chapters.find(c => c.id === "preview")?.body, "PREVIEW_MANUSCRIPT");
    assert.equal(content.chapters.find(c => c.id === "preview")?.firstPublishedAt, undefined);
    assert.ok(!generateFeed(content.archive).includes("/archive/preview"));
  } finally {
    if (prior === undefined) delete process.env.LOCAL_CONTENT_PREVIEW;
    else process.env.LOCAL_CONTENT_PREVIEW = prior;
    fs.rmSync(root, { recursive: true, force: true });
  }
});
