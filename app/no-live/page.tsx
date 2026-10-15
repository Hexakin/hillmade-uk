// AI DRAFT (Claude) copy, awaiting Jonathan's approval.
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Anton, Space_Mono } from "next/font/google";
import { pageMetadata } from "@/lib/site";
import "./no-live.css";

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

const title = "No Live · Hillmade";
const description =
  "No Live blocks every live stream on YouTube in your browser, live TV such as BBC News included. Videos, clips and replays still play. Free and open source.";

export const metadata: Metadata = {
  ...pageMetadata(title, description, "/no-live"),
  title: { absolute: title },
};

const repo = "https://github.com/Hexakin/no-live";
const userscript = "https://github.com/Hexakin/no-live/raw/main/userscript/no-live.user.js";
const release = "https://github.com/Hexakin/no-live/releases/latest";
const licenceCheck = "https://www.tvlicensing.co.uk/check-if-you-need-one";

const works = [
  {
    where: "Chrome, Edge and Brave on a computer",
    status: "Works today",
    how: "Userscript (Tampermonkey or Violentmonkey), or the add-on zip. Tested in Edge and Chrome; Brave runs the same engine",
  },
  {
    where: "Firefox on a computer",
    status: "Works today",
    how: "Userscript (Tampermonkey or Violentmonkey). Tested in Firefox’s engine",
  },
  {
    where: "iPhone and iPad (Safari)",
    status: "Ready to try",
    how: "Userscripts app (free, App Store). Passes our checks in Safari’s engine; not yet tried on a real iPhone",
  },
  {
    where: "Chrome, Edge and Firefox stores",
    status: "Coming",
    how: "One-click store installs",
  },
  {
    where: "Android",
    status: "Coming",
    how: "Firefox for Android, once the Firefox Add-ons listing is up",
  },
  {
    where: "Smart TVs",
    status: "Looking into it",
    how: "Honestly, probably not possible: TV apps don’t accept add-ons",
  },
];

