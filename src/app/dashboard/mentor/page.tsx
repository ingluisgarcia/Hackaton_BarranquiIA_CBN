import { redirect } from "next/navigation";
import { Award, Star, Users } from "lucide-react";
import { getCurrentProfile } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export default async function MentorDashboard() {
  const profile = await getCurrentProfile();

  if (!profile) redirect("/login");
  if (profile.role !== "mentor") redirect("/dashboard");

  const supabase = await createClient();
  const { data: mentorProfile } = await supabase
    .from("mentor_profiles")
    .select("*")
    .eq("id", profile.id)
    .single();

  const { count: mentorshipCount } = await supabase
    .from("mentorships")
    .select("*", { count: "exact", head: true })
    .eq("mentor_id", profile.id)
    .eq("status", "active");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold text-foreground">
          Panel de Mentor
        </h1>
        <p className="mt-2 text-muted">
          Guía emprendedores y comparte tu experiencia para generar impacto.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-[20px] card-surface border border-neutral-light p-6">
          <Users className="mb-3 text-secondary" size={24} />
          <p className="text-sm text-muted">Emprendedores activos</p>
          <p className="font-heading text-2xl font-bold text-foreground">
            {mentorshipCount ?? 0}
          </p>
        </div>
        <div className="rounded-[20px] card-surface border border-neutral-light p-6">
          <Star className="mb-3 text-accent" size={24} />
          <p className="text-sm text-muted">Experiencia</p>
          <p className="font-heading text-2xl font-bold text-foreground">
            {mentorProfile?.years_experience ?? 0} años
          </p>
        </div>
        <div className="rounded-[20px] card-surface border border-neutral-light p-6">
          <Award className="mb-3 text-support" size={24} />
          <p className="text-sm text-muted">Estado</p>
          <p className="font-heading text-2xl font-bold text-foreground">
            {mentorProfile?.is_verified ? "Verificado" : "Pendiente"}
          </p>
        </div>
      </div>

      <section id="emprendedores" className="rounded-[20px] card-surface border border-neutral-light p-6">
        <h2 className="font-heading text-xl font-semibold text-foreground">
          Emprendedores asignados
        </h2>
        <p className="mt-3 text-muted">
          Aún no tienes emprendedores asignados. Un administrador puede vincular
          mentorías desde el panel de admin.
        </p>
      </section>

      <section id="perfil" className="rounded-[20px] card-surface border border-neutral-light p-6">
        <h2 className="font-heading text-xl font-semibold text-foreground">
          Mi perfil profesional
        </h2>
        <dl className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-sm text-muted">Bio</dt>
            <dd className="font-medium text-foreground">
              {mentorProfile?.bio || "Completa tu biografía para atraer emprendedores."}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-muted">LinkedIn</dt>
            <dd className="font-medium text-foreground">
              {mentorProfile?.linkedin_url || "Sin definir"}
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-sm text-muted">Especialidades</dt>
            <dd className="mt-1 flex flex-wrap gap-2">
              {(mentorProfile?.expertise ?? []).length > 0 ? (
                mentorProfile?.expertise?.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary"
                  >
                    {item}
                  </span>
                ))
              ) : (
                <span className="text-foreground">Sin especialidades definidas</span>
              )}
            </dd>
          </div>
        </dl>
      </section>
    </div>
  );
}
