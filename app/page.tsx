import { ArrowRight } from "lucide-react";
import Link from "next/link";
export default function Page() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* --- HERO SECTION --- */}
      <header className="relative overflow-hidden py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          {/* Tagline Announcement */}
          <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 ring-1 ring-inset ring-indigo-700/10 mb-6">
            Next-Gen School Management
          </span>

          <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
            Simplify administration, empower teachers, and engage parents.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            The all-in-one platform for modern schools. Handle grading,
            attendance, scheduling, and communication effortlessly from a
            unified dashboard.
          </p>

          {/* TWO PRIMARY CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth/login" className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-base font-semibold text-white shadow-md hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition">
              Get Started for Free
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}
