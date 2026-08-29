import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Not found",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <main className="missing">
      <p>This page is not here.</p>
      <Link href="/">Home</Link>
    </main>
  );
}
