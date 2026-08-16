import Image from "next/image";

import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  compact?: boolean;
};

export function Logo({ className, compact = false }: LogoProps) {
  return (
    <span
      className={cn(
        "relative inline-block shrink-0 overflow-hidden",
        compact ? "h-9 w-24" : "h-11 w-36",
        className,
      )}
    >
      <Image
        src="/cirwork_logo.png"
        alt="CirWork"
        width={1000}
        height={1000}
        priority
        className="absolute top-1/2 left-1/2 h-auto w-[205%] max-w-none -translate-x-1/2 -translate-y-1/2"
      />
    </span>
  );
}
