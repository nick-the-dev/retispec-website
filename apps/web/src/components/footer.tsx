import Link from "next/link";
import Image from "next/image";
import { Linkedin, Twitter, Instagram } from "lucide-react";

const LOGO_LIGHT = "https://static.wixstatic.com/media/efca5f_1765e225e13b400eb02c4c49c2f2f95f~mv2.png";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Solution", path: "/solution" },
  { label: "News", path: "/news" },
  { label: "Team", path: "/team" },
  { label: "Contact", path: "/contact" },
  { label: "Careers", path: "/careers" },
];

interface FooterProps {
  config: Record<string, Record<string, unknown>>;
}

export function Footer({ config }: FooterProps) {
  const logoUrl = (config.logos as { light?: string } | undefined)?.light || LOGO_LIGHT;
  const social = config.social as { linkedin?: string; twitter?: string; instagram?: string } | undefined;
  const contact = config.contact as { email?: string; location?: string; country?: string } | undefined;
  const footer = config.footer as { description?: string; disclaimer?: string } | undefined;

  return (
    <footer className="bg-[#0A1628]">
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-5">
            <Image
              src={logoUrl}
              alt="RetiSpec"
              width={160}
              height={28}
              className="h-7 w-auto mb-6"
            />
            <p className="text-[#7C8DA5] max-w-sm" style={{ fontSize: "14px", lineHeight: 1.8 }}>
              {footer?.description || "AI-driven early detection of Alzheimer's disease through a simple, non-invasive eye exam. Accessible, affordable, and scalable retinal imaging technology."}
            </p>
            <div className="flex gap-3 mt-8">
              <a
                href={social?.linkedin || "https://www.linkedin.com/company/retispec/"}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/[0.08] border border-white/10 flex items-center justify-center text-[#7C8DA5] hover:text-white hover:bg-[#0369A1] hover:border-[#0369A1] transition-all"
              >
                <Linkedin size={15} />
              </a>
              <a
                href={social?.twitter || "https://twitter.com/RetiSpec"}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/[0.08] border border-white/10 flex items-center justify-center text-[#7C8DA5] hover:text-white hover:bg-[#0369A1] hover:border-[#0369A1] transition-all"
              >
                <Twitter size={15} />
              </a>
              <a
                href={social?.instagram || "https://www.instagram.com/retispec/"}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/[0.08] border border-white/10 flex items-center justify-center text-[#7C8DA5] hover:text-white hover:bg-[#0369A1] hover:border-[#0369A1] transition-all"
              >
                <Instagram size={15} />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div className="md:col-span-3">
            <h4 className="text-white/50 mb-5" style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>Company</h4>
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link key={link.path} href={link.path} className="text-[#7C8DA5] hover:text-white transition-colors" style={{ fontSize: "14px" }}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div className="md:col-span-2">
            <h4 className="text-white/50 mb-5" style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>Resources</h4>
            <div className="flex flex-col gap-3">
              <Link href="/solution" className="text-[#7C8DA5] hover:text-white transition-colors" style={{ fontSize: "14px" }}>Publications</Link>
              <Link href="/news" className="text-[#7C8DA5] hover:text-white transition-colors" style={{ fontSize: "14px" }}>Media</Link>
              <Link href="/privacy-policy" className="text-[#7C8DA5] hover:text-white transition-colors" style={{ fontSize: "14px" }}>Privacy Policy</Link>
            </div>
          </div>

          {/* Contact */}
          <div className="md:col-span-2">
            <h4 className="text-white/50 mb-5" style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>Contact</h4>
            <div className="flex flex-col gap-3 text-[#7C8DA5]" style={{ fontSize: "14px" }}>
              <p>{contact?.location || "Toronto, ON"}</p>
              <p>{contact?.country || "Canada"}</p>
              <a href={`mailto:${contact?.email || "hello@retispec.com"}`} className="hover:text-white transition-colors">
                {contact?.email || "hello@retispec.com"}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.08] mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#4A5B73]" style={{ fontSize: "12px" }}>
            &copy; {new Date().getFullYear()} RetiSpec Inc. All rights reserved.
          </p>
          <p className="text-[#4A5B73]" style={{ fontSize: "12px" }}>
            {footer?.disclaimer || "Technology is currently for research use only"}
          </p>
        </div>
      </div>
    </footer>
  );
}
