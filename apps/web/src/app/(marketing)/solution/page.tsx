import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Eye,
  Layers,
  Cpu,
  ExternalLink,
  FileText,
  Presentation,
} from "lucide-react";
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
  const steps = (s.steps as {
    num: string;
    icon: string;
    title: string;
    desc: string;
    img: string;
  }[]) ?? [];

  return (
    <>
      <HeroSection
        badge={page?.heroBadge ?? "Our Solution"}
        title={page?.heroTitle ?? "How it works"}
        subtitle={page?.heroSubtitle}
      />

      {/* 3-Step Process */}
      {steps.length > 0 && (
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6">
            <div className="space-y-24">
              {steps.map((step, i) => {
                const Icon = STEP_ICONS[step.icon] ?? Eye;
                const isReversed = i % 2 === 1;
                return (
                  <div
                    key={i}
                    className="grid items-center gap-12 md:grid-cols-2 md:gap-16"
                  >
                    {/* Text content */}
                    <div className={isReversed ? "md:order-2" : ""}>
                      <div className="mb-6 flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F0F7FF]">
                          <Icon className="h-5 w-5 text-[#0369A1]" />
                        </div>
                      </div>
                      <span
                        className="font-heading font-bold text-[#E2E8F0]"
                        style={{ fontSize: "40px", lineHeight: 1 }}
                      >
                        {step.num}
                      </span>
                      <h2
                        className="mt-3 font-heading font-bold text-[#0A1628]"
                        style={{ fontSize: "24px", lineHeight: 1.3 }}
                      >
                        {step.title}
                      </h2>
                      <p
                        className="mt-4 text-[#4A5B73]"
                        style={{ fontSize: "16px", lineHeight: 1.75 }}
                      >
                        {step.desc}
                      </p>
                    </div>

                    {/* Image */}
                    <div
                      className={`relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg ${
                        isReversed ? "md:order-1" : ""
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
        <section className="relative overflow-hidden bg-[#0A1628] py-24">
          {/* Decorative blur */}
          <div className="absolute -right-32 -top-32 h-[400px] w-[400px] rounded-full bg-[#0369A1]/10 blur-[120px]" />
          <div className="absolute -bottom-24 -left-24 h-[300px] w-[300px] rounded-full bg-[#0EA5E9]/8 blur-[100px]" />

          <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-16 px-6 md:grid-cols-12">
            {/* Left column */}
            <div className="md:col-span-7">
              <h2
                className="font-heading font-bold text-white"
                style={{
                  fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
                  lineHeight: 1.2,
                  letterSpacing: "-0.01em",
                }}
              >
                {s.originTitle as string}
              </h2>
              {typeof s.originText === "string" && (
                <div className="mt-6 space-y-4">
                  {(s.originText as string)
                    .split("\n\n")
                    .map((p: string, i: number) => (
                      <p
                        key={i}
                        className="text-[#94A3B8]"
                        style={{ fontSize: "16px", lineHeight: 1.75 }}
                      >
                        {p}
                      </p>
                    ))}
                </div>
              )}
            </div>

            {/* Right column -- partner card */}
            <div className="md:col-span-5">
              <div className="flex flex-col items-center rounded-2xl bg-white px-8 py-10">
                {typeof s.partnerLogo === "string" && (
                  <Image
                    src={s.partnerLogo}
                    alt={(s.partnerName as string) ?? "Partner"}
                    width={200}
                    height={80}
                    className="mb-5 h-14 w-auto object-contain"
                  />
                )}
                {typeof s.partnerName === "string" && (
                  <p
                    className="text-center font-heading font-bold text-[#0A1628]"
                    style={{ fontSize: "18px" }}
                  >
                    {s.partnerName as string}
                  </p>
                )}
                {typeof s.partnerSubtitle === "string" && (
                  <p
                    className="mt-1 text-center text-[#4A5B73]"
                    style={{ fontSize: "14px" }}
                  >
                    {s.partnerSubtitle as string}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Publications */}
      {publications.data.length > 0 && (
        <section
          className="py-24 md:py-32"
          style={{
            background: "linear-gradient(180deg, #F8FBFF 0%, #FFFFFF 100%)",
          }}
        >
          <div className="mx-auto max-w-4xl px-6">
            <div className="mb-12">
              <h2
                className="font-heading font-bold text-[#0A1628]"
                style={{
                  fontSize: "clamp(1.5rem, 3vw, 2rem)",
                  lineHeight: 1.2,
                  letterSpacing: "-0.01em",
                }}
              >
                Peer-Reviewed Publications
              </h2>
              <p
                className="mt-3 text-[#4A5B73]"
                style={{ fontSize: "16px", lineHeight: 1.75 }}
              >
                Our research has been published in leading scientific journals.
              </p>
            </div>
            <div className="space-y-4">
              {publications.data.map((pub) => {
                const dateLabel =
                  pub.month && pub.year
                    ? `${pub.month} ${pub.year}`
                    : pub.year ?? null;

                const card = (
                  <div className="group rounded-xl border border-[#E2E8F0] bg-white p-5 transition-all hover:border-[#0369A1]/25 hover:shadow-md">
                    {/* Date badge */}
                    {dateLabel && (
                      <div className="mb-3 inline-flex items-center rounded-md bg-[#F1F5F9] px-2.5 py-1">
                        <span
                          className="text-[#4A5B73]"
                          style={{
                            fontSize: "13px",
                            fontWeight: 500,
                          }}
                        >
                          {dateLabel}
                        </span>
                      </div>
                    )}

                    <div className="flex items-start gap-3">
                      {/* Icon */}
                      <div className="mt-0.5 shrink-0">
                        <FileText className="h-5 w-5 text-[#0369A1]" />
                      </div>

                      {/* Content */}
                      <div className="min-w-0 flex-1">
                        <h3
                          className="text-[#0A1628]"
                          style={{
                            fontSize: "14px",
                            fontWeight: 600,
                            lineHeight: 1.5,
                          }}
                        >
                          {pub.title}
                        </h3>
                        <p
                          className="mt-1 text-[#64748B]"
                          style={{
                            fontSize: "13px",
                            fontWeight: 400,
                            lineHeight: 1.5,
                          }}
                        >
                          {pub.authors}
                        </p>
                      </div>

                      {/* External link icon */}
                      {pub.link && (
                        <div className="mt-0.5 shrink-0">
                          <ExternalLink className="h-4 w-4 text-[#94A3B8] transition-colors group-hover:text-[#0369A1]" />
                        </div>
                      )}
                    </div>
                  </div>
                );

                if (pub.link) {
                  return (
                    <Link
                      key={pub.id}
                      href={pub.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      {card}
                    </Link>
                  );
                }

                return <div key={pub.id}>{card}</div>;
              })}
            </div>
          </div>
        </section>
      )}

      {/* Conference Presentations */}
      {presentations.data.length > 0 && (
        <section className="py-24">
          <div className="mx-auto max-w-4xl px-6">
            <div className="mb-12">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="h-[2px] w-8 bg-[#7C3AED]/40" />
                <span
                  className="text-[#7C3AED]"
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  Research
                </span>
              </div>
              <h2
                className="font-heading font-bold text-[#0A1628]"
                style={{
                  fontSize: "clamp(1.5rem, 3vw, 2rem)",
                  lineHeight: 1.2,
                  letterSpacing: "-0.01em",
                }}
              >
                Conference Presentations
              </h2>
              <p
                className="mt-3 text-[#4A5B73]"
                style={{ fontSize: "16px", lineHeight: 1.75 }}
              >
                Our team regularly presents at leading scientific and medical
                conferences.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {presentations.data.map((pres) => {
                const card = (
                  <div className="group flex items-start gap-4 rounded-xl border border-[#E2E8F0] bg-white p-5 transition-all hover:border-[#7C3AED]/25 hover:shadow-md">
                    {/* Icon */}
                    <div className="mt-0.5 shrink-0">
                      <Presentation className="h-5 w-5 text-[#7C3AED]" />
                    </div>

                    {/* Content */}
                    <div className="min-w-0 flex-1">
                      <h3
                        className="text-[#0A1628]"
                        style={{
                          fontSize: "14px",
                          fontWeight: 600,
                          lineHeight: 1.5,
                        }}
                      >
                        {pres.title}
                      </h3>
                      <p
                        className="mt-1 text-[#64748B]"
                        style={{
                          fontSize: "13px",
                          fontWeight: 400,
                          lineHeight: 1.5,
                        }}
                      >
                        {pres.authors}
                      </p>
                    </div>

                    {/* External link icon */}
                    {pres.link && (
                      <div className="mt-0.5 shrink-0">
                        <ExternalLink className="h-4 w-4 text-[#94A3B8] transition-colors group-hover:text-[#7C3AED]" />
                      </div>
                    )}
                  </div>
                );

                if (pres.link) {
                  return (
                    <Link
                      key={pres.id}
                      href={pres.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      {card}
                    </Link>
                  );
                }

                return <div key={pres.id}>{card}</div>;
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
