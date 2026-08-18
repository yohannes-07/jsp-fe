"use client";

import { useState } from "react";
import Link from "next/link";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Check,
  Circle,
  HeartHandshake,
  Magnet,
  Plus,
  Save,
  Search,
  Target,
  Trash2,
  TrendingUp,
} from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { apiRequest } from "@/lib/api-client";
import type { TalentAction, TalentWorkspace } from "@/lib/types";

type PillarKey = keyof TalentWorkspace;

const pillars: {
  key: PillarKey;
  shortLabel: string;
  title: string;
  description: string;
  placeholder: string;
  href: string;
  actionLabel: string;
  icon: typeof Search;
}[] = [
  {
    key: "identify_talent",
    shortLabel: "Identify",
    title: "Identify talent",
    description: "Define the roles, skills, and candidate profiles the organization needs.",
    placeholder: "Example: Find operations leaders with healthcare experience",
    href: "/resumes",
    actionLabel: "Find candidates",
    icon: Search,
  },
  {
    key: "attract_talent",
    shortLabel: "Attract",
    title: "Attract talent",
    description: "Plan compelling opportunities and the messages that bring the right people in.",
    placeholder: "Example: Strengthen our flexible-work value proposition",
    href: "/jobs",
    actionLabel: "Manage job listings",
    icon: Magnet,
  },
  {
    key: "support_talent",
    shortLabel: "Support",
    title: "Support talent",
    description: "Track onboarding, development, and practical support commitments.",
    placeholder: "Example: Create a 30-day onboarding plan for new hires",
    href: "/assistants/support",
    actionLabel: "Explore support tools",
    icon: HeartHandshake,
  },
  {
    key: "retain_talent",
    shortLabel: "Retain",
    title: "Retain talent",
    description: "Turn feedback, growth, and recognition into concrete retention actions.",
    placeholder: "Example: Schedule quarterly career-development conversations",
    href: "/profile",
    actionLabel: "Review company profile",
    icon: TrendingUp,
  },
  {
    key: "create_value",
    shortLabel: "Create value",
    title: "Create value through talent",
    description: "Connect people priorities to company strategy and measurable outcomes.",
    placeholder: "Example: Map priority roles to this year's growth strategy",
    href: "/assistants/recruiter",
    actionLabel: "Open recruiter assistant",
    icon: Target,
  },
];

export function TalentWorkspaceClient() {
  const workspaceQuery = useQuery({
    queryKey: ["talent-workspace"],
    queryFn: () => apiRequest<TalentWorkspace>("/users/me/talent-workspace"),
  });

  if (workspaceQuery.isError) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center ring-1 ring-slate-200">
        <h1 className="text-xl font-bold text-slate-950">Talent workspace unavailable</h1>
        <p className="mt-2 text-sm text-slate-600">This workspace is available to recruiter accounts.</p>
      </div>
    );
  }

  if (workspaceQuery.isLoading || !workspaceQuery.data) {
    return <div className="h-96 animate-pulse rounded-2xl bg-slate-200" />;
  }

  return <TalentWorkspaceEditor initialWorkspace={workspaceQuery.data} />;
}

