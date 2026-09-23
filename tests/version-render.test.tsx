import assert from "node:assert/strict";
import { test } from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { pageMetadata } from "../lib/site";
import { ChapterList } from "../components/Editorial";
import { chapterSchema } from "../lib/content";
test("local preview metadata requests no indexing", () => {
  const prior = process.env.LOCAL_CONTENT_PREVIEW;
  process.env.LOCAL_CONTENT_PREVIEW = "1";
  try { assert.deepEqual(pageMetadata("Draft", "Draft", "/chapters").robots, { index: false, follow: false }); }
  finally { if (prior === undefined) delete process.env.LOCAL_CONTENT_PREVIEW; else process.env.LOCAL_CONTENT_PREVIEW = prior; }
});
test("index labels the current chapter version and preview state", () => {
  const chapter = { ...chapterSchema.parse({ id: "one", slug: "one", number: 1, title: "Chapter One", description: "Draft", status: "public", preview: true, version: 1 }), body: "Text", file: "one.md", bodyAvailable: true, words: 1150, readingMinutes: 5 };
  const html = renderToStaticMarkup(ChapterList({ chapters: [chapter] }));
  assert.match(html, /v1/);
  assert.match(html, /Working draft/);
  assert.match(html, /5 min read/);
  assert.doesNotMatch(html, /public-preview|pending|approval/i);
});
