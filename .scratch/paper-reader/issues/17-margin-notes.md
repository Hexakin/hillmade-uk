# 17: Margin notes

**Spec:** `.scratch/paper-reader/spec.md`

**What to build:** A notebook entry can attach itself to a passage by quoting it. Readers see a handwritten margin note beside that paragraph on wide screens, or a small red mark that expands the note beneath the paragraph on phones, linking to the full entry. The build fails, naming the entry, if the quote isn't found, matches more than once, or would lead to spoilers.

**Blocked by:** 02, 05

**Status:** ready-for-agent

- [ ] Notebook entries gain an optional anchor (chapter plus exact passage) and a "covers up to chapter" field
- [ ] Anchors resolve against typeset text, tolerating quote-style and whitespace differences
- [ ] The build fails on a missing or ambiguous anchor, or on a note in chapter N linking to an entry covering beyond N
- [ ] Notes appear in the margin at wide widths and toggle inline on phones, keyboard and screen-reader accessible
- [ ] Content-layer tests cover resolution and every failure case
