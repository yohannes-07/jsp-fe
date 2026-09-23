import { AssistantChat } from "@/components/chat/assistant-chat";

export default function SupportAssistantPage() {
  return (
    <AssistantChat
      name="Support assistant"
      description="Find practical resources that can make the path to work more manageable."
      assistantPath="support"
      examples={[
        "Find training support near me.",
        "What childcare resources could help while I interview?",
        "Show transport assistance available in my area.",
      ]}
    />
  );
}
