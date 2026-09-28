import Link from "next/link";
import { Newsletter, Prose, StartHereList } from "@/components/Editorial";
import { getContent, formatDate } from "@/lib/content";
import { pageMetadata } from "@/lib/site";
export function generateMetadata() {
  const { pages } = getContent();
  return pageMetadata("Start here", pages.start.description, "/start");
}
export default function StartPage() {
  const { pages, book, start } = getContent();
  return (
    <main id="main" tabIndex={-1}>
      <header className="page-heading shell">
        <p className="meta">
          <span className="red-line" /> Start here / A reader&apos;s way in
        </p>
        <h1>{pages.start.title}</h1>
        <p>
          {book.workingTitle
            ? `New to ${book.workingTitle}? Begin the draft, learn how versions work, then explore the notebook.`
            : "If you found one interesting post, you're in the right place."}
        </p>
      </header>
      <div className="reading-layout shell">
        <aside className="reading-margin">
          <span className="meta">The beginning</span>
          <p>
            {book.startedAt ? (
              <>
                This public record began on{" "}
                <time dateTime={book.startedAt}>
                  {formatDate(book.startedAt)}
                </time>
                .
              </>
            ) : (
              "The first dated writing entry is still to come."
            )}
          </p>
          <p>
            <Link href="/archive?order=oldest">Oldest first ↗</Link>
          </p>
        </aside>
        <article>
          <Prose body={pages.start.body} />
          <div className="content-note">
            <p className="meta">The working premise</p>
            <p>
              {book.premise ||
                "Premise coming soon. I'll add it here when there's a story to introduce."}
            </p>
          </div>
          <section className="reading-path" aria-labelledby="reading-path">
            <h2 id="reading-path">A few places to begin</h2>
            <StartHereList
              items={start.filter((item) => item.href !== "/start")}
            />
          </section>
          <p className="content-note">
            Join the conversation on{" "}
            <a className="text-link" href="https://x.com/hexakin">
              X / @hexakin ↗
            </a>
            , or leave your email below.
          </p>
        </article>
      </div>
      <Newsletter />
    </main>
  );
}
