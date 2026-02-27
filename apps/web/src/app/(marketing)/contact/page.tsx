import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with RetiSpec.",
};

export default function ContactPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold tracking-tight">Contact Us</h1>
      <p className="mt-4 text-lg text-gray-600">Content coming soon.</p>
    </main>
  );
}
