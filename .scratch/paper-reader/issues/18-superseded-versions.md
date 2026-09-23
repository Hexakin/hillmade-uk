# 18: Superseded versions

**Spec:** `.scratch/paper-reader/spec.md`

**What to build:** When a chapter is revised, its outgoing version is kept as a frozen, read-only superseded version at its own permanent address. That page shows a notice linking to the current version. The build fails if any earlier version is missing.

**Blocked by:** 02, 05

**Status:** ready-for-agent

- [ ] A superseded version is a separate read-only content record, and validation requires versions 1 to N−1 for a chapter at version N
- [ ] Each is served at a permanent address under its chapter
- [ ] Superseded pages show a clear notice and a link to the current version, are noindex, and use a self-canonical URL
- [ ] The RSS feed continues to announce the revision with its revision note
- [ ] Fixture tests plus the built-site check cover this
