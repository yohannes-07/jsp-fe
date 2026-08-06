import type { Metadata } from "next";

import { ResumesClient } from "./resumes-client";


export const metadata: Metadata = { title: "Resumes" };

export default function ResumesPage() {
  return <ResumesClient />;
}
