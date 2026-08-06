"use client";

import { FileText, Search, Sparkles } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { useAuthStore } from "@/lib/store/auth-store";


export function ResumesClient() {
  const user = useAuthStore((state) => state.user);
  const recruiter = user?.role === "recruiter";
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow={recruiter ? "Candidate discovery" : "Your experience"}
        title={recruiter ? "Find candidates" : "Your resumes"}
        description={
          recruiter
            ? "Search candidate experience and skills from one focused workspace."
            : "Keep the resumes you use for matching and applications organized."
        }
      />
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
        <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-blue-50 text-blue-700">
          {recruiter ? <Search aria-hidden="true" /> : <FileText aria-hidden="true" />}
        </span>
        <h2 className="mt-5 text-lg font-bold text-slate-950">
          {recruiter ? "Candidate search starts here" : "Build your resume workspace"}
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-600">
          {recruiter
            ? "Candidate profiles that match your search will appear here."
            : "The resumes you use for matching and applications will appear here."}
        </p>
        <div className="mx-auto mt-5 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-500">
          <Sparkles aria-hidden="true" className="size-3.5" />
          Workspace ready
        </div>
      </div>
    </div>
  );
}
