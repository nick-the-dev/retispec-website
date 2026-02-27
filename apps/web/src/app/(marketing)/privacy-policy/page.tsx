import type { Metadata } from "next";
import { HeroSection } from "@/components/hero-section";
import { getPageContent } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "RetiSpec Inc. privacy policy — how we collect, use, and safeguard your personal information.",
};

export default async function PrivacyPolicyPage() {
  const page = await getPageContent("privacy-policy").catch(() => null);

  const s = (page?.sections ?? {}) as Record<string, unknown>;
  const content = (s.content as { title: string | null; text: string }[]) ?? [];

  return (
    <>
      <HeroSection
        badge={page?.heroBadge}
        title={page?.heroTitle ?? "Privacy Policy"}
        subtitle={page?.heroSubtitle}
      />

      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6">
          {content.length > 0 ? (
            <div className="space-y-8">
              {content.map((section, i) => (
                <div key={i}>
                  {section.title && (
                    <h2 className="mb-3 font-heading text-xl font-bold text-heading">
                      {section.title}
                    </h2>
                  )}
                  <p className="leading-relaxed text-body">{section.text}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-body">Privacy policy content coming soon.</p>
          )}
        </div>
      </section>
    </>
  );
}
