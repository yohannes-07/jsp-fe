"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BriefcaseBusiness, Loader2, MapPin, Plus, Search, Sparkles } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { AiQueryInput } from "@/components/search/ai-query-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { apiRequest } from "@/lib/api-client";
import {
  countryOptions,
  regionOptionsForCountry,
} from "@/lib/job-search-locations";
import { useAuthStore } from "@/lib/store/auth-store";
import type {
  Job,
  JobExperienceLevel,
  JobList,
  JobType,
  WorkplaceType,
  ExternalJobList,
} from "@/lib/types";

const jobTypeOptions: { label: string; value: JobType }[] = [
  { label: "Full-time", value: "full-time" },
  { label: "Part-time", value: "part-time" },
  { label: "Contract", value: "contract" },
  { label: "Internship", value: "internship" },
  { label: "Freelance", value: "freelance" },
  { label: "Fractional", value: "fractional" },
];

const workplaceOptions: { label: string; value: WorkplaceType }[] = [
  { label: "On-site", value: "on-site" },
  { label: "Hybrid", value: "hybrid" },
  { label: "Remote", value: "remote" },
];

const experienceLevelOptions: { label: string; value: JobExperienceLevel }[] = [
  { label: "Entry level", value: "entry" },
  { label: "Mid level", value: "mid" },
  { label: "Senior level", value: "senior" },
  { label: "Lead", value: "lead" },
  { label: "Executive", value: "executive" },
];

type JobFilters = {
  q: string;
  country: string;
  location: string;
  jobType: string;
  workplaceType: string;
  experienceLevel: string;
  searchMode: "keyword" | "hybrid";
  timeline: string;
  page: number;
};

