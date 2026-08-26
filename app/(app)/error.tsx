"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-lg rounded-2xl bg-white px-6 py-12 text-center ring-1 ring-slate-200">
      <h1 className="text-xl font-bold text-slate-950">Something went wrong</h1>
      <p className="mt-2 text-sm text-slate-600">
        We couldn&apos;t open this page. Please try again.
      </p>
      <Button className="mt-6" onClick={reset}>
        Try again
      </Button>
    </div>
  );
}
