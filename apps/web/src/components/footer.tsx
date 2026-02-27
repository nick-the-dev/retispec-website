import Link from "next/link";
import Image from "next/image";
import { Linkedin, Twitter, Instagram } from "lucide-react";

interface FooterProps {
  config: {
    logos?: { dark?: string; light?: string };
    social?: { linkedin?: string; twitter?: string; instagram?: string };
    contact?: { email?: string; location?: string; country?: string };
    footer?: { description?: string; disclaimer?: string };
  };
}

const COMPANY_LINKS = [
  { href: "/solution", label: "Solution" },
  { href: "/team", label: "Team" },
  { href: "/careers", label: "Careers" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
];

const RESOURCE_LINKS = [
  { href: "/privacy-policy", label: "Privacy Policy" },
];

export function Footer({ config }: FooterProps) {
  const darkLogo = config.logos?.dark;
  const social = config.social;
  const contact = config.contact;
  const footer = config.footer;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            {darkLogo ? (
              <Image
                src={darkLogo}
                alt="RetiSpec"
                width={160}
                height={40}
                className="mb-4 h-8 w-auto brightness-0 invert"
              />
            ) : (
              <span className="mb-4 block text-xl font-bold font-heading">
                RetiSpec
              </span>
            )}
            {footer?.description && (
              <p className="text-sm leading-relaxed text-light">
                {footer.description}
              </p>
            )}
            {social && (
              <div className="mt-6 flex gap-3">
                {social.linkedin && (
                  <a
                    href={social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-white/10 p-2 transition-colors hover:bg-white/20"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                )}
                {social.twitter && (
                  <a
                    href={social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-white/10 p-2 transition-colors hover:bg-white/20"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                )}
                {social.instagram && (
                  <a
                    href={social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-white/10 p-2 transition-colors hover:bg-white/20"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-light">
              Company
            </h3>
            <ul className="space-y-3">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-light">
              Resources
            </h3>
            <ul className="space-y-3">
              {RESOURCE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-light">
              Contact
            </h3>
            <ul className="space-y-3 text-sm text-gray-300">
              {contact?.email && (
                <li>
                  <a
                    href={`mailto:${contact.email}`}
                    className="transition-colors hover:text-white"
                  >
                    {contact.email}
                  </a>
                </li>
              )}
              {contact?.location && (
                <li>
                  {contact.location}
                  {contact.country ? `, ${contact.country}` : ""}
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-light">
              &copy; {year} RetiSpec Inc. All rights reserved.
            </p>
            {footer?.disclaimer && (
              <p className="text-xs text-light">{footer.disclaimer}</p>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
