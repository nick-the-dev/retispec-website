import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/strapi";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    const response = await getArticleBySlug(slug);
    const article = response.data[0];

    if (!article) return { title: "Article Not Found" };

    return {
      title: article.title,
      description: article.description || undefined,
    };
  } catch {
    return { title: "Article Not Found" };
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;

  let article;
  try {
    const response = await getArticleBySlug(slug);
    article = response.data[0];
  } catch {
    notFound();
  }

  if (!article) notFound();

  return (
    <article className="mx-auto max-w-3xl p-8">
      <h1 className="text-4xl font-bold tracking-tight">{article.title}</h1>
      {article.publishedAt && (
        <time className="mt-2 block text-sm text-gray-400">
          {new Date(article.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
      )}
      {article.content && (
        <div className="prose mt-8 max-w-none">
          {article.content}
        </div>
      )}
    </article>
  );
}
