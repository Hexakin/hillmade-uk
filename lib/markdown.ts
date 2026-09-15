import { marked } from "marked";
import sanitizeHtml from "sanitize-html";

export function renderMarkdown(body: string) {
  return sanitizeHtml(marked.parse(body, { async: false }), {
    allowedTags: [
      "p",
      "br",
      "em",
      "strong",
      "del",
      "blockquote",
      "h2",
      "h3",
      "h4",
      "ul",
      "ol",
      "li",
      "a",
      "hr",
      "code",
      "pre",
      "img",
      "figure",
      "figcaption",
    ],
    allowedAttributes: {
      a: ["href", "title"],
      img: ["src", "alt", "width", "height", "loading"],
    },
    allowedSchemes: ["https", "http", "mailto"],
    allowProtocolRelative: false,
    transformTags: {
      img: (tagName, attribs) => ({
        tagName,
        attribs: { ...attribs, loading: "lazy" },
      }),
    },
  });
}
