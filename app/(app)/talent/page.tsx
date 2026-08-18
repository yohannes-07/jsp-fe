import type { Metadata } from "next";

import { TalentWorkspaceClient } from "./talent-workspace-client";

export const metadata: Metadata = { title: "Talent strategy" };

export default function TalentPage() {
  return <TalentWorkspaceClient />;
}
