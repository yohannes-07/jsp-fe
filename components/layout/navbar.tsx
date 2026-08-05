import Link from "next/link";

import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/jobs", label: "Find jobs" },
  { href: "#ai-tools", label: "AI career tools" },
  { href: "#for-employers", label: "For employers" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link href="/" aria-label="JSP home">
          <span className="sm:hidden">
            <Logo compact />
          </span>
          <span className="hidden sm:inline-flex">
            <Logo />
          </span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <Button
            asChild
            variant="ghost"
            className="hidden h-10 px-3 text-slate-700 lg:inline-flex"
          >
            <Link href="/auth/login">Log in</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="hidden h-10 rounded-xl border-blue-200 px-4 text-blue-700 sm:inline-flex"
          >
            <Link href="/auth/signup">Sign up</Link>
          </Button>
          <Button asChild className="h-10 rounded-xl px-3.5 sm:px-5">
            <Link href="/auth/signup?role=recruiter">Post a job</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
