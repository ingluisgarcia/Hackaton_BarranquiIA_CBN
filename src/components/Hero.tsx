import Link from "next/link";
import { ArrowRight, Briefcase, Compass, Rocket, Sparkles } from "lucide-react";
import { Button } from "./ui/Button";
import { LABOR_PATH_HASH } from "@/lib/labor-path";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden pt-28 pb-20 lg:pt-36 lg:pb-32"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-secondary/10 blur-3xl dark:bg-secondary/20" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-accent/10 blur-3xl dark:bg-accent/15" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="animate-fade-up">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-neutral-light bg-surface-elevated px-4 py-2 text-sm font-medium text-secondary shadow-sm">
              <Compass size={16} className="text-accent" />
              <span className="text-foreground">Tu camino empieza aquí</span>
            </div>

            <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-[52px] lg:leading-[1.1]">
              Encuentra el camino para ser{" "}
              <span className="gradient-text">competente y exitoso</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
              Muchos jóvenes tienen talento, pero no saben si deben buscar empleo
              o emprender. Synervia te ayuda a descubrir tu ruta, desarrollar
              las habilidades que necesitas y dar el primer paso con confianza.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-neutral-light bg-surface-elevated px-4 py-2 text-sm font-medium text-foreground">
                <Briefcase size={16} className="text-secondary" />
                Mundo laboral
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-neutral-light bg-surface-elevated px-4 py-2 text-sm font-medium text-foreground">
                <Rocket size={16} className="text-accent" />
                Emprendimiento
              </span>
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/registro">
                <Button size="lg" className="group">
                  Descubre tu camino
                  <ArrowRight
                    size={20}
                    className="ml-2 transition-transform group-hover:translate-x-1"
                  />
                </Button>
              </Link>
              <Button variant="secondary" size="lg" href={LABOR_PATH_HASH}>
                Ver cómo funciona
              </Button>
            </div>
          </div>

          <div
            className="relative animate-fade-up lg:pl-8"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="relative mx-auto max-w-lg py-6 sm:py-10 lg:py-6">
              <div className="card-surface rounded-[20px] border border-neutral-light p-6">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl gradient-bg">
                    <Sparkles size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Orientación con IA
                    </p>
                    <p className="text-xs text-muted">Analizando tu perfil...</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-2xl bg-neutral-light/50 p-4 dark:bg-neutral-light/20">
                    <p className="text-sm text-foreground">
                      Terminé mis estudios y no sé si buscar empleo o montar
                      mi propio negocio. ¿Por dónde empiezo?
                    </p>
                  </div>
                  <div className="rounded-2xl gradient-bg-soft p-4">
                    <p className="text-sm text-foreground">
                      Tienes habilidades en comunicación y organización. Te
                      recomiendo explorar el{" "}
                      <strong className="font-semibold">camino laboral</strong>{" "}
                      en gestión de proyectos mientras validas una idea de negocio
                      paralela.
                    </p>
                  </div>
                </div>
              </div>

              <div className="card-surface absolute -top-2 -right-2 hidden rounded-2xl border border-neutral-light p-4 sm:block lg:-top-4 lg:-right-4">
                <p className="text-xs text-muted">Tu camino sugerido</p>
                <p className="font-heading text-lg font-bold text-secondary">
                  Empleabilidad
                </p>
              </div>

              <div className="card-surface absolute -bottom-2 -left-2 hidden rounded-2xl border border-neutral-light p-4 sm:block lg:-bottom-4 lg:-left-4">
                <p className="text-xs text-muted">Alternativa detectada</p>
                <p className="font-heading text-lg font-bold text-accent">
                  Emprender
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
