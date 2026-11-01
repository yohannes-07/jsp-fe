import { AssistantChat } from "@/components/chat/assistant-chat";

export default function HiringRetentionAssistantPage() {
  return (
    <AssistantChat
      name="Hiring and Retention assistant"
      description="Improve hiring, remove practical barriers for workers, and build a measurable plan for keeping employees—without invented ROI claims."
      assistantPath="hiring-retention"
      examples={[
        "Why are we receiving so few applications for our hardest-to-fill roles?",
        "Create a 90-day plan to improve early employee retention.",
        "Which worker support options could reduce attendance or transport barriers?",
      ]}
      actionHref="/talent"
      actionLabel="Open talent workspace"
    />
  );
}
