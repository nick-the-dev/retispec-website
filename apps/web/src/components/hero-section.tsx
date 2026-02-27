interface HeroSectionProps {
  badge?: string | null;
  title: string;
  subtitle?: string | null;
}

export function HeroSection({ badge, title, subtitle }: HeroSectionProps) {
  return (
    <section
      className="relative pt-14 md:pt-20 pb-16 md:pb-20 overflow-hidden"
      style={{ background: "linear-gradient(170deg, #E4EEF7 0%, #EDF3FA 50%, #F6F9FC 100%)" }}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[#0369A1]/[0.04] blur-[80px]" />
      <div className="absolute bottom-0 left-1/2 w-[300px] h-[200px] rounded-full bg-[#0EA5E9]/[0.03] blur-[60px]" />
      <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-gradient-to-b from-[#0369A1]/20 via-[#0EA5E9]/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-2xl">
          {badge && (
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-[2px] bg-[#0369A1]/40" />
              <span
                className="text-[#0369A1]"
                style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}
              >
                {badge}
              </span>
            </div>
          )}
          <h1
            className="text-[#0A1628] mb-4"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              className="text-[#4A5B73]"
              style={{ fontSize: "16px", lineHeight: 1.75 }}
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
