import Link from "next/link";
import { Briefcase, CheckCircle2, Rocket } from "lucide-react";
import { Button } from "./ui/Button";
import { LaborPathSection } from "./LaborPathEmbed";

const paths = [
  {
    icon: Briefcase,
    title: "Camino laboral",
    subtitle: "Ser competente en el mundo del empleo",
    description:
      "Ideal si quieres insertarte en el mercado laboral, crecer profesionalmente y construir una carrera sólida.",
    points: [
      "Identificar habilidades demandadas por el mercado",
      "Prepararte para entrevistas y procesos de selección",
      "Desarrollar competencias técnicas y blandas",
      "Conectar con oportunidades reales de empleo",
    ],
    accent: "border-secondary/30 bg-secondary/5",
    iconColor: "bg-secondary/10 text-secondary",
  },
  {
    icon: Rocket,
    title: "Camino emprendedor",
    subtitle: "Ser capaz de crear y hacer crecer tu negocio",
    description:
      "Ideal si tienes una idea, quieres monetizar tus habilidades o prefieres construir algo propio.",
    points: [
      "Validar ideas de negocio con bajo riesgo",
      "Aprender a vender y posicionarte en el mercado",
      "Recibir mentoría para tomar mejores decisiones",
      "Generar tus primeros ingresos como emprendedor",
    ],
    accent: "border-accent/30 bg-accent/5",
    iconColor: "bg-accent/10 text-accent",
  },
];

export function Benefits() {
  return (
    <section id="rutas" className="gradient-bg-soft py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-secondary">
            Dos caminos posibles
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Empleo o emprendimiento: tú decides
          </h2>
          <p className="mt-4 text-lg text-muted">
            No existe un solo camino correcto. Lo importante es encontrar el que
            se adapte a ti — y Synervia te ayuda a descubrirlo y recorrerlo.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {paths.map((path) => (
            <article
              key={path.title}
              className={`card-surface rounded-[20px] border p-8 ${path.accent}`}
            >
              <div
                className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${path.iconColor}`}
              >
                <path.icon size={28} />
              </div>
              <h3 className="font-heading text-2xl font-bold text-foreground">
                {path.title}
              </h3>
              <p className="mt-1 text-sm font-medium text-secondary">
                {path.subtitle}
              </p>
              <p className="mt-4 text-muted leading-relaxed">{path.description}</p>
              <ul className="mt-6 space-y-3">
                {path.points.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm text-foreground">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-accent" />
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <LaborPathSection />

        <div className="mt-12 text-center">
          <p className="text-muted">
            ¿Aún no sabes cuál es tu camino? La IA te ayuda a descubrirlo.
          </p>
          <Link href="/registro" className="mt-6 inline-block">
            <Button size="lg">Encuentra tu ruta ahora</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
