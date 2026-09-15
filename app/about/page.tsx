import Image from "next/image";
import Link from "next/link";
import { Newsletter, Prose } from "@/components/Editorial";
import { getContent } from "@/lib/content";
import { pageMetadata } from "@/lib/site";
export function generateMetadata() {
  return pageMetadata(
    "About Jonathan",
    getContent().pages.about.description,
    "/about",
  );
}
export default function AboutPage() {
  const { pages } = getContent();
  return (
    <main id="main" tabIndex={-1}>
      <header className="page-heading shell">
        <p className="meta">The person at the desk</p>
        <h1>{pages.about.title}</h1>
        <p>A dad of four. From Stockport. Making a story.</p>
      </header>
      <div className="reading-layout about-layout shell">
        <article>
          <Prose body={pages.about.body} />
          <p className="article-references">
            <Link href="/start" className="text-link">
              Start at the beginning <span aria-hidden="true">↗</span>
            </Link>
          </p>
        </article>
        <figure className="about-portrait">
          <Image
            src="/jonathan-hill.jpg"
            alt="Jonathan Hill"
            width={800}
            height={1000}
            sizes="(max-width: 580px) 210px, 230px"
          />
          <figcaption className="meta">Jonathan Hill / @hexakin</figcaption>
        </figure>
      </div>
      <Newsletter />
    </main>
  );
}
