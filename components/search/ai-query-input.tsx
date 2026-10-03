"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle, SendHorizonal, Sparkles } from "lucide-react";

import { apiRequest } from "@/lib/api-client";
import type { QueryResponse } from "@/lib/types";
import { cn } from "@/lib/utils";

const timelineOptions = [
  ["Urgent", "urgent"],
  ["Next 6 months", "next-6-months"],
  ["Just browsing", "just-browsing"],
  ["Imminent career change", "imminent-career-change"],
  ["Medium-term planning", "medium-term-career-planning"],
  ["Long-term planning", "long-term-planning"],
] as const;

export function AiQueryInput({
  className,
  placeholder = "Ask about jobs, your resume, career options, or support...",
}: {
  className?: string;
  placeholder?: string;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [timeline, setTimeline] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = query.trim();
    if (value.length < 2) return;
    setSubmitting(true);
    setError(null);
    setAnswer(null);
    try {
      const response = await apiRequest<QueryResponse>("/chat/query", {
        method: "POST",
        body: JSON.stringify({ query: value, timeline: timeline || null }),
      });
      if (response.redirect_url) {
        if (response.intent === "job_search") {
          const [path, rawQuery = ""] = response.redirect_url.split("?");
          const params = new URLSearchParams(rawQuery);
          params.set("mode", "hybrid");
          if (timeline) params.set("timeline", timeline);
          router.push(path + "?" + params);
        } else {
          router.push(response.redirect_url);
        }
        return;
      }
      setAnswer(response.answer);
    } catch {
      setError("The assistant is unavailable right now. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={className}>
      {/* AI panel — visually distinct from the keyword search form below */}
      <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-px shadow-lg shadow-blue-900/20">
        <div className="rounded-[15px] bg-gradient-to-br from-blue-950 to-indigo-950 px-5 py-4">
          {/* Header label */}
          <div className="mb-3 flex items-center gap-2">
            <Sparkles aria-hidden="true" className="size-4 text-blue-300" />
            <span className="text-xs font-semibold tracking-wide text-blue-300 uppercase">
              Ask CirWork AI
            </span>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {/* Chat-style text input */}
            <label className="relative flex-1 min-w-0">
              <span className="sr-only">Ask CirWork</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={placeholder}
                className="h-11 w-full rounded-xl bg-white/10 px-4 text-sm text-white outline-none ring-1 ring-white/20 transition placeholder:text-blue-300/60 focus:bg-white/15 focus:ring-white/40"
              />
            </label>

            {/* Timeline selector */}
            <select
              value={timeline}
              onChange={(event) => setTimeline(event.target.value)}
              aria-label="Job-search timeline"
              className="h-11 w-full rounded-xl bg-white/10 px-3 text-sm text-blue-100 ring-1 ring-white/20 outline-none transition focus:bg-white/15 focus:ring-white/40 sm:w-48"
            >
              <option value="" disabled className="bg-indigo-950 text-slate-300">
                Timeline
              </option>
              {timelineOptions.map(([label, value]) => (
                <option key={value} value={value} className="bg-indigo-950 text-white">
                  {label}
                </option>
              ))}
            </select>

            {/* Send button */}
            <button
              type="submit"
              disabled={submitting || query.trim().length < 2}
              aria-label="Send"
              className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-semibold text-blue-700 shadow transition hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed sm:w-auto w-full"
            >
              {submitting ? (
                <LoaderCircle aria-hidden="true" className="animate-spin size-4" />
              ) : (
                <>
                  <SendHorizonal aria-hidden="true" className="size-4" />
                  Ask CirWork
                </>
              )}
            </button>
          </form>

          {/* AI response / error bubble */}
          {(answer || error) && (
            <div
              role="status"
              className={cn(
                "mt-4 rounded-xl px-4 py-3 text-sm leading-6",
                error
                  ? "bg-red-900/40 text-red-300 ring-1 ring-red-500/30"
                  : "bg-white/10 text-blue-100 ring-1 ring-white/10",
              )}
            >
              {!error && (
                <Sparkles aria-hidden="true" className="mb-1 inline-block size-3.5 text-blue-300 mr-1.5" />
              )}
              {error ?? answer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

