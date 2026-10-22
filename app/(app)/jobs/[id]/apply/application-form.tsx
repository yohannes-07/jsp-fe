"use client";

import Link from "next/link";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ArrowLeft, CheckCircle2, FileText, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ApiError, apiRequest } from "@/lib/api-client";
import { useAuthStore } from "@/lib/store/auth-store";
import type { Job, JobApplication, Resume } from "@/lib/types";

export function ApplicationForm({ job }: { job: Job }) {
  const user = useAuthStore((state) => state.user);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [coverNote, setCoverNote] = useState("");
  const resumes = useQuery({
    queryKey: ["resumes"],
    queryFn: () => apiRequest<Resume[]>("/resumes"),
    enabled: user?.role === "job_seeker",
  });
  const application = useMutation({
    mutationFn: () =>
      apiRequest<JobApplication>(`/jobs/${job.id}/applications`, {
        method: "POST",
        body: JSON.stringify({
          phone_number: phoneNumber,
          cover_note: coverNote.trim() || null,
        }),
      }),
  });

  if (application.isSuccess) {
    return (
      <div className="mx-auto max-w-xl rounded-2xl bg-white p-8 text-center ring-1 ring-slate-200">
        <CheckCircle2 aria-hidden="true" className="mx-auto size-12 text-emerald-600" />
        <h1 className="mt-4 text-2xl font-bold text-slate-950">Application sent</h1>
        <p className="mt-3 text-slate-600">
          Your application for {job.title} has been saved and submitted.
        </p>
        <Button asChild className="mt-6">
          <Link href="/jobs">Browse more jobs</Link>
        </Button>
      </div>
    );
  }

  if (user?.role === "recruiter") {
    return (
      <div className="mx-auto max-w-xl rounded-2xl bg-white p-8 text-center ring-1 ring-slate-200">
        <h1 className="text-2xl font-bold text-slate-950">Job seeker account required</h1>
        <p className="mt-3 text-slate-600">Recruiter accounts cannot submit job applications.</p>
        <Button asChild className="mt-6">
          <Link href={`/jobs/${job.id}`}>Back to job</Link>
        </Button>
      </div>
    );
  }

  const resume = resumes.data?.[0];

  return (
    <div className="mx-auto max-w-2xl">
      <Link href={`/jobs/${job.id}`} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-700">
        <ArrowLeft aria-hidden="true" className="size-4" />
        Back to job details
      </Link>
      <div className="mt-6 rounded-2xl bg-white p-6 ring-1 ring-slate-200 sm:p-8">
        <p className="text-sm font-bold text-blue-700">Apply on CirWork</p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">{job.title}</h1>
        <p className="mt-1 text-sm text-slate-500">
          {job.recruiter?.company_name ?? job.recruiter?.full_name}
        </p>

        <form
          className="mt-8 space-y-6"
          onSubmit={(event) => {
            event.preventDefault();
            application.mutate();
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <ReadOnlyField label="Full name" value={user?.full_name ?? "Loading..."} />
            <ReadOnlyField label="Email" value={user?.email ?? "Loading..."} />
          </div>
          <label className="block text-sm font-semibold text-slate-700">
            Phone number
            <Input
              className="mt-2"
              type="tel"
              autoComplete="tel"
              required
              minLength={7}
              maxLength={32}
              placeholder="+1 555 123 4567"
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
            />
          </label>
          <label className="block text-sm font-semibold text-slate-700">
            Short message <span className="font-normal text-slate-400">(optional)</span>
            <Textarea
              className="mt-2 min-h-32"
              maxLength={2000}
              placeholder="Briefly tell the recruiter why this role interests you."
              value={coverNote}
              onChange={(event) => setCoverNote(event.target.value)}
            />
            <span className="mt-1 block text-right text-xs font-normal text-slate-400">{coverNote.length}/2000</span>
          </label>

          <div className="rounded-xl bg-slate-50 p-4">
            <div className="flex items-start gap-3">
              <FileText aria-hidden="true" className="mt-0.5 size-5 text-blue-700" />
              <div>
                <p className="text-sm font-semibold text-slate-800">
                  {resume ? resume.file_name : "No resume attached"}
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  {resume
                    ? "Your current CirWork resume will be attached automatically."
                    : "You can apply without a resume, or upload one before submitting."}
                </p>
                {!resume && !resumes.isLoading && (
                  <Link href="/resumes" className="mt-2 inline-block text-xs font-bold text-blue-700 hover:underline">Upload a resume</Link>
                )}
              </div>
            </div>
          </div>

          {application.isError && (
            <p className="rounded-xl bg-red-50 p-4 text-sm text-red-700">
              {applicationError(application.error)}
            </p>
          )}

          <Button type="submit" className="h-11 w-full rounded-xl" disabled={application.isPending || !user}>
            <Send aria-hidden="true" />
            {application.isPending ? "Sending application..." : "Submit application"}
          </Button>
        </form>
      </div>
    </div>
  );
}

function ReadOnlyField({ label, value }: { label: string; value: string }) {
  return (
    <label className="block text-sm font-semibold text-slate-700">
      {label}
      <Input className="mt-2 bg-slate-50" value={value} readOnly />
    </label>
  );
}

function applicationError(error: Error): string {
  if (error instanceof ApiError) {
    if (error.status === 409) return "You have already applied for this job.";
    if (error.status === 401) return "Your session expired. Please sign in and try again.";
    if (error.status === 403) return "A job seeker account is required to apply.";
    return error.message;
  }
  return "We couldn't send your application. Please try again.";
}
