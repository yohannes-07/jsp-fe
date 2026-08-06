import { AssistantScaffold } from "@/components/chat/assistant-scaffold";


export default function SupportAssistantPage() {
  return (
    <AssistantScaffold
      name="Support assistant"
      description="Find practical resources that can make the path to work more manageable."
      examples={[
        "Find training support near me.",
        "What childcare resources could help while I interview?",
        "Show transport assistance available in my area.",
      ]}
    />
  );
}
