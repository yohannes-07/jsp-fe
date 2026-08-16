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
      <div className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-5xl gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:px-10">
          <nav
            aria-label="Support categories"
            className="grid grid-cols-2 gap-x-6 gap-y-1 sm:grid-cols-3"
          >
            {supportCategories.map((category) => (
              <Link
                key={category}
                href="/assistants/support"
                className="border-b border-slate-200 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-600 hover:text-blue-700"
              >
                {category}
              </Link>
            ))}
          </nav>

          <div>
            <p className="text-sm font-bold text-blue-700">Support Beyond the Application</p>
            <h2 className="mt-3 text-2xl font-bold tracking-[-0.03em] text-slate-950">
              Support for life around work
            </h2>
            <p className="mt-3 leading-7 text-slate-600">
              Find practical resources that can make searching for work and moving forward easier.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
        <div className="max-w-sm">
          <Link href="/" aria-label="CirWork home">
            <Logo />
          </Link>
          <p className="mt-3 text-sm text-slate-500">
            Find work that fits you.
          </p>
        </div>
        <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
          <Link href="/jobs" className="text-slate-600 hover:text-blue-700">Find jobs</Link>
          <Link href="/auth/signup?role=recruiter" className="text-slate-600 hover:text-blue-700">For recruiters</Link>
          <Link href="/auth/login" className="text-slate-600 hover:text-blue-700">Log in</Link>
          <Link href="/auth/signup" className="text-slate-600 hover:text-blue-700">Sign up</Link>
        </nav>
      </div>
      <div className="border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-5 py-5 text-sm text-slate-500 sm:px-8 lg:px-10">
          © {new Date().getFullYear()} CirWork
        </div>
      </div>
    </footer>
  );
}
