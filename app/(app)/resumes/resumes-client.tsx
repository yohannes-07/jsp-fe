"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FileText, Search, Trash2, Upload } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ApiError, apiRequest } from "@/lib/api-client";
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
        description="Search candidates by their skills and experience."
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
          {candidates.data.total} {candidates.data.total === 1 ? "candidate" : "candidates"}
        </p>
      )}
      {candidates.isError && (
        <EmptyState text="We couldn't find candidates right now. Please try again in a moment." />
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
            <p className="mt-4 text-xs text-slate-400">{candidate.experience_level ?? "Experience not specified"}</p>
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
  const resume = resumes.data?.[0];
  const upload = useMutation({
    mutationFn: (file: File) => {
      const body = new FormData();
      body.append("file", file);
      return apiRequest<Resume>("/resumes", { method: "POST", body });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["resumes"] }),
  });
  const remove = useMutation({
    mutationFn: (resumeId: string) =>
      apiRequest<void>(`/resumes/${resumeId}`, { method: "DELETE" }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["resumes"] }),
  });

  return (
    <div className="space-y-8">
      <PageHeader eyebrow="Your experience" title="Your resume" description="Keep one current PDF, DOCX, or text resume for job matching and candidate discovery." />
      <label className="flex cursor-pointer items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-8 text-sm font-semibold text-blue-700">
        <Upload aria-hidden="true" />
        {upload.isPending ? "Saving..." : resume ? "Replace resume" : "Upload resume"}
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
      {upload.isError && (
        <p className="rounded-xl bg-red-50 p-4 text-sm text-red-700">
          {resumeUploadError(upload.error)}
        </p>
      )}
      {resumes.isError && (
        <EmptyState text="We couldn't load your resume right now. Please try again in a moment." />
      )}
      {remove.isError && (
        <p className="rounded-xl bg-red-50 p-4 text-sm text-red-700">
          We couldn&apos;t delete your resume. Please try again.
        </p>
      )}
      {resume && (
        <article className="flex items-center gap-4 rounded-2xl bg-white p-5 ring-1 ring-slate-200">
          <FileText className="text-blue-700" aria-hidden="true" />
          <div className="min-w-0 flex-1">
            <h2 className="truncate font-semibold text-slate-950">{resume.file_name}</h2>
            <p className="text-xs text-slate-500">
              {resume.indexing_status === "indexed" ? "Ready for matching" : "Preparing for matching..."}
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            disabled={remove.isPending}
            onClick={() => {
              if (window.confirm("Delete your resume? This cannot be undone.")) {
                remove.mutate(resume.id);
              }
            }}
            aria-label="Delete resume"
          >
            <Trash2 aria-hidden="true" />
            {remove.isPending ? "Deleting..." : "Delete"}
          </Button>
        </article>
      )}
      {resumes.data?.length === 0 && <EmptyState text="Upload your resume to start matching." />}
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center text-sm text-slate-500">{text}</div>;
}

function resumeUploadError(error: Error): string {
  if (!(error instanceof ApiError)) {
    return "We couldn't upload your resume. Please try again.";
  }
  if (error.status === 401) {
    return "Your session has expired. Please sign in and upload your resume again.";
  }
  if (error.status === 413) {
    return "This resume is too large. Choose a file smaller than 10 MB.";
  }
  if (error.status === 415) {
    return "Choose a PDF, DOCX, or text file.";
  }
  if (error.status === 422) {
    return error.message;
  }
  return "We couldn't upload your resume. Please try again.";
}
