import type { Metadata } from "next";
import Link from "next/link";
import { Newsreader, Source_Sans_3 } from "next/font/google";
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
  metadataBase: new URL("https://hillmade.uk"),
  title: {
    default: "Hillmade",
    template: "%s · Hillmade",
  },
  description: "Hillmade is the parent company of everything I make.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Hillmade",
    description: "Hillmade is the parent company of everything I make.",
    url: "/",
    siteName: "Hillmade",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hillmade",
    description: "Hillmade is the parent company of everything I make.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <div className="frame">
          <header className="mast">
            <Link href="/" className="wordmark">
              Hillmade
            </Link>
          </header>
          {children}
          <footer className="colophon">
            <p>
              © Hillmade · Jonathan Hill ·{" "}
              <a href="https://hexakin.com">Hexakin</a>
              {" · "}
              <a href="https://grokbot.studio">grokbot.studio</a>
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
