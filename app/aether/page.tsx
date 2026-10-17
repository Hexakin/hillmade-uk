// Copy drafted by Claude; approved by Jonathan, 17 Oct 2026 (redesign).
// Each release: replace the APK in public/aether/, update latest.json, and the version and hash below.
import type { Metadata } from "next";
import Link from "next/link";
import { Atkinson_Hyperlegible_Next } from "next/font/google";
import { contactEmail, pageMetadata } from "@/lib/site";
import { AetherMark } from "./AetherMark";
import { TakeDemo } from "./TakeDemo";
import "./aether.css";

const atkinson = Atkinson_Hyperlegible_Next({
  subsets: ["latin"],
  adjustFontFallback: false,
  fallback: ["system-ui", "sans-serif"],
  variable: "--font-atkinson",
});

const version = "1.0.1";
const apk = `/aether/aether-${version}.apk`;
const apkSha256 = "bfb8b6e2ad9ff2e00adea7290927cdebbaa9477c85bd9c679fd859294e4002d0";
const certSha256 = "1e89a4f4e9ffd0092c30b5d0876abdb2aa2e351fcef971b913166512fdc1fd7a";

const title = "Aether · voice dictation for Android · Hillmade";
const description =
  "Talk, and clean British English lands in whatever box you're typing in. Aether is a voice keyboard and floating bubble for Android. Bring your own OpenRouter key.";

export const metadata: Metadata = {
  ...pageMetadata(title, description, "/aether"),
  title: { absolute: title },
};

export default function AetherPage() {
  return (
    <div className={`ae ae-home-page ${atkinson.variable}`}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="ae-top">
        <Link href="/" className="ae-home">
          Hillmade
        </Link>
      </header>

      <main id="main" tabIndex={-1}>
        <section className="ae-hero" aria-labelledby="ae-title">
          <div className="ae-hero-copy">
            <h1 id="ae-title" className="ae-wordmark">
              <AetherMark className="ae-wordmark-mark" />
              Aether
            </h1>
            <p className="ae-lead">
              Talk, and clean British English lands in whatever box you&rsquo;re typing in.
            </p>
            <p className="ae-sub">
              A voice keyboard and a floating bubble for Android. No account, no subscription: you bring
              your own <a href="https://openrouter.ai">OpenRouter</a> key and pay only for what you use.
            </p>
            <p className="ae-actions">
              <a className="ae-btn" href={apk} download>
                Download Aether {version}
              </a>
              <span className="ae-small">Free. Android 10 or later. 3.2 MB.</span>
            </p>
          </div>
          <TakeDemo />
        </section>

        <div className="ae-sections">
          <section aria-labelledby="ae-ways">
            <h2 id="ae-ways">Two ways to talk</h2>
            <div className="ae-section-body">
            <dl className="ae-ways">
              <div>
                <dt>Aether&rsquo;s keyboard</dt>
                <dd>
                  One big mic key, tap to talk or hold and let go. Tap ⌨ for the full letters when you need to
                  fix a word.
                </dd>
              </div>
              <div>
                <dt>The bubble</dt>
                <dd>
                  A small circle that floats over your usual keyboard. It opens into a bar while you talk, and
                  hides in password boxes and in the banking apps on its list.
                </dd>
              </div>
            </dl>
            </div>
          </section>

          <section aria-labelledby="ae-tidy">
            <h2 id="ae-tidy">It tidies. It doesn&rsquo;t rewrite.</h2>
            <div className="ae-section-body">
            <ul className="ae-list">
              <li>
                <strong>Ums and self-corrections go.</strong> &ldquo;Seven, wait no, half seven&rdquo; comes out
                as half seven.
              </li>
              <li>
                <strong>Your names, spelt your way</strong>, from a dictionary you keep. British spelling by
                default.
              </li>
              <li>
                <strong>Verbatim</strong> when you want every word exactly as you said it.
              </li>
              <li>
                <strong>Sound-alikes</strong> for words the speech model mishears in your accent: Aether checks
                the sentence before it swaps.
              </li>
              <li>
                <strong>Select text and say what to do with it.</strong> &ldquo;Make this politer.&rdquo;
              </li>
            </ul>
            </div>
          </section>

          <section aria-labelledby="ae-kept" className="ae-kept">
            <h2 id="ae-kept">Nothing lost</h2>
            <div className="ae-section-body">
            <p>
              <span className="ae-retry" aria-hidden="true">
                ↻
              </span>
              No signal, a headset that dies mid-sentence, a keyboard that closes on you: Aether keeps the
              take and offers it back with Retry. It sends the recording again as soon as there&rsquo;s a
              signal.
            </p>
            </div>
          </section>

          <section aria-labelledby="ae-start">
            <h2 id="ae-start">Get going</h2>
            <div className="ae-section-body">
            <ol className="ae-steps">
              <li>
                <a href={apk} download>
                  Download the app
                </a>{" "}
                on your phone.
              </li>
              <li>Open the file. If Android asks, let your browser install apps.</li>
              <li>
                Open Aether and follow the setup. You&rsquo;ll make an OpenRouter account, add some credit and
                paste in your key; it takes about five minutes.
              </li>
              <li>
                For the bubble only: if Android greys Aether out in Accessibility (&ldquo;Controlled by
                restricted setting&rdquo;), open Aether&rsquo;s app info, tap ⋮, choose Allow restricted
                settings and confirm. Android asks this of apps installed from a website. Setup shows you
                where.
              </li>
            </ol>
            </div>
          </section>

          <section aria-labelledby="ae-privacy">
            <h2 id="ae-privacy">What leaves your phone</h2>
            <div className="ae-section-body">
            <p>
              Your recording and a little text around your cursor go to OpenRouter, on your own key. Your
              history, dictionary and settings stay on your phone, and out of backups. No analytics, no
              adverts. <Link href="/aether/privacy">Read the privacy policy</Link>.
            </p>
            </div>
          </section>

          <section aria-labelledby="ae-check" className="ae-check">
            <h2 id="ae-check">Check the download</h2>
            <div className="ae-section-body">
            <p className="ae-small">
              APK SHA-256: <code>{apkSha256}</code>
              <br />
              Signing certificate SHA-256: <code>{certSha256}</code>
            </p>
            <p className="ae-small">
              Questions: <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
            </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
