# Spec: The paper reader

Status: ready-for-agent
Type: spec
Created: 2026-09-23

Vocabulary follows `CONTEXT.md`. This spec respects ADR 0001 (the Companion is hand-written and never generated from canon).

## Problem Statement

Readers come to hillmade.uk, mostly from X and mostly on phones, to read *We Ruined Ourselves* chapter by chapter. The site is well built but reads like a website rather than a book:

- The typeset text shows straight quotes, `...` and spaced hyphens copied straight from the manuscript.
- Readers can't adjust text size or switch to a dark page for reading at night.
- Nothing shows how far through a chapter they are.
- The site's "novel in public" identity lives in the notebook, separate from the reading. A reader can't see, while reading, where a passage came from or how it changed.

The book has a large cast, a corporate city and a lot of unexplained names early on (CILLA, the Big Three, Aegis, The Meadows). Readers who lose track have nowhere safe to look things up without being spoiled.

When a chapter is revised, the previous version disappears, which undermines the site's promise that drafts change but the record stays.

The author uses "archive" and "notebook" interchangeably in the interface, and version language is inconsistent.

## Solution

Turn the site into a writing desk: a textured paper background, with chapters, notebook entries and cards laid on it as sheets of paper, and a few restrained author's touches in red pen and handwriting. Chapters read like a well-set manuscript, with proper typography, a drop cap, scene-break ornaments and a running header. Readers get Paper and Night themes, four text sizes, a progress bar with time left, and ways to share a chapter or a single line as a quote card.

The work is delivered in four releases:

1. **The paper redesign:** typesetting, author touches, reader settings, progress and sharing.
2. **The Companion:** a spoiler-safe guide to the book's People, Places and Things, revealing only what the reader's furthest read has reached.
3. **Margin notes:** notebook entries attached to the passages they discuss, in handwriting beside the text.
4. **Superseded versions:** earlier versions of chapters kept permanently, with a "What changed" view alongside the revision note.

Everything stays phone-first and scroll-based, with no page-turn effects. The site continues to store nothing about visitors: reader settings and reading state live only in the reader's own browser.

## User Stories

### Reading a chapter (Release 1)

1. As a reader, I want curly quotes, proper apostrophes, dashes and ellipses in the chapter text, so that it reads like a printed book rather than a text file.
2. As a reader, I want apostrophes in abbreviations and dialect (’86, ’ya, o’) to face the right way, so that the typography never looks wrong in the middle of dialogue.
3. As a reader, I want each chapter to open with a drop cap, so that starting a chapter feels like turning to a new page.
4. As a reader, I want scene breaks shown as a printed ornament, so that I notice a change of scene or point of view.
5. As a reader, I want a manuscript-style running header on chapter pages ("HILL / WE RUINED OURSELVES / 3"), so that I always know which chapter I'm in and the page feels like a real manuscript.
6. As a reader on a phone, I want the chapter text to fill the screen comfortably, with a sensible line length and no sideways scrolling, so that I can read a whole chapter one-handed.
7. As a reader, I want a thin progress bar showing how far through the chapter I am, so that I can judge whether to finish now or later.
8. As a reader, I want to see roughly how many minutes are left in the chapter, so that I can decide whether I have time to finish it.
9. As a reader, I want to make the text bigger or smaller in four steps, so that I can read comfortably on any screen.
10. As a reader reading at night, I want a Night theme, so that a bright page doesn't dazzle me.
11. As a reader whose device is set to dark mode, I want the site to start in Night automatically, so that I don't have to find the setting.
12. As a reader, I want my theme and text size remembered on this device, so that I don't have to set them every visit.
13. As a reader who has chosen a theme, I want my choice to win over my device's setting, so that the site respects what I picked.
14. As a reader, I want normal scrolling with no page-flip animation, so that reading on a phone feels natural and I can search and copy text.
15. As a reader who uses a screen reader, I want the typeset text, settings and progress to be announced properly, so that the redesign doesn't make the book harder to read.
16. As a reader who prefers reduced motion, I want decorative movement switched off, so that the site doesn't make me uncomfortable.

### The writing desk (Release 1)

17. As a visitor, I want the whole site to look like paper on a desk, so that it feels like the author's working space and not a generic blog.
18. As a visitor, I want the home page to lay out the manuscript, the notebook and my reading place as sheets and cards on the desk, so that I understand at a glance what the site offers.
19. As a visitor, I want the red-pen touches to appear only in a few meaningful places, so that they stay special rather than decorative clutter:
    - the strike-through tagline
    - "Nothing is set in ink"
    - a circled version number on revised chapters
    - a tick against my furthest read
