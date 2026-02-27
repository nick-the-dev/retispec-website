import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HeroSection } from "@/components/hero-section";
import { getPageContent, getTeamMembers } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Team",
  description:
    "Meet the passionate team of engineers, scientists, and clinicians behind RetiSpec.",
};

export default async function TeamPage() {
  const [page, teamMembers, boardMembers] = await Promise.all([
    getPageContent("team").catch(() => null),
    getTeamMembers("team").catch(() => ({ data: [] })),
    getTeamMembers("board").catch(() => ({ data: [] })),
  ]);

  return (
    <>
      <HeroSection
        badge={page?.heroBadge}
        title={page?.heroTitle ?? "Our People"}
        subtitle={page?.heroSubtitle}
      />

      {/* Team Grid */}
      {teamMembers.data.length > 0 && (
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {teamMembers.data.map((member) => (
                <div key={member.id} className="group text-center">
                  <div className="relative mx-auto mb-4 aspect-square w-full max-w-[200px] overflow-hidden rounded-xl bg-surface">
                    {member.photoUrl ? (
                      <Image
                        src={member.photoUrl}
                        alt={member.name}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-3xl font-bold text-muted">
                        {member.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <h3 className="text-sm font-semibold text-heading">
                    {member.name}
                  </h3>
                  <p className="mt-0.5 text-xs text-muted">{member.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Board of Directors */}
      {boardMembers.data.length > 0 && (
        <section className="bg-navy py-20 text-white lg:py-28">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="mb-12 text-center font-heading text-3xl font-bold">
              Board of Directors
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {boardMembers.data.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center gap-4 rounded-xl bg-white/5 p-5"
                >
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full">
                    {member.photoUrl ? (
                      <Image
                        src={member.photoUrl}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-primary/20 text-lg font-bold">
                        {member.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold">{member.name}</h3>
                    <p className="text-sm text-gray-400">{member.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Join CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-heading text-3xl font-bold text-heading">
            Join Our Team
          </h2>
          <p className="mt-4 text-body">
            We&apos;re always looking for passionate individuals who want to
            make a difference in Alzheimer&apos;s detection.
          </p>
          <Link
            href="/careers"
            className="mt-8 inline-flex rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
          >
            View Careers
          </Link>
        </div>
      </section>
    </>
  );
}
