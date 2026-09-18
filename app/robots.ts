import type { MetadataRoute } from "next";
import { localPreview } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  if (localPreview()) {
    return {
      rules: { userAgent: "*", disallow: "/" },
      sitemap: absoluteUrl("/sitemap.xml"),
    };
  }
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: "hillmade.uk",
  };
}