20. As a visitor, I want every page's existing layout to keep working on my phone, so that the redesign doesn't break anything I already use.
21. As a visitor, I want the notebook called "Notebook" everywhere I see it (navigation, titles, labels), so that I'm not confused by "archive".
22. As someone following an old link to the archive, I want it to keep working, so that shared links never break.

### Sharing and responding (Release 1)

23. As a reader, I want a share button at the end of a chapter that shares the chapter's link with its preview card, so that I can recommend it on X or elsewhere.
24. As a reader, I want to select a line of the chapter and share it as a quote card image, so that I can share a moment that moved me.
25. As the author, I want every quote card to credit me and link back to its chapter, so that shared quotes bring readers to the site.
26. As the author, I want quote cards to be impossible to create for text that isn't really in the chapter, so that no one can put made-up words in my mouth under my name.
27. As a reader, I want a "Tell me what you thought" link at the end of each chapter that takes me to that chapter's conversation on X, so that I can respond where the author is active.
28. As a reader of a chapter that has no X thread yet, I want that link to open a post to @hexakin that already includes the chapter link, so that I can still respond.
29. As a reader who doesn't want to be tracked, I want reactions and conversation to happen on X, not in data the site stores about me, so that the privacy page stays true.

### The Companion (Release 2)

30. As a reader who has lost track of a character, I want to look them up in the Companion, so that I can keep reading without flicking back through chapters.
31. As a reader, I want Companion entries for People, Places and Things, so that I can look up terms like CILLA, the Big Three, Aegis or The Meadows as well as characters.
32. As a reader, I want the Companion to show only what my furthest read has revealed, so that I'm never spoiled.
33. As a reader, I want hidden facts to be completely absent, with no "more after Chapter 15" placeholder, so that even the existence of a secret isn't given away.
34. As a reader, I want entries for people or places I haven't met yet to be missing entirely, so that their existence doesn't spoil anything.
35. As a reader, I want my furthest read to go up automatically when I reach the end of a chapter, so that the Companion keeps pace with me.
36. As a reader rereading an earlier chapter, I want my furthest read to stay where it is, so that a reread doesn't hide things I already know.
37. As a reader who has read ahead elsewhere (for example on another device or on X), I want to set my furthest read by hand, so that the Companion matches what I actually know.
38. As a reader who doesn't mind spoilers, I want a "show everything" switch, so that I can see the whole Companion.
39. As a reader, I want the chapter list to mark my furthest read with a red-pen tick, so that I can see where I've got to.
40. As a reader looking at the page source or a search result, I want no hidden facts to be present, so that spoilers can't leak through page code or search engines.
41. As the author, I want each Companion entry, and each fact within it, to carry a reveal chapter, so that I control exactly when each detail becomes visible.
42. As the author, I want the build to fail if a Companion fact has a reveal chapter that doesn't exist or isn't public, so that mistakes can't slip through.
43. As the author, I want Claude to draft Companion entries from my canon for me to approve, while the site itself never reads my canon files, so that a leak is impossible (ADR 0001).

### Margin notes (Release 3)

44. As a reader on a desktop, I want handwritten margin notes beside passages that have a story behind them, so that I can see the making of the book while I read it.
45. As a reader on a phone, I want a small red mark beside such a passage that opens the note beneath the paragraph when I tap it, so that notes work without a margin.
46. As a reader, I want a margin note to link to its full notebook entry, so that I can read more if I'm curious.
47. As a reader, I want margin notes never to lead me to notebook entries that discuss later chapters, so that notes don't spoil the book.
48. As the author, I want to attach a notebook entry to a passage by quoting the passage in the entry, so that the chapter text stays identical to my manuscript.
49. As the author, I want the build to fail and name the note if its quoted passage no longer matches the chapter text, so that notes are never silently lost after a revision.
50. As the author, I want the build to fail if a margin note would point to an entry covering chapters beyond the one it sits in, so that spoilers can't be published by accident.
51. As the author, I want margin notes to match the typeset text regardless of quote style, so that I can quote the passage as I typed it.

### Superseded versions (Release 4)

52. As the author, I want the outgoing version frozen exactly as it was published when I revise a chapter, so that the public record is kept.
53. As a reader, I want each superseded version to have its own permanent address, so that citations and shared links to v1 keep working.
54. As a reader on a revised chapter, I want a "What changed in v2" switch that highlights the changed paragraphs, so that I can see how the book evolved.
55. As a reader, I want the revision note shown alongside the changes, so that I understand why the chapter changed.
56. As a reader on a superseded version, I want a clear notice with a link to the current version, so that I don't mistake an old draft for the current one.
57. As a search engine user, I want the current version to be what search engines show, so that old drafts don't compete with the current text.
58. As an RSS subscriber, I want a revision to appear in the feed with its revision note, so that I know a chapter I've read has changed.
59. As the author, I want the build to fail if a revised chapter's previous version hasn't been frozen, so that the record can't have gaps.

