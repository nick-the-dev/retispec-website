import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Stethoscope,
  FlaskConical,
  TrendingUp,
  Building2,
  Mail,
  MapPin,
  Linkedin,
  Twitter,
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
  const audienceCards =
    (s.audienceCards as { icon: string; title: string; desc: string }[]) ?? [];
  const contactInfo = contact as {
    email?: string;
    location?: string;
    country?: string;
    linkedin?: string;
    twitter?: string;
    researchEmail?: string;
    researchDesc?: string;
  } | null;

  return (
    <>
      <HeroSection
        badge={page?.heroBadge ?? "Contact"}
        title={page?.heroTitle ?? "Get in Touch"}
        subtitle={page?.heroSubtitle}
      />

      {/* Audience Cards */}
      {audienceCards.length > 0 && (
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {audienceCards.map((card, i) => {
                const Icon = AUDIENCE_ICONS[card.icon] ?? Building2;
                return (
                  <div
                    key={i}
                    className="group rounded-xl border border-[#E2E8F0] bg-white p-6 transition-all hover:border-[#0369A1]/20 hover:shadow-md"
                  >
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[#0369A1]/[0.08]">
                      <Icon className="h-5 w-5 text-[#0369A1]" />
                    </div>
                    <h3
                      className="mb-1.5 text-[#0A1628]"
                      style={{ fontSize: "15px", fontWeight: 600 }}
                    >
                      {card.title}
                    </h3>
                    <p
                      className="text-[#475569]"
                      style={{ fontSize: "13px", lineHeight: 1.6 }}
                    >
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
      <section className="py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl px-6 gap-12 md:grid-cols-5">
          {/* Left: Contact Info */}
          <div className="md:col-span-2 space-y-8">
            <div>
              <h2
                className="font-heading text-[#0A1628] mb-6"
                style={{ fontSize: "20px", fontWeight: 700 }}
              >
                Contact Information
              </h2>

              <div className="space-y-5">
                {/* Location */}
                {contactInfo?.location && (
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0369A1]/[0.08]">
                      <MapPin className="h-5 w-5 text-[#0369A1]" />
                    </div>
                    <div>
                      <p
                        className="text-[#0A1628] mb-0.5"
                        style={{ fontSize: "14px", fontWeight: 600 }}
                      >
                        Location
                      </p>
                      <p
                        className="text-[#475569]"
                        style={{ fontSize: "13px", lineHeight: 1.6 }}
                      >
                        {contactInfo.location}
                        {contactInfo.country ? `, ${contactInfo.country}` : ""}
                      </p>
                    </div>
                  </div>
                )}

                {/* Email */}
                {contactInfo?.email && (
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0369A1]/[0.08]">
                      <Mail className="h-5 w-5 text-[#0369A1]" />
                    </div>
                    <div>
                      <p
                        className="text-[#0A1628] mb-0.5"
                        style={{ fontSize: "14px", fontWeight: 600 }}
                      >
                        Email
                      </p>
                      <a
                        href={`mailto:${contactInfo.email}`}
                        className="text-[#0369A1] hover:underline"
                        style={{ fontSize: "13px" }}
                      >
                        {contactInfo.email}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {contactInfo?.linkedin && (
                <Link
                  href={contactInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F1F5F9] text-[#475569] transition-colors hover:bg-[#0369A1] hover:text-white"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
              )}
              {contactInfo?.twitter && (
                <Link
                  href={contactInfo.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F1F5F9] text-[#475569] transition-colors hover:bg-[#0369A1] hover:text-white"
                >
                  <Twitter className="h-5 w-5" />
                </Link>
              )}
            </div>

            {/* Research Inquiries Dark Card */}
            <div className="rounded-2xl bg-[#0A1628] p-8">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                <FlaskConical className="h-5 w-5 text-[#38BDF8]" />
              </div>
              <h3
                className="text-white mb-2"
                style={{ fontSize: "16px", fontWeight: 600 }}
              >
                Research Inquiries
              </h3>
              <p
                className="text-[#94A3B8] mb-4"
                style={{ fontSize: "13px", lineHeight: 1.6 }}
              >
                {contactInfo?.researchDesc ??
                  "For research collaborations, clinical study partnerships, or academic inquiries, please reach out to our research team."}
              </p>
              {contactInfo?.researchEmail && (
                <a
                  href={`mailto:${contactInfo.researchEmail}`}
                  className="inline-flex items-center gap-2 text-[#38BDF8] hover:underline"
                  style={{ fontSize: "13px", fontWeight: 500 }}
                >
                  <Mail className="h-4 w-4" />
                  {contactInfo.researchEmail}
                </a>
              )}
            </div>

            {/* Toronto Image */}
            {typeof s.torontoImage === "string" && (
              <div>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <Image
                    src={s.torontoImage}
                    alt="Toronto skyline"
                    fill
                    className="object-cover"
                  />
                </div>
                {typeof s.torontoCaption === "string" && (
                  <p
                    className="mt-3 text-[#475569]"
                    style={{ fontSize: "13px", lineHeight: 1.5 }}
                  >
                    {s.torontoCaption}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Right: Contact Form */}
          <div className="md:col-span-3">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
