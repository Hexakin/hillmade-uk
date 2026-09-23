# 13: Companion content model

**Spec:** `.scratch/paper-reader/spec.md`

**What to build:** Companion entries (Person, Place, Thing) exist as validated public content with reveal chapters for the entry and each fact. The content layer exposes the Companion as known through chapter N. There are no pages yet. Follows ADR 0001: nothing reads the Novel repo's canon.

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

- [ ] The Companion entry schema has a stable ID, kind (Person, Place or Thing), name, entry reveal chapter, and facts each with their own reveal chapter
- [ ] Validation is strict: unknown fields fail, reveal chapters must be existing public chapters, and a fact can't be revealed before its entry
- [ ] The projection through N returns only entries and facts with reveal chapter ≤ N, with hidden items completely absent
- [ ] Tests with fixture content cover validation failures and the projection at several values of N
- [ ] No code path reads outside this repo's content
