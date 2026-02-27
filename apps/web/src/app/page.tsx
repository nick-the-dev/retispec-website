import Image from "next/image";
import Link from "next/link";
import {
  ScanEye,
  Clock,
  Shield,
  Stethoscope,
  Eye,
  Brain,
  ArrowRight,
} from "lucide-react";
import {
  getPageContent,
  getTestimonials,
  getFeaturedLogos,
} from "@/lib/strapi";

const ICON_MAP: Record<string, React.ElementType> = {
  ScanEye,
  Clock,
  Shield,
  Stethoscope,
  Eye,
  Brain,
};

export default async function HomePage() {
  const [page, testimonials, logos] = await Promise.all([
    getPageContent("home").catch(() => null),
    getTestimonials().catch(() => ({ data: [] })),
    getFeaturedLogos().catch(() => ({ data: [] })),
  ]);

  const s = (page?.sections ?? {}) as Record<string, unknown>;
  const pillars = (s.pillars as { icon: string; title: string; desc: string }[]) ?? [];
  const steps = (s.steps as { num: string; icon: string; title: string; desc: string; img: string }[]) ?? [];
  const stats = (s.stats as { value: string; label: string }[]) ?? [];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-surface via-surface-alt to-surface pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
        </div>
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
          <div>
            {page?.heroBadge && (
              <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                {page.heroBadge}
              </span>
            )}
            <h1 className="font-heading text-4xl font-bold tracking-tight text-heading sm:text-5xl lg:text-6xl">
              {page?.heroTitle ?? "A revolutionary, non-invasive way to detect Alzheimer's disease early"}
            </h1>
            {page?.heroSubtitle && (
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-body">
                {page.heroSubtitle}
              </p>
            )}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/solution"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
              >
                Learn More <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-semibold text-heading transition-colors hover:bg-surface"
              >
                Get in Touch
              </Link>
            </div>
          </div>
          {typeof s.heroImage === "string" && (
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src={s.heroImage}
                alt="Retinal imaging technology"
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </div>
      </section>

      {/* Featured In */}
      {logos.data.length > 0 && (
        <section className="border-y border-border bg-surface-muted py-10">
          <div className="mx-auto max-w-7xl px-6">
            <p className="mb-6 text-center text-sm font-medium uppercase tracking-wider text-muted">
              Featured In
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
              {logos.data.map((logo) => (
                <div key={logo.id} className="flex items-center">
                  {logo.logoUrl ? (
                    <Image
                      src={logo.logoUrl}
                      alt={logo.name}
                      width={120}
                      height={40}
                      className="h-8 w-auto opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0"
                    />
                  ) : (
                    <span className="text-sm font-medium text-muted">
                      {logo.name}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Mission */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-3xl font-bold text-heading sm:text-4xl">
              {(s.missionTitle as string) ?? "A better future for Alzheimer's starts with the ability to diagnose it"}
            </h2>
            {typeof s.missionText === "string" && (
              <div className="mt-6 space-y-4 text-body leading-relaxed">
                {s.missionText.split("\n\n").map((p: string, i: number) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            )}
          </div>
          {Array.isArray(s.missionImages) && (
            <div className="grid grid-cols-2 gap-4">
              {(s.missionImages as string[]).slice(0, 3).map((img, i) => (
                <div
                  key={i}
                  className={`relative overflow-hidden rounded-xl ${
                    i === 0 ? "col-span-2 aspect-[16/9]" : "aspect-square"
                  }`}
                >
                  <Image
                    src={img}
                    alt="RetiSpec mission"
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Product Pillars */}
      {pillars.length > 0 && (
        <section className="bg-surface py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="mb-12 text-center font-heading text-3xl font-bold text-heading sm:text-4xl">
              Why RetiSpec
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {pillars.map((pillar, i) => {
                const Icon = ICON_MAP[pillar.icon] ?? Eye;
                return (
                  <div
                    key={i}
                    className="rounded-xl border border-border bg-white p-6 transition-shadow hover:shadow-lg"
                  >
                    <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-heading">
                      {pillar.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-body">
                      {pillar.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* How It Works */}
      {steps.length > 0 && (
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="mb-4 text-center font-heading text-3xl font-bold text-heading sm:text-4xl">
              How It Works
            </h2>
            <p className="mx-auto mb-16 max-w-2xl text-center text-body">
              Three simple steps from a routine eye exam to AI-powered screening
            </p>
            <div className="space-y-16">
              {steps.map((step, i) => {
                const Icon = ICON_MAP[step.icon] ?? Eye;
                const isReversed = i % 2 === 1;
                return (
                  <div
                    key={i}
                    className={`grid items-center gap-12 lg:grid-cols-2 ${
                      isReversed ? "lg:direction-rtl" : ""
                    }`}
                  >
                    <div className={isReversed ? "lg:order-2" : ""}>
                      <div className="mb-4 flex items-center gap-3">
                        <span className="font-heading text-4xl font-bold text-primary/20">
                          {step.num}
                        </span>
                        <div className="inline-flex rounded-lg bg-primary/10 p-2">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                      </div>
                      <h3 className="mb-3 font-heading text-2xl font-bold text-heading">
                        {step.title}
                      </h3>
                      <p className="text-body leading-relaxed">{step.desc}</p>
                    </div>
                    <div
                      className={`relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg ${
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

      {/* Impact / Stats */}
      {stats.length > 0 && (
        <section className="relative overflow-hidden bg-navy py-20 text-white lg:py-28">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-7xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-heading text-3xl font-bold sm:text-4xl">
                {(s.impactTitle as string) ?? "Early detection changes lives"}
              </h2>
              {typeof s.impactText === "string" && (
                <p className="mt-4 text-lg leading-relaxed text-gray-300">
                  {s.impactText}
                </p>
              )}
            </div>
            <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="font-heading text-4xl font-bold text-accent">
                    {stat.value}
                  </div>
                  <p className="mt-2 text-sm text-gray-300">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {testimonials.data.length > 0 && (
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="mb-12 text-center font-heading text-3xl font-bold text-heading sm:text-4xl">
              What Leaders Are Saying
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              {testimonials.data.map((t) => (
                <div
                  key={t.id}
                  className="rounded-xl border border-border bg-white p-8"
                >
                  <blockquote className="mb-6 text-sm leading-relaxed text-body">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div>
                    <p className="font-semibold text-heading">{t.authorName}</p>
                    <p className="text-sm text-muted">{t.authorTitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Banner Image */}
      {typeof s.bannerImage === "string" && (
        <section className="relative h-64 md:h-96">
          <Image
            src={s.bannerImage}
            alt="RetiSpec technology"
            fill
            className="object-cover"
          />
        </section>
      )}

      {/* CTA */}
      <section className="bg-surface py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-heading text-3xl font-bold text-heading sm:text-4xl">
            {(s.ctaTitle as string) ?? "Ready to learn more?"}
          </h2>
          {typeof s.ctaText === "string" && (
            <p className="mt-4 text-lg text-body">{s.ctaText}</p>
          )}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
            >
              Contact Us <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/solution"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-8 py-3 text-sm font-semibold text-heading transition-colors hover:bg-white"
            >
              Our Solution
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
