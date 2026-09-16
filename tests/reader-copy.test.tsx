import assert from "node:assert/strict";
import fs from "node:fs";
import { test } from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { MetadataLine } from "../components/Editorial";
import { archiveSchema, formatDate, getContent } from "../lib/content";

const operatorCopy = /public-preview|local preview|publication (?:date |is still )?pending|proposed public|prepared for review|final approval/i;
test("reader surfaces contain finished copy, not hosting or approval instructions", () => {
  const prior = process.env.LOCAL_CONTENT_PREVIEW;
  process.env.LOCAL_CONTENT_PREVIEW = "1";
  try {
    const content = getContent();
    for (const value of [content.book, content.pages, content.start, ...content.archive, ...content.chapters])
      assert.doesNotMatch(JSON.stringify(value), operatorCopy);
    for (const file of ["app/layout.tsx", "app/page.tsx", "app/chapters/[slug]/page.tsx", "components/Editorial.tsx", "lib/share-image.tsx"])
      assert.doesNotMatch(fs.readFileSync(file, "utf8"), operatorCopy, file);
  } finally {
    if (prior === undefined) delete process.env.LOCAL_CONTENT_PREVIEW;
    else process.env.LOCAL_CONTENT_PREVIEW = prior;
  }
});
test("undated archive metadata omits dates without placeholder labels", () => {
  const entry = { ...archiveSchema.parse({ id: "note", slug: "note", type: "note", title: "Note", summary: "Note", preview: true, published: false }), body: "Text", file: "note.md" };
  const html = renderToStaticMarkup(MetadataLine({ entry }));
  assert.doesNotMatch(html, operatorCopy);
  assert.doesNotMatch(html, /<time/);
  assert.match(html, /note/);
  assert.equal(formatDate(), "");
});
