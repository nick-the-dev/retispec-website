const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337";
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || "";

interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

interface StrapiArticle {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description: string | null;
  content: string | null;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

async function fetchStrapi<T>(
  path: string,
  options?: {
    tags?: string[];
    revalidate?: number;
  }
): Promise<StrapiResponse<T>> {
  const url = `${STRAPI_URL}/api${path}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${STRAPI_API_TOKEN}`,
    },
    next: {
      tags: options?.tags,
      revalidate: options?.revalidate ?? 3600,
    },
  });

  if (!res.ok) {
    throw new Error(`Strapi fetch failed: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export async function getArticles() {
  return fetchStrapi<StrapiArticle[]>("/articles?sort=publishedAt:desc", {
    tags: ["articles"],
  });
}

export async function getArticleBySlug(slug: string) {
  return fetchStrapi<StrapiArticle[]>(
    `/articles?filters[slug][$eq]=${encodeURIComponent(slug)}`,
    {
      tags: ["articles", `article-${slug}`],
    }
  );
}

export { type StrapiArticle, type StrapiResponse };
