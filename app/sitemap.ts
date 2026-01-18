import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://lakisha.dev";
  const locales = ["en", "sr", "sr-Cyrl"];

  const routes = [
    "",
    "/projects",
    "/notes",
    "/contact",
    "/notes/websocket-reconnection-strategy",
  ];

  const sitemap: MetadataRoute.Sitemap = [];

  // Add routes for each locale
  locales.forEach((locale) => {
    routes.forEach((route) => {
      sitemap.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1 : route === "/contact" ? 0.8 : 0.9,
      });
    });
  });

  // Add default routes (English without locale prefix)
  routes.forEach((route) => {
    sitemap.push({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: route === "" ? "weekly" : "monthly",
      priority: route === "" ? 1 : route === "/contact" ? 0.8 : 0.9,
    });
  });

  return sitemap;
}
