import {
  AiShowcase,
  EmployerSection,
  FinalCta,
  HeroSection,
  HowItWorks,
  JobSeekerSearchSection,
  JobsPreview,
  SupportSection,
  VisualStorySection,
} from "./_components/landing-sections";

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <JobSeekerSearchSection />
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
