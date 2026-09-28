import type { CSSProperties } from "react";
import Link from "next/link";
import {
  Anton,
  Atkinson_Hyperlegible_Next,
  Press_Start_2P,
  Space_Mono,
} from "next/font/google";
import { getContent } from "@/lib/content";
import { contactEmail, pageMetadata, siteUrl, xProfile } from "@/lib/site";
import { jsonLd } from "@/lib/structured-data";
import "./hub.css";

// The hub is the front door for everything Jonathan makes. Each door borrows
// the type and colour of the site behind it, so these faces load only here.
const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
});
const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
});
const atkinson = Atkinson_Hyperlegible_Next({
  subsets: ["latin"],
  adjustFontFallback: false,
  fallback: ["system-ui", "sans-serif"],
  variable: "--font-atkinson",
});
const pixel = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pixel",
});

const description =
  "Jonathan Hill makes things: a novel written in public, genre-fused music as Hexakin, a plain-English guide to living with AI, and games at DropForge.";

export function generateMetadata() {
  return {
    ...pageMetadata("Jonathan Hill makes things", description, "/"),
    title: { absolute: "Jonathan Hill · Hillmade" },
  };
}

// Chapter One, from the end of the walk home.
const novelLine =
  "He looked up at the door camera when he sensed its subtle pivot tracking him. He reached for the door handle. The lock disengaged the moment his fingers touched it. Seamless. CILLA was always seamless.";

const wordStyle = (i: number) => ({ "--i": i }) as CSSProperties;

export default function Hub() {
  const { book, chapters } = getContent();
  const first = chapters.find((chapter) => chapter.bodyAvailable);
  const fonts = [anton, spaceMono, atkinson, pixel]
    .map((f) => f.variable)
    .join(" ");
  return (
    <div className={`hub ${fonts}`}>
      <a className="skip-link" href="#doors">
        Skip to the doors
      </a>
      <header className="hub-top">
        <p className="hub-wordmark">Hillmade</p>
        <p className="hub-where">Jonathan Hill · Stockport</p>
      </header>

      <main id="main" tabIndex={-1}>
        <div className="hub-intro">
          <h1>Jonathan Hill makes things.</h1>
          <p>
            A novel, music, games, and a plain-English guide to living with AI.
            Pick a door.
          </p>
        </div>

        <ul className="doors" id="doors" aria-label="Everything I make">
          <li className="door door-novel">
            <div className="door-art" aria-hidden="true" />
            <div className="door-body">
              <p className="door-index">01 / The novel</p>
              <h2 className="door-title">
                <Link href="/novel" className="door-link">
                  {book.workingTitle ?? "A novel in public"}
                </Link>
              </h2>
              <p className="door-tag">
                A novel, written in public. Free to read.
              </p>
              <div className="door-reveal">
                <div>
                  <blockquote className="door-taste novel-quote">
                    <p>
                      {novelLine.split(" ").map((word, i) => (
                        <span key={i} style={wordStyle(i)}>
                          {word}{" "}
                        </span>
                      ))}
                      <span className="novel-caret" aria-hidden="true" />
                    </p>
                    <footer>From Chapter One</footer>
                  </blockquote>
                  <p className="door-actions">
                    <span className="door-go">
                      Read the novel <span aria-hidden="true">→</span>
                    </span>
                    {first && (
                      <Link
                        className="door-aside"
                        href={`/chapters/${first.slug}`}
                      >
                        Start Chapter One
                      </Link>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </li>

          <li className="door door-hexakin">
            <div className="door-art" aria-hidden="true" />
            <div className="door-body">
              <p className="door-index">02 / Music</p>
              <h2 className="door-title">
                <a
                  href="https://hexakin.com"
                  className="door-link"
                  data-text="HEXAKIN"
                >
                  Hexakin
                </a>
              </h2>
              <p className="door-tag">
                Dark electronic · DnB · Metal · Industrial hip hop
              </p>
              <div className="door-reveal">
                <div>
                  <div className="door-taste hex-player">
                    <p className="hex-now">
                      <span>Start with</span>
                      <strong>Despair (The One)</strong>
                      <span>Digital hardcore / drill · 156 bpm</span>
                    </p>
                    <div className="hex-bars" aria-hidden="true">
                      {Array.from({ length: 28 }, (_, i) => (
                        <span key={i} style={wordStyle(i)} />
                      ))}
                    </div>
                  </div>
                  <p className="door-actions">
                    <span className="door-go">
                      Go to hexakin.com <span aria-hidden="true">→</span>
                    </span>
                    <a
                      className="door-aside"
                      href="https://open.spotify.com/album/1aV8V4RBJhOt6ykAEGHBdj"
                    >
                      Play Despair on Spotify
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </li>

          <li className="door door-lwai">
            <div className="door-art" aria-hidden="true" />
            <p className="lwai-note" aria-hidden="true">
              6 free lessons<span>+ 2 apps on the way</span>
            </p>
            <div className="door-body">
              <p className="door-index">03 / Life with AI</p>
              <h2 className="door-title">
                <a href="https://lifewithai.co.uk" className="door-link">
                  Life with AI
                </a>
              </h2>
              <p className="door-tag">Everyday AI, in plain English.</p>
              <div className="door-reveal">
                <div>
                  <p className="door-taste lwai-line">
                    Get <mark>comfortable</mark> with AI in ordinary life. Free
                    lessons, and two Android apps I&apos;m building to make
                    everyday jobs easier.
                  </p>
                  <p className="door-actions">
                    <span className="door-go">
                      Go to lifewithai.co.uk <span aria-hidden="true">→</span>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </li>

          <li className="door door-forge">
            <div className="door-art" aria-hidden="true" />
            <div className="forge-embers" aria-hidden="true">
              {Array.from({ length: 16 }, (_, i) => (
                <span key={i} style={wordStyle(i)} />
              ))}
            </div>
            <div className="door-body">
              <p className="door-index">04 / Games</p>
              <h2 className="door-title">
                <a href="https://dropforge.ai" className="door-link">
                  DropForge
                </a>
              </h2>
              <p className="door-tag">An 18+ arcade for AI web games.</p>
              <div className="door-reveal">
                <div>
                  <div className="door-taste forge-cab">
                    <p className="forge-now">Now showing</p>
                    <p className="forge-game">CINDER</p>
                    <p className="forge-blurb">
                      Hold the factory floor. Dodge falling wreckage and fight
                      an endless stream of hostiles.
                    </p>
                    <p className="forge-start" aria-hidden="true">
                      Press start
                    </p>
                  </div>
                  <p className="door-actions">
                    <span className="door-go">
                      Enter the arcade <span aria-hidden="true">→</span>
                    </span>
                    <a
                      className="door-aside"
                      href="https://dropforge.ai/games/cinder/"
                    >
                      Play Cinder
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </main>

      <footer className="hub-foot">
        <p>© {new Date().getFullYear()} Jonathan Hill</p>
        <p>
          <a href={xProfile}>X / @hexakin</a>
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
          <Link href="/privacy">Privacy</Link>
        </p>
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Jonathan Hill",
            url: siteUrl,
            description,
            sameAs: [
              xProfile,
              "https://hexakin.com",
              "https://lifewithai.co.uk",
              "https://dropforge.ai",
            ],
          }),
        }}
      />
    </div>
  );
}
