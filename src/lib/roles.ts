import type { UserRole } from "@/lib/supabase/database.types";

export const REGISTERABLE_ROLES = [
  "emprendedor",
  "mentor",
  "estudiante",
] as const satisfies readonly UserRole[];

export type RegisterableRole = (typeof REGISTERABLE_ROLES)[number];

export const ROLE_LABELS: Record<UserRole, string> = {
  emprendedor: "Emprendedor",
  mentor: "Mentor",
  administrador: "Administrador",
  estudiante: "Estudiante",
};

export const ROLE_DASHBOARD: Record<UserRole, string> = {
  emprendedor: "/dashboard/emprendedor",
  mentor: "/dashboard/mentor",
  administrador: "/dashboard/admin",
  estudiante: "/dashboard/estudiante",
};
