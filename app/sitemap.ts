import type { MetadataRoute } from "next";
import { getContent } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  const { archive, chapters } = getContent();
  return [
    ...["/", "/start", "/archive", "/chapters", "/about", "/privacy"].map(
      (url) => ({ url: absoluteUrl(url), priority: url === "/" ? 1 : 0.7 }),
    ),
    ...archive.map((item) => ({
      url: absoluteUrl(`/archive/${item.slug}`),
      lastModified: `${item.date}T00:00:00Z`,
    })),
    ...chapters.map((item) => ({
      url: absoluteUrl(`/chapters/${item.slug}`),
      ...(item.updatedAt || item.firstPublishedAt
        ? {
            lastModified: `${item.updatedAt || item.firstPublishedAt}T00:00:00Z`,
          }
        : {}),
    })),
  ];
}