export function JobsClient({ initialFilters }: { initialFilters: JobFilters }) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const [filters, setFilters] = useState(initialFilters);
  const [showCreate, setShowCreate] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const queryClient = useQueryClient();
  const regionOptions = regionOptionsForCountry(filters.country);
  const targetRoles = Array.isArray(user?.preferences.target_roles)
    ? user.preferences.target_roles.filter(
        (value): value is string => typeof value === "string" && Boolean(value.trim()),
      )
    : [];
  const workplacePreferences = Array.isArray(user?.preferences.workplace_types)
    ? user.preferences.workplace_types.filter(
        (value): value is string => typeof value === "string",
      )
    : [];
  const useProfileDefaults = user?.role === "job_seeker" && !initialFilters.q;
  const effectiveQuery = initialFilters.q || (useProfileDefaults ? targetRoles[0] ?? "" : "");
  const effectiveWorkplace =
    initialFilters.workplaceType ||
    (useProfileDefaults && workplacePreferences.includes("remote") ? "remote" : "");
  const effectiveLocation =
    initialFilters.location ||
    (useProfileDefaults && effectiveWorkplace !== "remote" ? user?.location ?? "" : "");
  const effectiveExperience =
    initialFilters.experienceLevel ||
    (useProfileDefaults ? user?.experience_level ?? "" : "");

  const queryString = new URLSearchParams();
  if (effectiveQuery) queryString.set("q", effectiveQuery);
  queryString.set("country", initialFilters.country);
  if (effectiveLocation) queryString.set("location", effectiveLocation);
  if (initialFilters.jobType) queryString.set("job_type", initialFilters.jobType);
  if (effectiveWorkplace) queryString.set("workplace_type", effectiveWorkplace);
  if (effectiveExperience) queryString.set("experience_level", effectiveExperience);
  if (initialFilters.searchMode === "hybrid" || useProfileDefaults) queryString.set("mode", "hybrid");
  if (initialFilters.searchMode === "hybrid" && initialFilters.timeline) {
    queryString.set("timeline", initialFilters.timeline);
  }
  queryString.set("page", String(initialFilters.page));

  const jobsQuery = useQuery({
    queryKey: ["jobs", queryString.toString()],
    queryFn: () =>
      apiRequest<JobList>("/search/jobs" + (queryString.size ? "?" + queryString : "")),
  });
  const externalQueryString = new URLSearchParams();
  if (effectiveQuery) externalQueryString.set("q", effectiveQuery);
  externalQueryString.set("country", initialFilters.country);
  if (effectiveLocation) externalQueryString.set("location", effectiveLocation);
  if (initialFilters.jobType) externalQueryString.set("job_type", initialFilters.jobType);
  if (effectiveWorkplace) externalQueryString.set("workplace_type", effectiveWorkplace);
  if (effectiveExperience) externalQueryString.set("experience_level", effectiveExperience);
  const externalJobsQuery = useQuery({
    queryKey: ["external-jobs", externalQueryString.toString()],
    queryFn: () =>
      apiRequest<ExternalJobList>("/search/external-jobs?" + externalQueryString),
    enabled: Boolean(
      initialFilters.page === 1 &&
        effectiveQuery &&
        jobsQuery.data?.external_search_suggested,
    ),
    retry: 1,
  });
  const displayedJobs = jobsQuery.data
    ? [
        ...jobsQuery.data.items,
        ...(externalJobsQuery.data?.items ?? []).filter(
          (externalJob) =>
            !jobsQuery.data.items.some((localJob) => localJob.id === externalJob.id),
        ),
      ]
    : [];
  const manageJob = useMutation({
    mutationFn: ({ job, action }: { job: Job; action: "close" | "delete" }) =>
      apiRequest<void | Job>(`/jobs/${job.id}`, {
        method: action === "delete" ? "DELETE" : "PATCH",
        body: action === "close" ? JSON.stringify({ status: "closed" }) : undefined,
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["jobs"] }),
  });

  const applyFilters = (event: React.FormEvent) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (filters.q.trim()) params.set("q", filters.q.trim());
    params.set("country", filters.country);
    if (filters.location.trim()) params.set("location", filters.location.trim());
    if (filters.jobType) params.set("job_type", filters.jobType);
    if (filters.workplaceType) params.set("workplace_type", filters.workplaceType);
    if (filters.experienceLevel) params.set("experience_level", filters.experienceLevel);
    params.set("page", "1");
    router.push("/jobs" + (params.size ? "?" + params : ""));
  };

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow={user?.role === "recruiter" ? "Recruiting workspace" : "Job discovery"}
        title={user?.role === "recruiter" ? "Jobs" : "Find your next opportunity"}
        description={
          user?.role === "recruiter"
            ? "Publish roles and see the opportunities currently available on CirWork."
            : "Search open roles or describe what you want to the CirWork assistant."
        }
        action={
          user?.role === "recruiter" ? (
            <Button
              onClick={() => {
                setEditingJob(null);
                setShowCreate((value) => !value);
              }}
              className="h-11 rounded-xl"
            >
              <Plus aria-hidden="true" />
              Post a job
            </Button>
          ) : undefined
        }
      />

      {(showCreate || editingJob) && (
        <CreateJobPanel
          key={editingJob?.id ?? "new"}
          job={editingJob}
          onClose={() => {
            setShowCreate(false);
            setEditingJob(null);
          }}
        />
      )}

      <AiQueryInput
        placeholder="Ask CirWork to find a role, explain your options, or guide your next step..."
      />

      <form
        onSubmit={applyFilters}
        className="grid gap-3 rounded-2xl bg-white p-4 ring-1 ring-slate-200 md:grid-cols-2 xl:grid-cols-[1fr_0.7fr_0.7fr_0.55fr_0.55fr_0.55fr_auto]"
      >
        <label className="relative">
          <Search aria-hidden="true" className="absolute top-3.5 left-3 size-4 text-slate-400" />
          <Input
            value={filters.q}
            onChange={(event) => setFilters({ ...filters, q: event.target.value })}
            placeholder="Title, skill, or keyword"
            className="h-11 pl-9"
          />
        </label>
        <label className="relative">
          <MapPin aria-hidden="true" className="pointer-events-none absolute top-3.5 left-3 size-4 text-slate-400" />
          <select
            value={filters.country}
            onChange={(event) =>
              setFilters({ ...filters, country: event.target.value, location: "" })
            }
            className="h-11 w-full rounded-md border border-input bg-white pr-3 pl-9 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-ring/50"
            aria-label="Country"
          >
            {countryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        {regionOptions.length > 0 && (
          <select
            value={filters.location}
            onChange={(event) => setFilters({ ...filters, location: event.target.value })}
            className="h-11 rounded-md border border-input bg-white px-3 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-ring/50"
            aria-label={filters.country === "us" ? "State" : "Region"}
          >
            <option value="">
              {filters.country === "us" ? "All states" : "All UK regions"}
            </option>
            {regionOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
        <select
          value={filters.jobType}
          onChange={(event) => setFilters({ ...filters, jobType: event.target.value })}
          className="h-11 rounded-md border border-input bg-white px-3 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-ring/50"
          aria-label="Job type"
        >
          <option value="">All job types</option>
          {jobTypeOptions.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        <select
          value={filters.workplaceType}
          onChange={(event) => setFilters({ ...filters, workplaceType: event.target.value })}
          className="h-11 rounded-md border border-input bg-white px-3 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-ring/50"
          aria-label="Workplace"
        >
          <option value="">Any workplace</option>
          {workplaceOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <select
          value={filters.experienceLevel}
          onChange={(event) => setFilters({ ...filters, experienceLevel: event.target.value })}
          className="h-11 rounded-md border border-input bg-white px-3 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-ring/50"
          aria-label="Experience level"
        >
          <option value="">Any experience</option>
          {experienceLevelOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <Button type="submit" className="h-11 rounded-xl px-5">
          Search
        </Button>
      </form>

      {jobsQuery.isLoading && <JobLoadingGrid />}
      {jobsQuery.isError && (
        <StatePanel
          title="We couldn't find any jobs right now"
          description="Please try again in a moment."
        />
      )}
      {manageJob.isError && (
        <StatePanel
          title="The job could not be updated"
          description="Please try again in a moment."
        />
      )}
      {externalJobsQuery.isFetching && (
        <div className="flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-3 text-sm font-medium text-blue-800">
          <Loader2 aria-hidden="true" className="size-4 animate-spin" />
          Finding more opportunities that match your search...
        </div>
      )}
      {jobsQuery.data?.items.length === 0 && !externalJobsQuery.isFetching && displayedJobs.length === 0 && (
        <StatePanel
          title="No roles matched this search"
          description="Try a broader title, remove a filter, or ask CirWork to suggest another direction."
        />
      )}
      {jobsQuery.data && displayedJobs.length > 0 && (
        <div>
          <p className="mb-4 text-sm font-semibold text-slate-500">
            {jobsQuery.data.total + (externalJobsQuery.data?.items.length ?? 0)} open {jobsQuery.data.total + (externalJobsQuery.data?.items.length ?? 0) === 1 ? "role" : "roles"}
          </p>
          <div className="grid gap-4 xl:grid-cols-2">
            {displayedJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                canManage={job.source === "direct" && user?.role === "recruiter" && user.id === job.recruiter_id}
                busy={manageJob.isPending}
                onEdit={() => {
                  setShowCreate(false);
                  setEditingJob(job);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onClose={() => {
                  if (window.confirm("Close this job listing?")) {
                    manageJob.mutate({ job, action: "close" });
                  }
                }}
                onDelete={() => {
                  if (window.confirm("Delete this job permanently?")) {
                    manageJob.mutate({ job, action: "delete" });
                  }
                }}
              />
            ))}
          </div>
          <div className="mt-6 flex items-center justify-between">
            <Button
              variant="outline"
              disabled={!jobsQuery.data.has_previous}
              onClick={() => {
                const params = new URLSearchParams(queryString);
                params.set("page", String(initialFilters.page - 1));
                router.push("/jobs?" + params);
              }}
            >
              Previous
            </Button>
            <span className="text-sm text-slate-500">
              Page {jobsQuery.data.page} of {Math.max(jobsQuery.data.total_pages, 1)}
            </span>
            <Button
              variant="outline"
              disabled={!jobsQuery.data.has_next}
              onClick={() => {
                const params = new URLSearchParams(queryString);
                params.set("page", String(initialFilters.page + 1));
                router.push("/jobs?" + params);
              }}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function JobCard({
  job,
  canManage,
  busy,
  onEdit,
  onClose,
  onDelete,
}: {
  job: Job;
  canManage: boolean;
  busy: boolean;
  onEdit: () => void;
  onClose: () => void;
  onDelete: () => void;
}) {
  const salary =
    job.salary_min !== null && job.salary_max !== null
      ? "$" + job.salary_min.toLocaleString() + " – $" + job.salary_max.toLocaleString()
      : "Salary not listed";
  const company =
    job.source === "external"
      ? job.external_company_name ?? "Company not specified"
      : job.recruiter?.company_name ?? job.recruiter?.full_name ?? "CirWork employer";
  const content = (
    <>
      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-700">
        <BriefcaseBusiness aria-hidden="true" className="size-5" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="font-bold text-slate-950 group-hover:text-blue-700">{job.title}</h2>
            <p className="mt-1 text-sm text-slate-500">{company}</p>
          </div>
          <span className="rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">{job.job_type}</span>
        </div>
        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-600">
          <span className="inline-flex items-center gap-1.5"><MapPin aria-hidden="true" className="size-4 text-blue-600" />{job.location}</span>
          <span className="font-semibold text-slate-700">{salary}</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">{workplaceOptions.find((option) => option.value === job.workplace_type)?.label}</span>
          {job.experience_levels.map((level) => (
            <span key={level} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">{experienceLevelOptions.find((option) => option.value === level)?.label ?? level}</span>
          ))}
        </div>
        <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-600">{job.description}</p>
      </div>
    </>
  );
  return (
    <article className="group rounded-2xl bg-white ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-900/5">
      <Link href={"/jobs/" + job.id} className="flex items-start gap-4 p-5">{content}</Link>
      <div className="flex justify-end border-t border-slate-100 px-5 py-3">
        {!canManage ? (
          <Button asChild><Link href={"/jobs/" + job.id}>View job details</Link></Button>
        ) : null}
      </div>
      {canManage && (
        <div className="flex flex-wrap justify-end gap-2 border-t border-slate-100 px-5 py-3">
          <Button type="button" variant="outline" disabled={busy} onClick={onEdit}>Edit</Button>
          <Button type="button" variant="outline" disabled={busy} onClick={onClose}>Close</Button>
          <Button type="button" variant="ghost" disabled={busy} onClick={onDelete}>Delete</Button>
        </div>
      )}
    </article>
  );
}

function CreateJobPanel({ job, onClose }: { job: Job | null; onClose: () => void }) {
  const queryClient = useQueryClient();
  const [form, setForm] = useState({
    title: job?.title ?? "",
    skills: job?.skills.join(", ") ?? "",
    description: job?.description ?? "",
    requirements: job?.requirements ?? "",
    location: job?.location ?? "",
    job_type: job?.job_type ?? ("full-time" as JobType),
    workplace_type: job?.workplace_type ?? ("on-site" as WorkplaceType),
    salary_min: job?.salary_min?.toString() ?? "",
    salary_max: job?.salary_max?.toString() ?? "",
    experience_levels: job?.experience_levels ?? (["entry", "mid"] as JobExperienceLevel[]),
  });
  const mutation = useMutation({
    mutationFn: () =>
      apiRequest<Job>(job ? `/jobs/${job.id}` : "/jobs", {
        method: job ? "PATCH" : "POST",
        body: JSON.stringify({
          ...form,
          skills: form.skills.split(",").map((skill) => skill.trim()).filter(Boolean),
          salary_min: form.salary_min ? Number(form.salary_min) : null,
          salary_max: form.salary_max ? Number(form.salary_max) : null,
        }),
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["jobs"] });
      onClose();
    },
  });

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        mutation.mutate();
      }}
      className="rounded-2xl bg-white p-5 ring-1 ring-slate-200 sm:p-6"
    >
      <div className="mb-5">
        <p className="text-xs font-bold tracking-wider text-blue-600 uppercase">
          {job ? "Manage listing" : "New listing"}
        </p>
        <h2 className="mt-1 text-xl font-bold text-slate-950">
          {job ? "Edit job" : "Post a job"}
        </h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Input
          required
          minLength={2}
          value={form.title}
          onChange={(event) => setForm({ ...form, title: event.target.value })}
          placeholder="Job title"
          className="h-11"
        />
        <Input
          required
          value={form.location}
          onChange={(event) => setForm({ ...form, location: event.target.value })}
          placeholder="Location"
          className="h-11"
        />
        <select
          value={form.job_type}
          onChange={(event) => setForm({ ...form, job_type: event.target.value as JobType })}
          className="h-11 rounded-md border border-input bg-white px-3 text-sm"
        >
          {jobTypeOptions.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        <select
          value={form.workplace_type}
          onChange={(event) => setForm({ ...form, workplace_type: event.target.value as WorkplaceType })}
          className="h-11 rounded-md border border-input bg-white px-3 text-sm"
          aria-label="Workplace"
        >
          {workplaceOptions.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        <Input
          required
          value={form.skills}
          onChange={(event) => setForm({ ...form, skills: event.target.value })}
          placeholder="Skills (comma separated)"
          className="h-11"
        />
        <div className="grid grid-cols-2 gap-3">
          <Input
            type="number"
            min={0}
            value={form.salary_min}
            onChange={(event) => setForm({ ...form, salary_min: event.target.value })}
            placeholder="Min salary"
            className="h-11"
          />
          <Input
            type="number"
            min={0}
            value={form.salary_max}
            onChange={(event) => setForm({ ...form, salary_max: event.target.value })}
            placeholder="Max salary"
            className="h-11"
          />
        </div>
        <fieldset className="md:col-span-2">
          <legend className="text-sm font-semibold text-slate-800">Experience levels</legend>
          <p className="mt-1 text-xs text-slate-500">Choose every experience level eligible for this opportunity.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {experienceLevelOptions.map((option) => {
              const selected = form.experience_levels.includes(option.value);
              return (
                <label
                  key={option.value}
                  className={
                    selected
                      ? "cursor-pointer rounded-full border border-blue-600 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700"
                      : "cursor-pointer rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:border-blue-300"
                  }
                >
                  <input
                    type="checkbox"
                    value={option.value}
                    checked={selected}
                    onChange={() =>
                      setForm({
                        ...form,
                        experience_levels: selected
                          ? form.experience_levels.filter((value) => value !== option.value)
                          : [...form.experience_levels, option.value],
                      })
                    }
                    className="sr-only"
                  />
                  {option.label}
                </label>
              );
            })}
          </div>
        </fieldset>
        <Textarea
          required
          minLength={20}
          value={form.description}
          onChange={(event) => setForm({ ...form, description: event.target.value })}
          placeholder="Describe the role"
          className="min-h-28 md:col-span-2"
        />
        <Textarea
          required
          minLength={10}
          value={form.requirements}
          onChange={(event) => setForm({ ...form, requirements: event.target.value })}
          placeholder="Skills and experience required"
          className="min-h-24 md:col-span-2"
        />
      </div>
      {mutation.isError && (
        <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          The job could not be published. Check the fields and try again.
        </p>
      )}
      <div className="mt-5 flex justify-end gap-3">
        <Button type="button" variant="ghost" onClick={onClose}>
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={mutation.isPending || form.experience_levels.length === 0 || !form.skills.trim()}
        >
          {mutation.isPending ? "Saving..." : job ? "Save changes" : "Publish job"}
        </Button>
      </div>
    </form>
  );
}

function StatePanel({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
      <Sparkles aria-hidden="true" className="mx-auto size-6 text-blue-600" />
      <h2 className="mt-4 font-bold text-slate-900">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">{description}</p>
    </div>
  );
}

function JobLoadingGrid() {
  return (
    <div className="grid gap-4 xl:grid-cols-2">
      {[0, 1, 2, 3].map((item) => (
        <div key={item} className="h-48 animate-pulse rounded-2xl bg-slate-200" />
      ))}
    </div>
  );
}
