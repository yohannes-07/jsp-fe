import Link from "next/link";

import { Logo } from "@/components/layout/logo";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.25fr_0.75fr_0.75fr_0.75fr] lg:px-10">
        <div>
          <Link href="/" aria-label="CirWork home">
            <Logo />
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-slate-500">
            Better matches, clearer next steps, and support for the whole journey.
          </p>
        </div>

        <FooterLinks
          title="For job seekers"
          links={[
            ["Browse jobs", "/jobs"],
            ["Job discovery", "/assistants/job-discovery"],
            ["Resume guidance", "/assistants/resume"],
            ["Career guidance", "/assistants/career"],
          ]}
        />
        <FooterLinks
          title="For employers"
          links={[
            ["Post a job", "/auth/signup?role=recruiter"],
            ["Search candidates", "/resumes"],
            ["Recruiter assistant", "/assistants/recruiter"],
          ]}
        />
        <FooterLinks
          title="Platform"
          links={[
            ["How it works", "/#how-it-works"],
            ["AI career tools", "/#ai-tools"],
            ["Support resources", "/assistants/support"],
            ["Log in", "/auth/login"],
          ]}
        />
      </div>
      <div className="border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-5 py-5 text-sm text-slate-500 sm:px-8 lg:px-10">
          © {new Date().getFullYear()} CirWork
        </div>
      </div>
    </footer>
  );
}

type FooterLinksProps = {
  title: string;
  links: [label: string, href: string][];
};

function FooterLinks({ title, links }: FooterLinksProps) {
  return (
    <div>
      <h2 className="text-sm font-bold text-slate-900">{title}</h2>
      <ul className="mt-4 space-y-3">
        {links.map(([label, href]) => (
          <li key={label}>
            <Link
              href={href}
              className="text-sm text-slate-500 transition-colors hover:text-primary"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
