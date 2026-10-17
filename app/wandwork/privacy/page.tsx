// Copy drafted by Claude; published at Jonathan's word, 17 Oct 2026. Source of truth:
// 03-LifeWithAI/Wandwork/PRIVACY.md (the app's Parent Lock links to this page). Keep them in step.
import type { Metadata } from "next";
import Link from "next/link";
import { Atkinson_Hyperlegible_Next, Fraunces } from "next/font/google";
import { contactEmail, pageMetadata } from "@/lib/site";
import "../wandwork.css";

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

const title = "Wandwork privacy policy · Hillmade";
const description =
  "What Wandwork, Hillmade's spell-casting app for Android, hears, where it goes, and what stays on the phone.";

export const metadata: Metadata = {
  ...pageMetadata(title, description, "/wandwork/privacy"),
  title: { absolute: title },
};

export default function WandworkPrivacyPage() {
  return (
    <div className={`ww ${atkinson.variable} ${fraunces.variable}`}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="ww-top">
        <Link href="/wandwork" className="ww-home">
          Wandwork
        </Link>
      </header>
      <main id="main" tabIndex={-1} className="ww-policy">
        <h1>Wandwork privacy policy</h1>
        <p className="ww-small">Last updated: 17 October 2026</p>
        <p>
          Wandwork is an Android app made by Hillmade that lets a child cast spells at their phone: say a spell
          word, flick the phone, and something happens (the torch comes on, the volume goes down, an app opens).
          This is what it does with your data, in plain English.
        </p>
        <p>
          <strong>Hillmade collects nothing.</strong> Wandwork sends nothing to Hillmade. It has no account, no
          analytics, no crash reporting, no advertising and no tracking of any kind.
        </p>

        <h2>Listening</h2>
        <p>
          The wand listens only after it is tapped (the floating wand, the Quick Settings tile or the home-screen
          widget), and only until the spell has been said: at most seven seconds. Two spells listen once more
          straight after: the app-opening spell, if no app was named (&ldquo;…what?&rdquo;), and the calling
          spell, which listens during its three-second countdown so it can be stopped. It never listens in the
          background.
        </p>
        <p>What happens to the spoken words depends on one choice a parent makes in the Parent Lock:</p>
        <ul className="ww-list">
          <li>
            <strong>Without an OpenRouter key (the default).</strong> The phone&rsquo;s own speech recognition
            writes down what was said. On phones that recognise speech on the phone itself (most recent Pixels,
            and other phones on Android 12 or later with the speech pack), the sound never leaves the phone. On
            other phones, Android&rsquo;s speech service is used, which on most phones is Google&rsquo;s and may
            send the sound to Google to be written down, under Google&rsquo;s own privacy policy.
          </li>
          <li>
            <strong>With an OpenRouter key (optional &ldquo;sharper ears&rdquo;).</strong> The recording of the
            spell is sent to OpenRouter (openrouter.ai), which passes it to a speech recognition model to be
            written down. When the words are unclear, the written words (not the sound) may also be sent through
            OpenRouter to a language model, to ask which spell they sound like. This is paid for from the
            parent&rsquo;s own OpenRouter account and covered by OpenRouter&rsquo;s privacy policy and the
            policies of the models it uses. Wandwork does not keep the recordings.
          </li>
        </ul>
        <p>
          Either way, the words are only matched against the spell list. Wandwork keeps no recordings and no
          record of what was said, and the released app writes nothing that was said to the phone&rsquo;s logs.
        </p>
        <p>
          To help the recogniser, Wandwork passes it the spell words, and, when it is listening for an
          app&rsquo;s name, the names of the apps on the phone. If the phone&rsquo;s recogniser is Google&rsquo;s
          online service, those words go to Google with the sound.
        </p>
        <p>
          With a key, each spell and each practice go uses a little of the parent&rsquo;s OpenRouter credit.
          Setting a credit limit on the key at openrouter.ai keeps that in check.
        </p>

        <h2>What stays on the phone</h2>
        <p>Wandwork keeps these on the phone only, and deletes them all when it is uninstalled:</p>
        <ul className="ww-list">
          <li>
            the Wizard Name, wand colour, chosen voice, how theatrical the spells are, the flick settings, the
            optional birthday (day and month only) and which Secret Spells have been found;
          </li>
          <li>
            the parent&rsquo;s choices: which spells and apps are sealed, and the contact the calling spell rings
            (the name and phone number picked from the contacts, nothing else from the address book);
          </li>
          <li>the Parent Lock PIN and the optional OpenRouter key, encrypted with the phone&rsquo;s keystore.</li>
        </ul>
        <p>None of this is included in cloud backups or copied when moving to a new phone.</p>

        <h2>Permissions, and why</h2>
        <ul className="ww-list">
          <li><strong>Microphone:</strong> to hear spells, only after the wand is tapped.</li>
          <li><strong>Display over other apps:</strong> for the floating wand and its shows.</li>
          <li><strong>Notifications:</strong> Android shows a small notice while the wand is awake.</li>
          <li>
            <strong>Phone calls (optional):</strong> so the calling spell can ring the parent&rsquo;s chosen
            contact after a three-second countdown that can be stopped.
          </li>
          <li><strong>Do Not Disturb access (optional):</strong> for the quieting spell.</li>
          <li>
            <strong>Notification access (optional):</strong> for the spell that clears notifications. It only
            ever dismisses them; it never reads them.
          </li>
          <li>
            <strong>Accessibility (optional):</strong> Android only lets an app lock the screen through an
            accessibility service. Wandwork&rsquo;s does that one thing: it does not read the screen, watch what
            is tapped or collect anything.
          </li>
          <li>
            <strong>The list of installed apps:</strong> so the app-opening spell can open an app by name. The
            list itself stays on the phone (see Listening for the names given to the recogniser).
          </li>
        </ul>
        <p>Each optional permission can be skipped; the spell that needs it then explains what is missing.</p>

        <h2>Children</h2>
        <p>
          Wandwork is designed to be set up by a parent for a child. It collects no personal information from
          children and sends nothing to Hillmade. Without an OpenRouter key, nothing a child says leaves phones
          that recognise speech on the phone itself.
        </p>

        <h2>Changes</h2>
        <p>If this policy changes, the new version will be on this page, with a new date at the top.</p>

        <h2>Contact</h2>
        <p>
          Jonathan Hill, Hillmade: <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
        </p>
      </main>
    </div>
  );
}
