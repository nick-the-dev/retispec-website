import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "RetiSpec — AI-Powered Retinal Imaging",
    template: "%s | RetiSpec",
  },
  description:
    "RetiSpec develops AI-powered retinal imaging solutions for early detection of neurodegenerative diseases.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "RetiSpec",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
