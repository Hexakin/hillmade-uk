import Link from "next/link";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};
export default function NotFound() {
  return (
    <main id="main" tabIndex={-1} className="missing shell">
      <p className="meta">404 / A loose page</p>
      <h1>This page isn&apos;t here.</h1>
      <p>The notebook is still open. You can find your place below.</p>
      <Link className="button-paper" href="/start">
        Start at the beginning <span aria-hidden="true">↗</span>
      </Link>
      <p>
        <Link className="text-link" href="/archive">
          Return to the writing archive <span aria-hidden="true">↗</span>
        </Link>
      </p>
    </main>
  );
}
