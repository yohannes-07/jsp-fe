"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BriefcaseBusiness, MapPin, Plus, Search, Sparkles } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { AiQueryInput } from "@/components/search/ai-query-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { apiRequest } from "@/lib/api-client";
import { useAuthStore } from "@/lib/store/auth-store";
import type { Job, JobList, JobType, WorkNature } from "@/lib/types";

const workNatureOptions: { label: string; value: WorkNature }[] = [
  { label: "Professional", value: "professional" },
  { label: "Fractional", value: "fractional" },
  { label: "Tech", value: "tech" },
  { label: "Gig economy", value: "gig-economy" },
  { label: "Blue collar", value: "blue-collar" },
  { label: "Manual labor", value: "manual-labor" },
  { label: "Long-term", value: "long-term" },
  { label: "Short-term", value: "short-term" },
];


type JobFilters = {
  q: string;
  location: string;
  jobType: string;
  natureOfWork: string;
};

export function JobsClient({ initialFilters }: { initialFilters: JobFilters }) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const [filters, setFilters] = useState(initialFilters);
  const [showCreate, setShowCreate] = useState(false);

  const queryString = new URLSearchParams();
  if (initialFilters.q) queryString.set("q", initialFilters.q);
  if (initialFilters.location) queryString.set("location", initialFilters.location);
  if (initialFilters.jobType) queryString.set("job_type", initialFilters.jobType);
  if (initialFilters.natureOfWork) {
    queryString.set("nature_of_work", initialFilters.natureOfWork);
  }

  const jobsQuery = useQuery({
    queryKey: ["jobs", queryString.toString()],
    queryFn: () =>
      apiRequest<JobList>("/jobs" + (queryString.size ? "?" + queryString : "")),
  });

  const applyFilters = (event: React.FormEvent) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (filters.q.trim()) params.set("q", filters.q.trim());
    if (filters.location.trim()) params.set("location", filters.location.trim());
    if (filters.jobType) params.set("job_type", filters.jobType);
    if (filters.natureOfWork) params.set("nature_of_work", filters.natureOfWork);
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
            <Button onClick={() => setShowCreate((value) => !value)} className="h-11 rounded-xl">
              <Plus aria-hidden="true" />
              Post a job
            </Button>
          ) : undefined
        }
      />

      {showCreate && <CreateJobPanel onClose={() => setShowCreate(false)} />}

      <AiQueryInput
        placeholder="Ask CirWork to find a role, explain your options, or guide your next step..."
      />

      <form
        onSubmit={applyFilters}
        className="grid gap-3 rounded-2xl bg-white p-4 ring-1 ring-slate-200 md:grid-cols-2 xl:grid-cols-[1fr_0.75fr_0.55fr_0.65fr_auto]"
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
          <MapPin aria-hidden="true" className="absolute top-3.5 left-3 size-4 text-slate-400" />
          <Input
            value={filters.location}
            onChange={(event) => setFilters({ ...filters, location: event.target.value })}
            placeholder="Location"
            className="h-11 pl-9"
          />
        </label>
        <select
          value={filters.jobType}
          onChange={(event) => setFilters({ ...filters, jobType: event.target.value })}
          className="h-11 rounded-md border border-input bg-white px-3 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-ring/50"
          aria-label="Job type"
        >
          <option value="">All job types</option>
          <option value="full-time">Full-time</option>
          <option value="part-time">Part-time</option>
          <option value="contract">Contract</option>
          <option value="remote">Remote</option>
        </select>
        <select
          value={filters.natureOfWork}
          onChange={(event) =>
            setFilters({ ...filters, natureOfWork: event.target.value })
          }
          className="h-11 rounded-md border border-input bg-white px-3 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-ring/50"
          aria-label="Nature of work"
        >
          <option value="">All kinds of work</option>
          {workNatureOptions.map((option) => (
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
          title="Jobs could not be loaded"
          description="Make sure the backend and PostgreSQL are running, then try again."
        />
      )}
      {jobsQuery.data?.items.length === 0 && (
        <StatePanel
          title="No roles matched this search"
          description="Try a broader title, remove a filter, or ask CirWork to suggest another direction."
        />
      )}
      {jobsQuery.data && jobsQuery.data.items.length > 0 && (
        <div>
          <p className="mb-4 text-sm font-semibold text-slate-500">
            {jobsQuery.data.total} open {jobsQuery.data.total === 1 ? "role" : "roles"}
          </p>
          <div className="grid gap-4 xl:grid-cols-2">
            {jobsQuery.data.items.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function JobCard({ job }: { job: Job }) {
  const salary =
    job.salary_min !== null && job.salary_max !== null
      ? "$" + job.salary_min.toLocaleString() + " – $" + job.salary_max.toLocaleString()
      : "Salary not listed";
  return (
    <Link
      href={"/jobs/" + job.id}
      className="group rounded-2xl bg-white p-5 ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-900/5"
    >
      <div className="flex items-start gap-4">
        <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-700">
          <BriefcaseBusiness aria-hidden="true" className="size-5" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="font-bold text-slate-950 group-hover:text-blue-700">
                {job.title}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {job.recruiter.company_name ?? job.recruiter.full_name}
              </p>
            </div>
            <span className="rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
              {job.job_type}
            </span>
          </div>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-600">
            <span className="inline-flex items-center gap-1.5">
              <MapPin aria-hidden="true" className="size-4 text-blue-600" />
              {job.location}
            </span>
            <span className="font-semibold text-slate-700">{salary}</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {job.nature_of_work.map((nature) => (
              <span key={nature} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                {workNatureOptions.find((option) => option.value === nature)?.label ?? nature}
              </span>
            ))}
          </div>
          <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-600">
            {job.description}
          </p>
        </div>
      </div>
    </Link>
  );
}

function CreateJobPanel({ onClose }: { onClose: () => void }) {
  const queryClient = useQueryClient();
  const [form, setForm] = useState({
    title: "",
    description: "",
    requirements: "",
    location: "",
    job_type: "full-time" as JobType,
    salary_min: "",
    salary_max: "",
    nature_of_work: ["professional", "long-term"] as WorkNature[],
  });
  const mutation = useMutation({
    mutationFn: () =>
      apiRequest<Job>("/jobs", {
        method: "POST",
        body: JSON.stringify({
          ...form,
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
        <p className="text-xs font-bold tracking-wider text-blue-600 uppercase">New listing</p>
        <h2 className="mt-1 text-xl font-bold text-slate-950">Post a job</h2>
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
          <option value="full-time">Full-time</option>
          <option value="part-time">Part-time</option>
          <option value="contract">Contract</option>
          <option value="remote">Remote</option>
        </select>
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
          <legend className="text-sm font-semibold text-slate-800">Nature of work</legend>
          <p className="mt-1 text-xs text-slate-500">Choose every option that describes this opportunity.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {workNatureOptions.map((option) => {
              const selected = form.nature_of_work.includes(option.value);
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
                        nature_of_work: selected
                          ? form.nature_of_work.filter((value) => value !== option.value)
                          : [...form.nature_of_work, option.value],
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
          disabled={mutation.isPending || form.nature_of_work.length === 0}
        >
          {mutation.isPending ? "Publishing..." : "Publish job"}
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
