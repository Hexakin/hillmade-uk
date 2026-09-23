# 11: Share a chapter, and the X conversation link

**Spec:** `.scratch/paper-reader/spec.md`

**What to build:** At the end of each chapter, readers can share the chapter (the native share sheet where available, otherwise copying the link or opening an X post) and follow "Tell me what you thought" to the chapter's X thread. Chapters gain an optional X thread URL; without one, the link opens a post to @hexakin that already includes the chapter link.

**Blocked by:** 05

**Status:** ready-for-agent

- [ ] The share action uses the native share sheet when supported, and falls back gracefully
- [ ] The optional per-chapter X thread URL is validated like existing X URL fields
- [ ] Without a thread URL, an X compose intent includes @hexakin and the chapter URL
- [ ] The site stores no visitor data