### Continuity

60. As a returning reader, I want the "Continue reading" card to keep working through the redesign, so that I don't lose my place.
61. As a reader whose browser blocks storage, I want the site to work with default settings and no errors, so that privacy settings never break reading.
62. As a visitor, I want the privacy page to describe any new browser-stored reading state accurately, so that I can trust what the site says.

## Implementation Decisions

### Principles

- Phone-first, scroll-based reading. No pagination or page-turn effects.
- The **manuscript** in the Novel repo is the master copy. The site's chapter files are published copies, and the site never changes wording. **Typeset text** is produced at build time and differs from the manuscript only in typography.
- The site keeps storing nothing about visitors. All reader state lives in the reader's browser. No accounts, database or reactions store.
- Readers see "Notebook" only. Internal code and routes may keep "archive", and the notebook route stays at its existing address.
- "Version" is the only change-tracking word shown to readers.

### Release 1: the paper redesign

- **Prototype first.** Before building, a throwaway prototype of the home page and a chapter page, each in a subtle and a richer paper treatment. The author picks one by eye, and Release 1 is built to that choice.
- **Visual system:**
  - The whole site moves to a paper background with layered paper sheets and cards.
  - The existing typefaces and red accent are kept, and dark becomes the Night theme.
  - Existing layouts are restyled rather than rebuilt; only the home page is rethought around the desk.
  - Paper texture must be lightweight (CSS or a small tiled image) and must not noticeably slow phones.
- **Typesetting module:**
  - A pure function in the content layer turns chapter Markdown into typeset text: curly double and single quotes, apostrophes (including leading elisions such as ’86 and ’ya), `...` to an ellipsis, and spaced hyphens used as dashes to em dashes.
  - It must be idempotent, handle chapters that are already partly curly, and never change words, code spans or URLs.
  - `***` becomes a scene-break ornament.
  - Drop caps are presentational and applied to the first paragraph of the chapter.
- **Running header:** "HILL / WE RUINED OURSELVES / {chapter number}", built from the book's working title and the chapter number, and set in the existing small monospace style.
- **Red pen:** limited to the four places listed in story 19.
- **Reader state module:** a new, pure, browser-independent module that owns reader state and is persisted to the reader's browser storage.
  - It holds the theme preference (Paper, Night or follow the device), the text size (one of four steps, default the second), the reading place, and, from Release 2, the furthest read and "show everything".
  - It exposes plain operations: set the theme, set the text size, record a chapter opened, record a chapter's end reached, set the furthest read by hand, and toggle "show everything".
  - Furthest read only ever increases, except when set by hand.
  - Storage failures fall back to defaults without errors.
  - The existing "Continue reading" storage is migrated into this module.
- **Theme application** avoids a flash of the wrong theme on load. An explicit choice wins over the device preference.
- **Progress and time left:** computed on the client from scroll position and the chapter's existing word count.
- **Sharing:**
  - The chapter share uses the device's native share sheet where available, falling back to copying the link or opening an X post.
  - Quote cards use a new share-image endpoint alongside the existing per-page share cards. It takes a chapter reference and the selected text, and generates the image only if the text appears exactly in that chapter's public typeset text (after normalising whitespace and quote style) and is under a length limit.
  - Rejected requests return an error, never an image. Cards credit Jonathan Hill and name the book and chapter.
- **X conversation link:** chapters gain an optional field for the chapter's X post or thread URL, restricted to X/Twitter HTTPS URLs like existing fields. Without it, the link opens an X compose intent addressed to @hexakin with the chapter link.
- **Terminology pass:** every reader-visible "archive" becomes "notebook", and "edition" is removed from reader-visible copy and from validation messages.
- **Privacy page:** updated to describe the reader state kept in the browser (theme, text size, reading place and furthest read).

### Release 2: the Companion

- **New content type: Companion entry.**
  - Written as public content in this repo, never generated from the Novel repo's canon (ADR 0001).
  - Each entry has a stable ID, a kind (Person, Place or Thing), a name, a reveal chapter for the entry as a whole, and a body made of facts. Each fact has its own reveal chapter.
  - Validation is strict, matching the existing content schemas. Every reveal chapter must refer to an existing public chapter, and a fact's reveal chapter can't be earlier than its entry's.
- **Companion projection:** the content layer exposes a function returning the Companion as known through chapter N: entries and facts with reveal chapter ≤ N only.
- **Leak prevention:**
  - The Companion pages served to everyone are rendered through Chapter 1 only.
  - For each public chapter N, the build emits a static data file containing only the projection through N.
  - The browser fetches the file matching the reader's furthest read, or the full file when "show everything" is on, and swaps in the content.
  - No page or file ever contains a fact beyond the projection it was built for.
