import type { Metadata } from "next";
import Link from "next/link";
import { Newsreader, Source_Sans_3 } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import { siteUrl, siteName } from "@/lib/site";
import { localPreview } from "@/lib/content";
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
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteName, template: "%s · Jonathan Hill" },
  description:
    "I'm writing a novel in public. Follow the excerpts, discoveries, rewrites and draft chapters as the book becomes itself.",
  robots: { index: !localPreview(), follow: !localPreview() },
  authors: [{ name: "Jonathan Hill" }],
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <footer className="site-footer shell">
          <p>
            Jonathan Hill <span aria-hidden="true">/</span> A novel in public
          </p>
          <nav aria-label="Footer">
            <a href="https://x.com/hexakin">
              X / @hexakin <span aria-hidden="true">↗</span>
            </a>
            <a href="/feed.xml">RSS</a>
            <Link href="/privacy">Privacy</Link>
            <a href="mailto:jonathan.hill@hillmade.uk">Get in touch</a>
          </nav>
          <p className="footer-note">Written in Stockport. Kept here.</p>
        </footer>
      </body>
    </html>
  );
}