function TalentWorkspaceEditor({
  initialWorkspace,
}: {
  initialWorkspace: TalentWorkspace;
}) {
  const [workspace, setWorkspace] = useState<TalentWorkspace>(initialWorkspace);
  const [drafts, setDrafts] = useState<Record<PillarKey, string>>({
    identify_talent: "",
    attract_talent: "",
    support_talent: "",
    retain_talent: "",
    create_value: "",
  });
  const saveMutation = useMutation({
    mutationFn: (nextWorkspace: TalentWorkspace) =>
      apiRequest<TalentWorkspace>("/users/me/talent-workspace", {
        method: "PATCH",
        body: JSON.stringify(nextWorkspace),
      }),
    onSuccess: setWorkspace,
  });

  const addAction = (key: PillarKey) => {
    const title = drafts[key].trim();
    if (title.length < 2) return;
    const action: TalentAction = {
      id: crypto.randomUUID(),
      title,
      completed: false,
    };
    setWorkspace((current) => ({ ...current, [key]: [...current[key], action] }));
    setDrafts((current) => ({ ...current, [key]: "" }));
  };

  const updateActions = (key: PillarKey, actions: TalentAction[]) => {
    setWorkspace((current) => ({ ...current, [key]: actions }));
  };

  const completed = Object.values(workspace)
    .flat()
    .filter((action) => action.completed).length;
  const total = Object.values(workspace).flat().length;

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Recruiter workspace"
        title="Talent strategy"
        description="Turn the full talent lifecycle into a focused, trackable action plan."
        action={
          <Button
            onClick={() => saveMutation.mutate(workspace)}
            disabled={saveMutation.isPending}
            className="h-11 rounded-xl px-5"
          >
            <Save aria-hidden="true" />
            {saveMutation.isPending ? "Saving..." : "Save workspace"}
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <Summary label="Talent pillars" value="5" />
        <Summary label="Planned actions" value={String(total)} />
        <Summary label="Completed" value={String(completed)} />
      </div>

      {saveMutation.isSuccess && (
        <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          Your talent workspace has been saved.
        </p>
      )}
      {saveMutation.isError && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          The workspace could not be saved. Please try again.
        </p>
      )}

      <Tabs defaultValue="identify_talent" className="gap-5">
        <TabsList className="h-auto w-full justify-start overflow-x-auto rounded-xl bg-white p-2 ring-1 ring-slate-200">
          {pillars.map((pillar) => (
            <TabsTrigger key={pillar.key} value={pillar.key} className="min-h-10 px-4">
              {pillar.shortLabel}
            </TabsTrigger>
          ))}
        </TabsList>
        {pillars.map((pillar) => (
          <TabsContent key={pillar.key} value={pillar.key}>
            <PillarPanel
              pillar={pillar}
              actions={workspace[pillar.key]}
              draft={drafts[pillar.key]}
              onDraftChange={(value) =>
                setDrafts((current) => ({ ...current, [pillar.key]: value }))
              }
              onAdd={() => addAction(pillar.key)}
              onChange={(actions) => updateActions(pillar.key, actions)}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

function PillarPanel({
  pillar,
  actions,
  draft,
  onDraftChange,
  onAdd,
  onChange,
}: {
  pillar: (typeof pillars)[number];
  actions: TalentAction[];
  draft: string;
  onDraftChange: (value: string) => void;
  onAdd: () => void;
  onChange: (actions: TalentAction[]) => void;
}) {
  const Icon = pillar.icon;
  return (
    <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200 sm:p-7">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex gap-4">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-700">
            <Icon aria-hidden="true" className="size-5" />
          </span>
          <div>
            <h2 className="text-xl font-bold text-slate-950">{pillar.title}</h2>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-600">{pillar.description}</p>
          </div>
        </div>
        <Button asChild variant="outline" className="h-10 rounded-xl">
          <Link href={pillar.href}>{pillar.actionLabel}</Link>
        </Button>
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          onAdd();
        }}
        className="mt-7 flex flex-col gap-2 sm:flex-row"
      >
        <Input
          value={draft}
          onChange={(event) => onDraftChange(event.target.value)}
          placeholder={pillar.placeholder}
          maxLength={160}
          className="h-11 flex-1"
        />
        <Button type="submit" disabled={draft.trim().length < 2} className="h-11 rounded-xl px-5">
          <Plus aria-hidden="true" />
          Add action
        </Button>
      </form>

      <div className="mt-6 space-y-2">
        {actions.length === 0 ? (
          <p className="rounded-xl border border-dashed border-slate-300 px-5 py-8 text-center text-sm text-slate-500">
            Add the first action for this talent pillar.
          </p>
        ) : (
          actions.map((action) => (
            <div key={action.id} className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3">
              <button
                type="button"
                onClick={() =>
                  onChange(
                    actions.map((item) =>
                      item.id === action.id ? { ...item, completed: !item.completed } : item,
                    ),
                  )
                }
                className="text-blue-600"
                aria-label={action.completed ? "Mark action incomplete" : "Mark action complete"}
              >
                {action.completed ? <Check aria-hidden="true" /> : <Circle aria-hidden="true" />}
              </button>
              <span className={action.completed ? "flex-1 text-sm text-slate-400 line-through" : "flex-1 text-sm font-medium text-slate-700"}>
                {action.title}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => onChange(actions.filter((item) => item.id !== action.id))}
                aria-label="Delete action"
              >
                <Trash2 aria-hidden="true" />
              </Button>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
      <p className="text-2xl font-bold text-slate-950">{value}</p>
      <p className="mt-1 text-sm text-slate-500">{label}</p>
    </div>
  );
}
