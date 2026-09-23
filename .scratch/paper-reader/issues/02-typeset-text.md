# 02: Typeset text

**Spec:** `.scratch/paper-reader/spec.md`

**What to build:** Readers see chapters as typeset text: curly quotes and apostrophes, proper ellipses and em dashes, a drop cap on the opening paragraph, and a printed ornament for `***` scene breaks. The manuscript wording is never changed, and this works on the current design, so it can ship straight away.

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

- [ ] Straight double and single quotes become curly, including in chapters that are already partly curly
- [ ] Leading elisions face the right way (’86, ’ya, ’em)
- [ ] `...` becomes an ellipsis, and a spaced hyphen used as a dash becomes an em dash; hyphenated words are untouched
- [ ] Code spans and URLs are never altered, and typesetting is idempotent
- [ ] `***` scene breaks render as an ornament (chapters 24 and 25)
- [ ] The first paragraph of each chapter has a drop cap that screen readers read normally
- [ ] Content-layer tests cover the cases above using temporary fixture content, and the existing suite still passes
- [ ] Word counts and reading times are unchanged
