import type { Metadata } from "next";
import Link from "next/link";
import { Cormorant_Garamond, Newsreader, Source_Sans_3 } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import { getContent, localPreview } from "@/lib/content";
import { siteUrl, siteName } from "@/lib/site";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const sans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
});
const serif = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
});
// Display face for headings: the same typeface as the words in the films.
const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

function rootDescription() {
  try {
    const { book } = getContent();
    if (book.workingTitle && book.premise) {
      return `${book.workingTitle}: ${book.premise} Read the working draft chapters and writing notebook on hillmade.uk.`;
    }
  } catch {
    // Content may be unavailable during isolated tooling; keep a safe fallback.
  }
  return "I'm writing a novel in public. Follow the excerpts, discoveries, rewrites and draft chapters as the book becomes itself.";
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteName, template: "%s · Jonathan Hill" },
  description: rootDescription(),
  robots: { index: !localPreview(), follow: !localPreview() },
  authors: [{ name: "Jonathan Hill", url: `${siteUrl}/about` }],
  creator: "Jonathan Hill",
  publisher: "Jonathan Hill",
  category: "literature",
  keywords: [
    "Jonathan Hill",
    "Hexakin",
    "We Ruined Ourselves",
    "novel in public",
    "serial novel",
    "Alderbourne",
  ],
  manifest: "/manifest.webmanifest",
  alternates: {
    types: { "application/rss+xml": `${siteUrl}/feed.xml` },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" className={`${sans.variable} ${serif.variable} ${display.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <footer className="site-footer">
          <div className="site-footer-main">
            <div>
              <p className="site-footer-name">Jonathan Hill</p>
              <p>A novel, written in public. Written in Stockport.</p>
            </div>
            <nav aria-label="Footer">
              <Link href="/start">Start here</Link>
              <Link href="/chapters">Chapters</Link>
              <Link href="/archive">Notebook</Link>
              <Link href="/about">About</Link>
              <Link href="/#newsletter">Newsletter</Link>
              <a href="https://x.com/hexakin">X / @hexakin</a>
              <a href="/feed.xml">RSS</a>
              <Link href="/privacy">Privacy</Link>
              <a href="mailto:jonathan.hill@hillmade.uk">Get in touch</a>
            </nav>
          </div>
          <p className="site-footer-small">
            © {new Date().getFullYear()} Jonathan Hill ·{" "}
            <a href="/llms.txt">llms.txt</a>
          </p>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
