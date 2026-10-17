// Copy drafted by Claude; published at Jonathan's word, 17 Oct 2026.
// Each release: replace the APK in public/wandwork/, and update the version, size and hashes below.
import type { Metadata } from "next";
import Link from "next/link";
import { Atkinson_Hyperlegible_Next, Fraunces } from "next/font/google";
import { contactEmail, pageMetadata } from "@/lib/site";
import "./wandwork.css";

const atkinson = Atkinson_Hyperlegible_Next({
  subsets: ["latin"],
  adjustFontFallback: false,
  fallback: ["system-ui", "sans-serif"],
  variable: "--font-atkinson",
});
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-fraunces",
});

const version = "1.0.1";
const apk = `/wandwork/wandwork-${version}.apk`;
const apkSize = "29.2 MB";
const apkSha256 = "f175e7773a5f549660037228ed9b12da15acfc1ac37728a3f6248b8b8b718aa7";
const certSha256 = "ced62d2286b5dabf5fffd8eb18b990dbb3419b9cf6b9845b33fa82a1a03d1a2a";

const title = "Wandwork · cast spells at your phone · Hillmade";
const description =
  "Tap the floating wand, say a spell, flick your phone, and the magic happens: torch, music, apps, a call home. A free Android app for young witches and wizards, with a Parent Lock.";

export const metadata: Metadata = {
  ...pageMetadata(title, description, "/wandwork"),
  title: { absolute: title },
};

const spells: [string, string][] = [
  ["Lucerna", "Lights the torch"],
  ["Umbra", "Puts it out"],
  ["Amplora", "Louder"],
  ["Murmura", "Softer"],
  ["Horologa", "Says the time"],
  ["Advoca…", "Opens the app you name"],
  ["Hushaby", "Do Not Disturb"],
  ["Dissolva", "Ends the last spell"],
  ["Polaris", "Shows north"],
  ["Custodio Voco", "Calls a grown-up"],
  ["Tabula Rasa", "Clears notifications"],
  ["Lapidora", "Locks the screen"],
];

function Orb() {
  return (
    <div className="ww-orb" aria-hidden="true">
      <svg viewBox="0 0 100 100">
        <line x1="22" y1="80" x2="66" y2="36" stroke="#8a5a34" strokeWidth="8" strokeLinecap="round" />
        <polygon
          points="74,14 78,26 90,28 80,36 84,48 74,41 64,48 67,36 58,28 70,26"
          fill="#e8c872"
        />
      </svg>
      <span className="ww-spark" />
      <span className="ww-spark" />
      <span className="ww-spark" />
    </div>
  );
}

export default function WandworkPage() {
  return (
    <div className={`ww ${atkinson.variable} ${fraunces.variable}`}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="ww-top">
        <Link href="/" className="ww-home">
          Hillmade
        </Link>
      </header>

      <main id="main" tabIndex={-1}>
        <section className="ww-hero" aria-labelledby="ww-title">
          <div>
            <h1 id="ww-title" className="ww-wordmark">
              Wandwork
            </h1>
            <p className="ww-lead">Say a spell, flick your phone, and the magic happens.</p>
            <p className="ww-sub">
              Tap the floating wand and say <em>Lucerna</em>: flick, and the torch lights. Every spell is acted
              out across the screen, and the wand answers in a storyteller&rsquo;s voice that knows your
              wizard name.
            </p>
            <p className="ww-actions">
              <a className="ww-btn" href={apk} download>
                Download Wandwork {version}
              </a>
              <span className="ww-small">Free. Android 10 or later. {apkSize}.</span>
            </p>
          </div>
          <Orb />
        </section>

        <div className="ww-sections">
          <section aria-labelledby="ww-spellbook" className="ww-wide">
            <h2 id="ww-spellbook">The Spellbook</h2>
            <dl className="ww-spells">
              {spells.map(([name, does]) => (
                <div key={name}>
                  <dt>{name}</dt>
                  <dd>{does}</dd>
                </div>
              ))}
            </dl>
            <p className="ww-small" style={{ marginTop: "1rem" }}>
              And nine Secret Spells, each with its own show. You&rsquo;ll have to find those.
            </p>
          </section>

          <section aria-labelledby="ww-flick">
            <h2 id="ww-flick">The flick</h2>
            <p>
              A spell waits for a flick of the wrist before it works, so the telly saying a spell word does
              nothing. Cast from the floating wand, the Quick Settings tile (even on the lock screen) or a
              home-screen widget. Practice mode shows how well the wand heard you, without casting.
            </p>
          </section>

          <section aria-labelledby="ww-parents">
            <h2 id="ww-parents">For grown-ups</h2>
            <ul className="ww-list">
              <li>A PIN-protected Parent Lock chooses who the calling spell rings, after a countdown your child can stop.</li>
              <li>Seal any spell or app. The phone&rsquo;s dialler, browsers, Settings and app store start sealed.</li>
              <li>A guided setup, Enchanting, explains every permission before asking for it.</li>
            </ul>
          </section>

          <section aria-labelledby="ww-privacy">
            <h2 id="ww-privacy">What leaves the phone</h2>
            <p>
              Spells are heard by the phone&rsquo;s own speech recognition. On phones that do that on the phone
              itself, spoken spells never leave it. No account, no adverts, no tracking, nothing sent to
              Hillmade. A grown-up can add an OpenRouter key for sharper hearing in the cloud.{" "}
              <Link href="/wandwork/privacy">Read the privacy policy</Link>.
            </p>
          </section>

          <section aria-labelledby="ww-start">
            <h2 id="ww-start">Get going</h2>
            <ol className="ww-steps">
              <li>
                <a href={apk} download>
                  Download the app
                </a>{" "}
                on the phone.
              </li>
              <li>Open the file. If Android asks, let your browser install apps.</li>
              <li>
                Android may warn that it doesn&rsquo;t recognise the app: Wandwork isn&rsquo;t on Google Play yet, so
                Play Protect hasn&rsquo;t seen it before. Tap <strong>More details</strong>, then{" "}
                <strong>Install anyway</strong>.
              </li>
              <li>Open Wandwork. A grown-up walks through Enchanting, then hands the wand over.</li>
            </ol>
          </section>

          <section aria-labelledby="ww-check" className="ww-wide">
            <h2 id="ww-check">Check the download</h2>
            <p className="ww-small">
              APK SHA-256: <code>{apkSha256}</code>
              <br />
              Signing certificate SHA-256: <code>{certSha256}</code>
            </p>
            <p className="ww-small">
              Questions: <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
