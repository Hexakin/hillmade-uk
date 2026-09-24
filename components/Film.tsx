import Link from "next/link";

// A short film of a passage from the book. Two encodes of the same film: a
// 9:16 composition for phones and a 16:9 one for wider screens (recomposed,
// not cropped). CSS shows one; preload="none" means only the one a reader
// plays is downloaded. No autoplay: nothing on the page needs motion.
export type Film = {
  label: string;
  title: string;
  lede: string;
  making: string;
  readHref: string;
  readLabel: string;
  base: string; // e.g. /film/homecoming → -9x16.mp4 / -16x9.mp4 / .jpg posters
  ariaLabel: string;
  lines: string[]; // the words that appear in the film, in order
};

export function FilmFeature({ film }: { film: Film }) {
  return (
    <section className="film-section shell" aria-labelledby="film-title">
      <div className="film-copy">
        <p className="meta section-label">{film.label}</p>
        <h2 id="film-title">{film.title}</h2>
        <p>{film.lede}</p>
        <p className="film-making">{film.making}</p>
        <Link href={film.readHref} className="text-link">
          {film.readLabel} <span aria-hidden="true">↗</span>
        </Link>
        <details className="film-words">
          <summary>The words in the film</summary>
          <ol>
            {film.lines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ol>
        </details>
      </div>
      <div className="film-frame">
        <video
          className="film-video film-video-wide"
          controls
          playsInline
          preload="none"
          poster={`${film.base}-16x9.jpg`}
          aria-label={film.ariaLabel}
        >
          <source src={`${film.base}-16x9.mp4`} type="video/mp4" />
        </video>
        <video
          className="film-video film-video-tall"
          controls
          playsInline
          preload="none"
          poster={`${film.base}-9x16.jpg`}
          aria-label={film.ariaLabel}
        >
          <source src={`${film.base}-9x16.mp4`} type="video/mp4" />
        </video>
      </div>
    </section>
  );
}
