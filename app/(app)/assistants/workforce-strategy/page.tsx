import { AssistantChat } from "@/components/chat/assistant-chat";

export default function WorkforceStrategyAssistantPage() {
  return (
    <AssistantChat
      name="Workforce Value Strategy assistant"
      description="Build practical worker-support and talent initiatives, then connect them to measurable workforce and business outcomes without invented ROI claims."
      assistantPath="workforce-strategy"
      examples={[
        "Which support investments could reduce barriers for our hardest-to-fill roles?",
        "Create a 90-day retention and employee experience plan for our open roles.",
        "What metrics should we collect before estimating the value of this talent initiative?",
      ]}
      actionHref="/talent"
      actionLabel="Open talent workspace"
    />
  );
}
