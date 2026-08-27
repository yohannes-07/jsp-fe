import type { Metadata } from "next";

import { JobsClient } from "./_components/jobs-client";


export const metadata: Metadata = { title: "Jobs" };

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    location?: string;
    job_type?: string;
    workplace_type?: string;
    experience_level?: string;
    mode?: string;
    page?: string;
  }>;
}) {
  const params = await searchParams;
  return (
    <JobsClient
      initialFilters={{
        q: params.q ?? "",
        location: params.location ?? "",
        jobType: params.job_type ?? "",
        workplaceType: params.workplace_type ?? "",
        experienceLevel: params.experience_level ?? "",
        searchMode: params.mode === "hybrid" ? "hybrid" : "keyword",
        page: Math.max(Number(params.page) || 1, 1),
      }}
    />
  );
}
