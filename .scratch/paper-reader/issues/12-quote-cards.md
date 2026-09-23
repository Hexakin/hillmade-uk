# 12: Quote cards

**Spec:** `.scratch/paper-reader/spec.md`

**What to build:** A reader selects a line in a chapter and shares it as a quote card: a paper-styled image crediting Jonathan Hill, naming the book and chapter, and linking back. The image service accepts only text that appears exactly in that chapter's public typeset text, within a length limit, so no one can fabricate quotes.

**Blocked by:** 02, 05

**Status:** ready-for-agent

- [ ] Selecting text in a chapter offers "Share this line"
- [ ] The card shows the quote, author, book, chapter and site in the paper style
- [ ] Text not in the chapter, text over the limit, or text from a non-public chapter is rejected with an error and no image
- [ ] Matching tolerates whitespace and quote-style differences
- [ ] Content-layer tests cover acceptance and rejection, and the built-site check confirms the service rejects made-up text
