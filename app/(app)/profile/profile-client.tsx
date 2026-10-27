"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SlidersHorizontal, Save } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { apiRequest } from "@/lib/api-client";
import { countryOptions } from "@/lib/job-search-locations";
import { useAuthStore } from "@/lib/store/auth-store";
import type { JobPreferences, JobType, User, WorkplaceType } from "@/lib/types";


export function ProfileClient() {
  const user = useAuthStore((state) => state.user);
  const [form, setForm] = useState(() => ({
    full_name: user?.full_name ?? "",
    location: user?.location ?? "",
    company_name: user?.company_name ?? "",
    skills: user?.skills?.join(", ") ?? "",
    experience_level: user?.experience_level ?? "",
  }));

  const mutation = useMutation({
    mutationFn: () =>
      apiRequest<User>("/users/me", {
        method: "PATCH",
        body: JSON.stringify({
          full_name: form.full_name,
          location: form.location || null,
          ...(user?.role === "recruiter"
            ? { company_name: form.company_name || null }
            : {
                skills: form.skills
                  .split(",")
                  .map((skill) => skill.trim())
                  .filter(Boolean),
                experience_level: form.experience_level || null,
              }),
        }),
      }),
    onSuccess: (updatedUser) => useAuthStore.setState({ user: updatedUser }),
  });

  if (!user) return null;

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <PageHeader
        eyebrow="Your account"
        title={user.role === "recruiter" ? "Company profile" : "Your profile"}
        description={
          user.role === "recruiter"
            ? "Keep the company details shown with your job listings current."
            : "Help CirWork understand your experience and the opportunities you want."
        }
      />
      <form
        onSubmit={(event) => {
          event.preventDefault();
          mutation.mutate();
        }}
        className="space-y-5 rounded-2xl bg-white p-6 ring-1 ring-slate-200 sm:p-8"
      >
        <ProfileField label="Full name">
          <Input
            value={form.full_name}
            onChange={(event) => setForm({ ...form, full_name: event.target.value })}
            required
            minLength={2}
            className="h-11"
          />
        </ProfileField>
        <ProfileField label="Email">
          <Input value={user.email} disabled className="h-11 bg-slate-50" />
        </ProfileField>
        <ProfileField label="Location">
          <Input
            value={form.location}
            onChange={(event) => setForm({ ...form, location: event.target.value })}
            placeholder="City or region"
            className="h-11"
          />
        </ProfileField>
        {user.role === "recruiter" ? (
          <ProfileField label="Company name">
            <Input
              value={form.company_name}
              onChange={(event) => setForm({ ...form, company_name: event.target.value })}
              required
              className="h-11"
            />
          </ProfileField>
        ) : (
          <>
            <ProfileField label="Skills">
              <Input
                value={form.skills}
                onChange={(event) => setForm({ ...form, skills: event.target.value })}
                placeholder="Project management, Python, customer success"
                className="h-11"
              />
              <span className="mt-1.5 block text-xs text-slate-500">
                Separate skills with commas.
              </span>
            </ProfileField>
            <ProfileField label="Experience level">
              <select
                value={form.experience_level}
                onChange={(event) =>
                  setForm({ ...form, experience_level: event.target.value })
                }
                className="h-11 w-full rounded-md border border-input bg-white px-3 text-sm"
              >
                <option value="">Select a level</option>
                <option value="entry">Entry</option>
                <option value="mid">Mid-level</option>
                <option value="senior">Senior</option>
                <option value="lead">Lead</option>
                <option value="executive">Executive</option>
              </select>
            </ProfileField>
          </>
        )}
        {mutation.isSuccess && (
          <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            Your profile has been updated.
          </p>
        )}
        {mutation.isError && (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
            Your changes could not be saved. Please try again.
          </p>
        )}
        <Button type="submit" disabled={mutation.isPending} className="h-11 rounded-xl">
          <Save aria-hidden="true" />
          {mutation.isPending ? "Saving..." : "Save changes"}
        </Button>
      </form>
      {user.role === "job_seeker" && <PreferencePanel />}
    </div>
  );
}

const jobTypes: { value: JobType; label: string }[] = [
  { value: "full-time", label: "Full-time" },
  { value: "part-time", label: "Part-time" },
  { value: "contract", label: "Contract" },
  { value: "internship", label: "Internship" },
  { value: "freelance", label: "Freelance" },
  { value: "fractional", label: "Fractional" },
];

const workplaces: { value: WorkplaceType; label: string }[] = [
  { value: "remote", label: "Remote" },
  { value: "hybrid", label: "Hybrid" },
  { value: "on-site", label: "On-site" },
];

const supportOptions = [
  "Professional training",
  "Academic training",
  "Resume coaching",
  "Interview preparation",
  "Childcare",
  "Transportation",
  "Housing",
  "Employee benefits",
  "Mental health",
];

function PreferencePanel() {
  const query = useQuery({
    queryKey: ["job-preferences"],
    queryFn: () => apiRequest<JobPreferences>("/users/me/preferences"),
  });
  if (query.isLoading) {
    return <div className="h-48 animate-pulse rounded-2xl bg-slate-100" />;
  }
  if (!query.data) {
    return (
      <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
        Your job preferences could not be loaded.
      </p>
    );
  }
  return <PreferencesForm key={JSON.stringify(query.data)} initial={query.data} />;
}

