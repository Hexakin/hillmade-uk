import { createHash } from "node:crypto";
import { z } from "zod";
import { siteUrl } from "./site";

type Environment = Record<string, string | undefined>;
const signupSchema = z
  .object({
    email: z.string().trim().email().max(254),
    consent: z.literal(true),
    website: z.string().max(300).default(""),
  })
  .strict();
const recent = new Map<string, number>();
const reply = (status: number, message: string) =>
  Response.json(
    { message },
    { status, headers: { "Cache-Control": "no-store" } },
  );
export function newsletterState(env: Environment = process.env) {
  const testing =
    env.NODE_ENV !== "production" && env.NEWSLETTER_TEST_MODE === "local";
  return {
    testing,
    configured:
      testing ||
      Boolean(
        env.MAILERLITE_API_KEY &&
          env.MAILERLITE_GROUP_ID &&
          env.MAILERLITE_DOUBLE_OPT_IN_CONFIRMED === "true",
      ),
  };
}
export async function handleSignup(
  request: Request,
  options: {
    env?: Environment;
    fetcher?: typeof fetch;
    now?: number;
    limiter?: Map<string, number>;
  } = {},
) {
  const env = options.env || process.env;
  const origin = request.headers.get("origin");
  const requestOrigin = new URL(request.url).origin;
  if (
    !origin ||
    (origin !== siteUrl &&
      !(env.NODE_ENV !== "production" && origin === requestOrigin))
  )
    return reply(403, "Please submit the form from this website.");
  if (!request.headers.get("content-type")?.startsWith("application/json"))
    return reply(415, "Please use the email signup form.");
  if (Number(request.headers.get("content-length")) > 4096)
    return reply(413, "The signup request is too large.");
  let payload: unknown;
  try {
    const reader = request.body?.getReader();
    if (!reader)
      return reply(
        400,
        "Please enter a valid email address and agree to receive book updates.",
      );
    let bytes = 0;
    const parts: Uint8Array[] = [];
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.length;
      if (bytes > 4096) {
        await reader.cancel();
        return reply(413, "The signup request is too large.");
      }
      parts.push(value);
    }
    payload = JSON.parse(Buffer.concat(parts).toString("utf8"));
  } catch {
    return reply(400, "The form could not be read. Please try again.");
  }
  const parsed = signupSchema.safeParse(payload);
  if (!parsed.success)
    return reply(
      400,
      "Please enter a valid email address and agree to receive book updates.",
    );
  const success =
    "If confirmation is needed, check your inbox for an email from Jonathan. Your subscription starts after you confirm.";
  if (parsed.data.website) return reply(200, success);
  const state = newsletterState(env);
  if (!state.configured)
    return reply(
      503,
      "Email signup isn't open yet. You can follow @hexakin on X or use the RSS feed in the meantime.",
    );
  if (state.testing)
    return parsed.data.email === "error@example.invalid"
      ? reply(
          502,
          "The email service couldn't accept the request. Please try again later.",
        )
      : reply(
          200,
          "Local preview: confirmation state tested. No email was stored or sent.",
        );
  // Short-lived hashed keys only; provider double opt-in is the primary spam control.
  const limiter = options.limiter || recent;
  const now = options.now ?? Date.now();
  for (const [key, time] of limiter)
    if (now - time >= 60_000) limiter.delete(key);
  const key = createHash("sha256")
    .update(parsed.data.email.toLowerCase())
    .digest("hex");
  if (limiter.has(key) || limiter.size >= 500)
    return reply(429, "Please wait a minute before trying again.");
  limiter.set(key, now);
  if (!options.limiter) {
    const expiry = setTimeout(() => limiter.delete(key), 60_000);
    expiry.unref();
  }
  try {
    const response = await (options.fetcher || fetch)(
      "https://connect.mailerlite.com/api/subscribers",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.MAILERLITE_API_KEY}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: parsed.data.email,
          groups: [env.MAILERLITE_GROUP_ID],
        }),
        signal: AbortSignal.timeout(8000),
        cache: "no-store",
      },
    );
    if (!response.ok)
      return reply(
        response.status === 429 ? 429 : 502,
        "The email service couldn't accept the request. Please try again later.",
      );
    return reply(200, success);
  } catch {
    return reply(
      502,
      "The email service couldn't be reached. Please try again later.",
    );
  }
}
