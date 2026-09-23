# 16: Furthest read and a personal Companion

**Spec:** `.scratch/paper-reader/spec.md`

**What to build:** The site tracks each reader's furthest read: it goes up when they reach the end of a chapter, stays put when they reread, and can be set by hand. The Companion loads the reader's own version, and a "show everything" switch reveals all. The chapter list marks the furthest read with a red-pen tick.

**Blocked by:** 04, 14

**Status:** ready-for-agent

- [ ] Furthest read rises only when a chapter's end is reached, and rereading never lowers it
- [ ] "I've read up to Chapter __" sets it by hand from the Companion and the chapter list
- [ ] "Show everything" loads the full Companion
- [ ] The Companion swaps in the data file matching the reader's furthest read, and shows the Chapter 1 view without JavaScript
- [ ] The chapter list shows a red-pen tick at the furthest read
- [ ] Reader state module tests cover increase-only behaviour, manual setting and show everything
