import type { MetadataRoute } from "next";

/**
 * Sitemap for wellbcompany.ai
 * Next.js automatically serves this at /sitemap.xml
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://wellbcompany.ai";
  const now = new Date();

  // Company site pages served via wellbcompany.ai domain
  const companyRoutes = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
    {
      path: "/ax-solutions",
      priority: 0.9,
      changeFrequency: "monthly" as const,
    },
    { path: "/contact", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/impact", priority: 0.8, changeFrequency: "monthly" as const },
    {
      path: "/jeju-to-global",
      priority: 0.9,
      changeFrequency: "monthly" as const,
    },
    { path: "/projects", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
  ];

  return companyRoutes.map((route) => ({
    url: `${baseUrl}${route.path === "/" ? "" : route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
