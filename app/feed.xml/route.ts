import { getContent } from "@/lib/content";
import { generateFeed } from "@/lib/feed";
export const dynamic = "force-static";
export function GET() {
  const content = getContent();
  return new Response(generateFeed(content.archive, content.chapters), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
