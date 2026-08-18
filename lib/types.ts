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

export type JobType = "full-time" | "part-time" | "contract" | "remote";
export type WorkNature =
  | "professional"
  | "fractional"
  | "tech"
  | "gig-economy"
  | "blue-collar"
  | "manual-labor"
  | "long-term"
  | "short-term";

export type Job = {
  id: string;
  recruiter_id: string;
  title: string;
  description: string;
  requirements: string;
  location: string;
  job_type: JobType;
  nature_of_work: WorkNature[];
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
