import { AssistantScaffold } from "@/components/chat/assistant-scaffold";


export default function JobDiscoveryAssistantPage() {
  return (
    <AssistantScaffold
      name="Job discovery assistant"
      description="Turn what you want from your next role into a clearer search."
      examples={[
        "Find remote operations roles that value customer-facing experience.",
        "Which of these roles best matches my background?",
        "Show me a different direction using the same skills.",
      ]}
      actionHref="/jobs"
      actionLabel="Browse jobs"
    />
  );
}
