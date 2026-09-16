import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import { contentRoot, formatDate, getContent } from "./content";
import { lifecycleCopy } from "./site";
const staticPages: Record<string, { title: string; detail: string }> = {
  home: { title: "I'm writing a novel.", detail: "You can watch me do it." },
  start: {
    title: "Every book starts somewhere.",
    detail: "Start here / A reader's way in",
  },
  archive: {
    title: "The writing archive.",
    detail: "The book becoming itself",
  },
  chapters: {
    title: "Chapter by chapter.",
    detail: "The manuscript / Public drafts",
  },
  about: {
    title: "I'm Jonathan.",
    detail: "A dad of four. From Stockport. Making a story.",
  },
  privacy: {
    title: "Privacy.",
    detail: "A small site. A small amount of data.",
  },
};
export function shareKeys(root = contentRoot()) {
  const { archive, chapters } = getContent(root);
  return [
    ...Object.keys(staticPages),
    ...archive.map((item) => `archive--${item.slug}`),
    ...chapters.map((item) => `chapters--${item.slug}`),
  ];
}
export function shareImage(key: string, root = contentRoot()) {
  const { archive, chapters, book } = getContent(root);
  let item = Object.hasOwn(staticPages, key) ? staticPages[key] : undefined;
  if (key === "home")
    item = {
      title: lifecycleCopy[book.phase].lines.join(" "),
      detail: lifecycleCopy[book.phase].subtitle,
    };
  const entry = archive.find((item) => `archive--${item.slug}` === key);
  const chapter = chapters.find((item) => `chapters--${item.slug}` === key);
  if (entry)
    item = {
      title: entry.title,
      detail: `${formatDate(entry.date)}${entry.day ? ` / Day ${entry.day}` : ""} / ${entry.type}`,
    };
  if (chapter)
    item = {
      title: chapter.title,
      detail: `Chapter ${String(chapter.number).padStart(2, "0")} / ${!chapter.bodyAvailable && chapter.status !== "upcoming" ? "draft withdrawn" : chapter.status}${chapter.firstPublishedAt ? ` / ${formatDate(chapter.firstPublishedAt)}` : ""}`,
    };
  if (!item) return null;
  const font = fs.readFileSync(
    path.join(process.cwd(), "assets/fonts/newsreader.ttf"),
  );
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          background: "#191a18",
          color: "#ede7da",
          padding: "58px 72px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontFamily: "sans-serif",
            fontSize: 20,
            color: "#aaa99e",
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          <span
            style={{
              width: 36,
              height: 3,
              background: "#c47c70",
              marginRight: 22,
            }}
          />
          Jonathan Hill / A novel in public
        </div>
        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            fontFamily: "Newsreader",
            fontSize:
              item.title.length > 90 ? 56 : item.title.length > 55 ? 70 : 102,
            lineHeight: 1.05,
            letterSpacing: -2,
          }}
        >
          {item.title}
        </div>
        <div
          style={{
            display: "flex",
            borderTop: "1px solid #3b3d36",
            paddingTop: 24,
            justifyContent: "space-between",
            fontFamily: "sans-serif",
            fontSize: 22,
          }}
        >
          <span style={{ color: "#c47c70", maxWidth: 850 }}>{item.detail}</span>
          <span style={{ color: "#aaa99e" }}>@hexakin</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [{ name: "Newsreader", data: font, style: "normal", weight: 400 }],
    },
  );
}
