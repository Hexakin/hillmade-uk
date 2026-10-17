// AI DRAFT (Claude) copy, awaiting Jonathan's approval.
// Each release: replace the APK in public/aether/, update latest.json, and the version and hash below.
import type { Metadata } from "next";
import Link from "next/link";
import { contactEmail, pageMetadata } from "@/lib/site";
import "./aether.css";

const version = "1.0.0";
const apk = `/aether/aether-${version}.apk`;
const apkSha256 = "42873719dd072ec3e449ef9e3d6f29a3eaa80d24284ce136656137ba6123d47d";
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
    <div className="ae">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="ae-top">
        <Link href="/" className="ae-home">
          Hillmade
        </Link>
      </header>

      <main id="main" tabIndex={-1} className="ae-main">
        <p className="ae-kicker">Voice dictation for Android</p>
        <h1>Aether</h1>
        <p className="ae-lead">
          Talk, and clean British English lands in whatever box you&rsquo;re typing in: messages, emails, notes,
          anything.
        </p>
        <p>
          Use Aether&rsquo;s own keyboard, with a big mic key and full letters for quick fixes, or a small floating
          bubble over your usual keyboard. There&rsquo;s no account and no subscription: you bring your own{" "}
          <a href="https://openrouter.ai">OpenRouter</a> key and pay OpenRouter directly for what you use.
        </p>
        <p className="ae-actions">
          <a className="ae-btn" href={apk} download>
            Download Aether {version}
          </a>
        </p>
        <p className="ae-small">Android 10 or later · 3.2 MB</p>

        <h2>What you need</h2>
        <ul>
          <li>An Android phone (Android 10 or later).</li>
          <li>An OpenRouter account with some credit, and a key from its keys page. Aether walks you through it.</li>
        </ul>

        <h2>Install it</h2>
        <ol>
          <li>On your phone, tap <strong>Download</strong> above.</li>
          <li>Open the downloaded file. If Android asks, allow your browser to install apps.</li>
          <li>Open Aether and follow the setup. It takes about five minutes.</li>
        </ol>

        <h2>What it does</h2>
        <ul>
          <li>Real-time transcription: the text is ready a moment after you stop talking.</li>
          <li>British spelling, your own dictionary for names, and snippets for things you type often.</li>
          <li>Verbatim mode for your exact words, and sound-alikes for words the model mishears in your accent.</li>
          <li>Select text and say what to do with it: &ldquo;make this politer&rdquo;.</li>
          <li>Nothing lost: a take that goes wrong is kept so you can retry it.</li>
          <li>Stays out of password boxes and the banking and password apps on its list.</li>
        </ul>

        <h2>Privacy</h2>
        <p>
          Your recording and a little text around your cursor go to OpenRouter on your own key. Everything else
          stays on your phone. No analytics, no adverts. Read the{" "}
          <Link href="/aether/privacy">privacy policy</Link>.
        </p>

        <h2>Check the download</h2>
        <p className="ae-small">
          APK SHA-256: <code>{apkSha256}</code>
          <br />
          Signing certificate SHA-256: <code>{certSha256}</code>
        </p>

        <h2>Questions</h2>
        <p>
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
        </p>
      </main>
    </div>
  );
}
