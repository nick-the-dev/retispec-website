import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Crown } from "lucide-react";
import { HeroSection } from "@/components/hero-section";
import { getPageContent, getTeamMembers } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Team",
  description:
    "Meet the passionate team of engineers, scientists, and clinicians behind RetiSpec.",
};

const INITIALS_COLORS = [
  "#0369A1",
  "#0E7490",
  "#4F46E5",
  "#7C3AED",
  "#2563EB",
  "#0891B2",
  "#6366F1",
  "#8B5CF6",
];

function getInitialsColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return INITIALS_COLORS[Math.abs(hash) % INITIALS_COLORS.length];
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

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
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {teamMembers.data.map((member) => (
                <div key={member.id} className="text-center">
                  <div className="mx-auto mb-4 aspect-[3/4] w-[140px] overflow-hidden rounded-2xl md:w-[170px]">
                    {member.photoUrl ? (
                      <Image
                        src={member.photoUrl}
                        alt={member.name}
                        width={170}
                        height={227}
                        className="h-full w-full object-contain object-bottom"
                      />
                    ) : (
                      <div
                        className="flex h-full w-full items-center justify-center text-xl font-bold text-white"
                        style={{ backgroundColor: getInitialsColor(member.name) }}
                      >
                        {getInitials(member.name)}
                      </div>
                    )}
                  </div>
                  <p
                    className="text-[#0A1628]"
                    style={{ fontSize: "14px", fontWeight: 600 }}
                  >
                    {member.name}
                  </p>
                  <p
                    className="mt-0.5 text-[#7C8DA5]"
                    style={{ fontSize: "12px", lineHeight: 1.4 }}
                  >
                    {member.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Board of Directors */}
      {boardMembers.data.length > 0 && (
        <section className="relative overflow-hidden bg-[#0A1628] py-24">
          {/* Decorative blur sphere */}
          <div className="absolute -right-32 -top-32 h-[400px] w-[400px] rounded-full bg-[#0EA5E9]/[0.08] blur-[120px]" />

          <div className="relative z-10 mx-auto max-w-7xl px-6">
            {/* Header */}
            <div className="mb-12 text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/5 px-4 py-1.5">
                <Crown className="h-3.5 w-3.5 text-[#0EA5E9]" />
                <span
                  className="text-[#0EA5E9]"
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  Board of Directors
                </span>
              </div>
              <h2
                className="text-white"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                  fontWeight: 700,
                  lineHeight: 1.2,
                  letterSpacing: "-0.02em",
                }}
              >
                Leadership &amp; Governance
              </h2>
            </div>

            {/* Board Grid */}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {boardMembers.data.map((member) => (
                <div
                  key={member.id}
                  className="rounded-xl border border-white/[0.08] bg-white/5 p-6 transition-colors hover:bg-white/[0.08]"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl">
                      {member.photoUrl ? (
                        <Image
                          src={member.photoUrl}
                          alt={member.name}
                          width={56}
                          height={56}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div
                          className="flex h-full w-full items-center justify-center text-sm font-bold text-white"
                          style={{ backgroundColor: getInitialsColor(member.name) }}
                        >
                          {getInitials(member.name)}
                        </div>
                      )}
                    </div>
                    <div>
                      <p
                        className="text-white"
                        style={{ fontSize: "15px", fontWeight: 600 }}
                      >
                        {member.name}
                      </p>
                      <p
                        className="text-[#7C8DA5]"
                        style={{ fontSize: "13px" }}
                      >
                        {member.title}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Join CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2
            className="text-[#0A1628]"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
            }}
          >
            Join the team
          </h2>
          <p
            className="mx-auto mt-4 max-w-xl text-[#4A5B73]"
            style={{ fontSize: "16px", lineHeight: 1.75 }}
          >
            We&apos;re always looking for passionate individuals who want to
            make a difference in Alzheimer&apos;s detection. Explore our open
            positions and become part of the mission.
          </p>
          <Link
            href="/careers"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#0369A1] px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0284C7]"
          >
            View Careers
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
