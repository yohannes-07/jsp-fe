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
  })
  .superRefine((data, context) => {
    if (data.role === "recruiter" && !data.company_name?.trim()) {
      context.addIssue({
        code: "custom",
        path: ["company_name"],
        message: "Company name is required for recruiters",
      });
    }
  });

export type LoginValues = z.infer<typeof loginSchema>;
export type SignupValues = z.infer<typeof signupSchema>;
