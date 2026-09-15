# Writing content

The website reads approved Markdown files, not X or Hermes. Nothing is automatically fetched or published. Keep story-bible notes, private drafts and credentials outside this repository: `published: false` prevents website exposure, but is **not** a way to keep material out of Git or a public GitHub repository.

## Where to edit

| File/folder | Purpose |
| --- | --- |
| `content/book/book.json` | Current title, premise, status, lifecycle and public-text switch |
| `content/archive/*.md` | Dated writing updates |
| `content/chapters/*.md` | Chapter metadata and draft manuscript text |
| `content/pages/start.md` | Explanation of the experiment |
| `content/pages/about.md` | Short human biography |
| `content/pages/start-here.json` | Curated reading path used on the homepage and Start Here |

The initial title/premise/start date/word count are unset. Replace them with genuine details when you choose to share them. No invented entry or chapter is included. The archive and chapter index have designed empty states.

Run `npm run content:validate` after edits. `npm run build` also validates. Unknown fields, invalid dates, duplicate IDs/slugs/chapter numbers, missing released-chapter dates and broken curated links fail validation. Slugs and IDs use lowercase letters, numbers and hyphens. Keep them stable once published. Quote dates and strings containing colons in YAML.

## Add a daily writing update

Copy `docs/templates/archive.md` to `content/archive/YYYY-MM-DD-your-slug.md`. Replace every `EDIT` value, set the actual date, write the body and review it. Only then change `published` to `true`.

```yaml
---
id: "your-stable-id"
slug: "your-stable-slug"
date: "YYYY-MM-DD"
type: "note"
title: "Your actual title"
summary: "A short description of this update."
published: false
---
```

The date above is a format placeholder, not a valid publication date. Replace it before adding the file to content.

| Field | Type / allowed values | Required / default |
| --- | --- | --- |
| `id`, `slug` | Stable lowercase hyphenated strings | Required, unique |
| `date` | Quoted real `YYYY-MM-DD` | Required |
| `title` | Nonempty string, max 180 characters | Required |
| `summary` | Nonempty string, max 500 characters | Required; public, also in RSS/SEO |
| `type` | `excerpt`, `scene`, `character`, `lore`, `discovery`, `decision`, `revision`, `cut`, `problem`, `breakthrough`, `progress`, `chapter`, `note` | Required |
| `published` | Boolean | Defaults to `false` |
| `day` | Positive integer | Optional; don't invent a project day |
| `xUrl`, `xArticleUrl` | HTTPS URL on x.com or twitter.com | Optional |
| `chapter` | Related chapter's stable **ID**, not filename | Optional; must exist; private related chapters aren't linked publicly |
| `tags` | Up to 8 nonempty strings, max 60 characters each | Defaults to `[]` |
| `spoilerLevel` | `none`, `mild`, `major` | Defaults to `none`; story spoiler warning, not an access control |
| `manuscriptExcerpt` | Exact manuscript text as a string/YAML block | Optional; automatically suppressed during global withdrawal |
| `manuscriptBody` | Boolean: is the Markdown body manuscript material? | Defaults to `false`; set `true` for scenes/excerpts hosted as the entire body |

Everything after the closing `---` is the Markdown body. Use `##` for body section headings; the page title supplies the H1. Drafts with `published: false` have no public URL, sitemap entry, RSS entry or share card.

Archive ordering is newest date first, then descending stable ID for same-day ties. Oldest first reverses that exact order. Choose meaningful IDs if same-day order matters. Filters group a few types without multiplying routes or taxonomies.

## Add an X reference

Add `xUrl: "https://x.com/hexakin/status/ACTUAL_POST_ID"` to an archive file, or `xArticleUrl` for an actual Article. Replace the format placeholder with the real URL. These are ordinary links. There is no X API, scraping or global embed script. Your Markdown representation survives independently of X.

## Add a draft chapter

Copy `docs/templates/chapter.md` into `content/chapters/01-your-slug.md`. File numbering is a convenience; `number` controls reading order. IDs/slugs are stable identifiers, not changing chapter titles.

```yaml
---
id: "stable-chapter-id"
slug: "stable-chapter-slug"
number: 1
title: "The actual chapter title"
description: "A surviving description of the chapter, not the full manuscript."
status: "upcoming"
published: false
---
```

