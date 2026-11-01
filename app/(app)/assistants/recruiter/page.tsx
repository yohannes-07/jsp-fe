import Link from "next/link";
import { ArrowRight, ChartNoAxesCombined, ScanSearch } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";

const assistants = [
  {
    href: "/assistants/candidate-review",
    title: "Candidate Review",
    description:
      "Review recruiter-visible candidate evidence against consistent, job-related requirements.",
    details: "Compare skills, identify evidence gaps, and prepare fair interview questions.",
    icon: ScanSearch,
  },
  {
    href: "/assistants/workforce-strategy",
    title: "Workforce Value Strategy",
    description:
      "Turn worker support and talent practices into a measurable workforce plan.",
    details:
      "Connect open roles, applicant activity, support resources, and talent actions to business outcomes.",
    icon: ChartNoAxesCombined,
  },
];

export default function RecruiterAssistantsPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <PageHeader
        eyebrow="Recruiter AI"
        title="Focused help for better talent decisions"
        description="Choose the assistant that matches your decision. Candidate Review handles applicant evidence; Workforce Value Strategy handles support, retention, and business outcomes."
      />
      <div className="grid gap-5 md:grid-cols-2">
        {assistants.map((assistant) => {
          const Icon = assistant.icon;
          return (
            <Link
              key={assistant.href}
              href={assistant.href}
              className="group rounded-2xl bg-white p-6 ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-lg sm:p-8"
            >
              <span className="grid size-12 place-items-center rounded-2xl bg-blue-50 text-blue-700">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <h2 className="mt-6 text-xl font-bold text-slate-950">{assistant.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{assistant.description}</p>
              <p className="mt-4 text-sm leading-6 text-slate-500">{assistant.details}</p>
              <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-blue-700">
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
