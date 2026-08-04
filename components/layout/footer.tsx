import Link from "next/link";

import { Logo } from "@/components/layout/logo";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-10 sm:px-8 md:flex-row md:items-end md:justify-between lg:px-10">
        <div>
          <Link href="/" aria-label="JSP home">
            <Logo />
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-slate-500">
            Better matches, clearer next steps, and support for the whole journey.
          </p>
        </div>

        <div className="flex flex-col gap-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:gap-7">
          <Link href="#how-it-works" className="transition-colors hover:text-primary">
            How it works
          </Link>
          <Link href="#features" className="transition-colors hover:text-primary">
            Features
          </Link>
          <span>© {new Date().getFullYear()} JSP</span>
        </div>
      </div>
    </footer>
  );
}
