import { createClient } from "@/lib/supabase/server";
import { ROLE_DASHBOARD } from "@/lib/roles";
import type { Profile, UserRole } from "@/lib/supabase/database.types";

export { ROLE_LABELS, ROLE_DASHBOARD } from "@/lib/roles";

export async function getCurrentProfile(): Promise<Profile | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error || !profile) return null;

  return profile;
}

export async function getDashboardPathForRole(
  role: UserRole
): Promise<string> {
  return ROLE_DASHBOARD[role];
}