function PreferencesForm({ initial }: { initial: JobPreferences }) {
  const queryClient = useQueryClient();
  const [form, setForm] = useState({
    ...initial,
    target_roles: initial.target_roles.join(", "),
    preferred_locations: initial.preferred_locations.join(", "),
    salary_min: initial.salary_min?.toString() ?? "",
    salary_max: initial.salary_max?.toString() ?? "",
  });
  const mutation = useMutation({
    mutationFn: () =>
      apiRequest<JobPreferences>("/users/me/preferences", {
        method: "PATCH",
        body: JSON.stringify({
          ...form,
          target_roles: form.target_roles.split(",").map((value) => value.trim()).filter(Boolean),
          preferred_locations: form.preferred_locations.split(",").map((value) => value.trim()).filter(Boolean),
          salary_min: form.salary_min ? Number(form.salary_min) : null,
          salary_max: form.salary_max ? Number(form.salary_max) : null,
        }),
      }),
    onSuccess: (preferences) => {
      const user = useAuthStore.getState().user;
      if (user) useAuthStore.setState({ user: { ...user, preferences } });
      queryClient.setQueryData(["job-preferences"], preferences);
      void queryClient.invalidateQueries({ queryKey: ["job-recommendations"] });
    },
  });
  const toggle = <T extends string,>(values: T[], value: T): T[] =>
    values.includes(value) ? values.filter((item) => item !== value) : [...values, value];

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        mutation.mutate();
      }}
      className="space-y-6 rounded-2xl bg-white p-6 ring-1 ring-slate-200 sm:p-8"
    >
      <div className="flex items-start gap-3">
        <span className="grid size-10 place-items-center rounded-xl bg-blue-50 text-blue-700">
          <SlidersHorizontal className="size-5" />
        </span>
        <div>
          <h2 className="text-xl font-bold text-slate-950">Job and support preferences</h2>
          <p className="mt-1 text-sm text-slate-600">
            CirWork uses these choices to personalize jobs and assistant guidance.
          </p>
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <ProfileField label="Target roles">
          <Input value={form.target_roles} onChange={(event) => setForm({ ...form, target_roles: event.target.value })} placeholder="Mechanical Engineer, Project Manager" />
        </ProfileField>
        <ProfileField label="Preferred country">
          <select value={form.preferred_country} onChange={(event) => setForm({ ...form, preferred_country: event.target.value })} className="h-11 w-full rounded-md border border-input bg-white px-3 text-sm">
            {countryOptions.map((country) => <option key={country.value} value={country.value}>{country.label}</option>)}
          </select>
        </ProfileField>
        <ProfileField label="Preferred cities or regions">
          <Input value={form.preferred_locations} onChange={(event) => setForm({ ...form, preferred_locations: event.target.value })} placeholder="Windhoek, Erongo" />
        </ProfileField>
        <div className="grid grid-cols-2 gap-3">
          <ProfileField label="Minimum salary">
            <Input type="number" min={0} value={form.salary_min} onChange={(event) => setForm({ ...form, salary_min: event.target.value })} />
          </ProfileField>
          <ProfileField label="Maximum salary">
            <Input type="number" min={0} value={form.salary_max} onChange={(event) => setForm({ ...form, salary_max: event.target.value })} />
          </ProfileField>
        </div>
      </div>
      <ChoiceGroup label="Employment types" options={jobTypes} selected={form.job_types} onToggle={(value) => setForm({ ...form, job_types: toggle(form.job_types, value as JobType) })} />
      <ChoiceGroup label="Workplace preferences" options={workplaces} selected={form.workplace_types} onToggle={(value) => setForm({ ...form, workplace_types: toggle(form.workplace_types, value as WorkplaceType) })} />
      <ProfileField label="Career goals">
        <Textarea value={form.career_goals} onChange={(event) => setForm({ ...form, career_goals: event.target.value })} placeholder="Describe the direction you want your career to take." rows={4} />
      </ProfileField>
      <ChoiceGroup label="Support that would help you" options={supportOptions.map((value) => ({ value, label: value }))} selected={form.support_needs} onToggle={(value) => setForm({ ...form, support_needs: toggle(form.support_needs, value) })} />
      {mutation.isSuccess && <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">Preferences saved. Your recommendations will refresh automatically.</p>}
      {mutation.isError && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">Preferences could not be saved. Check the salary range and try again.</p>}
      <Button type="submit" disabled={mutation.isPending} className="h-11 rounded-xl"><Save />{mutation.isPending ? "Saving…" : "Save preferences"}</Button>
    </form>
  );
}

function ChoiceGroup({ label, options, selected, onToggle }: { label: string; options: { value: string; label: string }[]; selected: string[]; onToggle: (value: string) => void }) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-semibold text-slate-800">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button key={option.value} type="button" aria-pressed={selected.includes(option.value)} onClick={() => onToggle(option.value)} className={selected.includes(option.value) ? "rounded-full bg-blue-600 px-3 py-2 text-sm font-semibold text-white" : "rounded-full border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 hover:border-blue-300"}>{option.label}</button>
        ))}
      </div>
    </fieldset>
  );
}

function ProfileField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-800">{label}</span>
      {children}
    </label>
  );
}
