import type { Metadata } from "next";

import { JobsClient } from "./_components/jobs-client";


export const metadata: Metadata = { title: "Jobs" };

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; location?: string; job_type?: string }>;
}) {
  const params = await searchParams;
  return (
    <JobsClient
      initialFilters={{
        q: params.q ?? "",
        location: params.location ?? "",
        jobType: params.job_type ?? "",
      }}
    />
  );
}
