import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Baby,
  Brain,
  BrainCircuit,
  BriefcaseBusiness,
  Bus,
  Check,
  ChevronRight,
  Compass,
  FileText,
  GraduationCap,
  HandCoins,
  House,
  MapPin,
  Search,
  Send,
  Sparkles,
  UserRoundSearch,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const jobSeekerSteps = [
  {
    icon: Search,
    title: "Search your way",
    description:
      "Use a role, skill, location, or a natural-language request to describe what fits.",
  },
  {
    icon: Sparkles,
    title: "Understand every match",
    description:
      "See opportunities chosen around your experience, preferences, and goals.",
  },
  {
    icon: Compass,
    title: "Take the next step",
    description:
      "Improve your resume, explore career paths, and get practical support as you apply.",
  },
];

const recruiterSteps = [
  {
    icon: BriefcaseBusiness,
    title: "Publish the opportunity",
    description:
      "Create a clear job listing with the requirements candidates need to understand.",
  },
  {
    icon: UserRoundSearch,
    title: "Find relevant candidates",
    description:
      "Search resumes by meaning, skills, and experience instead of exact keywords alone.",
  },
  {
    icon: BrainCircuit,
    title: "Evaluate with context",
    description:
      "Use the recruiter assistant to explore candidate fit against the role requirements.",
  },
];

const assistantCapabilities = [
  {
    icon: Search,
    title: "Job discovery",
    description: "Describe what you want and discover roles that truly fit.",
  },
  {
    icon: FileText,
    title: "Resume guidance",
    description: "Suggestions based on your resume and relevant job requirements.",
  },
  {
    icon: Compass,
    title: "Career direction",
    description: "Career-path guidance informed by real job and skill data.",
  },
];

const featuredJobs = [
  {
    title: "Product Operations Lead",
    company: "Northstar Labs",
    location: "Remote",
    type: "Full-time",
    salary: "$110k–$135k",
    match: "94% match",
  },
  {
    title: "Customer Success Manager",
    company: "Everwell Health",
    location: "Hybrid",
    type: "Full-time",
    salary: "$82k–$98k",
    match: "88% match",
  },
  {
    title: "Program Coordinator",
    company: "BrightPath Services",
    location: "On-site",
    type: "Contract",
    salary: "$32–$40/hr",
    match: "85% match",
  },
];

