"use client";

import { useQuery } from "@tanstack/react-query";
import { FileText, Mail, MapPin, Phone, Users } from "lucide-react";

import { apiRequest } from "@/lib/api-client";
import { useAuthStore } from "@/lib/store/auth-store";
import type { Job, JobApplicant } from "@/lib/types";

export function RecruiterApplications({ job }: { job: Job }) {
  const user = useAuthStore((state) => state.user);
  const ownsJob = user?.role === "recruiter" && user.id === job.recruiter_id;
  const applications = useQuery({
    queryKey: ["job-applications", job.id],
    queryFn: () => apiRequest<JobApplicant[]>(`/jobs/${job.id}/applications`),
    enabled: ownsJob,
  });

  if (!ownsJob) return null;

  return (
    <section id="applicants" className="mt-6 rounded-2xl bg-white p-6 ring-1 ring-slate-200 sm:p-8">
      <div className="flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-xl bg-blue-50 text-blue-700">
          <Users aria-hidden="true" className="size-5" />
        </span>
        <div>
          <h2 className="text-xl font-bold text-slate-950">Applicants</h2>
          <p className="text-sm text-slate-500">
            {applications.data ? `${applications.data.length} submitted` : "Loading applications..."}
          </p>
        </div>
      </div>

      {applications.isError && (
        <p className="mt-5 rounded-xl bg-red-50 p-4 text-sm text-red-700">
          We couldn&apos;t load applicants. Please try again.
        </p>
      )}
      {applications.data?.length === 0 && (
        <div className="mt-5 rounded-xl border border-dashed border-slate-300 px-5 py-10 text-center text-sm text-slate-500">
          No applications have been submitted yet.
        </div>
      )}
      <div className="mt-5 grid gap-4">
        {applications.data?.map((applicant) => (
          <article key={applicant.id} className="rounded-xl border border-slate-200 p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="font-bold text-slate-950">{applicant.full_name}</h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
                  {applicant.status}
                </p>
              </div>
              <time className="text-xs text-slate-400" dateTime={applicant.created_at}>
                {new Date(applicant.created_at).toLocaleDateString()}
              </time>
            </div>
            <div className="mt-4 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
              <span className="inline-flex items-center gap-2"><Mail aria-hidden="true" className="size-4 text-blue-600" />{applicant.email}</span>
              <span className="inline-flex items-center gap-2"><Phone aria-hidden="true" className="size-4 text-blue-600" />{applicant.phone_number}</span>
              <span className="inline-flex items-center gap-2"><MapPin aria-hidden="true" className="size-4 text-blue-600" />{applicant.location ?? "Location not provided"}</span>
              <span className="inline-flex items-center gap-2"><FileText aria-hidden="true" className="size-4 text-blue-600" />{applicant.resume_file_name ?? "No resume attached"}</span>
            </div>
            {applicant.skills.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {applicant.skills.map((skill) => (
                  <span key={skill} className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">{skill}</span>
                ))}
              </div>
            )}
            {applicant.cover_note && (
              <div className="mt-4 rounded-lg bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Message</p>
                <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-700">{applicant.cover_note}</p>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
