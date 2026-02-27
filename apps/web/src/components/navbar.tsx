"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/solution", label: "Solution" },
  { href: "/news", label: "News" },
  { href: "/team", label: "Team" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

interface NavbarProps {
  logoUrl?: string;
}

export function Navbar({ logoUrl }: NavbarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt="RetiSpec"
              width={160}
              height={40}
              className="h-8 w-auto"
              priority
            />
          ) : (
            <span className="text-xl font-bold font-heading text-heading">
              RetiSpec
            </span>
          )}
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? "bg-primary/10 text-primary"
                  : "text-body hover:bg-surface hover:text-heading"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <Link
          href="/contact"
          className="hidden rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover md:block"
        >
          Get in Touch
        </Link>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg p-2 text-heading hover:bg-surface md:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="border-t border-border bg-white px-6 pb-6 md:hidden">
          <div className="flex flex-col gap-1 pt-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "bg-primary/10 text-primary"
                    : "text-body hover:bg-surface"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="mt-2 rounded-lg bg-primary px-5 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
