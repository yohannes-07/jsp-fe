"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/api-client";
import type { QueryResponse } from "@/lib/types";
import { cn } from "@/lib/utils";


export function AiQueryInput({
  className,
  placeholder = "Ask about jobs, your resume, career options, or support...",
}: {
  className?: string;
  placeholder?: string;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
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
        body: JSON.stringify({ query: value }),
      });
      if (response.redirect_url) {
        router.push(response.redirect_url);
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
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 rounded-xl border border-slate-300 bg-white p-2 shadow-sm sm:flex-row sm:items-center"
      >
        <label className="w-full min-w-0 flex-1">
          <span className="sr-only">Ask CirWork</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={placeholder}
            className="h-11 w-full bg-transparent px-1 text-sm text-slate-900 outline-none placeholder:text-slate-400"
          />
        </label>
        <Button
          type="submit"
          disabled={submitting || query.trim().length < 2}
          className="h-11 w-full shrink-0 rounded-lg px-5 sm:w-auto"
        >
          {submitting ? (
            <LoaderCircle aria-hidden="true" className="animate-spin" />
          ) : (
            "Ask CirWork"
          )}
        </Button>
      </form>
      {(answer || error) && (
        <div
          role="status"
          className={cn(
            "mt-3 rounded-xl px-4 py-3 text-sm leading-6",
            error ? "bg-red-50 text-red-700" : "bg-blue-50 text-slate-700",
          )}
        >
          {error ?? answer}
        </div>
      )}
    </div>
  );
}
