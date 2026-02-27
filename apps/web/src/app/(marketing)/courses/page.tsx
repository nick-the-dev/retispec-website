import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courses",
  description: "RetiSpec educational courses.",
};

export default function CoursesPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold tracking-tight">Courses</h1>
      <p className="mt-4 text-lg text-gray-600">Content coming soon.</p>
    </main>
  );
}
