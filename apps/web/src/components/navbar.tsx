"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";

const LOGO_DARK = "https://static.wixstatic.com/media/efca5f_c58586be74a34a82ad83390ebf915242~mv2.png";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Solution", path: "/solution" },
  { label: "News", path: "/news" },
  { label: "Team", path: "/team" },
  { label: "Contact", path: "/contact" },
];

interface NavbarProps {
  config?: Record<string, Record<string, unknown>>;
}

export function Navbar({ config }: NavbarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const logoUrl = (config?.logos as { dark?: string } | undefined)?.dark || LOGO_DARK;

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  return (
    <nav className={`fixed top-[3px] left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? "bg-white/95 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
        : "bg-white/80 backdrop-blur-md"
    }`}>
      <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src={logoUrl}
            alt="RetiSpec"
            width={160}
            height={32}
            className="h-7 md:h-8 w-auto"
            priority
          />
        </Link>

        {/* Desktop nav - centered */}
        <div className="hidden md:flex items-center gap-0.5">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`relative px-4 py-2.5 rounded-lg transition-all ${
                  active
                    ? "text-[#0369A1]"
                    : "text-[#475569] hover:text-[#0A1628]"
                }`}
                style={{ fontSize: "14px", fontWeight: active ? 600 : 450, letterSpacing: "-0.01em" }}
              >
                {link.label}
                {active && (
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#0369A1] rounded-full" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Get in Touch button */}
        <div className="hidden md:flex items-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-[#0369A1] text-white hover:bg-[#024E7A] transition-all"
            style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "0.01em" }}
          >
            Get in Touch <ArrowRight size={14} />
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-[#F1F5F9] text-[#475569]"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden overflow-hidden bg-white border-t border-[#F1F5F9]">
          <div className="px-6 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`px-4 py-3 rounded-lg transition-all ${
                  isActive(link.path)
                    ? "bg-[#F0F7FF] text-[#0369A1]"
                    : "text-[#475569] hover:text-[#0A1628] hover:bg-[#F8FAFC]"
                }`}
                style={{ fontSize: "15px", fontWeight: isActive(link.path) ? 600 : 450 }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
