import { AssistantScaffold } from "@/components/chat/assistant-scaffold";


export default function CareerAssistantPage() {
  return (
    <AssistantScaffold
      name="Career assistant"
      description="Explore realistic career directions built around your strengths."
      examples={[
        "What roles could I move into from customer success?",
        "Which skills would open the next level for me?",
        "Help me compare two possible career paths.",
      ]}
    />
  );
}
