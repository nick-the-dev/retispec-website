import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { getAllSiteConfigs } from "@/lib/strapi";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "RetiSpec — AI-Powered Retinal Imaging for Early Alzheimer's Detection",
    template: "%s | RetiSpec",
  },
  description:
    "RetiSpec develops AI-powered retinal imaging solutions for early, non-invasive detection of Alzheimer's disease through a simple eye exam.",
  keywords: [
    "Alzheimer's detection",
    "retinal imaging",
    "AI diagnostics",
    "hyperspectral imaging",
    "neurodegenerative disease",
    "early detection",
    "eye exam",
    "RetiSpec",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "RetiSpec",
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://retispec.com"
  ),
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let config: Record<string, Record<string, unknown>> = {};
  try {
    config = await getAllSiteConfigs();
  } catch {
    // CMS may be unavailable — render with defaults
  }

  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground antialiased">
        {/* Top accent line */}
        <div className="h-[3px] bg-gradient-to-r from-[#0369A1] via-[#0EA5E9] to-[#06B6D4] fixed top-0 left-0 right-0 z-[60]" />
        <Navbar config={config} />
        <main className="flex-1" style={{ paddingTop: "75px" }}>
          {children}
        </main>
        <Footer config={config} />
      </body>
    </html>
  );
}
