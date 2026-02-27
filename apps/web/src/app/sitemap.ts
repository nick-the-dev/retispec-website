import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://retispec.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/solution`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/team`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/careers`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/news`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/members`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/courses`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/privacy-policy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  // Fetch articles from Strapi for dynamic sitemap entries
  let articlePages: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(
      `${process.env.STRAPI_URL || "http://localhost:1337"}/api/articles?fields[0]=slug&fields[1]=updatedAt&sort=updatedAt:desc`,
      {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN || ""}`,
        },
        next: { revalidate: 3600 },
      }
    );
    if (res.ok) {
      const json = await res.json();
      articlePages = (json.data || []).map(
        (article: { slug: string; updatedAt: string }) => ({
          url: `${SITE_URL}/news/${article.slug}`,
          lastModified: new Date(article.updatedAt),
          changeFrequency: "weekly" as const,
          priority: 0.6,
        })
      );
    }
  } catch {
    // Strapi not available — skip dynamic entries
  }

  return [...staticPages, ...articlePages];
}
