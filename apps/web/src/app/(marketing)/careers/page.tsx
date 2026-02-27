import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Rocket,
  Lightbulb,
  Users,
  ArrowRight,
  MapPin,
  ExternalLink,
  Quote,
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
  const perks = (s.perks as { icon: string; title: string; desc: string }[]) ?? [];
  const testimonial = s.testimonial as {
    quote: string;
    name: string;
    title: string;
    photo: string;
  } | undefined;

  return (
    <>
      <HeroSection
        badge={page?.heroBadge}
        title={page?.heroTitle ?? "Work With Us"}
        subtitle={page?.heroSubtitle}
      />

      {/* Perks */}
      {perks.length > 0 && (
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {perks.map((perk, i) => {
                const Icon = PERK_ICONS[perk.icon] ?? Heart;
                return (
                  <div
                    key={i}
                    className="rounded-xl border border-border p-6 transition-shadow hover:shadow-lg"
                  >
                    <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-heading">
                      {perk.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-body">
                      {perk.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Employee Testimonial */}
      {testimonial && (
        <section className="bg-surface py-20">
          <div className="mx-auto max-w-4xl px-6">
            <div className="flex flex-col items-center gap-8 md:flex-row">
              {testimonial.photo && (
                <div className="relative h-40 w-40 shrink-0 overflow-hidden rounded-xl">
                  <Image
                    src={testimonial.photo}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <Quote className="mb-4 h-8 w-8 text-primary/30" />
                <blockquote className="text-lg leading-relaxed text-heading">
                  {testimonial.quote}
                </blockquote>
                <div className="mt-4">
                  <p className="font-semibold text-heading">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted">{testimonial.title}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Current Openings */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-8 font-heading text-3xl font-bold text-heading">
            Current Openings
          </h2>
          {careers.data.length > 0 ? (
            <div className="space-y-4">
              {careers.data.map((job) => (
                <div
                  key={job.id}
                  className="flex items-center justify-between gap-4 rounded-xl border border-border p-6 transition-shadow hover:shadow-md"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-heading">
                      {job.position}
                    </h3>
                    {job.location && (
                      <p className="mt-1 flex items-center gap-1 text-sm text-muted">
                        <MapPin className="h-3.5 w-3.5" /> {job.location}
                      </p>
                    )}
                  </div>
                  {job.applyLink ? (
                    <a
                      href={job.applyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
                    >
                      Apply <ExternalLink className="h-4 w-4" />
                    </a>
                  ) : (
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
                    >
                      Apply <ArrowRight className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-border bg-surface p-8 text-center">
              <p className="text-body">
                No open positions at this time. Check back soon or send us your
                resume.
              </p>
              <Link
                href="/contact"
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary"
              >
                Contact Us <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Toronto image */}
      {typeof s.torontoImage === "string" && (
        <section className="relative h-64 md:h-80">
          <Image
            src={s.torontoImage}
            alt="Toronto skyline"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute bottom-8 left-8 text-white">
            <p className="text-lg font-semibold">Based in Toronto, Canada</p>
          </div>
        </section>
      )}
    </>
  );
}
