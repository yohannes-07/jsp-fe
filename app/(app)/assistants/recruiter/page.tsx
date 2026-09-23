import { AssistantChat } from "@/components/chat/assistant-chat";

export default function RecruiterAssistantPage() {
  return (
    <AssistantChat
      name="Recruiter assistant"
      description="Explore candidate fit against the work your team needs done."
      assistantPath="recruiter"
      examples={[
        "Which candidates show the strongest operations leadership?",
        "Compare these profiles against the role requirements.",
        "What experience gaps should I explore in an interview?",
      ]}
      actionHref="/resumes"
      actionLabel="Find candidates"
    />
  );
}