const supportCategories = [
  { icon: GraduationCap, label: "Training", color: "bg-blue-50 text-blue-700" },
  { icon: House, label: "Housing", color: "bg-indigo-50 text-indigo-700" },
  { icon: Baby, label: "Childcare", color: "bg-cyan-50 text-cyan-700" },
  { icon: Bus, label: "Transportation", color: "bg-sky-50 text-sky-700" },
  { icon: HandCoins, label: "Benefits", color: "bg-violet-50 text-violet-700" },
  { icon: FileText, label: "Resume coaching", color: "bg-blue-50 text-blue-700" },
  { icon: Brain, label: "Mental health", color: "bg-cyan-50 text-cyan-700" },
];

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden border-b border-slate-100 bg-white">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-[42rem] bg-[radial-gradient(circle_at_78%_18%,rgba(37,99,235,0.13),transparent_32%),radial-gradient(circle_at_16%_30%,rgba(14,165,233,0.08),transparent_28%)]"
      />
      <div className="mx-auto max-w-7xl px-5 pt-8 sm:px-8 lg:px-10">
        <div className="inline-flex rounded-xl border border-slate-200 bg-white p-1 text-sm shadow-sm">
          <Link
            href="#job-seekers"
            className="rounded-lg bg-blue-50 px-4 py-2 font-semibold text-blue-700"
          >
            I&apos;m looking for work
          </Link>
          <Link
            href="#for-employers"
            className="rounded-lg px-4 py-2 font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
          >
            I&apos;m hiring
          </Link>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1.04fr_0.96fr] lg:gap-16 lg:px-10 lg:py-24">
        <div className="max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-2 text-xs font-semibold tracking-wide text-blue-700 uppercase">
            <Sparkles aria-hidden="true" className="size-3.5" />
            Ask, don&apos;t just search
          </div>
          <h1 className="text-5xl leading-[1.04] font-bold tracking-[-0.055em] text-slate-950 sm:text-6xl lg:text-[4.45rem]">
            Find work that fits{" "}
            <span className="text-primary">the whole you.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 sm:text-xl">
            Search naturally, discover better-fit roles, and get personalized AI guidance from first question to next step.
          </p>

          <form
            action="/jobs"
            method="get"
            className="mt-8 rounded-2xl border border-slate-200 bg-white p-2.5 shadow-xl shadow-blue-950/8"
          >
            <div className="grid gap-2 md:grid-cols-[1fr_0.72fr_auto]">
              <label className="flex h-13 items-center gap-3 rounded-xl px-3 focus-within:bg-slate-50">
                <Search aria-hidden="true" className="size-5 shrink-0 text-blue-600" />
                <span className="sr-only">Job title, skill, or keyword</span>
                <input
                  type="search"
                  name="q"
                  placeholder="Job title, skill, or keywords"
                  className="min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                />
              </label>
              <label className="flex h-13 items-center gap-3 rounded-xl border-t border-slate-100 px-3 focus-within:bg-slate-50 md:border-t-0 md:border-l">
                <MapPin aria-hidden="true" className="size-5 shrink-0 text-blue-600" />
                <span className="sr-only">Location</span>
                <input
                  type="search"
                  name="location"
                  placeholder="Location or remote"
                  className="min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                />
              </label>
              <Button type="submit" className="h-13 rounded-xl px-6 text-base">
                Search jobs
              </Button>
            </div>
          </form>

          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-600">
            {[
              "Matches beyond keywords",
              "Guidance for every step",
              "Built for job seekers and teams",
            ].map((item) => (
              <span key={item} className="inline-flex items-center gap-2">
                <span className="grid size-5 place-items-center rounded-full bg-blue-100 text-blue-700">
                  <Check aria-hidden="true" className="size-3" strokeWidth={3} />
                </span>
                {item}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-12 rounded-xl px-6 text-base">
              <Link href="/auth/signup">
                Create a job-seeker profile
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 rounded-xl border-slate-300 px-6 text-base text-slate-700"
            >
              <Link href="/auth/signup?role=recruiter">Start hiring</Link>
            </Button>
          </div>
        </div>

        <div
          data-asset-replacement="/images/landing/hero-job-seeker.webp"
          className="relative mx-auto w-full max-w-xl lg:mx-0 lg:ml-auto"
        >
          <div
            aria-hidden="true"
            className="absolute -inset-5 -z-10 rounded-[2.5rem] bg-blue-100/60 blur-2xl"
          />
          <div className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-2xl shadow-blue-950/10 sm:p-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-5">
              <div>
                <p className="text-xs font-semibold tracking-[0.14em] text-blue-600 uppercase">
                  Personalized discovery
                </p>
                <p className="mt-1 text-lg font-bold tracking-tight text-slate-900">
                  A role worth exploring
                </p>
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                Strong match
              </span>
            </div>

            <div className="mt-5 rounded-2xl border-2 border-blue-200 bg-blue-50/50 p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-3.5">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-blue-600 text-white shadow-sm">
                    <BriefcaseBusiness aria-hidden="true" className="size-5" />
                  </span>
                  <div>
                    <p className="font-bold text-slate-950">Product Operations Lead</p>
                    <p className="mt-1 text-sm text-slate-600">Northstar Labs</p>
                  </div>
                </div>
                <span className="rounded-lg bg-blue-600 px-2.5 py-1.5 text-xs font-bold text-white">
                  94%
                </span>
              </div>
              <div className="mt-5 flex flex-wrap gap-2 text-xs font-medium text-slate-600">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-white px-2.5 py-1.5 ring-1 ring-slate-200">
                  <MapPin aria-hidden="true" className="size-3.5 text-blue-600" />
                  Remote
                </span>
                <span className="rounded-lg bg-white px-2.5 py-1.5 ring-1 ring-slate-200">
                  Full-time
                </span>
                <span className="rounded-lg bg-white px-2.5 py-1.5 ring-1 ring-slate-200">
                  $110k–$135k
                </span>
              </div>
              <div className="mt-5 border-t border-blue-100 pt-4">
                <p className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                  <Sparkles aria-hidden="true" className="size-4 text-blue-600" />
                  Why this fits
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Your cross-functional leadership and process-design experience align strongly with this role.
                </p>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3">
              {[
                ["Customer Success", "88% match"],
                ["Program Manager", "85% match"],
              ].map(([role, match]) => (
                <div key={role} className="rounded-xl border border-slate-200 p-3.5">
                  <p className="text-sm font-semibold text-slate-800">{role}</p>
                  <p className="mt-2 text-xs font-semibold text-blue-600">{match}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-24 bg-slate-50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold tracking-[0.16em] text-blue-600 uppercase">
            Two paths, one platform
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-[-0.04em] text-slate-950 sm:text-4xl">
            Useful on both sides of the match
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Job seekers get clarity and support. Recruiters get better ways to discover relevant candidates.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <AudienceTrack
            id="job-seekers"
            eyebrow="For job seekers"
            title="Find your next opportunity"
            steps={jobSeekerSteps}
            cta="Create your profile"
            href="/auth/signup"
          />
          <AudienceTrack
            id="recruiters"
            eyebrow="For recruiters"
            title="Find people who fit the work"
            steps={recruiterSteps}
            cta="Create a recruiter account"
            href="/auth/signup?role=recruiter"
            recruiter
          />
        </div>
      </div>
    </section>
  );
}

export function VisualStorySection() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm font-bold tracking-[0.16em] text-blue-600 uppercase">
            Your journey, supported
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-[-0.04em] text-slate-950 sm:text-4xl">
            Opportunity starts with the right connection
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Find meaningful work, build stronger teams, and move forward with support that meets real life.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-[1.35fr_0.65fr]">
          <VisualStoryCard
            src="/images/landing/job-seeker-journey.svg"
            alt="Job seeker exploring new career opportunities"
            label="For job seekers"
            title="Move toward work that feels right"
            className="min-h-[26rem] md:row-span-2 lg:min-h-[34rem]"
            priority
          />
          <VisualStoryCard
            src="/images/landing/recruiter-team.svg"
            alt="Recruiter building a strong team"
            label="For employers"
            title="Meet people ready to make an impact"
            className="min-h-[16rem]"
          />
          <VisualStoryCard
            src="/images/landing/support-community.svg"
            alt="Community members accessing practical support"
            label="Beyond the job search"
            title="Get support for the journey around work"
            className="min-h-[16rem]"
          />
        </div>
      </div>
    </section>
  );
}

type VisualStoryCardProps = {
  src: string;
  alt: string;
  label: string;
  title: string;
  className?: string;
  priority?: boolean;
};

function VisualStoryCard({
  src,
  alt,
  label,
  title,
  className,
  priority = false,
}: VisualStoryCardProps) {
  return (
    <article
      className={cn(
        "group relative isolate overflow-hidden rounded-[1.75rem] bg-slate-900",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 720px"
        className="object-cover transition duration-700 group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-950/15 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
        <p className="text-xs font-bold tracking-[0.16em] text-blue-200 uppercase">
          {label}
        </p>
        <h3 className="mt-2 max-w-md text-2xl font-bold tracking-tight">{title}</h3>
      </div>
    </article>
  );
}

type AudienceTrackProps = {
  id: string;
  eyebrow: string;
  title: string;
  steps: typeof jobSeekerSteps;
  cta: string;
  href: string;
  recruiter?: boolean;
};

function AudienceTrack({
  id,
  eyebrow,
  title,
  steps,
  cta,
  href,
  recruiter = false,
}: AudienceTrackProps) {
  return (
    <div
      id={id}
      className={cn(
        "scroll-mt-28 rounded-3xl border p-6 sm:p-8",
        recruiter
          ? "border-blue-900 bg-slate-950 text-white"
          : "border-slate-200 bg-white text-slate-950",
      )}
    >
      <p
        className={cn(
          "text-sm font-bold tracking-[0.14em] uppercase",
          recruiter ? "text-blue-300" : "text-blue-600",
        )}
      >
        {eyebrow}
      </p>
      <h3 className="mt-3 text-2xl font-bold tracking-tight">{title}</h3>
      <ol className="mt-8 space-y-7">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <li key={step.title} className="flex gap-4">
              <span
                className={cn(
                  "grid size-11 shrink-0 place-items-center rounded-2xl",
                  recruiter
                    ? "bg-blue-500/15 text-blue-300"
                    : "bg-blue-50 text-blue-700",
                )}
              >
                <Icon aria-hidden="true" className="size-5" />
              </span>
              <div>
                <p
                  className={cn(
                    "text-xs font-bold tracking-wider uppercase",
                    recruiter ? "text-slate-500" : "text-slate-400",
                  )}
                >
                  Step {index + 1}
                </p>
                <p className="mt-1 font-bold">{step.title}</p>
                <p
                  className={cn(
                    "mt-1.5 text-sm leading-6",
                    recruiter ? "text-slate-300" : "text-slate-600",
                  )}
                >
                  {step.description}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
      <Button
        asChild
        variant={recruiter ? "secondary" : "outline"}
        className={cn(
          "mt-8 h-11 rounded-xl px-5",
          recruiter && "bg-white text-slate-950 hover:bg-blue-50",
        )}
      >
        <Link href={href}>
          {cta}
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </Button>
    </div>
  );
}

export function AiShowcase() {
  return (
    <section id="ai-tools" className="scroll-mt-24 bg-white py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:px-10">
        <div>
          <p className="text-sm font-bold tracking-[0.16em] text-blue-600 uppercase">
            AI career tools
          </p>
          <h2 className="mt-4 max-w-xl text-3xl font-bold tracking-[-0.04em] text-slate-950 sm:text-4xl">
            Ask a real question. Get a useful next step.
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
            Get answers shaped around your goals, experience, and the opportunities available to you.
          </p>

          <div className="mt-9 space-y-5">
            {assistantCapabilities.map((capability) => {
              const Icon = capability.icon;
              return (
                <div key={capability.title} className="flex gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-blue-50 text-blue-700">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-bold text-slate-900">{capability.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      {capability.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <Button asChild variant="outline" className="mt-9 h-11 rounded-xl px-5">
            <Link href="/assistants/job-discovery">
              Explore the job-discovery assistant
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </Button>
        </div>

        <div
          data-asset-replacement="/images/landing/ai-assistant.webp"
          className="rounded-[2rem] bg-slate-950 p-4 shadow-2xl shadow-blue-950/15 sm:p-6"
        >
          <div className="overflow-hidden rounded-2xl bg-white">
            <div className="flex items-center gap-3 border-b border-slate-200 px-5 py-4">
              <span className="grid size-9 place-items-center rounded-xl bg-blue-600 text-white">
                <Sparkles aria-hidden="true" className="size-4" />
              </span>
              <div>
                <p className="text-sm font-bold text-slate-900">Job Discovery Assistant</p>
                <p className="text-xs text-emerald-600">Ready to help</p>
              </div>
            </div>
            <div className="space-y-5 bg-slate-50 p-5 sm:p-6">
              <div className="ml-auto max-w-[88%] rounded-2xl rounded-br-md bg-blue-600 px-4 py-3 text-sm leading-6 text-white">
                Find remote data roles where my operations experience is useful. I do not have a computer-science degree.
              </div>
              <div className="max-w-[92%] rounded-2xl rounded-bl-md bg-white px-4 py-4 text-sm leading-6 text-slate-700 shadow-sm ring-1 ring-slate-200">
                <p>
                  Your operations background aligns well with analytics translator, data operations, and implementation roles. I found matches that emphasize process and stakeholder skills.
                </p>
                <div className="mt-4 space-y-2">
                  {["Data Operations Specialist", "Implementation Analyst"].map(
                    (role) => (
                      <div
                        key={role}
                        className="flex items-center justify-between rounded-xl bg-blue-50 px-3 py-2.5"
                      >
                        <span className="font-semibold text-slate-900">{role}</span>
                        <ChevronRight
                          aria-hidden="true"
                          className="size-4 text-blue-600"
                        />
                      </div>
                    ),
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-2">
                <span className="flex-1 px-2 text-sm text-slate-400">
                  Ask a follow-up question...
                </span>
                <span className="grid size-9 place-items-center rounded-lg bg-blue-600 text-white">
                  <Send aria-hidden="true" className="size-4" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function JobsPreview() {
  return (
    <section className="bg-slate-50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-bold tracking-[0.16em] text-blue-600 uppercase">
              Explore opportunities
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-[-0.04em] text-slate-950 sm:text-4xl">
              Start with the kind of work you want
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Discover roles selected around your skills, preferences, and ambitions.
            </p>
          </div>
          <Button asChild variant="outline" className="h-11 self-start rounded-xl px-5 lg:self-auto">
            <Link href="/jobs">
              Browse all jobs
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {[
            ["All roles", ""],
            ["Remote", "remote"],
            ["Full-time", "full-time"],
            ["Part-time", "part-time"],
            ["Contract", "contract"],
          ].map(([label, value], index) => (
            <Link
              key={label}
              href={value ? "/jobs?job_type=" + value : "/jobs"}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold transition",
                index === 0
                  ? "bg-blue-600 text-white"
                  : "bg-white text-slate-600 ring-1 ring-slate-200 hover:text-blue-700 hover:ring-blue-200",
              )}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {featuredJobs.map((job) => (
            <Card
              key={job.title}
              className="gap-0 border-0 bg-white py-0 ring-1 ring-slate-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5"
            >
              <CardHeader className="p-6 pb-4">
                <div className="mb-5 flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-xl bg-blue-50 text-blue-700">
                    <BriefcaseBusiness aria-hidden="true" className="size-5" />
                  </span>
                  <span className="rounded-lg bg-emerald-50 px-2.5 py-1.5 text-xs font-bold text-emerald-700">
                    {job.match}
                  </span>
                </div>
                <CardTitle className="text-lg font-bold text-slate-950">
                  {job.title}
                </CardTitle>
                <CardDescription className="mt-1 text-sm text-slate-500">
                  {job.company}
                </CardDescription>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <div className="flex flex-wrap gap-2 text-xs font-medium text-slate-600">
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 px-2.5 py-1.5">
                    <MapPin aria-hidden="true" className="size-3.5 text-blue-600" />
                    {job.location}
                  </span>
                  <span className="rounded-lg bg-slate-50 px-2.5 py-1.5">{job.type}</span>
                </div>
                <p className="mt-5 border-t border-slate-100 pt-4 text-sm font-bold text-slate-800">
                  {job.salary}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export function EmployerSection() {
  return (
    <section id="for-employers" className="scroll-mt-24 bg-slate-950 py-20 text-white sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:px-10">
        <div>
          <p className="text-sm font-bold tracking-[0.16em] text-blue-300 uppercase">
            For employers
          </p>
          <h2 className="mt-4 max-w-xl text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
            Meet the people who can move your work forward
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">
            Reach candidates whose experience matches what the role truly needs, then explore every promising fit with confidence.
          </p>
          <ul className="mt-8 space-y-4">
            {[
              "Create and manage open job listings",
              "Discover candidates beyond exact keywords",
              "Explore candidate fit with your AI hiring assistant",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-slate-200">
                <span className="grid size-6 place-items-center rounded-full bg-blue-500/15 text-blue-300">
                  <Check aria-hidden="true" className="size-3.5" strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>
          <Button asChild size="lg" className="mt-9 h-12 rounded-xl bg-white px-6 text-base text-slate-950 hover:bg-blue-50">
            <Link href="/auth/signup?role=recruiter">
              Post a job
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </Button>
        </div>

        <div
          data-asset-replacement="/images/landing/employer-dashboard.webp"
          className="rounded-[2rem] border border-white/10 bg-white/5 p-3 sm:p-5"
        >
          <div className="rounded-2xl bg-white p-4 text-slate-900 shadow-2xl sm:p-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-5">
              <div>
                <p className="text-xs font-bold tracking-wider text-blue-600 uppercase">
                  Candidate search
                </p>
                <p className="mt-1 text-lg font-bold">Relevant profiles</p>
              </div>
              <span className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600">
                Product Operations
              </span>
            </div>
            <div className="mt-5 space-y-3">
              {[
                ["AM", "Operations & Enablement", "92%"],
                ["JS", "Program Management", "89%"],
                ["RK", "Customer Operations", "86%"],
              ].map(([initials, focus, match], index) => (
                <div
                  key={initials}
                  className={cn(
                    "flex items-center gap-3 rounded-xl border p-3.5",
                    index === 0
                      ? "border-blue-200 bg-blue-50"
                      : "border-slate-200",
                  )}
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-slate-900 text-xs font-bold text-white">
                    {initials}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold">Candidate profile</p>
                    <p className="mt-0.5 truncate text-xs text-slate-500">{focus}</p>
                  </div>
                  <span className="text-sm font-bold text-blue-600">{match}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-xl bg-slate-50 p-4">
              <p className="flex items-center gap-2 text-sm font-bold">
                <Sparkles aria-hidden="true" className="size-4 text-blue-600" />
                Recruiter assistant insight
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                The leading profiles combine cross-functional delivery with the process-improvement experience this role requires.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SupportSection() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.04fr_0.96fr] lg:px-10">
        <div
          data-asset-replacement="/images/landing/support-services.webp"
          className="order-2 grid grid-cols-2 gap-3 rounded-[2rem] bg-blue-50 p-4 sm:grid-cols-3 sm:p-6 lg:order-1"
        >
          {supportCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={category.label}
                className={cn(
                  "rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200/70",
                  index === supportCategories.length - 1 && "sm:col-start-2",
                )}
              >
                <span className={cn("grid size-10 place-items-center rounded-xl", category.color)}>
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <p className="mt-4 text-sm font-bold text-slate-900">{category.label}</p>
              </div>
            );
          })}
        </div>

        <div className="order-1 lg:order-2">
          <p className="text-sm font-bold tracking-[0.16em] text-blue-600 uppercase">
            Support beyond the application
          </p>
          <h2 className="mt-4 max-w-xl text-3xl font-bold tracking-[-0.04em] text-slate-950 sm:text-4xl">
            Work does not happen separately from life
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
            The support assistant helps people discover relevant resources for the practical challenges that can shape a job search and career.
          </p>
          <Button asChild variant="outline" className="mt-9 h-11 rounded-xl px-5">
            <Link href="/assistants/support">
              Explore support resources
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="bg-blue-600 py-16 text-white sm:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-9 px-5 sm:px-8 lg:grid-cols-[1fr_auto] lg:px-10">
        <div className="max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-100">
            <Users aria-hidden="true" className="size-4" />
            One platform for better-fit work
          </div>
          <h2 className="text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
            Ready to make your next move clearer?
          </h2>
          <p className="mt-4 text-lg leading-8 text-blue-100">
            Choose the path that fits what you need today.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" className="h-12 rounded-xl bg-white px-6 text-base text-blue-700 hover:bg-blue-50">
            <Link href="/auth/signup">Find your next role</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="h-12 rounded-xl border-blue-300 bg-transparent px-6 text-base text-white hover:bg-blue-500 hover:text-white">
            <Link href="/auth/signup?role=recruiter">Start hiring</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
