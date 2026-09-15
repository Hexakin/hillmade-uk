"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { xProfile } from "@/lib/site";
export function SiteHeader() {
  const pathname = usePathname();
  const links = [
    ["/start", "Start here"],
    ["/archive", "Archive"],
    ["/chapters", "Chapters"],
    ["/about", "About"],
  ];
  return (
    <header className="site-header shell">
      <Link href="/" className="wordmark" aria-label="Jonathan Hill — home">
        <span className="editor-mark" aria-hidden="true">
          j<span>h</span>
          <i />
        </span>
        <span>
          Jonathan Hill<span className="wordmark-sub">A novel in public</span>
        </span>
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
      <div className="header-follow">
        <a href={xProfile} className="x-link">
          @hexakin <span aria-hidden="true">↗</span>
        </a>
        <Link className="subscribe-link" href="/#newsletter">
          Subscribe <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </header>
  );
}
