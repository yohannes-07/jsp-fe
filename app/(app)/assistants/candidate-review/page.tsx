import { AssistantChat } from "@/components/chat/assistant-chat";

export default function CandidateReviewAssistantPage() {
  return (
    <AssistantChat
      name="Candidate Review assistant"
      description="Review recruiter-visible candidate evidence against explicit, job-related requirements. CirWork highlights evidence and gaps while leaving decisions with your hiring team."
      assistantPath="candidate-review"
      examples={[
        "Find candidates with operations leadership and stakeholder management skills.",
        "Compare the retrieved candidates against these role requirements.",
        "What evidence gaps should I verify consistently in interviews?",
      ]}
      actionHref="/resumes"
      actionLabel="Find candidates"
    />
  );
}
