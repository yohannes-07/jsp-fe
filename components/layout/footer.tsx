import Link from "next/link";

import { Logo } from "@/components/layout/logo";

const supportCategories = [
  "Training",
  "Housing",
  "Childcare",
  "Transportation",
  "Benefits",
  "Resume Coaching",
  "Mental Health",
  "Health & Wellness",
  "Personal Development",
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[0.75fr_1.2fr_0.9fr] lg:px-10 lg:py-16">
        <div>
          <Link
            href="/"
            aria-label="CirWork home"
            className="inline-flex"
          >
            <Logo />
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-6 text-slate-500">
            Find work that fits you—and the support that helps you thrive once you get there.
          </p>
        </div>

        <div>
          <p className="text-xs font-bold tracking-[0.14em] text-blue-700 uppercase">
            Practical support
          </p>
          <nav
            aria-label="Support categories"
            className="mt-4 grid grid-cols-2 gap-x-6 gap-y-1 sm:grid-cols-3"
          >
            {supportCategories.map((category) => (
              <Link
                key={category}
                href="/assistants/support"
                className="border-b border-slate-200 py-3 text-sm font-semibold text-slate-600 transition hover:border-blue-600 hover:text-blue-700"
              >
                {category}
              </Link>
            ))}
          </nav>
        </div>

        <div className="self-start rounded-2xl border border-blue-100 bg-blue-50 p-6">
          <p className="text-xs font-bold tracking-[0.14em] text-blue-700 uppercase">
            Support Beyond the Application
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-[-0.03em] text-slate-950">
            Support for life around work
          </h2>
          <p className="mt-3 leading-7 text-slate-600">
            Find practical resources that can make searching for work and moving forward easier.
          </p>
          <Link
            href="/assistants/support"
            className="mt-5 inline-flex rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700"
          >
            Explore support resources
          </Link>
        </div>
      </div>

      <div className="border-t border-slate-100">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-6 text-sm text-slate-500 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
          <span>© {new Date().getFullYear()} CirWork</span>
          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap gap-x-6 gap-y-3 font-semibold"
          >
            <Link href="/jobs" className="hover:text-blue-700">Find jobs</Link>
            <Link href="/auth/signup?role=recruiter" className="hover:text-blue-700">For recruiters</Link>
            <Link href="/auth/login" className="hover:text-blue-700">Log in</Link>
            <Link href="/auth/signup" className="hover:text-blue-700">Sign up</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
