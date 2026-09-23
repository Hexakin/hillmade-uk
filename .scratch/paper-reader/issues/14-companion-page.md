# 14: Companion page, spoiler-safe

**Spec:** `.scratch/paper-reader/spec.md`

**What to build:** A Companion page, in the main navigation, lists People, Places and Things on paper. As served to everyone, it shows only facts revealed by Chapter 1. The build also emits one data file per public chapter containing only the projection through that chapter, ready for 16 to personalise. Sample fixture entries prove the leak check.

**Blocked by:** 13, 05

**Status:** ready-for-agent

- [ ] The Companion page and each entry page render the projection through Chapter 1 only
- [ ] One data file per public chapter contains nothing beyond that chapter
- [ ] The built-site check proves that no prerendered HTML or data file contains a fact beyond its chapter
- [ ] It is added to navigation, the sitemap and llms.txt
- [ ] Empty-state copy works while there are no real entries
