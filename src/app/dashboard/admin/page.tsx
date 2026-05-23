import { redirect } from "next/navigation";
import { GraduationCap, Shield, UserCheck, Users } from "lucide-react";
import { getCurrentProfile, ROLE_LABELS } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboard() {
  const profile = await getCurrentProfile();

  if (!profile) redirect("/login");
  if (profile.role !== "administrador") redirect("/dashboard");

  const supabase = await createClient();

  const [
    { count: totalUsers },
    { count: entrepreneurs },
    { count: students },
    { count: mentors },
    { count: admins },
    { data: recentUsers },
  ] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .eq("role", "emprendedor"),
    supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .eq("role", "estudiante"),
    supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .eq("role", "mentor"),
    supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .eq("role", "administrador"),
    supabase
      .from("profiles")
      .select("id, full_name, email, role, created_at")
      .order("created_at", { ascending: false })
      .limit(10),
  ]);

  const stats = [
    { icon: Users, label: "Total usuarios", value: totalUsers ?? 0 },
    { icon: GraduationCap, label: "Estudiantes", value: students ?? 0 },
    { icon: UserCheck, label: "Emprendedores", value: entrepreneurs ?? 0 },
    { icon: Shield, label: "Mentores", value: mentors ?? 0 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold text-foreground">
          Panel de Administración
        </h1>
        <p className="mt-2 text-muted">
          Gestiona usuarios, roles y mentorías de la plataforma Synervia.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-[20px] card-surface border border-neutral-light p-6"
          >
            <stat.icon className="mb-3 text-secondary" size={24} />
            <p className="text-sm text-muted">{stat.label}</p>
            <p className="font-heading text-2xl font-bold text-foreground">{stat.value}</p>
          </div>
        ))}
      </div>

      <section id="usuarios" className="rounded-[20px] card-surface border border-neutral-light p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-heading text-xl font-semibold text-foreground">
            Usuarios recientes
          </h2>
          <span className="text-sm text-muted">
            {admins ?? 0} administrador(es)
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-neutral-light text-muted">
                <th className="pb-3 pr-4 font-medium">Nombre</th>
                <th className="pb-3 pr-4 font-medium">Email</th>
                <th className="pb-3 pr-4 font-medium">Rol</th>
                <th className="pb-3 font-medium">Registro</th>
              </tr>
            </thead>
            <tbody>
              {(recentUsers ?? []).map((user) => (
                <tr key={user.id} className="border-b border-neutral-light/60">
                  <td className="py-3 pr-4 font-medium text-foreground">
                    {user.full_name}
                  </td>
                  <td className="py-3 pr-4 text-muted">{user.email}</td>
                  <td className="py-3 pr-4">
                    <span className="rounded-full bg-secondary/10 px-2.5 py-1 text-xs font-semibold text-secondary">
                      {ROLE_LABELS[user.role]}
                    </span>
                  </td>
                  <td className="py-3 text-muted">
                    {new Date(user.created_at).toLocaleDateString("es-CO")}
                  </td>
                </tr>
              ))}
              {(recentUsers ?? []).length === 0 && (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-muted">
                    No hay usuarios registrados aún.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section id="mentorias" className="rounded-[20px] card-surface border border-neutral-light p-6">
        <h2 className="font-heading text-xl font-semibold text-foreground">
          Gestión de mentorías
        </h2>
        <p className="mt-3 text-muted">
          Desde Supabase o el panel de admin puedes vincular mentores con
          emprendedores en la tabla <code className="text-secondary">mentorships</code>.
        </p>
      </section>
    </div>
  );
}
