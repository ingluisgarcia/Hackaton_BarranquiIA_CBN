import { redirect } from "next/navigation";
import {
  Bot,
  BookOpen,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import { getCurrentProfile } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export default async function EmprendedorDashboard() {
  const profile = await getCurrentProfile();

  if (!profile) redirect("/login");
  if (profile.role !== "emprendedor") redirect("/dashboard");

  const supabase = await createClient();
  const { data: entrepreneurProfile } = await supabase
    .from("entrepreneur_profiles")
    .select("*")
    .eq("id", profile.id)
    .single();

  const stats = [
    { icon: Sparkles, label: "Automatizaciones", value: "0 activas" },
    { icon: BookOpen, label: "Cursos", value: "0 completados" },
    { icon: Users, label: "Mentores", value: "0 asignados" },
    { icon: TrendingUp, label: "Progreso", value: "En inicio" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold text-foreground">
          Hola, {profile.full_name.split(" ")[0]} 👋
        </h1>
        <p className="mt-2 text-muted">
          Bienvenido a tu panel de emprendedor. Aquí gestionas tu crecimiento con IA.
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
            <p className="font-heading text-xl font-bold text-foreground">{stat.value}</p>
          </div>
        ))}
      </div>

      <section id="herramientas" className="rounded-[20px] card-surface border border-neutral-light p-6">
        <div className="flex items-center gap-3">
          <Bot className="text-accent" size={24} />
          <h2 className="font-heading text-xl font-semibold text-foreground">
            Asistente IA
          </h2>
        </div>
        <p className="mt-3 text-muted">
          Próximamente podrás automatizar tareas, generar contenido y tomar decisiones
          con tu asistente inteligente personalizado.
        </p>
      </section>

      <section id="mentores" className="rounded-[20px] card-surface border border-neutral-light p-6">
        <h2 className="font-heading text-xl font-semibold text-foreground">
          Mi perfil de negocio
        </h2>
        <dl className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-sm text-muted">Negocio</dt>
            <dd className="font-medium text-foreground">
              {entrepreneurProfile?.business_name || "Sin definir"}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-muted">Industria</dt>
            <dd className="font-medium text-foreground">
              {entrepreneurProfile?.industry || "Sin definir"}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-muted">Etapa</dt>
            <dd className="font-medium text-foreground">
              {entrepreneurProfile?.business_stage || "Sin definir"}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-muted">Ciudad</dt>
            <dd className="font-medium text-foreground">
              {entrepreneurProfile?.city || "Sin definir"}
            </dd>
          </div>
        </dl>
      </section>
    </div>
  );
}
