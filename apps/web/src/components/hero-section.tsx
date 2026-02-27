interface HeroSectionProps {
  badge?: string | null;
  title: string;
  subtitle?: string | null;
}

export function HeroSection({ badge, title, subtitle }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-surface via-surface-alt to-surface pt-32 pb-20">
      {/* Decorative elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        {badge && (
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            {badge}
          </span>
        )}
        <h1 className="font-heading text-4xl font-bold tracking-tight text-heading sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-body">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
