import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="text-center">
        <span className="font-heading text-8xl font-bold text-primary/20">
          404
        </span>
        <h1 className="mt-4 font-heading text-3xl font-bold text-heading">
          Page Not Found
        </h1>
        <p className="mt-3 text-body">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>
      </div>
    </section>
  );
}
