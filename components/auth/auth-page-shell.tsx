import Link from "next/link";

import { Logo } from "@/components/layout/logo";


export function AuthPageShell({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-5 py-12 sm:px-8">
      <section className="w-full max-w-md">
        <Link href="/" aria-label="CirWork home" className="mb-10 inline-flex">
          <Logo />
        </Link>
        <p className="text-sm font-bold tracking-[0.14em] text-blue-600 uppercase">
          {eyebrow}
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-[-0.04em] text-slate-950">
          {title}
        </h1>
        <p className="mt-3 text-base leading-7 text-slate-600">{description}</p>
        <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
          {children}
        </div>
      </section>
    </main>
  );
}
