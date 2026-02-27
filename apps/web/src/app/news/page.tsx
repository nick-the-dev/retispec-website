import type { Metadata } from "next";
import Link from "next/link";
import { getArticles } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "News",
  description: "Latest news and updates from RetiSpec.",
};

export default async function NewsPage() {
  let articles: Awaited<ReturnType<typeof getArticles>>["data"] = [];

  try {
    const response = await getArticles();
    articles = response.data;
  } catch {
    // Strapi not available yet
  }

  return (
    <main className="mx-auto max-w-4xl p-8">
      <h1 className="text-4xl font-bold tracking-tight">News</h1>
      {articles.length === 0 ? (
        <p className="mt-4 text-lg text-gray-600">No articles yet.</p>
      ) : (
        <ul className="mt-8 space-y-6">
          {articles.map((article) => (
            <li key={article.documentId}>
              <Link
                href={`/news/${article.slug}`}
                className="group block"
              >
                <h2 className="text-2xl font-semibold group-hover:underline">
                  {article.title}
                </h2>
                {article.description && (
                  <p className="mt-1 text-gray-600">{article.description}</p>
                )}
                {article.publishedAt && (
                  <time className="mt-1 block text-sm text-gray-400">
                    {new Date(article.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
