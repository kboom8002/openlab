import type { MetadataRoute } from "next";

/**
 * robots.txt configuration
 * Next.js automatically serves this at /robots.txt
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: "https://wellbcompany.ai/sitemap.xml",
  };
}
