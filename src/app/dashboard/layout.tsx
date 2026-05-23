import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentProfile } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import type { UserRole } from "@/lib/supabase/database.types";

const navByRole: Record<UserRole, { label: string; href: string }[]> = {
  emprendedor: [
    { label: "Mi panel", href: "/dashboard/emprendedor" },
    { label: "Herramientas IA", href: "/dashboard/emprendedor#herramientas" },
    { label: "Mis mentores", href: "/dashboard/emprendedor#mentores" },
  ],
  mentor: [
    { label: "Mi panel", href: "/dashboard/mentor" },
    { label: "Emprendedores", href: "/dashboard/mentor#emprendedores" },
    { label: "Mi perfil", href: "/dashboard/mentor#perfil" },
  ],
  administrador: [
    { label: "Panel admin", href: "/dashboard/admin" },
    { label: "Usuarios", href: "/dashboard/admin#usuarios" },
    { label: "Mentorías", href: "/dashboard/admin#mentorias" },
  ],
  estudiante: [
    { label: "Mi panel", href: "/dashboard/estudiante" },
    { label: "Aprendizaje", href: "/dashboard/estudiante#aprendizaje" },
    { label: "Mi perfil", href: "/dashboard/estudiante#perfil" },
  ],
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getCurrentProfile();

  if (!profile) {
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/login?error=profile_missing");
  }

  const navItems = navByRole[profile.role];

  return (
    <div className="min-h-screen bg-neutral-light/30 dark:bg-transparent">
      <DashboardHeader fullName={profile.full_name} role={profile.role} />

      <div className="mx-auto flex max-w-7xl gap-8 px-6 py-8">
        <aside className="hidden w-56 shrink-0 lg:block">
          <nav className="sticky top-8 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-xl px-4 py-2.5 text-sm font-medium text-muted transition hover:bg-surface-elevated hover:text-secondary"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
