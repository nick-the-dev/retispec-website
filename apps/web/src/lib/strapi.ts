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

// --- Content Types ---

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

interface TeamMember {
  id: number;
  documentId: string;
  name: string;
  title: string;
  photoUrl: string | null;
  order: number;
  section: "team" | "board";
}

interface Testimonial {
  id: number;
  documentId: string;
  quote: string;
  authorName: string;
  authorTitle: string;
  order: number;
}

interface Publication {
  id: number;
  documentId: string;
  title: string;
  authors: string;
  year: string | null;
  month: string | null;
  link: string | null;
  order: number;
}

interface Presentation {
  id: number;
  documentId: string;
  title: string;
  authors: string;
  link: string | null;
  order: number;
}

interface NewsItem {
  id: number;
  documentId: string;
  title: string;
  source: string | null;
  date: string | null;
  link: string | null;
  tag: string | null;
  isHighlight: boolean;
  isVideo: boolean;
  order: number;
}

interface CareerOpening {
  id: number;
  documentId: string;
  position: string;
  location: string | null;
  applyLink: string | null;
  order: number;
}

interface FeaturedLogo {
  id: number;
  documentId: string;
  name: string;
  logoUrl: string | null;
  order: number;
}

interface PageContent {
  id: number;
  documentId: string;
  pageSlug: string;
  heroTitle: string | null;
  heroBadge: string | null;
  heroSubtitle: string | null;
  sections: Record<string, unknown> | null;
}

interface SiteConfig {
  id: number;
  documentId: string;
  key: string;
  value: Record<string, unknown> | null;
}

// --- Fetch Helper ---

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

// --- Fetchers ---

export async function getArticles() {
  return fetchStrapi<StrapiArticle[]>("/articles?sort=publishedAt:desc", {
    tags: ["articles"],
  });
}

export async function getArticleBySlug(slug: string) {
  return fetchStrapi<StrapiArticle[]>(
    `/articles?filters[slug][$eq]=${encodeURIComponent(slug)}`,
    { tags: ["articles", `article-${slug}`] }
  );
}

export async function getTeamMembers(section?: "team" | "board") {
  const filter = section
    ? `&filters[section][$eq]=${section}`
    : "";
  return fetchStrapi<TeamMember[]>(
    `/team-members?sort=order:asc&pagination[pageSize]=100${filter}`,
    { tags: ["team-members"] }
  );
}

export async function getTestimonials() {
  return fetchStrapi<Testimonial[]>(
    "/testimonials?sort=order:asc",
    { tags: ["testimonials"] }
  );
}

export async function getPublications() {
  return fetchStrapi<Publication[]>(
    "/publications?sort=order:asc",
    { tags: ["publications"] }
  );
}

export async function getPresentations() {
  return fetchStrapi<Presentation[]>(
    "/presentations?sort=order:asc",
    { tags: ["presentations"] }
  );
}

export async function getNewsItems() {
  return fetchStrapi<NewsItem[]>(
    "/news-items?sort=order:asc&pagination[pageSize]=100",
    { tags: ["news-items"] }
  );
}

export async function getCareerOpenings() {
  return fetchStrapi<CareerOpening[]>(
    "/career-openings?sort=order:asc",
    { tags: ["career-openings"] }
  );
}

export async function getFeaturedLogos() {
  return fetchStrapi<FeaturedLogo[]>(
    "/featured-logos?sort=order:asc",
    { tags: ["featured-logos"] }
  );
}

export async function getPageContent(slug: string) {
  const res = await fetchStrapi<PageContent[]>(
    `/page-contents?filters[pageSlug][$eq]=${encodeURIComponent(slug)}`,
    { tags: ["page-contents", `page-${slug}`] }
  );
  return res.data?.[0] ?? null;
}

export async function getSiteConfig(key: string) {
  const res = await fetchStrapi<SiteConfig[]>(
    `/site-configs?filters[key][$eq]=${encodeURIComponent(key)}`,
    { tags: ["site-configs", `config-${key}`] }
  );
  return res.data?.[0]?.value ?? null;
}

export async function getAllSiteConfigs() {
  const res = await fetchStrapi<SiteConfig[]>(
    "/site-configs?pagination[pageSize]=100",
    { tags: ["site-configs"] }
  );
  const map: Record<string, Record<string, unknown>> = {};
  for (const cfg of res.data ?? []) {
    if (cfg.key && cfg.value) {
      map[cfg.key] = cfg.value;
    }
  }
  return map;
}

export {
  type StrapiArticle,
  type StrapiResponse,
  type TeamMember,
  type Testimonial,
  type Publication,
  type Presentation,
  type NewsItem,
  type CareerOpening,
  type FeaturedLogo,
  type PageContent,
  type SiteConfig,
};
