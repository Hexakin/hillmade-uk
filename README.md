# Jonathan Hill · A novel in public

The owned home for Jonathan's public writing project at **hillmade.uk**. X (@hexakin) is the conversation layer; approved Markdown is the durable archive.

## Run and check

Node 22+ and npm. The existing Next.js 16 / React 19 / Tailwind 4 stack and lockfile are retained.

```powershell
npm ci
npm run dev
```

```powershell
npm run lint
npm run typecheck
npm test
npm run build
npm start -- --port 3100
```

In a second terminal, `npm run verify:public` crawls public pages/internal links and verifies RSS, sitemap, metadata, social PNG dimensions and 404 behaviour. Its default signup smoke test uses the honeypot and creates no subscriber. Use `-- --unconfigured` only while provider settings are missing to verify the 503 response. `VERIFY_ORIGIN` selects another local preview origin.

## Architecture

- App Router server components render sanitised Markdown. Home, Start Here, About, Privacy, chapters/detail pages, RSS, sitemap and share images are prerendered. The archive handles filter/order queries on the server. The newsletter API is the only application write endpoint.
- `lib/content.ts` owns strict Zod validation, deterministic ordering and the public projection. Private records have no public route. Withdrawn text is removed before HTML/RSC rendering.
- `content/` holds portable approved writing; templates are outside it in `docs/templates/`. Initial archive/chapter views are honest empty states. No invented novel or dates.
- Small client components provide active navigation and form feedback. No X API, scraper, social embeds, database, admin panel, animation framework or autonomous publishing.
- Source Sans 3 + Newsreader are self-hosted by Next. A local licensed Newsreader font supports 1200×630 social PNGs. Old share JPGs are preserved in `legacy-assets/`; the portrait remains in `public/`.
- Canonical domain remains `https://hillmade.uk`. RSS is `/feed.xml` (new chapters, revised editions and notebook entries); sitemap, robots, manifest and `/share/[key]` are generated. Cookie-free Vercel Web Analytics and Cloudflare Web Analytics count visits; both, plus hosting request processing, are described on `/privacy`.
- Security headers (nosniff, referrer policy, frame blocking, permissions policy) are set in `next.config.ts`. A full script CSP is not set, because Next inline scripts and Cloudflare-injected scripts would need nonces.
- Chapters get a word count and reading time at build time (`lib/content.ts`). The homepage reading card (`components/ContinueReading.tsx`) keeps each visitor's last-read chapter in their own browser's localStorage and never sends it to the server.

## Guides

- [Content authoring and exact fields](docs/CONTENT.md): daily update, chapter, X URL, revision, withdrawal and Start Here.
- [Newsletter setup](docs/NEWSLETTER.md): MailerLite Free/no-card recommendation, opt-in, local UI testing and export.
- [Publication report and withdrawal](docs/PUBLICATION.md): reversible commands and external/manual checks.
- [Design decisions](docs/DESIGN.md), [existing-site audit](docs/AUDIT.md), [verification and limits](docs/VERIFICATION.md).

## Configuration

Copy `.env.example` to `.env.local`. Live signup needs server-only `MAILERLITE_API_KEY`, `MAILERLITE_GROUP_ID` and `MAILERLITE_DOUBLE_OPT_IN_CONFIRMED=true` after enabling the actual provider API opt-in setting. Missing settings fail safely without logging, storing or forwarding emails. No account or newsletter-sending workflow was provisioned. Never commit credentials or use `NEXT_PUBLIC_` for secrets.

Optional local settings: `NEWSLETTER_TEST_MODE=local` exercises confirmation/error states without sending/storing data; `CONTENT_DIR=.qa/content` selects isolated labelled QA writing. Remove QA settings before a real deployment. The newsletter mock is ignored in production.

```powershell
npm run publication:report
npm run publication:withdraw
npm run publication:restore
```

Withdrawal/restore changes only the global text switch, saving an audit under Git-ignored `.publication/`. Individual withdrawn statuses remain. Rebuild and deploy to affect the live site. External X URLs need manual review; the tools provide no Amazon exclusivity guarantee.

## Populated-page QA

Run `npm run qa:fixtures`, set `CONTENT_DIR=.qa/content`, then build/start the local preview. In a second terminal with the same setting, `npm run verify:public -- --fixtures --unconfigured` tests labelled fixtures while credentials are absent. Stop the preview before rebuilding. Global withdrawal can be tested against that same isolated directory. Unit tests use independent temporary content and remain valid as real writing grows.

For the final real build, stop the QA preview, remove `CONTENT_DIR` and build again. Never deploy test fixtures.

## Deployment and recovery

The site is live on the existing Vercel project, which deploys from `main`. hillmade.uk is the canonical host, and `www` should permanently redirect (308) to it: set this in Vercel → Domains. Work on a branch, run the checks above, then merge to `main` to deploy. No old article URLs exist to redirect.

Pre-change commit: `60d9341`. Full recovery bundle: `C:/Users/t4nk3/.codex/backups/hillmade-uk-before-novel-2026-09-15.bundle`. Clone it into a separate recovery folder to recover the old site while preserving your current work.
