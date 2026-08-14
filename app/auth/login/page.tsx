import type { Metadata } from "next";

import { AuthPageShell } from "@/components/auth/auth-page-shell";
import { LoginForm } from "@/components/auth/auth-forms";


export const metadata: Metadata = { title: "Sign in" };

function safeRedirectPath(value: string | undefined): string {
  return value?.startsWith("/") && !value.startsWith("//") ? value : "/jobs";
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const redirectTo = safeRedirectPath((await searchParams).next);
  return (
    <AuthPageShell
      eyebrow="Welcome back"
      title="Sign in to continue"
      description="Return to your job search, profile, and personalized tools."
    >
      <LoginForm redirectTo={redirectTo} />
    </AuthPageShell>
  );
}
