import { BriefcaseBusiness } from "lucide-react";

import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  compact?: boolean;
};

export function Logo({ className, compact = false }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm shadow-primary/20">
        <BriefcaseBusiness aria-hidden="true" className="size-5" />
      </span>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="text-lg font-bold tracking-[-0.03em] text-slate-950">
            JSP
          </span>
          <span className="mt-1 text-[0.6rem] font-semibold tracking-[0.16em] text-slate-500 uppercase">
            Find your next
          </span>
        </span>
      )}
    </span>
  );
}
