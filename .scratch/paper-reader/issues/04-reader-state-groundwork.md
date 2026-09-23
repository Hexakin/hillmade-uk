# 04: Reader state groundwork

**Spec:** `.scratch/paper-reader/spec.md`

**What to build:** Prefactor: one pure, browser-independent reader state module owns everything the site remembers in the reader's browser. "Continue reading" moves onto it and behaves exactly as today. Nothing visible changes. This makes reader settings (09) and furthest read (16) easy changes.

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

- [ ] The module holds the reading place today, and is designed to hold theme, text size, furthest read and "show everything" later
- [ ] Existing saved reading places are migrated without loss
- [ ] When storage is unavailable or corrupted, the module falls back to defaults without errors
- [ ] The module is tested directly without a browser: defaults, recording a chapter opened, recording a chapter's end, migration and storage failure
- [ ] The "Continue reading" card behaves as before in a browser check (start, continue, up next, caught up)
