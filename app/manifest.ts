import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Lazar — Full-Stack & IoT Engineer",
    short_name: "Lazar",
    description:
      "Building reliable software systems — from embedded devices to cloud APIs",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#1165A3",
    icons: [
      {
        src: `${process.env.NEXT_PUBLIC_SITE_URL || "https://lakisha.dev"}/favicon.png`,
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
