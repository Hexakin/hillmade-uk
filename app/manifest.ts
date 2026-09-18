import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Jonathan Hill · A novel in public",
    short_name: "Jonathan Hill",
    description:
      "We Ruined Ourselves: a novel written in public. Draft chapters and a writing notebook.",
    start_url: "/",
    display: "standalone",
    background_color: "#191a18",
    theme_color: "#191a18",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
