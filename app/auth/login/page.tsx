import type { Metadata } from "next";

import { AuthPageShell } from "@/components/auth/auth-page-shell";
import { LoginForm } from "@/components/auth/auth-forms";


export const metadata: Metadata = { title: "Sign in" };

export default function LoginPage() {
  return (
    <AuthPageShell
      eyebrow="Welcome back"
      title="Sign in to continue"
      description="Return to your job search, profile, and personalized tools."
    >
      <LoginForm />
    </AuthPageShell>
  );
}
