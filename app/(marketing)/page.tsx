import Link from "next/link";
import {
  ArrowRight,
  BrainCircuit,
  BriefcaseBusiness,
  Check,
  Compass,
  FileText,
  HeartHandshake,
  MapPin,
  Search,
  Send,
  Sparkles,
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

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Tell us what you want",
    description:
      "Search naturally. Share your skills, goals, and preferences without wrestling with rigid filters.",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "Get matches that make sense",
    description:
      "Our AI understands context, not just keywords, to surface roles that fit your experience and direction.",
  },
  {
    number: "03",
    icon: Send,
    title: "Move forward confidently",
    description:
      "Strengthen your resume, prepare your application, and get practical guidance at every step.",
  },
];

const features = [
  {
    icon: BrainCircuit,
    title: "Smarter job discovery",
    description:
      "Find relevant work through meaning and intent—not exact keyword matches alone.",
    color: "bg-blue-50 text-blue-700",
  },
  {
    icon: FileText,
    title: "Resume intelligence",
    description:
      "See how your experience aligns with a role and where your application can be stronger.",
    color: "bg-cyan-50 text-cyan-700",
  },
  {
    icon: Compass,
    title: "Career guidance",
    description:
      "Turn your skills and interests into clear, realistic next steps for your career.",
    color: "bg-indigo-50 text-indigo-700",
  },
  {
    icon: HeartHandshake,
    title: "Support beyond the search",
    description:
      "Discover trusted resources for training, childcare, transport, housing, and wellbeing.",
    color: "bg-sky-50 text-sky-700",
  },
];

