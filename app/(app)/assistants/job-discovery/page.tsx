import Link from "next/link";
import { ArrowRight, FileText, HeartHandshake, Route } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";

const assistants = [
  {
    href: "/assistants/resume",
    title: "Resume Assistant",
    description: "Improve and tailor your resume using your experience and real opportunities.",
    icon: FileText,
  },
  {
    href: "/assistants/career",
    title: "Career Assistant",
    description: "Build a realistic direction around your skills, goals, and live job-market evidence.",
    icon: Route,
  },
  {
    href: "/assistants/support",
    title: "Support Assistant",
    description: "Find training, childcare, transport, housing, benefits, and wellbeing resources.",
    icon: HeartHandshake,
  },
];

export default function JobSeekerAssistantsPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <PageHeader
        eyebrow="Job seeker AI"
        title="Focused support for your path to work"
        description="Choose the assistant that matches what you need: a stronger resume, a clearer career direction, or practical support resources. Job discovery remains available from Find jobs."
      />
      <div className="grid gap-4 md:grid-cols-3">
        {assistants.map((assistant) => {
          const Icon = assistant.icon;
          return (
            <Link
              key={assistant.href}
              href={assistant.href}
              className="group rounded-2xl bg-white p-6 ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <Icon className="size-5 text-blue-700" aria-hidden="true" />
              <h2 className="mt-4 font-bold text-slate-950">{assistant.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{assistant.description}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-700">
                Open assistant
                <ArrowRight className="size-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
