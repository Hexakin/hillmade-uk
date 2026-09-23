# Design decisions

- **A public manuscript archive.** The opening explains the project immediately. The author name is a small masthead; the story is the main event.
- **Keep the existing fonts.** Newsreader brings literary character; Source Sans 3 keeps everyday explanations/forms clear. System monospace is reserved for dates, types and editorial metadata. Fonts are self-hosted by Next, with swap fallbacks; the share renderer has a local licensed Newsreader font.
- **Charcoal workspace, warm reading paper.** Main surface `#191a18`, bone text `#ede7da`, muted text `#aaa99e`, red annotation `#c47c70`. A chapter preview and manuscript reader use `#e9e2d3` paper with `#302e28` ink. No gradients or image-led hero.
- **Rules rather than cards.** The archive is a chronological ruled notebook. One paper manuscript panel has an actual editorial purpose; the site does not use card grids.
- **Revision belongs in the identity.** A crossed-out line, handwritten-feeling serif italics, tiny red marks and restrained date/type labels suggest revision without impersonating a typewriter or period publishing house.
- **Mobile first entry paths.** A wrapping two-row masthead needs no menu JavaScript. Archive filters/order are real links, including a useful no-JavaScript path. Display type scales down at 320 px; the chapter reader has narrow margins and a calm line length.
- **Long reading is a separate surface.** Chapters use warm paper, approximately 65-character desktop lines and 19–22 px serif text. Commentary remains on the dark desk. No fixed overlay or distracting scroll effects.
- **Small navigation.** Start here, Archive, Chapters, About; quiet follow/subscribe links. One newsletter invitation, no popups, cadence promises, reviews or fabricated manuscript content.
- **Access is part of typography.** Visible focus, skip link, semantic landmarks, proper context-sensitive headings, labelled form/explicit consent/live feedback and reduced-motion CSS. No animation is required to understand the page.
- **Future story cues can be added locally.** Palette/prose/layout tokens are defined at the top of `app/globals.css`. Real lore imagery or annotations can arrive with the novel, without a new technology stack. Lifecycle text lives in `lib/site.ts` and is driven by book phase.
- **Tracking is minimal and cookie-free.** Vercel Web Analytics (re-added 21 Sept 2026) and Cloudflare Web Analytics count page views in aggregate. There are no advertising scripts, X scripts or tracking cookies, so no cookie banner is needed. Both are disclosed on `/privacy`.

Useful widths: overall shell 1160 px; commentary/entry shell 850 px; manuscript sheet 900 px including margins; chapter text around 750 px maximum. Major vertical spaces scale from 65–75 px desktop to 35–40 px mobile. Borders are one-pixel warm charcoal rules. Interactive targets use compact rectangular controls and visible focus, not round promotional badges.
