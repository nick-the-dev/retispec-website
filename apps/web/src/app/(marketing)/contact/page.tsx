import type { Metadata } from "next";
import Image from "next/image";
import {
  Stethoscope,
  FlaskConical,
  TrendingUp,
  Building2,
  Mail,
  MapPin,
} from "lucide-react";
import { HeroSection } from "@/components/hero-section";
import { getPageContent, getSiteConfig } from "@/lib/strapi";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with RetiSpec — whether you're a clinician, researcher, investor, or patient advocate.",
};

const AUDIENCE_ICONS: Record<string, React.ElementType> = {
  Stethoscope,
  FlaskConical,
  TrendingUp,
  Building2,
};

export default async function ContactPage() {
  const [page, contact] = await Promise.all([
    getPageContent("contact").catch(() => null),
    getSiteConfig("contact").catch(() => null),
  ]);

  const s = (page?.sections ?? {}) as Record<string, unknown>;
  const audienceCards = (s.audienceCards as { icon: string; title: string; desc: string }[]) ?? [];
  const contactInfo = contact as { email?: string; location?: string; country?: string } | null;

  return (
    <>
      <HeroSection
        badge={page?.heroBadge}
        title={page?.heroTitle ?? "Get in Touch"}
        subtitle={page?.heroSubtitle}
      />

      {/* Audience Cards */}
      {audienceCards.length > 0 && (
        <section className="py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {audienceCards.map((card, i) => {
                const Icon = AUDIENCE_ICONS[card.icon] ?? Building2;
                return (
                  <div
                    key={i}
                    className="rounded-xl border border-border p-6 transition-shadow hover:shadow-lg"
                  >
                    <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-heading">
                      {card.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-body">
                      {card.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Contact Form + Info */}
      <section className="bg-surface py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-5">
          {/* Form */}
          <div className="lg:col-span-3">
            <h2 className="mb-6 font-heading text-2xl font-bold text-heading">
              Send Us a Message
            </h2>
            <ContactForm />
          </div>

          {/* Contact Info Sidebar */}
          <div className="lg:col-span-2">
            <h2 className="mb-6 font-heading text-2xl font-bold text-heading">
              Contact Information
            </h2>
            <div className="space-y-6">
              {contactInfo?.email && (
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-heading">Email</p>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="text-sm text-primary hover:underline"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </div>
              )}
              {contactInfo?.location && (
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-heading">Location</p>
                    <p className="text-sm text-body">
                      {contactInfo.location}
                      {contactInfo.country ? `, ${contactInfo.country}` : ""}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Toronto image */}
            {typeof s.torontoImage === "string" && (
              <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-xl">
                <Image
                  src={s.torontoImage}
                  alt="Toronto"
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
