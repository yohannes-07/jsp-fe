import Link from "next/link";
import { BriefcaseBusiness } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function JobNotFound() {
  return (
    <div className="mx-auto grid min-h-[55vh] max-w-xl place-items-center px-4 text-center">
      <div>
        <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-blue-50 text-blue-700">
          <BriefcaseBusiness aria-hidden="true" className="size-6" />
        </span>
        <h1 className="mt-5 text-2xl font-bold tracking-tight text-slate-950">
          This job is no longer available
        </h1>
        <p className="mt-3 text-base leading-7 text-slate-600">
          The posting may have expired or been removed. Browse the latest jobs
          to find another opportunity.
        </p>
        <Button asChild className="mt-6 h-11 rounded-xl px-6">
          <Link href="/jobs">Browse current jobs</Link>
        </Button>
      </div>
    </div>
  );
}
