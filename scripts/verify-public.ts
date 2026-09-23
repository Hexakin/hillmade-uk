import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { getContent, readSources } from "../lib/content";
import { siteUrl } from "../lib/site";
import { feedItems } from "../lib/feed";
import {
  privateSentinel,
  withdrawnSentinel,
  publicSentinel,
} from "../tests/fixtures";
async function main() {
  const origin = process.env.VERIFY_ORIGIN || "http://localhost:3100";
  const fixtureMode = process.argv.includes("--fixtures");
  const { archive, chapters, book } = getContent();
  const pages = [
    "/",
    "/start",
    "/archive",
    "/chapters",
    "/about",
    "/privacy",
    ...archive.map((item) => `/archive/${item.slug}`),
    ...chapters.map((item) => `/chapters/${item.slug}`),
  ];
  const seenLinks = new Set<string>();
  const outputs: string[] = [];
  for (const pathname of pages) {
    const response = await fetch(new URL(pathname, origin));
    assert.equal(response.status, 200, pathname);
    const html = await response.text();
    outputs.push(html);
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    assert.ok(canonical, `${pathname}: canonical exists`);
    assert.equal(
      new URL(canonical).href,
      new URL(pathname, siteUrl).href,
      `${pathname}: canonical`,
    );
    assert.ok(html.includes('property="og:title"'), `${pathname}: OG`);
    assert.ok(html.includes('name="twitter:card"'), `${pathname}: Twitter`);
    assert.ok(html.includes('id="main"'), `${pathname}: main landmark`);
    assert.ok(!html.includes(privateSentinel));
    assert.ok(!html.includes(withdrawnSentinel));
    assert.ok(!html.includes("SERVER_SECRET_SENTINEL"));
    if (!book.fullTextEnabled) {
      assert.ok(!html.includes(publicSentinel));
      assert.ok(!html.includes("EXCERPT_SENTINEL"));
      assert.ok(!html.includes("ARCHIVE_MANUSCRIPT_SENTINEL"));
    }
    for (const match of html.matchAll(/href="(\/[^"<>]*)"/g)) {
      const href = match[1].replaceAll("&amp;", "&");
      if (!href.startsWith("/_next/") && !href.startsWith("/api/"))
        seenLinks.add(href);
    }
  }
  for (const href of seenLinks) {
    const response = await fetch(new URL(href, origin));
    assert.equal(response.status, 200, `Internal link ${href}`);
  }
  const feed = await fetch(new URL("/feed.xml", origin));
  assert.ok(feed.headers.get("content-type")?.includes("application/rss+xml"));
  const feedText = await feed.text();
  assert.ok(feedText.includes('<rss version="2.0"'));
  assert.equal((feedText.match(/<item>/g) || []).length, feedItems(archive, chapters).length);
  assert.ok(!feedText.includes(privateSentinel));
  const sitemap = await (await fetch(new URL("/sitemap.xml", origin))).text();
  assert.equal((sitemap.match(/<loc>/g) || []).length, pages.length);
  assert.ok(sitemap.includes(`${siteUrl}/archive`));
  const missing = await fetch(new URL("/this-page-does-not-exist", origin));
  assert.equal(missing.status, 404);
  assert.ok((await missing.text()).includes('name="robots" content="noindex'));
  for (const entry of [
    ...readSources().archive,
    ...readSources().chapters,
  ].filter((item) => !item.published && !item.preview)) {
    const folder = "number" in entry ? "chapters" : "archive";
    assert.equal(
      (await fetch(new URL(`/${folder}/${entry.slug}`, origin))).status,
      404,
    );
  }
  const image = await fetch(new URL("/share/home", origin));
  assert.equal((await fetch(new URL("/share/test", origin))).status, 404);
  assert.equal((await fetch(new URL("/share/not-a-share-page", origin))).status, 404);
  assert.equal((await fetch(new URL("/share/__proto__", origin))).status, 404);
  assert.equal((await fetch(new URL("/archive?type=constructor", origin))).status, 200);
  assert.ok(image.headers.get("content-type")?.includes("image/png"));
  const png = Buffer.from(await image.arrayBuffer());
  assert.equal(png.readUInt32BE(16), 1200);
  assert.equal(png.readUInt32BE(20), 630);
  const signup = await fetch(new URL("/api/subscribe", origin), {
    method: "POST",
    headers: { Origin: siteUrl, "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "reader@example.invalid",
      consent: true,
      website: process.argv.includes("--unconfigured") ? "" : "verification-honeypot",
    }),
  });
  assert.equal(
    signup.status,
    process.argv.includes("--unconfigured") ? 503 : 200,
    "Signup smoke test must not create a subscriber; --unconfigured requires missing provider settings",
  );
  for (const folder of [".next/static", ".next/server/app"]) {
    for (const file of fs
      .readdirSync(folder, { recursive: true })
      .filter((file) => /\.(js|html|rsc|body)$/.test(String(file)))) {
      const text = fs.readFileSync(path.join(folder, String(file)), "utf8");
      assert.ok(!text.includes(privateSentinel), file.toString());
      assert.ok(!text.includes(withdrawnSentinel), file.toString());
      if (folder === ".next/static")
        assert.ok(!text.includes("SERVER_SECRET_SENTINEL"), file.toString());
    }
  }
  if (fixtureMode && book.fullTextEnabled)
    assert.ok(
      outputs.some((html) => html.includes(publicSentinel)),
      "Public fixture body should be readable",
    );
  if (!fixtureMode)
    assert.ok(
      outputs.every((html) => !html.includes("LOCAL TEST FIXTURE")),
      "No test content in final build",
    );
  console.log(
    `Verified ${pages.length} public pages, ${seenLinks.size} internal links, RSS, sitemap, social PNG, 404, private/withdrawn content boundaries and safe unconfigured signup${fixtureMode ? " (isolated QA fixtures)" : " (real content)"}.`,
  );
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
