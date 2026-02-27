import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Rocket,
  Lightbulb,
  Users,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { HeroSection } from "@/components/hero-section";
import { getPageContent, getCareerOpenings } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join RetiSpec and help transform Alzheimer's detection through AI-powered retinal imaging.",
};

const PERK_ICONS: Record<string, React.ElementType> = {
  Heart,
  Rocket,
  Lightbulb,
  Users,
};

export default async function CareersPage() {
  const [page, careers] = await Promise.all([
    getPageContent("careers").catch(() => null),
    getCareerOpenings().catch(() => ({ data: [] })),
  ]);

  const s = (page?.sections ?? {}) as Record<string, unknown>;
  const perks =
    (s.perks as { icon: string; title: string; desc: string }[]) ?? [];
  const testimonial = s.testimonial as
    | {
        quote: string;
        name: string;
        title: string;
        photo: string;
      }
    | undefined;

  return (
    <>
      {/* ── Hero ── */}
      <HeroSection
        badge={page?.heroBadge ?? "Careers"}
        title={page?.heroTitle ?? "Work With Us"}
        subtitle={page?.heroSubtitle}
      />

      {/* ── Perks ── */}
      {perks.length > 0 && (
        <section className="py-16 md:py-24 px-6">
          <div className="mx-auto max-w-7xl">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#E8EDF2] rounded-2xl overflow-hidden">
              {perks.map((perk, i) => {
                const Icon = PERK_ICONS[perk.icon] ?? Heart;
                return (
                  <div
                    key={i}
                    className="bg-white p-7 transition-colors hover:bg-[#F8FBFF]"
                  >
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[#F0F7FF]">
                      <Icon className="h-5 w-5 text-[#0369A1]" />
                    </div>
                    <h3
                      className="mb-1.5 text-[#0A1628]"
                      style={{ fontSize: "15px", fontWeight: 600 }}
                    >
                      {perk.title}
                    </h3>
                    <p
                      className="text-[#4A5B73]"
                      style={{ fontSize: "13.5px", lineHeight: 1.65 }}
                    >
                      {perk.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Employee Testimonial ── */}
      {testimonial && (
        <section
          className="py-16 px-6"
          style={{
            background:
              "linear-gradient(170deg, #EDF3FA 0%, #F6F9FC 50%, #FAFCFE 100%)",
          }}
        >
          <div className="mx-auto max-w-4xl">
            <div className="rounded-2xl border border-[#E8EDF2] bg-white p-8 md:p-12 shadow-sm">
              <div className="flex flex-col items-start gap-6 md:flex-row md:gap-10">
                {testimonial.photo && (
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl">
                    <Image
                      src={testimonial.photo}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <blockquote
                    className="italic text-[#4A5B73]"
                    style={{ fontSize: "17px", lineHeight: 1.7 }}
                  >
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <div className="mt-5">
                    <p
                      className="text-[#0A1628]"
                      style={{ fontSize: "15px", fontWeight: 600 }}
                    >
                      {testimonial.name}
                    </p>
                    <p
                      className="text-[#4A5B73] mt-0.5"
                      style={{ fontSize: "13.5px" }}
                    >
                      {testimonial.title}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Current Openings ── */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-4xl">
          <h2
            className="mb-10 text-[#0A1628]"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            Current Openings
          </h2>

          {careers.data.length > 0 ? (
            <div className="space-y-4">
              {careers.data.map((job) => (
                <div
                  key={job.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-[#E8EDF2] bg-white p-6 transition-shadow hover:shadow-md"
                >
                  <div>
                    <h3
                      className="text-[#0A1628]"
                      style={{ fontSize: "18px", fontWeight: 600 }}
                    >
                      {job.position}
                    </h3>
                    {job.location && (
                      <p className="mt-1.5 flex items-center gap-1.5 text-[#4A5B73]" style={{ fontSize: "14px" }}>
                        <MapPin className="h-3.5 w-3.5" />
                        {job.location}
                      </p>
                    )}
                  </div>
                  {job.applyLink ? (
                    <a
                      href={job.applyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0369A1] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#025e8f] shrink-0"
                    >
                      Apply Now
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  ) : (
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0369A1] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#025e8f] shrink-0"
                    >
                      Apply Now
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-[#E8EDF2] bg-white p-8 text-center">
              <p className="text-[#4A5B73]" style={{ fontSize: "15px" }}>
                No open positions at this time. Check back soon or send us your
                resume.
              </p>
            </div>
          )}

          {/* Fallback CTA */}
          <p
            className="mt-8 text-[#4A5B73]"
            style={{ fontSize: "14.5px", lineHeight: 1.7 }}
          >
            Don&apos;t see a role that fits?{" "}
            <a
              href="mailto:careers@retispec.com"
              className="text-[#0369A1] underline underline-offset-2 hover:text-[#025e8f]"
            >
              Send us your resume
            </a>{" "}
            and we&apos;ll keep you in mind.
          </p>
        </div>
      </section>

      {/* ── Toronto Image ── */}
      {typeof s.torontoImage === "string" && (
        <section className="relative h-[280px] overflow-hidden">
          <Image
            src={s.torontoImage}
            alt="Toronto skyline"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#0A1628]/40" />
          <div className="absolute inset-0 flex items-end justify-center pb-10">
            <p
              className="text-white"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "20px",
                fontWeight: 600,
                letterSpacing: "-0.01em",
              }}
            >
              Based in Toronto, Canada
            </p>
          </div>
        </section>
      )}
    </>
  );
}
