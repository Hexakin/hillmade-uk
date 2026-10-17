// Copy drafted by Claude; approved by Jonathan, 17 Oct 2026. Source of truth:
// 03-LifeWithAI/aether/docs/privacy-policy.md (the Aether app links to this page). Keep them in step.
import type { Metadata } from "next";
import Link from "next/link";
import { Atkinson_Hyperlegible_Next } from "next/font/google";
import { contactEmail, pageMetadata } from "@/lib/site";
import "../aether.css";

const atkinson = Atkinson_Hyperlegible_Next({
  subsets: ["latin"],
  adjustFontFallback: false,
  fallback: ["system-ui", "sans-serif"],
  variable: "--font-atkinson",
});

const title = "Aether privacy policy · Hillmade";
const description =
  "What Aether, Hillmade's voice dictation app for Android, sends off your phone, where it goes, and what stays put.";

export const metadata: Metadata = {
  ...pageMetadata(title, description, "/aether/privacy"),
  title: { absolute: title },
};

export default function AetherPrivacyPage() {
  return (
    <div className={`ae ${atkinson.variable}`}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="ae-top">
        <Link href="/" className="ae-home">
          Hillmade
        </Link>
      </header>

      <main id="main" tabIndex={-1} className="ae-main">
        <p className="ae-kicker">Aether · voice dictation for Android</p>
        <h1>Privacy policy</h1>
        <p className="ae-date">Last updated: 17 October 2026</p>
        <p>
          Aether is a voice dictation app for Android made by Hillmade (Jonathan Hill, UK). You talk; it
          writes what you said into the text box you&rsquo;re typing in. This page says exactly what leaves
          your phone, where it goes, and what stays put.
        </p>

        <h2>The short version</h2>
        <ul>
          <li>Aether has no account, no server of its own, no analytics and no adverts.</li>
          <li>
            When you talk, your recording and a little text around your cursor go to OpenRouter, using an
            OpenRouter key that you create and pay for yourself.
          </li>
          <li>Everything else stays on your phone, and is left out of backups and phone-to-phone transfers.</li>
          <li>Hillmade never receives your recordings, your text or your key.</li>
        </ul>

        <h2>What leaves your phone, and where it goes</h2>
        <p>Each time you talk, Aether sends these to OpenRouter (openrouter.ai), on your own key:</p>
        <ul>
          <li>
            <strong>The recording of what you said.</strong> It&rsquo;s sent in pieces while you talk so the
            text is ready quickly. A take you cancel may therefore already have been sent.
          </li>
          <li>
            <strong>The words the speech model heard</strong>, so they can be tidied (fillers, names,
            self-corrections, and a writing pass on the Careful setting).
          </li>
          <li>
            <strong>Up to 200 characters of the text just before your cursor</strong>, so new words join up
            properly.
          </li>
          <li>
            <strong>Any text you have selected when you start talking</strong> (up to 2,000 characters), when
            you ask Aether to change it.
          </li>
          <li>
            <strong>Your personal dictionary words</strong>, and your sound-alikes when they come up, so names
            and your words are spelt your way.
          </li>
        </ul>
        <p>
          If a take is cut short (the keyboard closes or the app stops), Aether keeps the recording on your
          phone and sends it as soon as there&rsquo;s a signal, so your words aren&rsquo;t lost.
        </p>
        <p>
          OpenRouter passes the request to the model providers that do the work: by default NVIDIA&rsquo;s
          Parakeet speech model (with Deepgram&rsquo;s Nova-3 as a fallback), Typesafe&rsquo;s Jev to tidy the
          text, and OpenAI&rsquo;s writing model on the Careful setting. You can change the models in
          Aether&rsquo;s hub. <a href="https://openrouter.ai/privacy">OpenRouter&rsquo;s privacy policy</a>{" "}
          and the providers&rsquo; own terms cover what happens to the data there, including whether they keep
          it. You can control some of this, such as which providers may be used, in your OpenRouter account
          settings.
        </p>
        <p>
          The only other place Aether contacts is hillmade.uk, and only when you tap{" "}
          <strong>Check for updates</strong>: it reads a small file saying which version is the latest. It sends
          nothing about you; as with any web page, hillmade.uk&rsquo;s hosting sees your IP address, as its{" "}
          <Link href="/privacy">privacy page</Link> explains.
        </p>

        <h2>What stays on your phone</h2>
        <ul>
          <li>
            Your OpenRouter key, stored encrypted with Android&rsquo;s keystore. It is never logged or shown in
            full.
          </li>
          <li>
            Your history (the last 100 dictations, with the name of the app you dictated into), dictionary,
            snippets, sound-alikes, corrections and settings.
          </li>
          <li>A kept take, if one went wrong, so you can retry it.</li>
        </ul>
        <p>
          None of this is included in Google backups or in phone-to-phone transfers. Uninstalling Aether
          deletes all of it. You can also clear History in the hub at any time.
        </p>
        <p>
          In incognito tabs and other fields that ask keyboards not to learn, Aether&rsquo;s keyboard keeps
          nothing in History. The floating bubble can&rsquo;t tell when a tab is incognito.
        </p>

        <h2>Places Aether stays out of</h2>
        <ul>
          <li>Password boxes: Aether won&rsquo;t listen, read or type there.</li>
          <li>
            Banking, payment and password-manager apps on Aether&rsquo;s list: the keyboard won&rsquo;t dictate
            and the bubble hides.
          </li>
        </ul>
        <p>
          The list covers the main UK banks, payment apps, password managers and authenticators. It can&rsquo;t
          include every app, so take care with apps it doesn&rsquo;t know.
        </p>

        <h2>Permissions, and why</h2>
        <ul>
          <li>
            <strong>Microphone:</strong> to hear you, only while you&rsquo;re holding or have tapped
            Aether&rsquo;s mic. It never listens on its own.
          </li>
          <li>
            <strong>Aether keyboard:</strong> Android warns that any keyboard can see what you type.
            Aether&rsquo;s keyboard sends only what&rsquo;s listed above.
          </li>
          <li>
            <strong>Accessibility (only for the bubble):</strong> to type your words into the box you&rsquo;re
            in; to read up to 200 characters before the cursor and any selected text, which go with your
            recording as described above; to see which app is in front and whether a text box is open, so the
            bubble shows only while you type, hides in password boxes and private apps, and History can say
            where you dictated; and to switch back to Aether&rsquo;s keyboard when you ask. Nothing it sees
            goes anywhere else.
          </li>
          <li>
            <strong>Display over other apps:</strong> to draw the bubble.
          </li>
          <li>
            <strong>Notifications:</strong> Android requires one while the bubble is running.
          </li>
          <li>
            <strong>Unrestricted battery (optional):</strong> so Android doesn&rsquo;t put the bubble to sleep.
          </li>
          <li>
            <strong>Internet:</strong> to reach OpenRouter, and hillmade.uk when you check for updates.
          </li>
        </ul>

        <h2>Children</h2>
        <p>Aether isn&rsquo;t made for children under 13.</p>

        <h2>Changes</h2>
        <p>
          If this policy changes, the new version will be posted here with a new date. Big changes will also be
          mentioned in the app&rsquo;s release notes.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about privacy: <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
        </p>
      </main>
    </div>
  );
}