- **Furthest read:** held in the reader state module. It rises when the reader reaches a chapter's end (the same trigger the reading place uses today) and can be set by hand from the Companion and the chapter list.
- **Navigation:** the Companion gets its own entry in the main navigation.

### Release 3: margin notes

- Notebook entries gain an optional anchor made of a chapter reference and an exact quoted passage.
- The content layer resolves each anchor against the chapter's typeset text, comparing quote styles and whitespace loosely. The build fails, naming the entry, if the passage isn't found or matches more than once.
- Notebook entries gain an explicit "covers up to chapter" field. The build fails if a margin note in chapter N links to an entry covering beyond N.
- Rendering:
  - On wide screens, a handwritten note sits in the actual margin next to the anchored paragraph.
  - On narrow screens, a small red mark sits beside the paragraph and toggles the note inline beneath it.
  - The note is keyboard and screen-reader accessible.

### Release 4: superseded versions

- When a chapter is revised, its outgoing version is frozen as a separate read-only content record. The content layer validates that versions 1 to N−1 exist for every chapter at version N.
- Each superseded version is served at a permanent address under its chapter, with a notice and a link to the current version. It is marked noindex, and its canonical URL points to itself.
- The "What changed" view compares the current version with the previous one paragraph by paragraph, highlighting changed words within changed paragraphs, with the revision note alongside. The comparison is computed at build time.
- The RSS feed already emits a new item for each version (existing behaviour) and keeps doing so.

## Testing Decisions

- **Test external behaviour at the highest seam.** Tests feed content in and assert what readers and the build would see: public output, validation failures and emitted files. Internal structure is not tested. The existing suite is the model: it builds small temporary content sets and asserts on the public projection.
- **Seam 1: the content layer (existing, primary).** Tests with temporary fixture content cover:
  - Typesetting, including already-curly text, elisions, idempotence, and untouched code and URLs.
  - Running header input.
  - Companion validation and the projection through N, including entries and facts that stay absent.
  - Margin note anchor resolution, including the build failing on missing or ambiguous passages and on spoiler-crossing notes.
  - Superseded version validation and change comparison.
  - Quote card text validation: accepted if in the chapter, rejected if not, over the limit, or from a non-public chapter.
  - Prior art: the existing content, feed, markdown and version-render tests.
- **Seam 2: the built-site check (existing).** The public verification script, which crawls a local production build, is extended to assert that:
  - No prerendered HTML contains a Companion fact beyond Chapter 1.
  - Each per-chapter Companion data file contains nothing beyond its chapter.
  - Superseded version addresses resolve, carry noindex and link to the current version.
  - The quote card endpoint rejects text that isn't in the chapter.
  - Reader-visible text never says "archive".
- **Seam 3: the reader state module (new).** Tested directly as pure logic without a browser:
  - defaults
  - furthest read only increases on chapter end, and can be set by hand
  - "show everything"
  - theme precedence over device preference
  - text size bounds
  - migration of the existing reading place
  - graceful fallback when storage is unavailable
- **Visual verification:** the Release 1 prototype and final pages are checked at phone and desktop widths in both themes, with no sideways scrolling. This is part of the verification step, not an automated test.

## Out of Scope

- Page-turn animations, pagination and two-page spreads.
- Accounts, cross-device sync of reader state, and any server-side store of visitor data, including on-site reactions or comments. X is the conversation channel.
- Physical-object decoration (paper clips, tape, coffee rings, torn edges).
- Any automated connection between the Novel repo (manuscript or canon) and the site. Publishing chapters stays a deliberate manual step, and the Companion is never generated from canon (ADR 0001).
- Editing manuscript wording or punctuation in the Novel repo. Typography is fixed on the site only.
- A sepia theme. Paper and Night only.
- A "copy my place to another device" link, which may follow later if readers ask.

## Further Notes

- **Release order matters.** Release 2 depends on the reader state module from Release 1. Release 3's anchors depend on Release 1's typeset text. Release 4 is independent, but becomes worthwhile only once the first v2 chapter exists.
- **Content work the author must approve:**
  - Companion entries (Claude drafts from canon; the author approves each entry and reveal chapter).
  - Optional X thread URLs per chapter.
  - Margin note anchors on notebook entries.
- **Current manuscript facts:**
  - Punctuation is mixed: about 1,450 straight double quotes against about 200 curly, and 119 `...` against 28 `…`. Curly quotes cluster in chapters 13, 17, 18, 22, 24 and 25.
  - Only chapters 24 and 25 use `***` scene breaks.
  - The site's chapter prose currently matches the manuscript word for word, except for the author's private audit comments, which exist only in the manuscript.