export default function LandingPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-slate-100 bg-white">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 -z-10 h-[38rem] bg-[radial-gradient(circle_at_78%_18%,rgba(37,99,235,0.13),transparent_32%),radial-gradient(circle_at_16%_30%,rgba(14,165,233,0.08),transparent_28%)]"
        />
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-18 sm:px-8 sm:py-24 lg:grid-cols-[1.02fr_0.98fr] lg:gap-18 lg:px-10 lg:py-28">
          <div className="max-w-2xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-2 text-xs font-semibold tracking-wide text-blue-700 uppercase">
              <Sparkles aria-hidden="true" className="size-3.5" />
              AI-native job search
            </div>
            <h1 className="text-5xl leading-[1.04] font-bold tracking-[-0.055em] text-slate-950 sm:text-6xl lg:text-[4.6rem]">
              A clearer path to work that{" "}
              <span className="text-primary">fits.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600 sm:text-xl">
              Discover better-fit roles, understand your options, and get personalized support from search to application.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-13 rounded-xl px-6 text-base shadow-lg shadow-primary/20">
                <Link href="/auth/signup">
                  Start your search
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-13 rounded-xl border-slate-300 px-6 text-base text-slate-700"
              >
                <Link href="#how-it-works">See how it works</Link>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-600">
              {["Free to get started", "Personalized matches", "Built around you"].map((item) => (
                <span key={item} className="inline-flex items-center gap-2">
                  <span className="grid size-5 place-items-center rounded-full bg-blue-100 text-blue-700">
                    <Check aria-hidden="true" className="size-3" strokeWidth={3} />
                  </span>
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl lg:mx-0 lg:ml-auto">
            <div aria-hidden="true" className="absolute -inset-5 -z-10 rounded-[2.5rem] bg-blue-100/60 blur-2xl" />
            <div className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-2xl shadow-blue-950/10 sm:p-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                <div>
                  <p className="text-xs font-semibold tracking-[0.14em] text-blue-600 uppercase">Your matches</p>
                  <p className="mt-1 text-lg font-bold tracking-tight text-slate-900">Roles picked for you</p>
                </div>
                <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">12 new</span>
              </div>

              <div className="mt-5 rounded-2xl border-2 border-blue-200 bg-blue-50/50 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-3.5">
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-blue-600 text-white shadow-sm">
                      <BriefcaseBusiness aria-hidden="true" className="size-5" />
                    </span>
                    <div>
                      <h2 className="font-bold text-slate-950">Product Operations Lead</h2>
                      <p className="mt-1 text-sm text-slate-600">Northstar Labs</p>
                    </div>
                  </div>
                  <span className="rounded-lg bg-blue-600 px-2.5 py-1.5 text-xs font-bold text-white">94% match</span>
                </div>
                <div className="mt-5 flex flex-wrap gap-2 text-xs font-medium text-slate-600">
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-white px-2.5 py-1.5 ring-1 ring-slate-200">
                    <MapPin aria-hidden="true" className="size-3.5 text-blue-600" />
                    Remote
                  </span>
                  <span className="rounded-lg bg-white px-2.5 py-1.5 ring-1 ring-slate-200">Full-time</span>
                  <span className="rounded-lg bg-white px-2.5 py-1.5 ring-1 ring-slate-200">$110k–$135k</span>
                </div>
                <div className="mt-5 border-t border-blue-100 pt-4">
                  <p className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                    <Sparkles aria-hidden="true" className="size-4 text-blue-600" />
                    Why this fits you
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Your cross-functional leadership and process design experience align strongly with this team&apos;s needs.
                  </p>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3">
                {[
                  ["Customer Success Manager", "88% match"],
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

      <section id="how-it-works" className="scroll-mt-24 bg-slate-50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold tracking-[0.16em] text-blue-600 uppercase">How it works</p>
            <h2 className="mt-4 text-3xl font-bold tracking-[-0.04em] text-slate-950 sm:text-4xl">
              From searching to moving forward
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Less noise, more clarity. JSP helps you focus on the opportunities and actions that matter.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <Card key={step.number} className="relative gap-0 border-0 bg-white py-0 shadow-sm ring-1 ring-slate-200/80">
                  <CardHeader className="p-6 pb-4 sm:p-7 sm:pb-4">
                    <div className="mb-7 flex items-center justify-between">
                      <span className="grid size-12 place-items-center rounded-2xl bg-blue-600 text-white shadow-md shadow-blue-600/15">
                        <Icon aria-hidden="true" className="size-5" />
                      </span>
                      <span className="text-sm font-bold tracking-wider text-blue-200">{step.number}</span>
                    </div>
                    <CardTitle className="text-xl font-bold tracking-tight text-slate-900">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="px-6 pb-7 sm:px-7">
                    <CardDescription className="text-base leading-7 text-slate-600">{step.description}</CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section id="features" className="scroll-mt-24 bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid items-end gap-8 lg:grid-cols-2">
            <div className="max-w-2xl">
              <p className="text-sm font-bold tracking-[0.16em] text-blue-600 uppercase">Built for the whole journey</p>
              <h2 className="mt-4 text-3xl font-bold tracking-[-0.04em] text-slate-950 sm:text-4xl">
                More than a list of open roles
              </h2>
            </div>
            <p className="max-w-xl text-lg leading-8 text-slate-600 lg:justify-self-end">
              One place to discover opportunities, understand your fit, improve how you present yourself, and find useful support.
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="gap-0 border-0 bg-white py-0 ring-1 ring-slate-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5">
                  <CardHeader className="p-6 pb-3 sm:p-8 sm:pb-3">
                    <span className={cn("mb-6 grid size-12 place-items-center rounded-2xl", feature.color)}>
                      <Icon aria-hidden="true" className="size-5" />
                    </span>
                    <CardTitle className="text-xl font-bold tracking-tight text-slate-900">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="px-6 pb-7 sm:px-8 sm:pb-8">
                    <CardDescription className="text-base leading-7 text-slate-600">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section id="for-everyone" className="scroll-mt-24 bg-slate-950 py-20 text-white sm:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_auto] lg:px-10">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-300">
              <Users aria-hidden="true" className="size-4" />
              Built for job seekers and recruiters
            </div>
            <h2 className="text-3xl font-bold tracking-[-0.04em] sm:text-4xl">Ready for a better way to find the right fit?</h2>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              Create your profile and make every search, match, and next step more useful.
            </p>
          </div>
          <Button asChild size="lg" className="h-13 w-full rounded-xl bg-white px-6 text-base text-slate-950 hover:bg-blue-50 sm:w-auto">
            <Link href="/auth/signup">
              Create your account
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
