import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, Play } from "lucide-react";
import { HeroSection } from "@/components/hero-section";
import { getPageContent, getNewsItems } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "News & Media",
  description:
    "Stay up to date with RetiSpec's latest developments, partnerships, and media coverage.",
};

export default async function NewsPage() {
  const [page, news] = await Promise.all([
    getPageContent("news").catch(() => null),
    getNewsItems().catch(() => ({ data: [] })),
  ]);

  const highlights = news.data.filter((n) => n.isHighlight);
  const allNews = news.data.filter((n) => !n.isHighlight);

  return (
    <>
      <HeroSection
        badge={page?.heroBadge}
        title={page?.heroTitle ?? "Latest News"}
        subtitle={page?.heroSubtitle}
      />

      {/* Highlights */}
      {highlights.length > 0 && (
        <section className="py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-8 md:grid-cols-3">
              {highlights.map((item) => (
                <a
                  key={item.id}
                  href={item.link ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-xl border border-border bg-white p-6 transition-all hover:shadow-lg hover:border-primary/30"
                >
                  <div className="mb-4 flex items-center gap-2">
                    {item.tag && (
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        {item.tag}
                      </span>
                    )}
                    {item.date && (
                      <span className="text-xs text-muted">{item.date}</span>
                    )}
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-heading transition-colors group-hover:text-primary">
                    {item.title}
                  </h3>
                  {item.source && (
                    <p className="text-sm text-muted">{item.source}</p>
                  )}
                  <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary">
                    Read more <ExternalLink className="h-3.5 w-3.5" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All News */}
      {allNews.length > 0 && (
        <section className="bg-surface py-16 lg:py-20">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="mb-8 font-heading text-2xl font-bold text-heading">
              All Coverage
            </h2>
            <div className="space-y-4">
              {allNews.map((item) => (
                <a
                  key={item.id}
                  href={item.link ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start justify-between gap-4 rounded-xl border border-border bg-white p-5 transition-all hover:shadow-md hover:border-primary/30"
                >
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      {item.tag && (
                        <span className="rounded-full bg-surface-dark px-2.5 py-0.5 text-xs font-medium text-muted">
                          {item.tag}
                        </span>
                      )}
                      {item.isVideo && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-medium text-red-600">
                          <Play className="h-3 w-3" /> Video
                        </span>
                      )}
                    </div>
                    <h3 className="font-semibold text-heading transition-colors group-hover:text-primary">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted">
                      {item.source}
                      {item.date ? ` — ${item.date}` : ""}
                    </p>
                  </div>
                  <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-muted transition-colors group-hover:text-primary" />
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-heading text-2xl font-bold text-heading">
            Media Inquiries
          </h2>
          <p className="mt-3 text-body">
            For press inquiries or to request an interview, please contact us.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}