| Field | Type / allowed values | Required / default |
| --- | --- | --- |
| `id`, `slug` | Stable lowercase hyphenated strings | Required, unique |
| `number` | Positive integer | Required, unique |
| `title` | Nonempty string, max 180 characters | Required |
| `description` | Nonempty string, max 500 characters | Required; public history/SEO |
| `published` | Boolean: should this historical record have a public page? | Defaults to `false` |
| `status` | `upcoming`, `public`, `revised`, `withdrawn` | Required |
| `firstPublishedAt` | Quoted real `YYYY-MM-DD` | Required for `public`, `revised`, `withdrawn`; optional for `upcoming` |
| `updatedAt` | Quoted real `YYYY-MM-DD` | Required for `revised`; cannot predate first publication |
| `xArticleUrl` | HTTPS X/Twitter URL | Optional; retained in the local withdrawal report even for private records |
| `excerpt` | Permitted surviving excerpt, max 600 characters | Optional; suppressed globally when full text is disabled |
| `revisionNote` | Nonempty string, max 1000 characters | Optional; public history, never private editorial notes |

Put the full draft after the closing `---`. For a release, set a genuine `firstPublishedAt`, `status: public` and `published: true`; a released public chapter needs a nonempty body. A revision keeps ID/slug/first date and uses `status: revised`, actual `updatedAt` and a public revision note. Add a separate archive update with `type: chapter` and `chapter: stable-chapter-id` if it should enter the writing timeline/RSS.

## Withdraw one chapter

Keep `published: true`, retain the original first date and set `status: withdrawn`. The page becomes a historical record. Its full body is removed from HTML, RSC and the public content projection. A deliberately permitted `excerpt` may survive; remove it if none should remain. The source body can stay for recovery, provided the repository itself is an appropriate place to keep it.

Use `published: false` only when the entire record must disappear from the website. That does not erase Git history. Global withdrawal and external checks are documented in `docs/PUBLICATION.md`.

## Curate Start Here

Edit `content/pages/start-here.json`. Array order controls the reading path. Both home and `/start` consume it; `/start` omits its own self-link.

```json
{ "label": "Your actual entry title", "note": "Why begin with this?", "kind": "archive", "target": "the-archive-id" }
```

`kind` is `page`, `archive` or `chapter`. For archive/chapter, `target` is the stable ID of an existing public record. Page targets are `/start`, `/archive`, `/archive?order=oldest`, `/chapters`, `/about` or `/#newsletter`. Broken/unpublished destinations stop the build.

## Book configuration and lifecycle

`book.json` has these exact fields:

| Field | Value |
| --- | --- |
| `workingTitle` | Nonempty string or `null` |
| `premise` | Nonempty string or `null` |
| `startedAt` | Real quoted `YYYY-MM-DD` or `null` |
| `phase` | `writing`, `editing`, `prepublication`, `released` |
| `status` | Plain public status sentence |
| `fullTextEnabled` | Boolean; global manuscript visibility |
| `wordCount` | Nonnegative integer or `null`; only set if you want it public |
| `releaseUrl` | HTTPS purchase/release URL or `null` |

Phase changes update the homepage opening, book status, metadata and home share card. Editing visibly marks the first draft complete; release changes the opening to “I wrote a novel.” Visibility is an independent choice: changing phase never silently withdraws/restores text. This version has one current book; keep existing archive/chapter IDs and URLs when introducing the next project. Book-specific chapter grouping can be added to this file interface without changing the visual system; don't reuse old slugs or overwrite its history.

## Images and approved automation

Store approved public images in `public/`, optimise them, and use Markdown `![A meaningful description](/your-image.webp)`. Describe images that convey story information; keep decorative texture in CSS. Don't paste private story-bible images into public assets. Raw HTML is sanitised; scripts, event handlers and unsafe URL schemes are removed. Avoid raw HTML when ordinary Markdown is enough.

Hermes may propose files using these schemas. Keep proposals outside the published content until you review them. Approval consists of reviewing the exact text/metadata, setting `published: true` and committing/deploying through the normal human-controlled workflow. This repository contains no autonomous publishing hook.

Runtime schemas are in `lib/content.ts`. Templates are outside the content tree on purpose: they never become published material.
