import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-main">
        <div>
          <p className="site-footer-name">Jonathan Hill</p>
          <p>A novel, written in public.</p>
        </div>
        <nav aria-label="Footer">
          <Link href="/start">Start here</Link>
          <Link href="/chapters">Chapters</Link>
          <Link href="/archive">Notebook</Link>
          <Link href="/about">About</Link>
          <Link href="/novel#newsletter">Newsletter</Link>
          <a href="https://x.com/hexakin">X / @hexakin</a>
          <a href="/feed.xml">RSS</a>
          <Link href="/privacy">Privacy</Link>
          <a href="mailto:jonathan.hill@hillmade.uk">Get in touch</a>
          <Link href="/">Everything I make</Link>
        </nav>
      </div>
      <p className="site-footer-small">
        © {new Date().getFullYear()} Jonathan Hill ·{" "}
        <a href="/llms.txt">llms.txt</a>
      </p>
    </footer>
  );
}
