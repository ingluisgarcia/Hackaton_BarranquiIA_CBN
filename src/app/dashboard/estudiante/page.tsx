import { redirect } from "next/navigation";
import {
  BookOpen,
  Bot,
  GraduationCap,
  Sparkles,
  Target,
} from "lucide-react";
import { getCurrentProfile } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export default async function EstudianteDashboard() {
  const profile = await getCurrentProfile();

  if (!profile) redirect("/login");
  if (profile.role !== "estudiante") redirect("/dashboard");

  const supabase = await createClient();
  const { data: studentProfile } = await supabase
    .from("student_profiles")
    .select("*")
    .eq("id", profile.id)
    .single();

  const stats = [
    { icon: BookOpen, label: "Cursos activos", value: "0 en progreso" },
    { icon: Target, label: "Habilidades", value: "0 en desarrollo" },
    { icon: Sparkles, label: "Plan de aprendizaje", value: "Por definir" },
    { icon: GraduationCap, label: "Progreso", value: "En inicio" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold text-foreground">
          Hola, {profile.full_name.split(" ")[0]} 👋
        </h1>
        <p className="mt-2 text-muted">
          Bienvenido a tu panel de estudiante. Aquí desarrollas las competencias
          que te harán más competitivo en el mundo laboral.
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
            <p className="font-heading text-xl font-bold text-foreground">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <section
        id="aprendizaje"
        className="rounded-[20px] card-surface border border-neutral-light p-6"
      >
        <div className="flex items-center gap-3">
          <Bot className="text-accent" size={24} />
          <h2 className="font-heading text-xl font-semibold text-foreground">
            Orientación con IA
          </h2>
        </div>
        <p className="mt-3 text-muted">
          Próximamente recibirás recomendaciones personalizadas de cursos,
          habilidades y rutas de aprendizaje según tu meta laboral.
        </p>
      </section>

      <section
        id="perfil"
        className="rounded-[20px] card-surface border border-neutral-light p-6"
      >
        <h2 className="font-heading text-xl font-semibold text-foreground">
          Mi perfil de aprendizaje
        </h2>
        <dl className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-sm text-muted">Meta laboral</dt>
            <dd className="font-medium text-foreground">
              {studentProfile?.career_goal || "Sin definir"}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-muted">Nivel educativo</dt>
            <dd className="font-medium text-foreground">
              {studentProfile?.education_level || "Sin definir"}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-muted">Ciudad</dt>
            <dd className="font-medium text-foreground">
              {studentProfile?.city || "Sin definir"}
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-sm text-muted">Habilidades a desarrollar</dt>
            <dd className="font-medium text-foreground">
              {(studentProfile?.target_skills ?? []).length > 0 ? (
                <div className="mt-2 flex flex-wrap gap-2">
                  {studentProfile?.target_skills?.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                "Sin definir"
              )}
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-sm text-muted">Sobre mí</dt>
            <dd className="font-medium text-foreground">
              {studentProfile?.bio || "Completa tu perfil para recibir mejores recomendaciones."}
            </dd>
          </div>
        </dl>
      </section>
    </div>
  );
}
