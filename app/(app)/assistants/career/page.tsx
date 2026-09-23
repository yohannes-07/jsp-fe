import { AssistantChat } from "@/components/chat/assistant-chat";

export default function CareerAssistantPage() {
  return (
    <AssistantChat
      name="Career assistant"
      description="Explore realistic career directions built around your strengths."
      assistantPath="career"
      examples={[
        "What roles could I move into from customer success?",
        "Which skills would open the next level for me?",
        "Help me compare two possible career paths.",
      ]}
    />
  );
}
