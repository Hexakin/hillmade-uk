"use client";
import Link from "next/link";
import { useEffect, useSyncExternalStore } from "react";

/**
 * Per-browser reading position. Stored only in this visitor's localStorage;
 * nothing is sent to the server. Failures (private mode, blocked storage)
 * silently fall back to the server-rendered "start" card.
 */
const KEY = "hillmade:reading";

type Stored = { slug: string; finished: boolean; at: number };
export type CardChapter = {
  slug: string;
  number: number;
  title: string;
  description: string;
  version: number;
  readingMinutes: number;
};

function rawValue(): string | null {
  try {
    return window.localStorage.getItem(KEY);
  } catch {
    return null;
  }
}
function parse(raw: string | null): Stored | null {
  try {
    if (!raw) return null;
    const value = JSON.parse(raw);
    return typeof value?.slug === "string" ? (value as Stored) : null;
  } catch {
    return null;
  }
}
const read = () => parse(rawValue());
const subscribe = (onChange: () => void) => {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
};
function write(value: Stored) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(value));
  } catch {
    /* storage unavailable: nothing to remember */
  }
}

/** Mounted on chapter pages: records the visit, and completion at the colophon. */
export function RememberChapter({
  chapter,
}: {
  chapter: { slug: string; number: number; title: string; total: number };
}) {
  useEffect(() => {
    const previous = read();
    write({
      slug: chapter.slug,
      finished: previous?.slug === chapter.slug ? previous.finished : false,
      at: Date.now(),
    });
    const end = document.querySelector(".reader-colophon");
    if (!end || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        write({ slug: chapter.slug, finished: true, at: Date.now() });
        observer.disconnect();
      }
    });
    observer.observe(end);
    return () => observer.disconnect();
  }, [chapter.slug]);
  return null;
}

const pad = (n: number) => String(n).padStart(2, "0");

/** Homepage card: "Start reading" by default, "Continue" / "Up next" for returning readers. */
export function ContinueReadingCard({ chapters }: { chapters: CardChapter[] }) {
  // Server snapshot is null, so the first paint always matches the static HTML.
  const raw = useSyncExternalStore(subscribe, rawValue, () => null);
  const position = parse(raw);

  const first = chapters[0];
  if (!first) return null;
  const index = position
    ? chapters.findIndex((chapter) => chapter.slug === position.slug)
    : -1;
  let mode: "start" | "continue" | "next" | "caught-up" = "start";
  let chapter = first;
  if (index !== -1) {
    if (!position!.finished) {
      mode = "continue";
      chapter = chapters[index];
    } else if (chapters[index + 1]) {
      mode = "next";
      chapter = chapters[index + 1];
    } else {
      mode = "caught-up";
      chapter = chapters[index];
    }
  }
  const label = {
    start: "Start reading",
    continue: "Continue reading",
    next: "Up next",
    "caught-up": "You're up to date",
  }[mode];
  const cta = {
    start: `Begin Chapter ${chapter.number}`,
    continue: "Pick up where you left off",
    next: `Read Chapter ${chapter.number}`,
    "caught-up": "Get the next chapter by email",
  }[mode];
  return (
    <aside className="chapter-preview" aria-live="polite">
      <p className="meta section-label">{label}</p>
      <span className="sheet-number" aria-hidden="true">
        {pad(chapter.number)}
      </span>
      <h2>{chapter.title}</h2>
      <p>
        {mode === "caught-up"
          ? `You've read to the end of Chapter ${chapter.number}, the latest public chapter. New chapters are announced by email and on X.`
          : chapter.description}
      </p>
      <Link
        href={mode === "caught-up" ? "/#newsletter" : `/chapters/${chapter.slug}`}
        className="text-link"
      >
        {cta}
        <span aria-hidden="true">↗</span>
      </Link>
      <span className="sheet-foot meta">
        Working draft v{chapter.version}
        {chapter.readingMinutes > 0 && ` / ${chapter.readingMinutes} min read`}
        {mode !== "start" && (
          <>
            {" / "}
            <Link href="/chapters" className="sheet-foot-link">
              All chapters
            </Link>
          </>
        )}
      </span>
    </aside>
  );
}
