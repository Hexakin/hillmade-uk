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
    return [
      { source: "/:path*", headers: securityHeaders },
      // Aether's APK downloads as an Android app, and its version file is never cached stale,
      // so the app's Check for updates sees a new release at once.
      {
        source: "/aether/:file*.apk",
        headers: [{ key: "Content-Type", value: "application/vnd.android.package-archive" }],
      },
      {
        source: "/aether/latest.json",
        headers: [{ key: "Cache-Control", value: "no-cache, max-age=0, must-revalidate" }],
      },
    ];
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
