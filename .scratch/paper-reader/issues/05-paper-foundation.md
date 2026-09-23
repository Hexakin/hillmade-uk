# 05: Paper foundation (chapter pages first)

**Spec:** `.scratch/paper-reader/spec.md`

**What to build:** The chosen paper treatment from 01 becomes the site's visual system: a paper background, sheet and card surfaces, and colour tokens for the Paper theme. It is applied first to the chapter pages and the chapter list, so the core reading experience is on paper and can be shipped. Other pages keep working and may look mid-transition until 06.

**Blocked by:** 01

**Status:** ready-for-agent

- [ ] Paper background, sheet and card styles exist as reusable tokens and classes matching the chosen treatment
- [ ] Chapter pages and the chapter list use them at phone and desktop widths, with no sideways scrolling
- [ ] The Night theme's dark palette is preserved as tokens for 09, but not yet switchable
- [ ] Text contrast meets WCAG AA on paper
- [ ] The page weight increase from texture is small (reported in the ticket)
