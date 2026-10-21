import type { Metadata } from "next";

import { JobsClient } from "./_components/jobs-client";

const validTimelines = new Set([
  "urgent",
  "next-6-months",
  "just-browsing",
  "imminent-career-change",
  "medium-term-career-planning",
  "long-term-planning",
]);

export const metadata: Metadata = { title: "Jobs" };

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    country?: string;
    location?: string;
    job_type?: string;
    workplace_type?: string;
    experience_level?: string;
    mode?: string;
    timeline?: string;
    page?: string;
  }>;
}) {
  const params = await searchParams;
  return (
    <JobsClient
      initialFilters={{
        q: params.q ?? "",
        country: /^[a-z]{2}$/i.test(params.country ?? "")
          ? params.country!.toLowerCase()
          : "us",
        location: params.location ?? "",
        jobType: params.job_type ?? "",
        workplaceType: params.workplace_type ?? "",
        experienceLevel: params.experience_level ?? "",
        searchMode: params.mode === "hybrid" ? "hybrid" : "keyword",
        timeline: params.timeline && validTimelines.has(params.timeline) ? params.timeline : "",
        page: Math.max(Number(params.page) || 1, 1),
      }}
    />
  );
}
