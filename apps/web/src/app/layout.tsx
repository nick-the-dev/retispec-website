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

  const logoUrl = (config.logos as { light?: string } | undefined)?.light;

  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground antialiased">
        <Navbar logoUrl={logoUrl} />
        <main className="min-h-screen">{children}</main>
        <Footer config={config} />
      </body>
    </html>
  );
}
