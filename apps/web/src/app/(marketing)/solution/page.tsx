import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Eye, Layers, Cpu, ExternalLink } from "lucide-react";
import { HeroSection } from "@/components/hero-section";
import {
  getPageContent,
  getPublications,
  getPresentations,
} from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Solution",
  description:
    "Learn how RetiSpec's AI-powered retinal imaging solution detects Alzheimer's disease biomarkers through a simple eye exam.",
};

const STEP_ICONS: Record<string, React.ElementType> = { Eye, Layers, Cpu };

export default async function SolutionPage() {
  const [page, publications, presentations] = await Promise.all([
    getPageContent("solution").catch(() => null),
    getPublications().catch(() => ({ data: [] })),
    getPresentations().catch(() => ({ data: [] })),
  ]);

  const s = (page?.sections ?? {}) as Record<string, unknown>;
  const steps = (s.steps as { num: string; icon: string; title: string; desc: string; img: string }[]) ?? [];

  return (
    <>
      <HeroSection
        badge={page?.heroBadge}
        title={page?.heroTitle ?? "How It Works"}
        subtitle={page?.heroSubtitle}
      />

      {/* Steps */}
      {steps.length > 0 && (
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6">
            <div className="space-y-20">
              {steps.map((step, i) => {
                const Icon = STEP_ICONS[step.icon] ?? Eye;
                const isReversed = i % 2 === 1;
                return (
                  <div
                    key={i}
                    className="grid items-center gap-12 lg:grid-cols-2"
                  >
                    <div className={isReversed ? "lg:order-2" : ""}>
                      <div className="mb-4 flex items-center gap-3">
                        <span className="font-heading text-5xl font-bold text-primary/20">
                          {step.num}
                        </span>
                        <div className="inline-flex rounded-lg bg-primary/10 p-2.5">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                      <h2 className="mb-4 font-heading text-3xl font-bold text-heading">
                        {step.title}
                      </h2>
                      <p className="text-lg leading-relaxed text-body">
                        {step.desc}
                      </p>
                    </div>
                    <div
                      className={`relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl ${
                        isReversed ? "lg:order-1" : ""
                      }`}
                    >
                      <Image
                        src={step.img}
                        alt={step.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Technology Origin */}
      {typeof s.originTitle === "string" && (
        <section className="bg-navy py-20 text-white lg:py-28">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
            <div>
              <h2 className="font-heading text-3xl font-bold sm:text-4xl">
                {s.originTitle}
              </h2>
              {typeof s.originText === "string" && (
                <div className="mt-6 space-y-4 text-gray-300 leading-relaxed">
                  {(s.originText as string).split("\n\n").map((p: string, i: number) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              )}
            </div>
            <div className="flex flex-col items-center justify-center rounded-xl bg-white/5 p-12">
              {typeof s.partnerLogo === "string" && (
                <Image
                  src={s.partnerLogo}
                  alt={(s.partnerName as string) ?? "Partner"}
                  width={200}
                  height={80}
                  className="mb-4 h-16 w-auto"
                />
              )}
              {typeof s.partnerName === "string" && (
                <p className="text-lg font-semibold">{s.partnerName}</p>
              )}
              {typeof s.partnerSubtitle === "string" && (
                <p className="text-sm text-gray-400">{s.partnerSubtitle}</p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Publications */}
      {publications.data.length > 0 && (
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="mb-12 font-heading text-3xl font-bold text-heading sm:text-4xl">
              Peer-Reviewed Publications
            </h2>
            <div className="space-y-6">
              {publications.data.map((pub) => (
                <div
                  key={pub.id}
                  className="rounded-xl border border-border p-6 transition-shadow hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-heading">
                        {pub.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted">{pub.authors}</p>
                      {(pub.year || pub.month) && (
                        <p className="mt-1 text-xs text-light">
                          {pub.month} {pub.year}
                        </p>
                      )}
                    </div>
                    {pub.link && (
                      <a
                        href={pub.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 rounded-lg bg-primary/10 p-2 text-primary transition-colors hover:bg-primary/20"
                        aria-label="View publication"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Presentations */}
      {presentations.data.length > 0 && (
        <section className="bg-surface py-20 lg:py-28">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="mb-12 font-heading text-3xl font-bold text-heading sm:text-4xl">
              Conference Presentations
            </h2>
            <div className="space-y-4">
              {presentations.data.map((pres) => (
                <div
                  key={pres.id}
                  className="rounded-xl border border-border bg-white p-6 transition-shadow hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-heading">
                        {pres.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted">{pres.authors}</p>
                    </div>
                    {pres.link && (
                      <a
                        href={pres.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 rounded-lg bg-primary/10 p-2 text-primary transition-colors hover:bg-primary/20"
                        aria-label="View presentation"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-heading text-3xl font-bold text-heading">
            Interested in our technology?
          </h2>
          <p className="mt-4 text-body">
            Get in touch with our team to learn more about how RetiSpec can
            integrate into your practice or research.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}
