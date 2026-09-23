# 03: "Notebook" everywhere

**Spec:** `.scratch/paper-reader/spec.md`

**What to build:** Readers see "Notebook" wherever the site currently says "archive": navigation, page titles, headings, labels, share cards, RSS title text and llms.txt. Old `/archive` links keep working. "Edition" disappears from reader-visible text and validation messages, and "version" is the only change-tracking word readers see (see CONTEXT.md).

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

- [ ] No reader-visible text says "archive" or "edition"
- [ ] The navigation item reads "Notebook" and still goes to the existing address
- [ ] Page titles, metadata and share-card text say Notebook
- [ ] The built-site check fails if reader-visible HTML contains the word "archive"
- [ ] Existing tests are updated and pass
