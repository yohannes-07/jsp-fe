"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, LoaderCircle, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/api-client";
import type { QueryResponse } from "@/lib/types";
import { cn } from "@/lib/utils";


export function AiQueryInput({
  className,
  placeholder = "Ask about jobs, your resume, career options, or support...",
  compact = false,
}: {
  className?: string;
  placeholder?: string;
  compact?: boolean;
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
        className={cn(
          "flex items-center gap-2 border border-slate-200 bg-white p-2 shadow-lg shadow-blue-950/5",
          compact ? "rounded-xl" : "rounded-2xl",
        )}
      >
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-700">
          <Sparkles aria-hidden="true" className="size-4" />
        </span>
        <label className="min-w-0 flex-1">
          <span className="sr-only">Ask JSP</span>
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
          className={cn("rounded-xl", compact ? "size-10 px-0" : "h-11 px-5")}
          aria-label={compact ? "Ask JSP" : undefined}
        >
          {submitting ? (
            <LoaderCircle aria-hidden="true" className="animate-spin" />
          ) : compact ? (
            <ArrowRight aria-hidden="true" />
          ) : (
            <>
              Ask JSP
              <ArrowRight aria-hidden="true" />
            </>
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
