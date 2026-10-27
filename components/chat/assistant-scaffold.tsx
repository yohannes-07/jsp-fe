import Link from "next/link";
import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";


export function AssistantScaffold({
  name,
  description,
  examples,
  actionHref,
  actionLabel,
}: {
  name: string;
  description: string;
  examples: string[];
  actionHref?: string;
  actionLabel?: string;
}) {
  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <PageHeader eyebrow="AI assistant" title={name} description={description} />
      <div className="grid gap-5 lg:grid-cols-[1fr_0.75fr]">
        <section className="rounded-2xl bg-white p-6 ring-1 ring-slate-200 sm:p-8">
          <span className="grid size-12 place-items-center rounded-2xl bg-blue-50 text-blue-700">
            <MessageCircle aria-hidden="true" className="size-5" />
          </span>
          <h2 className="mt-6 text-xl font-bold text-slate-950">Your conversation</h2>
          <p className="mt-2 max-w-lg text-sm leading-6 text-slate-600">
            Describe the opportunity you want and CirWork will turn it into a personalized hybrid job search.
          </p>
          {actionHref && actionLabel && (
            <Button asChild className="mt-6 h-11 rounded-xl">
              <Link href={actionHref}>
                {actionLabel}
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          )}
        </section>
        <aside className="rounded-2xl bg-slate-950 p-6 text-white sm:p-8">
          <div className="flex items-center gap-2 text-sm font-semibold text-blue-300">
            <Sparkles aria-hidden="true" className="size-4" />
            Searches to explore
          </div>
          <ul className="mt-6 space-y-3">
            {examples.map((example) => (
              <li key={example}>
                <Link
                  href={`/jobs?q=${encodeURIComponent(example)}&mode=hybrid&page=1`}
                  className="block rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm leading-6 text-slate-200 transition hover:bg-white/10"
                >
                  {example}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
