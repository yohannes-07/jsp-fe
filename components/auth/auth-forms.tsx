"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ApiError } from "@/lib/api-client";
import { useAuthStore } from "@/lib/store/auth-store";
import {
  loginSchema,
  signupSchema,
  type LoginValues,
  type SignupValues,
} from "@/lib/validation/auth";


export function LoginForm({ redirectTo = "/jobs" }: { redirectTo?: string }) {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({ resolver: zodResolver(loginSchema) });

  const onSubmit = handleSubmit(async (values) => {
    setSubmitError(null);
    try {
      await login(values.email, values.password);
      router.replace(redirectTo);
    } catch (error) {
      setSubmitError(error instanceof ApiError ? error.message : "Unable to sign in");
    }
  });

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <FormField label="Email" error={errors.email?.message}>
        <Input
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          className="h-11"
          {...register("email")}
        />
      </FormField>
      <FormField label="Password" error={errors.password?.message}>
        <Input
          type="password"
          autoComplete="current-password"
          placeholder="Your password"
          className="h-11"
          {...register("password")}
        />
      </FormField>
      {submitError && <FormAlert>{submitError}</FormAlert>}
      <Button type="submit" disabled={isSubmitting} className="h-11 w-full rounded-xl">
        {isSubmitting ? "Signing in..." : "Sign in"}
      </Button>
      <p className="text-center text-sm text-slate-500">
        New to CirWork?{" "}
        <Link href="/auth/signup" className="font-semibold text-blue-700 hover:underline">
          Create an account
        </Link>
      </p>
    </form>
  );
}

export function SignupForm({
  defaultRole = "job_seeker",
}: {
  defaultRole?: "job_seeker" | "recruiter";
}) {
  const router = useRouter();
  const signup = useAuthStore((state) => state.signup);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { role: defaultRole },
  });
  const role = useWatch({ control, name: "role" });

  const onSubmit = handleSubmit(async (values) => {
    setSubmitError(null);
    try {
      await signup({
        ...values,
        company_name: values.role === "recruiter" ? values.company_name : undefined,
      });
      router.replace(values.role === "recruiter" ? "/jobs" : "/profile");
    } catch (error) {
      setSubmitError(error instanceof ApiError ? error.message : "Unable to create account");
    }
  });

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <span className="mb-2 block text-sm font-semibold text-slate-800">
          I want to
        </span>
        <div className="grid grid-cols-2 gap-2">
          <RoleButton
            active={role === "job_seeker"}
            label="Find work"
            onClick={() => setValue("role", "job_seeker", { shouldValidate: true })}
          />
          <RoleButton
            active={role === "recruiter"}
            label="Hire talent"
            onClick={() => setValue("role", "recruiter", { shouldValidate: true })}
          />
        </div>
      </div>
      <FormField label="Full name" error={errors.full_name?.message}>
        <Input
          autoComplete="name"
          placeholder="Your full name"
          className="h-11"
          {...register("full_name")}
        />
      </FormField>
      {role === "recruiter" && (
        <FormField label="Company name" error={errors.company_name?.message}>
          <Input
            autoComplete="organization"
            placeholder="Your company"
            className="h-11"
            {...register("company_name")}
          />
        </FormField>
      )}
      <FormField
        label={role === "recruiter" ? "Company Email" : "Email"}
        error={errors.email?.message}
      >
        <Input
          type="email"
          autoComplete="email"
          placeholder={role === "recruiter" ? "you@company.com" : "you@example.com"}
          className="h-11"
          {...register("email")}
        />
      </FormField>
      <FormField label="Password" error={errors.password?.message}>
        <Input
          type="password"
          autoComplete="new-password"
          placeholder="At least 8 characters"
          className="h-11"
          {...register("password")}
        />
      </FormField>
      {submitError && <FormAlert>{submitError}</FormAlert>}
      <Button type="submit" disabled={isSubmitting} className="h-11 w-full rounded-xl">
        {isSubmitting ? "Creating account..." : "Create account"}
      </Button>
      <p className="text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link href="/auth/login" className="font-semibold text-blue-700 hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}

function RoleButton({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        active
          ? "flex h-12 items-center justify-center gap-2 rounded-xl border-2 border-blue-600 bg-blue-50 text-sm font-semibold text-blue-700"
          : "flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:border-blue-200"
      }
    >
      {label}
    </button>
  );
}

function FormField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-800">{label}</span>
      {children}
      {error && <span className="mt-1.5 block text-xs text-red-600">{error}</span>}
    </label>
  );
}

function FormAlert({ children }: { children: React.ReactNode }) {
  return (
    <div role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
      {children}
    </div>
  );
}
