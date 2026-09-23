import type { NextConfig } from "next";

// Low-risk hardening headers. A full script CSP is deliberately omitted: Next's
// inline bootstrapping plus Cloudflare's injected scripts would need nonces.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  agentRules: false,
  turbopack: { root: process.cwd() },
  outputFileTracingRoot: process.cwd(),
  outputFileTracingIncludes: {
    "/archive": ["./content/**/*", "./content/**/.gitkeep"],
    "/share/*": [
      "./content/**/*",
      "./content/**/.gitkeep",
      "./assets/fonts/newsreader.ttf",
    ],
  },
};

export default nextConfig;
