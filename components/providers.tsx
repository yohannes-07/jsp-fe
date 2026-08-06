"use client";

import { useEffect, useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";

import { createQueryClient } from "@/lib/query-client";
import { useAuthStore } from "@/lib/store/auth-store";
import type { AuthResponse } from "@/lib/types";


export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(createQueryClient);
  const bootstrap = useAuthStore((state) => state.bootstrap);

  useEffect(() => {
    void bootstrap();
    const handleRefresh = (event: Event) => {
      const session = (event as CustomEvent<AuthResponse>).detail;
      useAuthStore.setState({ user: session.user, initializing: false });
    };
    window.addEventListener("jsp:session-refreshed", handleRefresh);
    return () => window.removeEventListener("jsp:session-refreshed", handleRefresh);
  }, [bootstrap]);

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
