import type { MetadataRoute } from "next";
import { brandName } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: brandName,
    short_name: brandName,
    start_url: "/ar",
    display: "standalone",
    theme_color: "#0B2A5B",
    background_color: "#FFFFFF",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
