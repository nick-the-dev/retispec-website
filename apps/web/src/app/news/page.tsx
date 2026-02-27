import type { Metadata } from "next";
import { ExternalLink, Play, ArrowRight, Newspaper } from "lucide-react";
import { HeroSection } from "@/components/hero-section";
import { getPageContent, getNewsItems } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "News & Media",
  description:
    "Stay up to date with RetiSpec's latest developments, partnerships, and media coverage.",
};

const tagColors: Record<string, { bg: string; text: string }> = {
  "Press Release": { bg: "bg-[#EFF6FF]", text: "text-[#1D4ED8]" },
  Feature: { bg: "bg-[#FFF7ED]", text: "text-[#C2410C]" },
  Partnership: { bg: "bg-[#ECFDF5]", text: "text-[#065F46]" },
  News: { bg: "bg-[#F8FAFC]", text: "text-[#475569]" },
  Award: { bg: "bg-[#FFFBEB]", text: "text-[#92400E]" },
  Video: { bg: "bg-[#FDF2F8]", text: "text-[#9D174D]" },
  Report: { bg: "bg-[#EEF2FF]", text: "text-[#3730A3]" },
  "Case Study": { bg: "bg-[#F0FDFA]", text: "text-[#0F766E]" },
};

const defaultTagColor = { bg: "bg-[#F8FAFC]", text: "text-[#475569]" };

function getTagColor(tag: string | null) {
  if (!tag) return defaultTagColor;
  return tagColors[tag] ?? defaultTagColor;
}

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
        badge={page?.heroBadge ?? "News & Media"}
        title={page?.heroTitle ?? "Latest News"}
        subtitle={page?.heroSubtitle}
      />

      {/* Highlights */}
      {highlights.length > 0 && (
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6">
            <h2
              className="mb-8 font-heading text-[#0A1628]"
              style={{ fontSize: "18px", fontWeight: 700 }}
            >
              Highlights
            </h2>
            <div className="grid gap-5 md:grid-cols-3">
              {highlights.map((item) => {
                const color = getTagColor(item.tag);
                return (
                  <a
                    key={item.id}
                    href={item.link ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col rounded-xl border border-[#E8EDF2] p-7 transition-all hover:border-[#0369A1]/25 hover:shadow"
                  >
                    {item.tag && (
                      <span
                        className={`mb-3 inline-flex w-fit rounded-full px-2.5 py-0.5 text-xs font-medium ${color.bg} ${color.text}`}
                      >
                        {item.tag}
                      </span>
                    )}
                    {item.source && (
                      <p className="mb-2 text-xs text-[#94A3B8]">
                        {item.source}
                      </p>
                    )}
                    <h3
                      className="text-[#0A1628] transition-colors group-hover:text-[#0369A1]"
                      style={{
                        fontSize: "16px",
                        fontWeight: 600,
                        lineHeight: 1.45,
                      }}
                    >
                      {item.title}
                    </h3>
                    <div className="mt-auto flex items-center justify-between pt-5">
                      {item.date && (
                        <span className="text-xs text-[#94A3B8]">
                          {item.date}
                        </span>
                      )}
                      <ArrowRight className="h-4 w-4 text-[#94A3B8] transition-colors group-hover:text-[#0369A1]" />
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* All Coverage */}
      {allNews.length > 0 && (
        <section
          className="py-16"
          style={{
            background: "linear-gradient(180deg, #F8FBFF 0%, #FFFFFF 100%)",
          }}
        >
          <div className="mx-auto max-w-7xl px-6">
            <h2
              className="mb-8 font-heading text-[#0A1628]"
              style={{ fontSize: "18px", fontWeight: 700 }}
            >
              All Coverage
            </h2>
            <div className="space-y-3">
              {allNews.map((item) => {
                const color = getTagColor(item.tag);
                return (
                  <a
                    key={item.id}
                    href={item.link ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 rounded-xl border border-[#E8EDF2] p-4 transition-all hover:border-[#0369A1]/25 hover:shadow"
                  >
                    {/* Date */}
                    <span
                      className="shrink-0 text-[#94A3B8]"
                      style={{ fontSize: "12px", minWidth: "100px" }}
                    >
                      {item.date ?? ""}
                    </span>

                    {/* Tag badge */}
                    {item.tag && (
                      <span
                        className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${color.bg} ${color.text}`}
                      >
                        {item.tag}
                      </span>
                    )}

                    {/* Video icon */}
                    {item.isVideo && (
                      <Play className="h-3.5 w-3.5 shrink-0 text-[#9D174D]" />
                    )}

                    {/* Title with Newspaper icon */}
                    <div className="flex min-w-0 flex-1 items-center gap-2">
                      <Newspaper className="h-3.5 w-3.5 shrink-0 text-[#94A3B8]" />
                      <span
                        className="truncate text-[#0A1628] transition-colors group-hover:text-[#0369A1]"
                        style={{
                          fontSize: "13.5px",
                          fontWeight: 500,
                        }}
                      >
                        {item.title}
                      </span>
                    </div>

                    {/* Source + External link */}
                    <div className="flex shrink-0 items-center gap-2">
                      {item.source && (
                        <span className="text-xs text-[#94A3B8]">
                          {item.source}
                        </span>
                      )}
                      <ExternalLink className="h-3.5 w-3.5 text-[#94A3B8] transition-colors group-hover:text-[#0369A1]" />
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
