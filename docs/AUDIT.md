# Existing site audit · 15 September 2026

- Stack: Next.js 16.3.3 App Router, React 19.2.8, TypeScript, Tailwind CSS 4; npm lockfile. Existing commands: `npm run dev`, `npm run lint`, `npm run build`, `npm start`. No tests or typecheck script.
- Routes: `/`, framework 404, `/sitemap.xml`, `/robots.txt`, icon and two file-based social images. No content archive or historical article URLs to redirect. Off-site project links are external destinations, not local routes.
- Deployment: live HTTPS response identifies Vercel, Next.js prerendering and Cloudflare. Domain/canonical: `https://hillmade.uk`. No checked-in Vercel project configuration, deployment workflow or DNS credentials. Do not change domain or DNS. Production deployment is not authorised by this brief.
- Integrations: Vercel Analytics loaded globally. No forms, newsletter service, CMS or database. No documented environment variables; no local environment files or newsletter credentials found. Only environment variable names were inspected.
- Assets: real Jonathan portrait (84 KB); old OG/Twitter JPGs (43 KB each); SVG favicon. Preserve portrait and old social images. Newsreader + Source Sans 3 already self-hosted by `next/font` at build time; retain their pairing.
- SEO: basic root title, description, canonical, OG/Twitter, robots and one-entry sitemap. All identify the old professional-parent purpose. No RSS or structured content metadata.
- Visual/accessibility audit: warm editorial typography is a good starting point. Portrait-first business biography, FAQ and unrelated links obscure the new writing purpose. Existing focus styling and semantic main are useful; missing skip navigation, active navigation, privacy notice and accessible form states. No animation libraries or heavy media to preserve.
- Performance: small, static site with an optimised portrait. Keep static rendering; avoid social scripts and extra global tracking. No instrumented CWV baseline is available; do not claim measured field performance.
- Recovery: initial clean commit `60d9341`; redesign branch `codex/novel-in-public`. Full pre-change Git bundle at `C:/Users/t4nk3/.codex/backups/hillmade-uk-before-novel-2026-09-15.bundle`. Source and assets also recoverable from Git history.

## Implementation plan

1. Keep framework, package manager, font pairing, deployment and canonical domain.
2. Add validated portable Markdown for approved archive/chapters/pages; JSON for book lifecycle and curated Start Here links. No invented manuscript or publication dates.
3. Build a dark editorial homepage, start page, chronological archive/detail pages, chapter index/readers, short about and privacy pages. Use responsive rules and quiet empty states.
4. Add server-side newsletter integration with fail-safe configuration, explicit consent, double opt-in setup, honeypot and bounded requests. Remove global analytics; no X API or embeds.
5. Generate RSS, sitemap, metadata and matching share images. Separate chapter history from publicly rendered bodies, with reversible global withdrawal and an external-reference report.
6. Test validation, privacy boundaries, sorting, withdrawal and signup. Run lint/typecheck/build; inspect desktop/mobile output and document authoring/setup/publication procedures.
