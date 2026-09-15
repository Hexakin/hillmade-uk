import { getContent } from "@/lib/content";
import { generateFeed } from "@/lib/feed";
export const dynamic = "force-static";
export function GET() {
  return new Response(generateFeed(getContent().archive), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
