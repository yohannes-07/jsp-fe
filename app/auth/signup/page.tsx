import type { Metadata } from "next";

import { AuthPageShell } from "@/components/auth/auth-page-shell";
import { SignupForm } from "@/components/auth/auth-forms";


export const metadata: Metadata = { title: "Create account" };

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>;
}) {
  const role = (await searchParams).role === "recruiter" ? "recruiter" : "job_seeker";
  return (
    <AuthPageShell
      eyebrow="Join JSP"
      title="Create your account"
      description="Choose your path and start building better connections."
    >
      <SignupForm defaultRole={role} />
    </AuthPageShell>
  );
}
