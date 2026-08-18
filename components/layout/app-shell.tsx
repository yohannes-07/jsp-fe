"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BriefcaseBusiness,
  Compass,
  FileText,
  LogOut,
  MessageCircle,
  Search,
  Target,
  UserRound,
} from "lucide-react";

import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/store/auth-store";
import { cn } from "@/lib/utils";


const seekerNav = [
  { href: "/jobs", label: "Find jobs", icon: Search },
  { href: "/resumes", label: "My resumes", icon: FileText },
  { href: "/assistants/job-discovery", label: "AI assistants", icon: MessageCircle },
  { href: "/profile", label: "Profile", icon: UserRound },
];

const recruiterNav = [
  { href: "/jobs", label: "Jobs", icon: BriefcaseBusiness },
  { href: "/resumes", label: "Find candidates", icon: Search },
  { href: "/talent", label: "Talent strategy", icon: Target },
  { href: "/assistants/recruiter", label: "Recruiter assistant", icon: Compass },
  { href: "/profile", label: "Company profile", icon: UserRound },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);
  const initializing = useAuthStore((state) => state.initializing);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    if (!initializing && !user) {
      router.replace("/auth/login?next=" + encodeURIComponent(pathname));
    }
  }, [initializing, pathname, router, user]);

  if (initializing || !user) {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-50">
        <div className="text-center">
          <span className="mx-auto block size-9 animate-spin rounded-full border-3 border-blue-100 border-t-blue-600" />
          <p className="mt-4 text-sm text-slate-500">Loading your workspace...</p>
        </div>
      </div>
    );
  }

  const nav = user.role === "recruiter" ? recruiterNav : seekerNav;

  const handleLogout = async () => {
    await logout();
    router.replace("/");
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-18 md:pb-0">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-17 max-w-[92rem] items-center justify-between px-4 sm:px-6">
          <Link href="/jobs" aria-label="CirWork workspace">
            <Logo />
          </Link>
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-slate-900">{user.full_name}</p>
              <p className="text-xs text-slate-500">
                {user.role === "recruiter" ? user.company_name : "Job seeker"}
              </p>
            </div>
            <span className="grid size-9 place-items-center rounded-full bg-blue-50 text-sm font-bold text-blue-700">
              {user.full_name.charAt(0).toUpperCase()}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              aria-label="Sign out"
            >
              <LogOut aria-hidden="true" />
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[92rem] md:grid-cols-[15rem_1fr]">
        <aside className="hidden min-h-[calc(100vh-4.25rem)] border-r border-slate-200 bg-white p-4 md:block">
          <nav aria-label="Workspace navigation" className="space-y-1">
            {nav.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition",
                    active
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                  )}
                >
                  <Icon aria-hidden="true" className="size-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <main className="min-w-0 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>

      <nav
        aria-label="Mobile workspace navigation"
        className="fixed inset-x-0 bottom-0 z-40 flex justify-around border-t border-slate-200 bg-white px-2 py-2 md:hidden"
      >
        {nav.slice(0, 4).map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex min-w-16 flex-col items-center gap-1 rounded-lg px-2 py-1 text-[0.68rem] font-semibold",
                active ? "text-blue-700" : "text-slate-500",
              )}
            >
              <Icon aria-hidden="true" className="size-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
