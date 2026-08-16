import Link from "next/link";

import { Logo } from "@/components/layout/logo";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
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
