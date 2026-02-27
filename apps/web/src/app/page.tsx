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
  ChevronRight,
} from "lucide-react";
import { VideoPlayer } from "@/components/video-player";
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
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(170deg, #E4EEF7 0%, #EDF3FA 50%, #F6F9FC 100%)" }}>
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[#0369A1]/[0.04] blur-[80px]" />
        <div className="absolute bottom-0 left-1/3 w-[300px] h-[200px] rounded-full bg-[#0EA5E9]/[0.03] blur-[60px]" />

        <div className="max-w-7xl mx-auto px-6 pt-16 md:pt-24 pb-20 md:pb-28">
          <div className="grid md:grid-cols-12 gap-10 md:gap-8 items-center">
            <div className="md:col-span-6 lg:col-span-5">
              {page?.heroBadge && (
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#0369A1]/15 bg-[#0369A1]/5 mb-7">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0EA5E9]" />
                  <span className="text-[#0369A1]" style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.03em" }}>
                    {page.heroBadge}
                  </span>
                </div>
              )}

              <h1
                className="text-[#0A1628] mb-5"
                style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2rem, 4vw, 3.25rem)", fontWeight: 700, lineHeight: 1.12, letterSpacing: "-0.02em" }}
              >
                {page?.heroTitle ?? "A revolutionary, non-invasive way to detect Alzheimer\u2019s disease early"}
              </h1>

              {page?.heroSubtitle && (
                <p className="text-[#4A5B73] mb-8" style={{ fontSize: "16px", lineHeight: 1.75 }}>
                  {page.heroSubtitle}
                </p>
              )}

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/solution"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-[#0369A1] text-white hover:bg-[#024E7A] transition-colors"
                  style={{ fontSize: "14px", fontWeight: 600 }}
                >
                  How It Works <ArrowRight size={16} />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg border border-[#CBD5E1] text-[#0A1628] hover:border-[#94A3B8] hover:bg-[#F8FAFC] transition-all"
                  style={{ fontSize: "14px", fontWeight: 600 }}
                >
                  Get in Touch
                </Link>
              </div>
            </div>

            <div className="md:col-span-6 lg:col-span-7 relative">
              <div className="relative max-w-[580px] ml-auto">
                {typeof s.heroImage === "string" ? (
                  <div className="rounded-2xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(3,105,161,0.15)]">
                    <Image
                      src={s.heroImage}
                      alt="Human eye — the window to early Alzheimer's detection"
                      width={580}
                      height={399}
                      className="w-full aspect-[16/11] object-cover brightness-105 contrast-[0.85] saturate-[0.9] opacity-90"
                      priority
                    />
                  </div>
                ) : (
                  <div className="rounded-2xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(3,105,161,0.15)]">
                    <Image
                      src="https://static.wixstatic.com/media/9fe62d_d209ee1655304d0b83569d7a8693af15~mv2.jpg"
                      alt="Human eye — the window to early Alzheimer's detection"
                      width={580}
                      height={399}
                      className="w-full aspect-[16/11] object-cover brightness-105 contrast-[0.85] saturate-[0.9] opacity-90"
                      priority
                    />
                  </div>
                )}

                {/* Floating indicators */}
                <div className="absolute -bottom-5 left-6 bg-white rounded-xl px-5 py-3.5 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-[#F1F5F9]">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#F0F7FF] flex items-center justify-center">
                      <Eye size={18} className="text-[#0369A1]" />
                    </div>
                    <div>
                      <p className="text-[#0A1628]" style={{ fontSize: "13px", fontWeight: 600 }}>Non-invasive screening</p>
                      <p className="text-[#94A3B8]" style={{ fontSize: "11px" }}>Simple eye exam</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-4 right-6 bg-white rounded-xl px-5 py-3.5 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-[#F1F5F9]">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#F0FFF4] flex items-center justify-center">
                      <Shield size={18} className="text-[#0F766E]" />
                    </div>
                    <div>
                      <p className="text-[#0A1628]" style={{ fontSize: "13px", fontWeight: 600 }}>Clinically validated</p>
                      <p className="text-[#94A3B8]" style={{ fontSize: "11px" }}>Multi-site studies</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured In */}
      {logos.data.length > 0 && (
        <section className="py-10 md:py-14 border-y border-[#E8EDF2] bg-[#FAFCFE]">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-center text-[#94A3B8] mb-8" style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>Featured in</p>
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 md:gap-x-16">
              {logos.data.map((item) => (
                <div key={item.id} className="grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-default">
                  {item.logoUrl ? (
                    <Image src={item.logoUrl} alt={item.name} width={120} height={32} className="h-6 md:h-7 w-auto object-contain" unoptimized />
                  ) : (
                    <span className="text-[#475569]" style={{ fontSize: "14px", fontWeight: 600, letterSpacing: "-0.01em", whiteSpace: "nowrap" }}>
                      {item.name}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Mission Section */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-16 items-center">
            <div className="md:col-span-5">
              <p className="text-[#0369A1] mb-4" style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                Our Mission
              </p>
              <h2
                style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.75rem, 3vw, 2.25rem)", fontWeight: 700, lineHeight: 1.2, letterSpacing: "-0.02em" }}
                className="mb-6 text-[#0A1628]"
              >
                {(s.missionTitle as string) ?? "A better future for Alzheimer\u2019s starts with the ability to diagnose it"}
              </h2>
              <div className="space-y-4">
                {typeof s.missionText === "string" ? (
                  (s.missionText as string).split("\n\n").map((p: string, i: number) => (
                    <p key={i} className="text-[#4A5B73]" style={{ fontSize: "15px", lineHeight: 1.8 }}>{p}</p>
                  ))
                ) : (
                  <>
                    <p className="text-[#4A5B73]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
                      At RetiSpec, we believe a better future for Alzheimer&apos;s starts with the ability to diagnose it. Our mission is to enable widespread early and accurate detection of neurodegenerative disease markers with accessible, affordable and scalable AI-driven retinal imaging.
                    </p>
                    <p className="text-[#4A5B73]" style={{ fontSize: "15px", lineHeight: 1.8 }}>
                      To achieve this vision, we are developing an AI-driven early detection of Alzheimer&apos;s, through a simple eye exam.
                    </p>
                  </>
                )}
              </div>
              <Link
                href="/solution"
                className="inline-flex items-center gap-1.5 mt-8 text-[#0369A1] hover:text-[#024E7A] transition-colors"
                style={{ fontSize: "14px", fontWeight: 600 }}
              >
                Learn about our solution <ChevronRight size={16} />
              </Link>
            </div>

            <div className="md:col-span-7">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-7 space-y-4">
                  <div className="rounded-2xl overflow-hidden">
                    {Array.isArray(s.missionImages) && (s.missionImages as string[])[0] ? (
                      <Image src={(s.missionImages as string[])[0]!} alt="Retinal fundus imaging" width={600} height={800} className="w-full aspect-[3/4] object-cover" />
                    ) : (
                      <Image src="https://static.wixstatic.com/media/9fe62d_fed15a8756d4467cb6eb625a436b9409~mv2.jpg" alt="Retinal fundus imaging" width={600} height={800} className="w-full aspect-[3/4] object-cover" />
                    )}
                  </div>
                </div>
                <div className="col-span-5 space-y-4 pt-10">
                  <div className="rounded-2xl overflow-hidden">
                    {Array.isArray(s.missionImages) && (s.missionImages as string[])[1] ? (
                      <Image src={(s.missionImages as string[])[1]!} alt="Eye iris macro detail" width={400} height={400} className="w-full aspect-square object-cover" />
                    ) : (
                      <Image src="https://static.wixstatic.com/media/9fe62d_d209ee1655304d0b83569d7a8693af15~mv2.jpg" alt="Eye exam screening" width={400} height={400} className="w-full aspect-square object-cover" />
                    )}
                  </div>
                  <div className="rounded-2xl overflow-hidden">
                    {Array.isArray(s.missionImages) && (s.missionImages as string[])[2] ? (
                      <Image src={(s.missionImages as string[])[2]!} alt="Clinical research laboratory" width={400} height={533} className="w-full aspect-[3/4] object-cover" />
                    ) : (
                      <Image src="https://static.wixstatic.com/media/9fe62d_1e1d28d1f34f4b22bfb999aa8717e654~mv2.jpg" alt="AI-powered retinal analysis" width={400} height={533} className="w-full aspect-[3/4] object-cover" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Pillars */}
      {pillars.length > 0 && (
        <section className="py-20 md:py-28" style={{ background: "linear-gradient(180deg, #F8FBFF 0%, #FFFFFF 100%)" }}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-xl mb-14">
              <p className="text-[#0369A1] mb-4" style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                Why It Matters
              </p>
              <h2
                style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.75rem, 3vw, 2.25rem)", fontWeight: 700, lineHeight: 1.2, letterSpacing: "-0.02em" }}
                className="text-[#0A1628]"
              >
                Transforming eye care into brain care
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {pillars.map((p) => {
                const Icon = ICON_MAP[p.icon] ?? Eye;
                return (
                  <div key={p.title} className="group relative bg-white rounded-2xl p-7 border border-[#E8EDF2] hover:border-[#0369A1]/20 hover:shadow-[0_8px_30px_rgba(3,105,161,0.08)] transition-all duration-300">
                    {/* Top accent line */}
                    <div className="absolute top-0 left-6 right-6 h-[2px] rounded-b-full bg-gradient-to-r from-transparent via-[#0369A1]/20 to-transparent group-hover:via-[#0369A1]/50 transition-all duration-300" />

                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#E8F4FD] via-[#F0F7FF] to-[#E0EFFA] group-hover:from-[#D4ECFA] group-hover:to-[#C8E4F6] flex items-center justify-center mb-6 transition-all duration-300">
                      <Icon size={22} className="text-[#0369A1] group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <h3 className="text-[#0A1628] mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "16px", fontWeight: 600 }}>{p.title}</h3>
                    <p className="text-[#4A5B73]" style={{ fontSize: "13.5px", lineHeight: 1.7 }}>{p.desc}</p>

                    {/* Decorative corner accent */}
                    <div className="absolute bottom-4 right-4 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end">
                      <div className="w-8 h-8 rounded-tl-xl border-t border-l border-[#0369A1]/10" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* How It Works Preview */}
      {steps.length > 0 && (
        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
              <div>
                <p className="text-[#0369A1] mb-4" style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  Our Solution
                </p>
                <h2
                  style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.75rem, 3vw, 2.25rem)", fontWeight: 700, lineHeight: 1.2, letterSpacing: "-0.02em" }}
                  className="text-[#0A1628]"
                >
                  How it works
                </h2>
              </div>
              <Link
                href="/solution"
                className="inline-flex items-center gap-1.5 text-[#0369A1] hover:text-[#024E7A] transition-colors"
                style={{ fontSize: "14px", fontWeight: 600 }}
              >
                View full solution <ChevronRight size={16} />
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {steps.map((step) => {
                const Icon = ICON_MAP[step.icon] ?? Eye;
                return (
                  <div key={step.num} className="group">
                    <div className="rounded-2xl overflow-hidden mb-5">
                      <Image
                        src={step.img}
                        alt={step.title}
                        width={600}
                        height={375}
                        className="w-full aspect-[16/10] object-cover group-hover:scale-[1.02] transition-transform duration-500"
                      />
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-[#CBD5E1] shrink-0" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "32px", fontWeight: 700, lineHeight: 1 }}>{step.num}</span>
                      <div>
                        <h3 className="text-[#0A1628] mb-1.5" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "17px", fontWeight: 600 }}>{step.title}</h3>
                        <p className="text-[#4A5B73]" style={{ fontSize: "13.5px", lineHeight: 1.7 }}>{step.desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Video Section */}
      <section className="py-20 md:py-28 bg-[#0A1628] relative overflow-hidden">
        <div className="absolute -left-32 -top-32 h-[400px] w-[400px] rounded-full bg-[#0EA5E9]/[0.06] blur-[120px]" />
        <div className="absolute -right-32 -bottom-32 h-[400px] w-[400px] rounded-full bg-[#0369A1]/[0.06] blur-[120px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[#0EA5E9] mb-4" style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
              See It in Action
            </p>
            <h2
              className="text-white mb-4"
              style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.75rem, 3vw, 2.25rem)", fontWeight: 700, lineHeight: 1.2, letterSpacing: "-0.02em" }}
            >
              A case study in community-based settings
            </h2>
            <p className="text-[#7C8DA5] max-w-2xl mx-auto" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              Watch how RetiSpec&apos;s AI-driven eye test enables early detection of Alzheimer&apos;s disease through a simple, non-invasive retinal scan.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <VideoPlayer
              vimeoId="860969475"
              thumbnailUrl="https://i.vimeocdn.com/video/1719328219-a414f1c345477d2f1dfd7cd56a5e8e3d882408268e682018fdfe2e4d7f37e429-d_1920x1080"
            />
          </div>
        </div>
      </section>

      {/* Image Band with Stats */}
      <section className="relative">
        <div className="grid md:grid-cols-2">
          <div className="relative h-[400px] md:h-auto">
            <Image
              src={typeof s.impactImage === "string" ? (s.impactImage as string) : "https://static.wixstatic.com/media/9fe62d_38288f35e00344e3a0d968eb5059d95e~mv2.jpg"}
              alt="Compassionate patient care"
              fill
              className="object-cover"
            />
          </div>
          <div className="bg-[#0A1628] p-12 md:p-16 flex items-center">
            <div>
              <p className="text-[#0EA5E9] mb-4" style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                Impact
              </p>
              <h2
                className="text-white mb-5"
                style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 700, lineHeight: 1.25, letterSpacing: "-0.01em" }}
              >
                {(s.impactTitle as string) ?? "Early detection changes lives"}
              </h2>
              {typeof s.impactText === "string" ? (
                <p className="text-[#7C8DA5] mb-8" style={{ fontSize: "15px", lineHeight: 1.8 }}>
                  {s.impactText}
                </p>
              ) : (
                <p className="text-[#7C8DA5] mb-8" style={{ fontSize: "15px", lineHeight: 1.8 }}>
                  Alzheimer&apos;s affects over 55 million people worldwide. Early detection enables earlier intervention, better planning, and more effective clinical trials — giving patients and families more time and more options.
                </p>
              )}
              <div className="grid grid-cols-2 gap-6">
                {stats.length > 0 ? stats.map((stat, i) => (
                  <div key={i}>
                    <p className="text-white" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "28px", fontWeight: 700 }}>{stat.value}</p>
                    <p className="text-[#7C8DA5]" style={{ fontSize: "13px" }}>{stat.label}</p>
                  </div>
                )) : (
                  <>
                    <div>
                      <p className="text-white" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "28px", fontWeight: 700 }}>7+</p>
                      <p className="text-[#7C8DA5]" style={{ fontSize: "13px" }}>Peer-reviewed publications</p>
                    </div>
                    <div>
                      <p className="text-white" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "28px", fontWeight: 700 }}>11+</p>
                      <p className="text-[#7C8DA5]" style={{ fontSize: "13px" }}>Conference presentations</p>
                    </div>
                    <div>
                      <p className="text-white" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "28px", fontWeight: 700 }}>$10M</p>
                      <p className="text-[#7C8DA5]" style={{ fontSize: "13px" }}>Funding raised (USD)</p>
                    </div>
                    <div>
                      <p className="text-white" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "28px", fontWeight: 700 }}>DH50</p>
                      <p className="text-[#7C8DA5]" style={{ fontSize: "13px" }}>CB Insights Digital Health</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.data.length > 0 && (
        <section className="py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-xl mb-14">
              <p className="text-[#0369A1] mb-4" style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                Testimonials
              </p>
              <h2
                style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.75rem, 3vw, 2.25rem)", fontWeight: 700, lineHeight: 1.2, letterSpacing: "-0.02em" }}
                className="text-[#0A1628]"
              >
                Trusted by leading experts in Alzheimer&apos;s research
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.data.map((t) => (
                <div key={t.id} className="bg-[#F8FBFF] rounded-2xl p-8 border border-[#E8EDF2] relative">
                  <div className="text-[#0369A1]/10 mb-4" style={{ fontSize: "56px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, lineHeight: 0.8 }}>&quot;</div>
                  <p className="text-[#4A5B73] mb-8" style={{ fontSize: "13.5px", lineHeight: 1.8 }}>
                    {t.quote}
                  </p>
                  <div className="border-t border-[#E8EDF2] pt-5">
                    <p className="text-[#0A1628]" style={{ fontSize: "14px", fontWeight: 600 }}>{t.authorName}</p>
                    <p className="text-[#94A3B8] mt-1" style={{ fontSize: "12px", lineHeight: 1.5 }}>{t.authorTitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Banner Image */}
      <section className="relative h-[240px] overflow-hidden">
        <Image
          src={typeof s.bannerImage === "string" ? (s.bannerImage as string) : "https://static.wixstatic.com/media/cc1ac3_6e3405bf154941fd8b846e163b2d3105~mv2.jpg"}
          alt="RetiSpec retinal imaging technology"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#0A1628]/30" />
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2
            className="text-[#0A1628] mb-5"
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.75rem, 3vw, 2.25rem)", fontWeight: 700, lineHeight: 1.2, letterSpacing: "-0.02em" }}
          >
            {(s.ctaTitle as string) ?? "Ready to learn more?"}
          </h2>
          <p className="text-[#4A5B73] mb-10 max-w-xl mx-auto" style={{ fontSize: "16px", lineHeight: 1.75 }}>
            {typeof s.ctaText === "string"
              ? (s.ctaText as string)
              : "Whether you\u2019re a clinician, researcher, or simply curious about the future of Alzheimer\u2019s detection, we\u2019d love to connect."}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-[#0369A1] text-white hover:bg-[#024E7A] transition-colors"
              style={{ fontSize: "14px", fontWeight: 600 }}
            >
              Contact Us <ArrowRight size={16} />
            </Link>
            <Link
              href="/solution"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg border border-[#CBD5E1] text-[#0A1628] hover:border-[#94A3B8] hover:bg-[#F8FAFC] transition-all"
              style={{ fontSize: "14px", fontWeight: 600 }}
            >
              View Our Solution
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
