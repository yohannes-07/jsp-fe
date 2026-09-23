import { AssistantChat } from "@/components/chat/assistant-chat";

export default function ResumeAssistantPage() {
  return (
    <AssistantChat
      name="Resume assistant"
      description="Present your experience clearly for the opportunities you want."
      assistantPath="resume"
      examples={[
        "What are the strongest parts of my resume?",
        "How can I tailor my experience to this role?",
        "Which skills should be easier to find?",
      ]}
      actionHref="/resumes"
      actionLabel="View resumes"
    />
  );
}
