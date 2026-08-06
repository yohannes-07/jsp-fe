import Link from "next/link";
import { Check } from "lucide-react";

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
    <main className="grid min-h-screen bg-slate-50 lg:grid-cols-[0.9fr_1.1fr]">
      <section className="hidden bg-slate-950 p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <Link href="/" aria-label="JSP home">
          <Logo className="[&_span_span]:text-white" />
        </Link>
        <div className="max-w-lg">
          <p className="text-sm font-bold tracking-[0.16em] text-blue-300 uppercase">
            A clearer path forward
          </p>
          <h2 className="mt-5 text-4xl font-bold tracking-[-0.04em]">
            Better matches begin with understanding what matters.
          </h2>
          <ul className="mt-8 space-y-4 text-slate-300">
            {["Search beyond exact keywords", "Get guidance shaped around you", "Move forward with practical support"].map(
              (item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="grid size-6 place-items-center rounded-full bg-blue-500/15 text-blue-300">
                    <Check aria-hidden="true" className="size-3.5" />
                  </span>
                  {item}
                </li>
              ),
            )}
          </ul>
        </div>
        <p className="text-sm text-slate-500">JSP · Find work that fits</p>
      </section>

      <section className="flex items-center justify-center px-5 py-12 sm:px-8">
        <div className="w-full max-w-md">
          <Link href="/" aria-label="JSP home" className="mb-10 inline-flex lg:hidden">
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
        </div>
      </section>
    </main>
  );
}
