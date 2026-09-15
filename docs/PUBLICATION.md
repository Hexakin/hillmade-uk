# Withdrawing manuscript material

This procedure supports withdrawal and review. It does **not** automatically guarantee eligibility for KDP Select / Kindle Unlimited. Check [Amazon's current KDP Select terms](https://kdp.amazon.com/en_US/help/topic/G200798990) directly before enrolment; external copies, permitted excerpts, previous distribution and caching need human review.

## Local report

```powershell
npm run publication:report
```

The JSON report lists currently public full-text chapter URLs/source files, surviving chapter excerpts, marked manuscript archive material, and every stored X post/Article reference (including private/withdrawn records). It never includes manuscript bodies or subscriber details. Save a private copy if you want a dated review record; it is not a page on the website.

## Withdraw all public manuscript bodies

```powershell
npm run publication:withdraw
npm run publication:report
npm run lint
npm run typecheck
npm test
npm run build
```

The command sets `content/book/book.json` → `fullTextEnabled: false`. It records the before/after configuration and pre-change report under private, Git-ignored `.publication/`. It changes no chapter source body, date, URL or status. Public chapter pages become historical records; chapter excerpts, `manuscriptExcerpt` fields and archive bodies explicitly marked `manuscriptBody: true` are suppressed before rendering. RSS contains update summaries, never chapter bodies.

**Rebuilding/deploying is necessary.** A local switch cannot remove HTML from the live deployment. After authorised deployment, inspect every live chapter page and check raw HTML/RSC, social cards, sitemap and archive references. Redeploying replaces the current generated site but cannot recall copies readers have already made.

## Human checklist

- Review all public summaries, descriptions, revision notes, Markdown bodies and images for manuscript text that was not marked. `manuscriptBody: false` assumes the body is commentary; the tool cannot infer that from prose.
- Verify/remove full text and any other material requiring removal in **each external X Article and X post**. Local withdrawal does not change external URLs or content. Keep a private checked-off list; record an external URL only if useful as historical reference.
- Review other sites, social profiles, downloadable files, previous Vercel deployments/preview URLs, public Git repositories, caches and search engines. A private unpublished file inside a public GitHub repository is still available through GitHub.
- Ensure surviving descriptions/excerpts are appropriate for the actual publication arrangement. The global switch also hides optional chapter/marked archive excerpts to simplify this review.
- Check current Amazon terms directly. Make the enrolment decision only after the manual review, not merely because this report has zero full-text pages.

No DNS changes or automatic external deletion are performed.

## Restore

```powershell
npm run publication:restore
npm run build
```

This re-enables the global switch and records an audit snapshot. Individual `status: withdrawn` chapters stay withdrawn. To restore one, explicitly choose `public`/`revised` and review the text. Rebuild and deploy through the authorised workflow. Restore is a publishing choice; don't use it while an exclusivity arrangement disallows the restored material.

## One chapter only

Set `status: withdrawn` while keeping `published: true` and the original metadata. Optional permitted `excerpt` is independent of the full body when the global switch is enabled. Remove it if appropriate. The route keeps its historical record and neighbouring chapter navigation.
