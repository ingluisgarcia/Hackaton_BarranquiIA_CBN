import { redirect } from "next/navigation";
import { getCurrentProfile, ROLE_DASHBOARD } from "@/lib/auth";

export default async function DashboardPage() {
  const profile = await getCurrentProfile();

  if (!profile) {
    redirect("/login");
  }

  redirect(ROLE_DASHBOARD[profile.role]);
}
