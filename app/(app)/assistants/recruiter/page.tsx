import { AssistantScaffold } from "@/components/chat/assistant-scaffold";


export default function RecruiterAssistantPage() {
  return (
    <AssistantScaffold
      name="Recruiter assistant"
      description="Explore candidate fit against the work your team needs done."
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
