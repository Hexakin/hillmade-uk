import { shareImage, shareKeys } from "@/lib/share-image";
export const runtime = "nodejs";
export const dynamic = "force-static";
export function generateStaticParams() {
  return shareKeys().map((key) => ({ key }));
}
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ key: string }> },
) {
  const { key } = await params;
  return shareImage(key) || new Response("Not found", { status: 404 });
}
