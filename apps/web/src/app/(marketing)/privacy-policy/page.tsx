import type { Metadata } from "next";
import Link from "next/link";
import { HeroSection } from "@/components/hero-section";
import { getPageContent } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "RetiSpec Inc. privacy policy — how we collect, use, and safeguard your personal information.",
};

const DEFAULT_SECTIONS: { title: string; text: string }[] = [
  {
    title: "Information We Collect",
    text: "We collect information you provide directly to us, such as when you fill out a contact form, sign up for a newsletter, or communicate with us. This may include your name, email address, phone number, professional affiliation, and any other information you choose to provide. We also automatically collect certain technical information when you visit our website, including your IP address, browser type, operating system, referring URLs, and information about how you interact with our site.",
  },
  {
    title: "How We Use Your Information",
    text: "We use the information we collect to operate, maintain, and improve our website and services; to respond to your inquiries and fulfill your requests; to send you technical notices, updates, and administrative messages; to provide you with news and information about our products and research that we think may interest you; and to monitor and analyze trends, usage, and activities in connection with our website.",
  },
  {
    title: "Sharing of Information",
    text: "We do not sell, trade, or otherwise transfer your personal information to outside parties except as described in this policy. We may share your information with trusted service providers who assist us in operating our website, conducting our business, or serving you, so long as those parties agree to keep this information confidential. We may also release information when its release is appropriate to comply with the law, enforce our site policies, or protect ours or others' rights, property, or safety.",
  },
  {
    title: "Data Security",
    text: "We implement a variety of security measures to maintain the safety of your personal information. Your personal data is stored on secured networks and is only accessible by a limited number of persons who have special access rights to such systems and are required to keep the information confidential. All sensitive information you supply is encrypted via Secure Socket Layer (SSL) technology.",
  },
  {
    title: "Cookies and Tracking Technologies",
    text: "Our website may use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand where our visitors are coming from. You can choose to have your computer warn you each time a cookie is being sent, or you can choose to turn off all cookies through your browser settings. If you disable cookies, some features of our site may not function properly.",
  },
  {
    title: "Your Rights and Choices",
    text: "Depending on your jurisdiction, you may have certain rights regarding your personal information, including the right to access, correct, or delete your data. You may also have the right to opt out of certain communications from us. To exercise any of these rights, please contact us using the information provided below. We will respond to your request within a reasonable timeframe and in accordance with applicable law.",
  },
  {
    title: "Changes to This Policy",
    text: "We may update this privacy policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new privacy policy on this page and updating the effective date. We encourage you to review this policy periodically for any changes.",
  },
  {
    title: "Contact Us",
    text: "If you have any questions about this privacy policy or our data practices, please contact us at info@retispec.com or visit our contact page. We are committed to working with you to obtain a fair resolution of any complaint or concern about privacy.",
  },
];

export default async function PrivacyPolicyPage() {
  const page = await getPageContent("privacy-policy").catch(() => null);

  const s = (page?.sections ?? {}) as Record<string, unknown>;
  const cmsContent = s.content as { title: string | null; text: string }[] | undefined;
  const sections = cmsContent && cmsContent.length > 0 ? cmsContent : DEFAULT_SECTIONS;

  return (
    <>
      <HeroSection
        badge={page?.heroBadge ?? "Legal"}
        title={page?.heroTitle ?? "Privacy Policy"}
        subtitle={
          page?.heroSubtitle ??
          "How we collect, use, and safeguard your personal information"
        }
      />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6 space-y-8">
          {/* Intro paragraph */}
          <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#4A5B73" }}>
            At RetiSpec, we are committed to protecting the privacy and security
            of your personal information. This privacy policy describes how we
            collect, use, disclose, and safeguard your information when you visit
            our website or use our services. Please read this policy carefully to
            understand our views and practices regarding your personal data and
            how we will treat it.
          </p>

          {/* Content sections */}
          {sections.map((section, i) => (
            <div key={i}>
              {section.title && (
                <h3
                  className="font-heading"
                  style={{
                    fontSize: "18px",
                    fontWeight: 600,
                    lineHeight: 1.4,
                    color: "#0A1628",
                    marginBottom: "12px",
                  }}
                >
                  {section.title}
                </h3>
              )}
              <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#4A5B73" }}>
                {section.text}
              </p>
            </div>
          ))}

          {/* Bottom divider and copyright */}
          <div
            style={{
              borderTop: "1px solid #E8EDF2",
              paddingTop: "24px",
            }}
          >
            <p style={{ fontSize: "13px", color: "#94A3B8" }}>
              &copy; {new Date().getFullYear()} RetiSpec Inc. All rights
              reserved. For questions about this policy, please{" "}
              <Link
                href="/contact"
                style={{ color: "#94A3B8", textDecoration: "underline" }}
              >
                contact us
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
