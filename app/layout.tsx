import type { Metadata } from "next";
import { Cormorant_Garamond, Newsreader, Source_Sans_3 } from "next/font/google";
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
        {children}
        <Analytics />
      </body>
    </html>
  );
}
