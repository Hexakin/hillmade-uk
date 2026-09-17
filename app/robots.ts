import type { MetadataRoute } from "next";
import { localPreview } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: localPreview() ? { userAgent: "*", disallow: "/" } : { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
