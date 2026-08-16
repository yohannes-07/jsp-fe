import Link from "next/link";
import { Menu } from "lucide-react";

import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";

const audienceItems = [
  { href: "#job-seekers", label: "Job Seekers", active: true },
  { href: "#for-employers", label: "Recruiters", active: false },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link href="/" aria-label="CirWork home">
          <Logo compact />
        </Link>

        <nav
          aria-label="Choose your CirWork experience"
          className="hidden items-center rounded-xl border border-slate-200 bg-slate-50 p-1 md:flex"
        >
          {audienceItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={item.active ? "page" : undefined}
              className={
                item.active
                  ? "rounded-lg bg-white px-4 py-2 text-sm font-bold text-blue-700 shadow-sm ring-1 ring-slate-200/70"
                  : "rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-white hover:text-slate-950"
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <Button asChild variant="ghost" className="hidden h-10 px-3 text-slate-700 lg:inline-flex">
            <Link href="/auth/login">Log in</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="hidden h-10 rounded-xl border-blue-200 px-4 text-blue-700 sm:inline-flex"
          >
            <Link href="/auth/signup">Sign up</Link>
          </Button>
          <Button asChild className="hidden h-10 rounded-xl px-5 sm:inline-flex">
            <Link href="/auth/signup?role=recruiter">Post a job</Link>
          </Button>

          <details className="group relative md:hidden">
            <summary className="grid size-10 cursor-pointer list-none place-items-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-50 [&::-webkit-details-marker]:hidden">
              <Menu aria-hidden="true" className="size-5" />
              <span className="sr-only">Open navigation</span>
            </summary>
            <div className="absolute top-12 right-0 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-950/10">
              <p className="px-3 py-2 text-xs font-bold tracking-wider text-slate-400 uppercase">
                Choose your path
              </p>
              {audienceItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={
                    item.active
                      ? "block rounded-xl bg-blue-50 px-3 py-2.5 text-sm font-bold text-blue-700"
                      : "block rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  }
                >
                  {item.label}
                </Link>
              ))}
              <div className="my-2 border-t border-slate-100" />
              <Link href="/auth/login" className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                Log in
              </Link>
              <Link href="/auth/signup" className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                Create account
              </Link>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
