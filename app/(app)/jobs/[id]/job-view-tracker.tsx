"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { apiRequest } from "@/lib/api-client";
import { useAuthStore } from "@/lib/store/auth-store";

export function JobViewTracker({ jobId }: { jobId: string }) {
  const user = useAuthStore((state) => state.user);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (user?.role !== "job_seeker") return;
    void apiRequest<void>("/recommendations/events", {
      method: "POST",
      body: JSON.stringify({ event_type: "view", job_id: jobId }),
    })
      .then(() => queryClient.invalidateQueries({ queryKey: ["job-recommendations"] }))
      .catch(() => undefined);
  }, [jobId, queryClient, user?.role]);

  return null;
}
