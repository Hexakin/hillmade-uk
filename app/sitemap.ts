import type { MetadataRoute } from "next";
import { getContent } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const { archive, chapters } = getContent();
  const pages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), priority: 1, changeFrequency: "weekly" },
    { url: absoluteUrl("/start"), priority: 0.9, changeFrequency: "monthly" },
    {
      url: absoluteUrl("/chapters"),
      priority: 0.9,
      changeFrequency: "weekly",
    },
    {
      url: absoluteUrl("/archive"),
      priority: 0.8,
      changeFrequency: "weekly",
    },
    { url: absoluteUrl("/about"), priority: 0.6, changeFrequency: "monthly" },
    {
      url: absoluteUrl("/privacy"),
      priority: 0.2,
      changeFrequency: "yearly",
    },
  ];
  return [
    ...pages,
    ...archive.map((item) => ({
      url: absoluteUrl(`/archive/${item.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.6,
      ...(item.date ? { lastModified: `${item.date}T00:00:00Z` } : {}),
    })),
    ...chapters.map((item) => ({
      url: absoluteUrl(`/chapters/${item.slug}`),
      changeFrequency: "monthly" as const,
      priority: item.number === 1 ? 0.85 : 0.7,
      ...(item.updatedAt || item.firstPublishedAt
        ? {
            lastModified: `${item.updatedAt || item.firstPublishedAt}T00:00:00Z`,
          }
        : {}),
    })),
  ];
}
