"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FileText, Search, Upload } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiRequest } from "@/lib/api-client";
import { useAuthStore } from "@/lib/store/auth-store";
import type { CandidateList, Resume } from "@/lib/types";

export function ResumesClient() {
  const user = useAuthStore((state) => state.user);
  return user?.role === "recruiter" ? <CandidateSearch /> : <ResumeWorkspace />;
}

function CandidateSearch() {
  const [draft, setDraft] = useState("");
  const [query, setQuery] = useState("");
  const candidates = useQuery({
    queryKey: ["candidate-search", query],
    queryFn: () => apiRequest<CandidateList>(`/search/resumes?q=${encodeURIComponent(query)}`),
    enabled: query.length > 0,
  });

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Candidate discovery"
        title="Find candidates"
        description="Search recruiter-visible experience and skills using keyword and semantic ranking."
      />
      <form
        className="flex gap-2 rounded-2xl bg-white p-4 ring-1 ring-slate-200"
        onSubmit={(event) => {
          event.preventDefault();
          setQuery(draft.trim());
        }}
      >
        <Input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Python, cloud infrastructure, customer success..." minLength={1} />
        <Button type="submit"><Search aria-hidden="true" />Search</Button>
      </form>
      {candidates.data && (
        <p className="text-sm text-slate-500">
          {candidates.data.total} candidates · {candidates.data.semantic_available ? "Hybrid ranking" : "Keyword fallback"}
        </p>
      )}
      <div className="grid gap-4 md:grid-cols-2">
        {candidates.data?.items.map((candidate) => (
          <article key={candidate.id} className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <h2 className="font-bold text-slate-950">{candidate.full_name}</h2>
            <p className="mt-1 text-sm text-slate-500">{candidate.location ?? "Location not provided"}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {candidate.skills.map((skill) => (
                <span key={skill} className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">{skill}</span>
              ))}
            </div>
            <p className="mt-4 text-xs text-slate-400">{candidate.experience_level ?? "Unspecified"} · {candidate.indexing_status}</p>
          </article>
        ))}
      </div>
      {query && candidates.data?.items.length === 0 && <EmptyState text="No recruiter-visible candidates matched." />}
    </div>
  );
}

function ResumeWorkspace() {
  const queryClient = useQueryClient();
  const resumes = useQuery({ queryKey: ["resumes"], queryFn: () => apiRequest<Resume[]>("/resumes") });
  const upload = useMutation({
    mutationFn: (file: File) => {
      const body = new FormData();
      body.append("file", file);
      return apiRequest<Resume>("/resumes", { method: "POST", body });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["resumes"] }),
  });

  return (
    <div className="space-y-8">
      <PageHeader eyebrow="Your experience" title="Your resumes" description="Upload PDF, DOCX, or text resumes for matching and candidate discovery." />
      <label className="flex cursor-pointer items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-8 text-sm font-semibold text-blue-700">
        <Upload aria-hidden="true" />
        {upload.isPending ? "Uploading..." : "Upload resume"}
        <input
          type="file"
          accept=".pdf,.docx,.txt"
          className="sr-only"
          disabled={upload.isPending}
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) upload.mutate(file);
            event.target.value = "";
          }}
        />
      </label>
      {upload.isError && <p className="rounded-xl bg-red-50 p-4 text-sm text-red-700">The resume could not be uploaded.</p>}
      <div className="space-y-3">
        {resumes.data?.map((resume) => (
          <article key={resume.id} className="flex items-center gap-4 rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <FileText className="text-blue-700" aria-hidden="true" />
            <div className="min-w-0 flex-1">
              <h2 className="truncate font-semibold text-slate-950">{resume.file_name}</h2>
              <p className="text-xs text-slate-500">{resume.is_primary ? "Primary · " : ""}{resume.indexing_status}</p>
            </div>
          </article>
        ))}
      </div>
      {resumes.data?.length === 0 && <EmptyState text="Upload your first resume to start matching." />}
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center text-sm text-slate-500">{text}</div>;
}
