import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
