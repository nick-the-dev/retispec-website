import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Members",
  description: "RetiSpec member area.",
};

export default function MembersPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold tracking-tight">Members</h1>
      <p className="mt-4 text-lg text-gray-600">Content coming soon.</p>
    </main>
  );
}
