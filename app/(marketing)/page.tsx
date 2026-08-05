import {
  AiShowcase,
  EmployerSection,
  FinalCta,
  HeroSection,
  HowItWorks,
  JobsPreview,
  SupportSection,
  VisualStorySection,
} from "./_components/landing-sections";

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <VisualStorySection />
      <HowItWorks />
      <AiShowcase />
      <JobsPreview />
      <EmployerSection />
      <SupportSection />
      <FinalCta />
    </>
  );
}
