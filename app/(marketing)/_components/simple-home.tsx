import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin, Search, UsersRound } from "lucide-react";

import { AiQueryInput } from "@/components/search/ai-query-input";
import { Button } from "@/components/ui/button";

const workNatureOptions = [
  ["Professional", "professional"],
  ["Fractional", "fractional"],
  ["Tech", "tech"],
  ["Gig economy", "gig-economy"],
  ["Blue collar", "blue-collar"],
  ["Manual labor", "manual-labor"],
  ["Long-term", "long-term"],
  ["Short-term", "short-term"],
] as const;


export function SimpleHero() {
  return (
    <section className="relative isolate overflow-hidden bg-white">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_15%,rgba(37,99,235,0.09),transparent_45%)]"
      />
      <div className="mx-auto max-w-3xl px-5 py-20 text-center sm:px-8 sm:py-28">
        <h1 className="text-5xl leading-[1.05] font-bold tracking-[-0.055em] text-slate-950 sm:text-6xl">
          Find work that fits <span className="text-primary">you.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-slate-600">
          Tell us what you are looking for and CirWork will help you find the right place to start and the right supports to help you thrive in your role.
        </p>
        <AiQueryInput
          className="mx-auto mt-8 max-w-2xl text-left"
          placeholder="Describe the job you are looking for"
        />
        <Link
          href="#job-search"
          className="mt-5 inline-block text-sm font-semibold text-blue-700 hover:underline"
        >
          Or search by job title and location
        </Link>
      </div>
    </section>
  );
}

export function SimpleJobSearch() {
  return (
    <section
      id="job-search"
      className="scroll-mt-24 border-t border-slate-200 bg-slate-50 py-14 sm:py-18"
    >
      <div className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-10">
        <h2 className="text-3xl font-bold tracking-[-0.04em] text-slate-950 sm:text-4xl">
          Search jobs
        </h2>
        <p className="mt-3 text-base text-slate-600">Choose the kind of work that fits your life.</p>
        <nav aria-label="Browse by nature of work" className="mt-5 flex flex-wrap gap-2">
          {workNatureOptions.map(([label, value]) => (
            <Link
              key={value}
              href={`/jobs?nature_of_work=${value}`}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
            >
              {label}
            </Link>
          ))}
        </nav>
        <form
          action="/jobs"
          method="get"
          className="mt-7 grid gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4 lg:grid-cols-[1.25fr_0.85fr_auto]"
        >
          <label className="relative block">
            <span className="sr-only">Job title, keyword, or company</span>
            <Search
              aria-hidden="true"
              className="absolute top-1/2 left-4 size-5 -translate-y-1/2 text-slate-500"
            />
            <input
              type="search"
              name="q"
              placeholder="Job title, keyword, or company"
              className="h-14 w-full rounded-xl border border-slate-300 bg-white pr-4 pl-12 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-3 focus:ring-blue-100"
            />
          </label>
          <label className="relative block">
            <span className="sr-only">Location</span>
            <MapPin
              aria-hidden="true"
              className="absolute top-1/2 left-4 size-5 -translate-y-1/2 text-slate-500"
            />
            <input
              type="search"
              name="location"
              placeholder="City, region, or remote"
              className="h-14 w-full rounded-xl border border-slate-300 bg-white pr-4 pl-12 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-3 focus:ring-blue-100"
            />
          </label>
          <Button type="submit" size="lg" className="h-14 rounded-xl px-7 text-base font-bold">
            Search Jobs
          </Button>
        </form>
      </div>
    </section>
  );
}

const recruiterBenefits = [
  "Identify talent",
  "Attract talent",
  "Support talent",
  "Retain talent",
  "Create value and achieve company strategy through talent",
];

export function SimpleRecruiterSection() {
  return (
    <section className="bg-slate-950 py-16 text-white sm:py-20">
      <div className="mx-auto grid max-w-5xl gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:px-10">
        <div>
          <span className="inline-flex items-center gap-2 text-sm font-bold tracking-[0.14em] text-blue-300 uppercase">
            <UsersRound aria-hidden="true" className="size-4" />
            For recruiters
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
            Build a talent strategy that moves the business forward.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-slate-300">
            CirWork brings the essential parts of finding, supporting, and retaining people into one focused workspace.
          </p>
          <Button asChild className="mt-7 h-11 rounded-xl bg-white px-5 text-slate-950 hover:bg-blue-50">
            <Link href="/auth/signup?role=recruiter">
              Start building your talent plan
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        </div>
        <ul className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
          {recruiterBenefits.map((benefit) => (
            <li key={benefit} className="flex gap-3 rounded-xl bg-white/5 px-4 py-3 text-sm leading-6 text-slate-100">
              <CheckCircle2 aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-blue-300" />
              {benefit}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
