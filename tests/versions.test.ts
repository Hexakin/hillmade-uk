import assert from "node:assert/strict";
import { test } from "node:test";
import { chapterSchema } from "../lib/content";
const base = { id: "chapter-1", slug: "chapter-1", number: 1, title: "Chapter One", description: "Working draft", status: "public", firstPublishedAt: "2026-01-01" };
test("first public editions default to v1 and revisions advance independently", () => {
  assert.equal(chapterSchema.parse(base).version, 1);
  assert.equal(chapterSchema.parse({ ...base, version: 3, status: "revised", updatedAt: "2026-01-02", revisionNote: "Revised scene." }).version, 3);
  for (const version of [0, -1, 1.5]) assert.equal(chapterSchema.safeParse({ ...base, version }).success, false);
});
test("later editions require revised status, date and a public change note", () => {
  assert.equal(chapterSchema.safeParse({ ...base, version: 2 }).success, false);
  assert.equal(chapterSchema.safeParse({ ...base, version: 1, status: "revised", updatedAt: "2026-01-02", revisionNote: "Changed" }).success, false);
  assert.equal(chapterSchema.safeParse({ ...base, version: 2, status: "revised", updatedAt: "2026-01-02" }).success, false);
});
