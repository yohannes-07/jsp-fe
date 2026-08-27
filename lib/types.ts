export type UserRole = "job_seeker" | "recruiter";
export type ExperienceLevel = "entry" | "mid" | "senior" | "lead" | "executive";

export type User = {
  id: string;
  is_active: boolean;
  email: string;
  role: UserRole;
  full_name: string;
  location: string | null;
  skills: string[] | null;
  experience_level: ExperienceLevel | null;
  preferences: Record<string, unknown>;
  company_name: string | null;
  company_logo_url: string | null;
  created_at: string;
  updated_at: string;
};

export type AuthResponse = {
  access_token: string;
  token_type: "bearer";
  user: User;
};

export type JobType =
  | "full-time"
  | "part-time"
  | "contract"
  | "internship"
  | "freelance"
  | "fractional";
export type WorkplaceType = "on-site" | "hybrid" | "remote";
export type JobExperienceLevel = "entry" | "mid" | "senior" | "lead" | "executive";

export type Job = {
  id: string;
  recruiter_id: string;
  title: string;
  skills: string[];
  description: string;
  requirements: string;
  location: string;
  job_type: JobType;
  workplace_type: WorkplaceType;
  experience_levels: JobExperienceLevel[];
  salary_min: number | null;
  salary_max: number | null;
  status: "open" | "closed";
  created_at: string;
  updated_at: string;
  recruiter: {
    id: string;
    full_name: string;
    company_name: string | null;
    company_logo_url: string | null;
  };
};

export type JobList = {
  items: Job[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
  has_next: boolean;
  has_previous: boolean;
  semantic_available?: boolean;
};

export type Resume = {
  id: string;
  file_name: string;
  content_type: string;
  skills: string[];
  experience_level: ExperienceLevel | null;
  is_primary: boolean;
  recruiter_visible: boolean;
  indexing_status: "pending" | "indexed";
  created_at: string;
  updated_at: string;
};

export type Candidate = {
  id: string;
  user_id: string;
  full_name: string;
  location: string | null;
  skills: string[];
  experience_level: ExperienceLevel | null;
  score: number;
  indexing_status: "pending" | "indexed";
};

export type CandidateList = {
  items: Candidate[];
  total: number;
  page: number;
  page_size: number;
  semantic_available: boolean;
};

export type QueryResponse = {
  intent: "job_search" | "faq" | "assistant_redirect" | "general";
  answer: string;
  redirect_url: string | null;
  assistant: string | null;
};

export type TalentAction = {
  id: string;
  title: string;
  completed: boolean;
};

export type TalentWorkspace = {
  identify_talent: TalentAction[];
  attract_talent: TalentAction[];
  support_talent: TalentAction[];
  retain_talent: TalentAction[];
  create_value: TalentAction[];
};
