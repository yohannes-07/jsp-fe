import { z } from "zod";


export const loginSchema = z.object({
  email: z.email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const signupSchema = z
  .object({
    full_name: z.string().min(2, "Enter your full name").max(160),
    email: z.email("Enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters").max(128),
    role: z.enum(["job_seeker", "recruiter"]),
    company_name: z.string().max(200).optional(),
    target_role: z.string().max(160).optional(),
    location: z.string().max(160).optional(),
    skills: z.string().max(1000).optional(),
    experience_level: z.enum(["entry", "mid", "senior", "lead", "executive"]).optional(),
    remote_preference: z.boolean(),
  })
  .superRefine((data, context) => {
    if (data.role === "recruiter" && !data.company_name?.trim()) {
      context.addIssue({
        code: "custom",
        path: ["company_name"],
        message: "Company name is required for recruiters",
      });
    }
    if (data.role === "job_seeker") {
      for (const [field, message] of [
        ["target_role", "Enter the role you want"],
        ["location", "Enter your location"],
        ["skills", "Enter at least one skill"],
        ["experience_level", "Choose your experience level"],
      ] as const) {
        if (!data[field]?.trim()) {
          context.addIssue({ code: "custom", path: [field], message });
        }
      }
    }
  });

export type LoginValues = z.infer<typeof loginSchema>;
export type SignupValues = z.infer<typeof signupSchema>;