export default function NoLivePage() {
  return (
    <div className={`nl ${anton.variable} ${spaceMono.variable}`}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className="nl-top">
        <Link href="/" className="nl-home">
          Hillmade
        </Link>
        <nav aria-label="On this page">
          <a href="#install">Install</a>
          <a href="#status">Status</a>
          <a href="#not-covered">Not covered</a>
          <a href="#faq">FAQ</a>
        </nav>
      </header>

      <main id="main" tabIndex={-1}>
        <section className="nl-hero" aria-labelledby="nl-title">
          <div className="nl-hero-copy">
            <p className="nl-kicker">Free · open source · MIT</p>
            <h1 id="nl-title">No Live</h1>
            <p className="nl-lead">
              It stops every live stream on YouTube in your browser.{" "}
              <strong>Live TV included</strong>, such as BBC News, which now
              streams live on YouTube in the UK.
            </p>
            <p>
              Ordinary videos, clips and replays of ended streams still play.
              No channel list, nothing to tune.
            </p>
            <div className="nl-actions">
              <a className="nl-btn" href="#install">
                Install it
              </a>
              <a className="nl-btn-ghost" href="#not-covered">
                What it does not do
              </a>
            </div>
          </div>

          <figure className="nl-shot">
            <Image
              src="/no-live/blocked-live-bbc-news.png"
              width={904}
              height={554}
              priority
              sizes="(min-width: 900px) 52vw, 100vw"
              alt="A YouTube live stream page for BBC News, with the video player showing the message: Live streams are blocked in this browser (No Live)."
            />
            <figcaption>
              The BBC News live stream on YouTube, in a browser with No Live.
              The player is blocked, and the video does not play.
            </figcaption>
          </figure>
        </section>

        <section className="nl-section nl-how" aria-labelledby="how-title">
          <h2 id="how-title">How it works</h2>
          <ol className="nl-numbered">
            <li>
              It marks every live stream’s player data as unplayable, before
              YouTube’s own code runs.
            </li>
            <li>It takes live-now tiles out of lists, so you don’t see them.</li>
            <li>
              A backstop stops and covers any live player that still gets
              through.
            </li>
          </ol>
          <p className="nl-tested">
            Tested on 15 October 2026 on real YouTube, against the BBC News
            live stream: 13 of 13 end-to-end checks passed in Edge (add-on and
            userscript), Chrome and Firefox’s engine. A control run without
            No Live showed the stream playing, so the checks can fail.
          </p>
        </section>

        <section className="nl-section" id="install" aria-labelledby="install-title">
          <h2 id="install-title">Install</h2>
          <p className="nl-muted">
            Start with the first one that fits your device. Each takes a minute.
          </p>
          <ol className="nl-cards">
            <li className="nl-card nl-card-main">
              <p className="nl-card-tag">1 · Computer, one click</p>
              <h3>Install the userscript</h3>
              <p>
                Works in Chrome, Edge, Brave and Firefox on a computer. It needs
                Tampermonkey or Violentmonkey, both free.
              </p>
              <ol className="nl-steps">
                <li>
                  Install{" "}
                  <a href="https://www.tampermonkey.net/">Tampermonkey</a> (or
                  Violentmonkey) in your browser first.
                </li>
                <li>Click the button and confirm the install.</li>
              </ol>
              <a className="nl-btn" href={userscript}>
                Install with Tampermonkey/Violentmonkey
              </a>
            </li>

            <li className="nl-card">
              <p className="nl-card-tag">2 · iPhone and iPad</p>
              <h3>Use the Userscripts app</h3>
              <ol className="nl-steps">
                <li>Install Userscripts from the App Store. It is free.</li>
                <li>
                  In Settings, switch Userscripts on under Safari’s extensions.
                </li>
                <li>
                  Open the userscript link in Safari and choose to install it in
                  Userscripts.
                </li>
              </ol>
              <a className="nl-btn-ghost" href={userscript}>
                Open the userscript link
              </a>
            </li>

            <li className="nl-card">
              <p className="nl-card-tag">3 · Coming soon</p>
              <h3>Store installs</h3>
              <p>One-click listings for each browser store are on their way.</p>
              <div className="nl-store">
                <button type="button" className="nl-btn-off" disabled aria-disabled="true">
                  Chrome Web Store · Coming soon
                </button>
                <button type="button" className="nl-btn-off" disabled aria-disabled="true">
                  Edge Add-ons · Coming soon
                </button>
                <button type="button" className="nl-btn-off" disabled aria-disabled="true">
                  Firefox Add-ons · Coming soon
                </button>
              </div>
            </li>

            <li className="nl-card nl-card-wide">
              <p className="nl-card-tag">4 · Add-on by hand</p>
              <h3>Download the add-on (zip)</h3>
              <p>For Chrome, Edge and Brave on a computer.</p>
              <a className="nl-btn-ghost" href={release}>
                Download the add-on (zip)
              </a>
              <details className="nl-details">
                <summary>Load it unpacked, step by step</summary>
                <ol className="nl-steps">
                  <li>Download the zip from the link above and unzip it.</li>
                  <li>
                    Keep the unzipped folder somewhere permanent. The browser
                    reads the add-on from it.
                  </li>
                  <li>
                    Open <code>chrome://extensions</code> (Chrome),{" "}
                    <code>edge://extensions</code> (Edge) or{" "}
                    <code>brave://extensions</code> (Brave).
                  </li>
                  <li>Switch on Developer mode.</li>
                  <li>
                    Click Load unpacked and choose the unzipped folder.
                  </li>
                </ol>
              </details>
            </li>
          </ol>
        </section>

        <section className="nl-section" id="status" aria-labelledby="status-title">
          <h2 id="status-title">Works today, coming, looking into</h2>
          <table className="nl-table">
            <thead>
              <tr>
                <th scope="col">Where</th>
                <th scope="col">Status</th>
                <th scope="col">How</th>
              </tr>
            </thead>
            <tbody>
              {works.map((row) => (
                <tr key={row.where}>
                  <th scope="row">{row.where}</th>
                  <td data-status={row.status}>{row.status}</td>
                  <td>{row.how}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="nl-muted">
            We haven’t tried it on a real iPhone or iPad yet. If anything
            breaks, tell us on{" "}
            <a href={`${repo}/issues`}>GitHub</a>.
          </p>
        </section>

        <section className="nl-section" id="not-covered" aria-labelledby="not-title">
          <h2 id="not-title">What it does not do</h2>
          <ul className="nl-list">
            <li>
              <strong>It does not decide whether you need a TV licence.</strong>{" "}
              What you watch decides that. Under TV Licensing’s rules you need a
              licence to watch any channel live on any device or service,
              including YouTube, and to watch anything on BBC iPlayer. On-demand
              YouTube videos and non-broadcast live streams don’t need one.{" "}
              <a href={licenceCheck}>Check on TV Licensing’s site</a>.
            </li>
            <li>
              It does not work inside the YouTube apps on phones, TVs or
              consoles. It runs in browsers only.
            </li>
            <li>
              It does not cover other sites or services, such as BBC iPlayer or
              ITVX.
            </li>
            <li>
              It is not a lock. It stops live TV on YouTube by accident or by
              habit, but anyone who wants to get round it can: remove it, use
              another browser, or use the app.
            </li>
          </ul>
        </section>

        <section className="nl-section" id="faq" aria-labelledby="faq-title">
          <h2 id="faq-title">Questions</h2>
          <div className="nl-faq">
            <details>
              <summary>Does it stop the BBC on YouTube?</summary>
              <p>
                Yes. It blocks every live stream on YouTube in a browser that
                has it, including live news channels. BBC News’s own live stream is the
                one we test it against. It doesn’t stop videos, clips or
                replays.
              </p>
            </details>
            <details>
              <summary>Is it safe? Does it collect data?</summary>
              <p>
                No, it doesn’t collect data. The code makes no network requests
                and stores nothing. It is open source under the MIT licence, so
                you can read every line on{" "}
                <a href={repo}>GitHub</a>.
              </p>
            </details>
            <details>
              <summary>Why not just block the BBC?</summary>
              <p>
                Because the licence question covers any channel that is live,
                not only the BBC. Blocking every live stream is the simple
                version, and it doesn’t need a list of channels.
              </p>
            </details>
            <details>
              <summary>Does it work on TV?</summary>
              <p>
                No, not yet. It’s being looked into, but TV apps don’t accept
                add-ons, so it’s probably not possible.
              </p>
            </details>
            <details>
              <summary>How do I turn it off?</summary>
              <p>
                Remove it. In Tampermonkey or Violentmonkey, switch the script
                off or delete it. For the add-on, remove it on your browser’s
                extensions page.
              </p>
            </details>
          </div>
        </section>
      </main>

      <footer className="nl-foot">
        <p>
          No Live is open source under the MIT licence.{" "}
          <a href={repo}>github.com/Hexakin/no-live</a>
        </p>
        <p>
          Made by <Link href="/">Hillmade</Link>, launched under{" "}
          <a href="https://lifewithai.co.uk">Life with AI</a>.
        </p>
      </footer>
    </div>
  );
}
