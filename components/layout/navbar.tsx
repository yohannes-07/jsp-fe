import Link from "next/link";
import { BriefcaseBusiness, LogIn, Menu, Search, UserPlus } from "lucide-react";

import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";

const audienceItems = [
  {
    href: "#job-search",
    label: "Job Seekers",
    description: "Find your next role",
    icon: Search,
  },
  {
    href: "/auth/signup?role=recruiter",
    label: "Recruiters",
    description: "Build your talent plan",
    icon: BriefcaseBusiness,
  },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
        <Link href="/" aria-label="CirWork home">
          <Logo compact />
        </Link>

        <nav
          aria-label="Choose your CirWork experience"
          className="hidden items-center rounded-2xl bg-slate-100 p-1.5 md:flex"
        >
          {audienceItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-base font-bold text-slate-700 transition hover:bg-white hover:text-blue-700 hover:shadow-sm"
              >
                <Icon aria-hidden="true" className="size-4 text-blue-600" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="outline"
            className="hidden h-11 rounded-xl border-slate-300 px-4 text-base font-bold text-slate-700 lg:inline-flex"
          >
            <Link href="/auth/login">
              <LogIn aria-hidden="true" />
              Log in
            </Link>
          </Button>
          <Button asChild className="hidden h-11 rounded-xl px-5 text-base font-bold sm:inline-flex">
            <Link href="/auth/signup">
              <UserPlus aria-hidden="true" />
              Sign up
            </Link>
          </Button>

          <details className="group relative md:hidden">
            <summary className="grid size-11 cursor-pointer list-none place-items-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-50 [&::-webkit-details-marker]:hidden">
              <Menu aria-hidden="true" className="size-5" />
              <span className="sr-only">Open navigation</span>
            </summary>
            <div className="absolute top-13 right-0 w-72 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl shadow-slate-950/10">
              {audienceItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 rounded-xl px-3 py-3 text-slate-700 hover:bg-blue-50 hover:text-blue-700"
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-700">
                      <Icon aria-hidden="true" className="size-5" />
                    </span>
                    <span>
                      <span className="block text-sm font-bold">{item.label}</span>
                      <span className="mt-0.5 block text-xs font-medium text-slate-500">
                        {item.description}
                      </span>
                    </span>
                  </Link>
                );
              })}
              <div className="my-2 border-t border-slate-100" />
              <Link
                href="/auth/login"
                className="block rounded-xl px-3 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50"
              >
                Log in
              </Link>
              <Link
                href="/auth/signup"
                className="mt-1 block rounded-xl bg-blue-600 px-3 py-2.5 text-center text-sm font-bold text-white hover:bg-blue-700"
              >
                Create account
              </Link>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
