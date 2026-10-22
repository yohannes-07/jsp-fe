"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle2, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/api-client";
import { useAuthStore } from "@/lib/store/auth-store";
import type { Job, JobApplication } from "@/lib/types";

export function JobApplicationAction({ job }: { job: Job }) {
  const user = useAuthStore((state) => state.user);
  const initializing = useAuthStore((state) => state.initializing);
  const isJobSeeker = user?.role === "job_seeker";
  const application = useQuery({
    queryKey: ["my-job-application", job.id],
    queryFn: () =>
      apiRequest<JobApplication | null>(`/jobs/${job.id}/applications/me`),
    enabled: isJobSeeker,
  });

  if (initializing || (isJobSeeker && application.isLoading)) {
    return (
      <Button className="h-11 rounded-xl px-6" disabled>
        Checking application...
      </Button>
    );
  }

  if (application.data) {
    return (
      <div
        className="inline-flex h-11 items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-5 text-sm font-bold text-emerald-700"
        aria-label="You have applied for this job"
      >
        <CheckCircle2 aria-hidden="true" className="size-5" />
        Applied
      </div>
    );
  }

  if (user?.role === "recruiter") {
    if (user.id === job.recruiter_id) {
      return (
        <Button asChild variant="outline" className="h-11 rounded-xl px-6">
          <a href="#applicants">
            <Users aria-hidden="true" />
            View applicants
          </a>
        </Button>
      );
    }
    return null;
  }

  return (
    <Button asChild className="h-11 rounded-xl px-6">
      <Link href={`/jobs/${job.id}/apply`}>Apply on CirWork</Link>
    </Button>
  );
}
