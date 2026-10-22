import { notFound } from "next/navigation";

import type { Job } from "@/lib/types";

import { ApplicationForm } from "./application-form";

async function loadJob(id: string): Promise<Job | null> {
  const baseUrl =
    process.env.API_BASE_URL ??
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    "http://localhost:8000/api/v1";
  const response = await fetch(
    `${baseUrl.replace(/\/$/, "")}/jobs/${encodeURIComponent(id)}`,
    { cache: "no-store" },
  );
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`Unable to load job (${response.status})`);
  return response.json() as Promise<Job>;
}

export default async function ApplyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const job = await loadJob(id);
  if (!job || job.source !== "direct") notFound();

  return <ApplicationForm job={job} />;
}
