"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Save } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiRequest } from "@/lib/api-client";
import { useAuthStore } from "@/lib/store/auth-store";
import type { User } from "@/lib/types";


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
            : "Help JSP understand your experience and the opportunities you want."
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
    </div>
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
