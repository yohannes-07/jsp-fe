import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BriefcaseBusiness, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Job } from "@/lib/types";

const workNatureLabels: Record<string, string> = {
  professional: "Professional",
  fractional: "Fractional",
  tech: "Tech",
  "gig-economy": "Gig economy",
  "blue-collar": "Blue collar",
  "manual-labor": "Manual labor",
  "data-centers": "Data Centers",
  "long-term": "Long-term",
  "short-term": "Short-term",
};


async function loadJob(id: string): Promise<Job | null> {
  const baseUrl =
    process.env.API_BASE_URL ??
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    "http://localhost:8000/api/v1";
  const response = await fetch(
    baseUrl.replace(/\/$/, "") + "/jobs/" + encodeURIComponent(id),
    { cache: "no-store" },
  );
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`Unable to load job (${response.status})`);
  return response.json() as Promise<Job>;
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const job = await loadJob(id);
  if (!job) notFound();

  const salary =
    job.salary_min !== null && job.salary_max !== null
      ? "$" + job.salary_min.toLocaleString() + " – $" + job.salary_max.toLocaleString()
      : "Salary not listed";

  return (
    <div className="mx-auto max-w-4xl">
      <Link
        href="/jobs"
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-700"
      >
        <ArrowLeft aria-hidden="true" className="size-4" />
        Back to jobs
      </Link>
      <article className="mt-6 rounded-2xl bg-white p-6 ring-1 ring-slate-200 sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
          <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-blue-50 text-blue-700">
            <BriefcaseBusiness aria-hidden="true" className="size-6" />
          </span>
          <div className="flex-1">
            <span className="rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700">
              {job.job_type}
            </span>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
              {job.title}
            </h1>
            <p className="mt-2 text-base text-slate-600">
              {job.recruiter.company_name ?? job.recruiter.full_name}
            </p>
            <div className="mt-5 flex flex-wrap gap-5 text-sm text-slate-600">
              <span className="inline-flex items-center gap-1.5">
                <MapPin aria-hidden="true" className="size-4 text-blue-600" />
                {job.location}
              </span>
              <span className="font-semibold text-slate-800">{salary}</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {job.nature_of_work.map((nature) => (
                <span key={nature} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                  {workNatureLabels[nature] ?? nature}
                </span>
              ))}
            </div>
          </div>
          <Button asChild className="h-11 rounded-xl px-6">
            <Link href="/assistants/job-discovery">Ask about this role</Link>
          </Button>
        </div>
        <div className="mt-8 grid gap-8 border-t border-slate-100 pt-8">
          <section>
            <h2 className="text-lg font-bold text-slate-950">About the role</h2>
            <p className="mt-3 whitespace-pre-line text-base leading-7 text-slate-600">
              {job.description}
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-slate-950">What you&apos;ll need</h2>
            <p className="mt-3 whitespace-pre-line text-base leading-7 text-slate-600">
              {job.requirements}
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}
