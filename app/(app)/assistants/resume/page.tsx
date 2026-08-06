import { AssistantScaffold } from "@/components/chat/assistant-scaffold";


export default function ResumeAssistantPage() {
  return (
    <AssistantScaffold
      name="Resume assistant"
      description="Present your experience clearly for the opportunities you want."
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
