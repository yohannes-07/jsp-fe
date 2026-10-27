import { AssistantScaffold } from "@/components/chat/assistant-scaffold";
import Link from "next/link";
import { ArrowRight, FileText, HeartHandshake, Route } from "lucide-react";


export default function JobDiscoveryAssistantPage() {
  return (
    <div className="space-y-8">
      <AssistantScaffold
        name="Job discovery assistant"
        description="Turn what you want from your next role into a clearer search."
        examples={[
          "Find remote operations roles that value customer-facing experience.",
          "Which of these roles best matches my background?",
          "Show me a different direction using the same skills.",
        ]}
        actionHref="/jobs"
        actionLabel="Browse jobs"
      />
      <section className="mx-auto max-w-5xl">
        <p className="text-xs font-bold tracking-wider text-blue-600 uppercase">Personal support</p>
        <h2 className="mt-1 text-2xl font-bold text-slate-950">More ways CirWork can support you</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {[
            { href: "/assistants/resume", title: "Resume assistant", description: "Improve and tailor your resume using real opportunities.", icon: FileText },
            { href: "/assistants/career", title: "Career assistant", description: "Build a realistic path around your skills and goals.", icon: Route },
            { href: "/assistants/support", title: "Support assistant", description: "Find training, childcare, transport, housing, benefits, and wellbeing resources.", icon: HeartHandshake },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className="group rounded-2xl bg-white p-5 ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-lg">
                <Icon className="size-5 text-blue-700" />
                <h3 className="mt-4 font-bold text-slate-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-700">Open assistant <ArrowRight className="size-4 transition group-hover:translate-x-0.5" /></span>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
