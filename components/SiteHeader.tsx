"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
export function SiteHeader() {
  const pathname = usePathname();
  const links = [
    ["/start", "Start here"],
    ["/chapters", "Chapters"],
    ["/archive", "Notebook"],
    ["/about", "About"],
  ];
  return (
    <header className="site-header">
      <Link href="/" className="wordmark" aria-label="Jonathan Hill — home">
        Jonathan Hill
      </Link>
      <nav aria-label="Main navigation">
        {links.map(([href, label]) => (
          <Link
            key={href}
            href={href}
            aria-current={
              pathname === href || pathname.startsWith(`${href}/`)
                ? "page"
                : undefined
            }
          >
            {label}
          </Link>
        ))}
      </nav>
      <Link className="subscribe-link" href="/#newsletter">
        Subscribe
      </Link>
    </header>
  );
}
