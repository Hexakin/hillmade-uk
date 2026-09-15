import assert from "node:assert/strict";
import { test } from "node:test";
import { handleSignup, newsletterState } from "../lib/newsletter";
const env = {
  NODE_ENV: "production",
  MAILERLITE_API_KEY: "SERVER_SECRET_SENTINEL",
  MAILERLITE_GROUP_ID: "test-group",
  MAILERLITE_DOUBLE_OPT_IN_CONFIRMED: "true",
};
function request(
  body: unknown = {
    email: "reader@example.invalid",
    consent: true,
    website: "",
  },
  origin = "https://hillmade.uk",
) {
  return new Request("https://hillmade.uk/api/subscribe", {
    method: "POST",
    headers: { Origin: origin, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}
test("missing config fails safely without calling a service", async () => {
  const response = await handleSignup(request(), {
    env: {},
    fetcher: () => {
      throw new Error("Must not send");
    },
  });
  assert.equal(response.status, 503);
  assert.ok(!(await response.text()).includes("reader@example.invalid"));
});
test("double opt-in must be confirmed before signup is enabled", () => {
  assert.equal(
    newsletterState({ ...env, MAILERLITE_DOUBLE_OPT_IN_CONFIRMED: "false" })
      .configured,
    false,
  );
});
test("successful signup sends only email and group, keeping secrets server side", async () => {
  let calls = 0;
  const fetcher: typeof fetch = async (_url, options) => {
    calls++;
    assert.equal(
      options?.headers &&
        (options.headers as Record<string, string>).Authorization,
      "Bearer SERVER_SECRET_SENTINEL",
    );
    assert.deepEqual(JSON.parse(options!.body as string), {
      email: "reader@example.invalid",
      groups: ["test-group"],
    });
    return Response.json(
      { data: { email: "reader@example.invalid" } },
      { status: 201 },
    );
  };
  const response = await handleSignup(request(), {
    env,
    fetcher,
    limiter: new Map(),
  });
  assert.equal(response.status, 200);
  assert.equal(calls, 1);
  const body = await response.text();
  assert.ok(!body.includes("SERVER_SECRET"));
  assert.ok(!body.includes("reader@example.invalid"));
});
test("provider failures and timeout exceptions have generic safe errors", async () => {
  const rejected = await handleSignup(request(), {
    env,
    limiter: new Map(),
    fetcher: async () =>
      Response.json({ email: "reader@example.invalid" }, { status: 422 }),
  });
  assert.equal(rejected.status, 502);
  assert.ok(!(await rejected.text()).includes("reader@example.invalid"));
  const timedOut = await handleSignup(request(), {
    env,
    limiter: new Map(),
    fetcher: async () => {
      throw new Error("private service details");
    },
  });
  assert.equal(timedOut.status, 502);
  assert.ok(!(await timedOut.text()).includes("private service"));
});
test("consent and email are required", async () => {
  for (const body of [
    { email: "bad", consent: true },
    { email: "reader@example.invalid", consent: false },
  ])
    assert.equal((await handleSignup(request(body), { env })).status, 400);
});
test("cross-origin requests are refused", async () => {
  assert.equal(
    (await handleSignup(request(undefined, "https://other.example"), { env }))
      .status,
    403,
  );
});
test("honeypot submissions do not contact provider", async () => {
  const response = await handleSignup(
    request({ email: "bot@example.invalid", consent: true, website: "spam" }),
    {
      env,
      fetcher: () => {
        throw new Error("Must not send");
      },
    },
  );
  assert.equal(response.status, 200);
});
test("requests are bounded even when Content-Length is absent", async () => {
  assert.equal(
    (
      await handleSignup(request({ email: "x".repeat(5000), consent: true }), {
        env,
      })
    ).status,
    413,
  );
});
test("local mocks can exercise success and failure but are ignored in production", async () => {
  const localEnv = { NODE_ENV: "development", NEWSLETTER_TEST_MODE: "local" };
  assert.equal((await handleSignup(request(), { env: localEnv })).status, 200);
  assert.equal(
    (
      await handleSignup(
        request({ email: "error@example.invalid", consent: true }),
        { env: localEnv },
      )
    ).status,
    502,
  );
  assert.equal(
    newsletterState({ ...localEnv, NODE_ENV: "production" }).configured,
    false,
  );
});
test("repeat submissions are limited with temporary hashes, never raw addresses", async () => {
  const limiter = new Map<string, number>();
  const fetcher: typeof fetch = async () => new Response(null, { status: 201 });
  assert.equal(
    (await handleSignup(request(), { env, limiter, fetcher, now: 1000 }))
      .status,
    200,
  );
  assert.ok(!JSON.stringify([...limiter.keys()]).includes("reader"));
  assert.equal(
    (await handleSignup(request(), { env, limiter, fetcher, now: 1001 }))
      .status,
    429,
  );
  assert.equal(
    (await handleSignup(request(), { env, limiter, fetcher, now: 61001 }))
      .status,
    200,
  );
});
