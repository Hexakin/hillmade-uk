# 09: Reader settings: Night theme and text size

**Spec:** `.scratch/paper-reader/spec.md`

**What to build:** Readers can switch between Paper and Night themes and choose from four text sizes, remembered on their device. Dark-mode devices start in Night until the reader chooses, and there is no flash of the wrong theme on load. The privacy page describes what the browser remembers.

**Blocked by:** 04, 05

**Status:** ready-for-agent

- [ ] An accessible settings control ("Aa") offers Paper, Night and four text sizes, defaulting to the second size
- [ ] A device set to dark mode gets Night automatically, and an explicit choice overrides it
- [ ] There is no flash of the wrong theme on first paint
- [ ] Settings persist through the reader state module (04), and blocked storage falls back to defaults
- [ ] Reduced-motion preferences switch off decorative movement
- [ ] The privacy page lists theme, text size and reading place as kept only in the reader's browser
- [ ] Reader state module tests cover theme precedence and text size bounds
