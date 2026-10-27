"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Bot, Clock3, Loader2, Plus, RotateCcw, Send, Sparkles, User } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { useAssistantChat } from "@/hooks/use-assistant-chat";

export function AssistantChat({
  name,
  description,
  examples,
  assistantPath,
  actionHref,
  actionLabel,
}: {
  name: string;
  description: string;
  examples: string[];
  assistantPath: "resume" | "career" | "recruiter" | "support";
  actionHref?: string;
  actionLabel?: string;
}) {
  const {
    messages,
    isLoading,
    isHistoryLoading,
    conversations,
    error,
    sendMessage,
    retry,
    newConversation,
    selectConversation,
  } = useAssistantChat(assistantPath);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      sendMessage(input);
      setInput("");
    }
  };

  const handleExampleClick = (example: string) => {
    if (!isLoading) {
      sendMessage(example);
    }
  };

  return (
    <div className="mx-auto flex max-w-5xl flex-col h-[calc(100vh-8rem)]">
      <div className="flex-none">
        <PageHeader eyebrow="AI assistant" title={name} description={description} />
      </div>

      <div className="mt-8 grid min-h-0 flex-1 gap-5 lg:grid-cols-[1fr_0.75fr]">
        <section className="flex min-h-0 flex-col rounded-2xl bg-white ring-1 ring-slate-200">
          <div className="flex-1 overflow-y-auto p-6 sm:p-8">
            {isHistoryLoading && messages.length === 0 && (
              <div className="grid h-full place-items-center text-sm text-slate-500">
                <span className="inline-flex items-center gap-2"><Loader2 className="size-4 animate-spin" />Loading your conversation…</span>
              </div>
            )}
            {!isHistoryLoading && messages.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <span className="grid size-12 place-items-center rounded-2xl bg-blue-50 text-blue-700">
                  <Bot aria-hidden="true" className="size-5" />
                </span>
                <h2 className="mt-6 text-xl font-bold text-slate-950">Your conversation</h2>
                <p className="mt-2 max-w-lg text-sm leading-6 text-slate-600">
                  Your conversations and personalized guidance will stay together here.
                </p>
                {actionHref && actionLabel && (
                  <Button asChild className="mt-6 h-11 rounded-xl">
                    <Link href={actionHref}>
                      {actionLabel}
                      <ArrowRight aria-hidden="true" />
                    </Link>
                  </Button>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-4 ${
                      message.role === "assistant" ? "flex-row" : "flex-row-reverse"
                    }`}
                  >
                    <div
                      className={`grid size-8 shrink-0 place-items-center rounded-full ${
                        message.role === "assistant"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {message.role === "assistant" ? (
                        <Bot className="size-4" />
                      ) : (
                        <User className="size-4" />
                      )}
                    </div>
                    <div
                      className={`flex max-w-[85%] flex-col gap-2 rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        message.role === "assistant"
                          ? "bg-blue-50 text-slate-900 rounded-tl-sm"
                          : "bg-slate-900 text-white rounded-tr-sm"
                      }`}
                    >
                      <div className="whitespace-pre-wrap">{message.content}</div>
                      
                      {/* Render support resources if present in context */}
                      {message.retrieved_context?.resources && message.retrieved_context.resources.length > 0 && (
                        <div className="mt-4 flex flex-col gap-3">
                          <p className="text-xs font-semibold uppercase tracking-wider text-blue-800">
                            Recommended Resources
                          </p>
                          <div className="grid gap-3 sm:grid-cols-2">
                            {message.retrieved_context.resources.map((resource, idx) => (
                              <a
                                key={idx}
                                href={resource.source_url}
                                target="_blank"
                                rel="noreferrer"
                                className="block rounded-lg border border-blue-200 bg-white p-3 shadow-sm transition hover:border-blue-300 hover:shadow"
                              >
                                <div className="text-xs font-medium text-blue-600">
                                  {resource.category}
                                </div>
                                <div className="mt-1 font-semibold text-slate-900 line-clamp-1">
                                  {resource.title}
                                </div>
                                <div className="mt-1 text-xs text-slate-500 line-clamp-2">
                                  {resource.description}
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                      {message.retrieved_context?.relevant_jobs && message.retrieved_context.relevant_jobs.length > 0 && (
                        <div className="mt-4 space-y-2">
                          <p className="text-xs font-semibold uppercase tracking-wider text-blue-800">Relevant opportunities</p>
                          {message.retrieved_context.relevant_jobs.slice(0, 4).map((job) => (
                            <Link key={job.id} href={`/jobs/${job.id}`} className="block rounded-lg border border-blue-200 bg-white p-3 transition hover:border-blue-400">
                              <span className="font-semibold text-slate-900">{job.title}</span>
                              <span className="mt-1 block text-xs text-slate-500">{job.location} · {job.workplace_type}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                      {message.retrieved_context?.candidates && message.retrieved_context.candidates.length > 0 && (
                        <div className="mt-4 space-y-2">
                          <p className="text-xs font-semibold uppercase tracking-wider text-blue-800">Matching candidates</p>
                          {message.retrieved_context.candidates.slice(0, 5).map((candidate) => (
                            <div key={candidate.resume_id} className="rounded-lg border border-blue-200 bg-white p-3">
                              <span className="font-semibold text-slate-900">{candidate.full_name}</span>
                              <span className="mt-1 block text-xs text-slate-500">{candidate.experience_level ?? "Experience not specified"} · {candidate.location ?? "Location not specified"}</span>
                              <span className="mt-1 block text-xs text-slate-600">{candidate.skills.slice(0, 5).join(", ") || "No skills listed"}</span>
                            </div>
                          ))}
                          <Button asChild variant="outline" size="sm"><Link href="/resumes">Open candidate search</Link></Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-4">
                    <div className="grid size-8 shrink-0 place-items-center rounded-full bg-blue-100 text-blue-700">
                      <Bot className="size-4" />
                    </div>
                    <div className="flex items-center rounded-2xl rounded-tl-sm bg-blue-50 px-4 py-3 text-sm text-slate-500">
                      <Loader2 className="size-4 animate-spin" />
                      <span className="ml-2">CirWork is thinking...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
            {error && (
              <div role="alert" className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                <span>{error}</span>
                <Button type="button" size="sm" variant="outline" onClick={retry} disabled={isLoading}><RotateCcw className="size-3.5" />Retry</Button>
              </div>
            )}
          </div>

          <div className="flex-none border-t border-slate-100 p-4 sm:p-6">
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 rounded-xl bg-slate-50 p-2 ring-1 ring-inset ring-slate-200 focus-within:ring-2 focus-within:ring-blue-600"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Message assistant..."
                className="flex-1 bg-transparent px-3 text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none"
                disabled={isLoading}
              />
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim() || isLoading}
                className="size-8 rounded-lg"
              >
                <Send className="size-4" />
                <span className="sr-only">Send message</span>
              </Button>
            </form>
          </div>
        </section>

        <aside className="flex flex-col rounded-2xl bg-slate-950 p-6 text-white sm:p-8">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-blue-300"><Clock3 className="size-4" />Recent conversations</div>
            <button type="button" onClick={newConversation} className="rounded-lg p-1.5 text-blue-200 hover:bg-white/10 hover:text-white" aria-label="Start a new conversation"><Plus className="size-4" /></button>
          </div>
          {conversations.length > 0 ? (
            <div className="mt-3 max-h-40 space-y-2 overflow-y-auto border-b border-white/10 pb-5">
              {conversations.slice(0, 5).map((conversation) => (
                <button key={conversation.id} type="button" onClick={() => void selectConversation(conversation.id)} className="block w-full truncate rounded-lg bg-white/5 px-3 py-2 text-left text-xs text-slate-300 hover:bg-white/10">{conversation.preview || "New conversation"}</button>
              ))}
            </div>
          ) : <p className="mt-3 border-b border-white/10 pb-5 text-xs text-slate-400">Your saved conversations will appear here.</p>}
          <div className="flex items-center gap-2 text-sm font-semibold text-blue-300">
            <Sparkles aria-hidden="true" className="size-4" />
            Questions to explore
          </div>
          <ul className="mt-6 space-y-3">
            {examples.map((example) => (
              <li key={example}>
                <button
                  onClick={() => handleExampleClick(example)}
                  disabled={isLoading}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm leading-6 text-slate-200 transition hover:bg-white/10 disabled:opacity-50"
                >
                  {example}
                </button>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
