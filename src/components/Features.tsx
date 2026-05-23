import { Compass, Map, Route, Target } from "lucide-react";

const steps = [
  {
    icon: Compass,
    step: "01",
    title: "Descubre quién eres",
    description:
      "La IA identifica tus habilidades, intereses y fortalezas para entender desde dónde partes.",
    color: "bg-secondary/10 text-secondary",
  },
  {
    icon: Route,
    step: "02",
    title: "Elige tu dirección",
    description:
      "Te orientamos entre el camino laboral y el emprendimiento según tu perfil y tu contexto real.",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: Target,
    step: "03",
    title: "Desarrolla competencias",
    description:
      "Recibe un plan claro para fortalecer las habilidades que necesitas en el camino que elijas.",
    color: "bg-support/10 text-support",
  },
  {
    icon: Map,
    step: "04",
    title: "Da el primer paso",
    description:
      "Con mentoría continua, conviertes tu ruta en acciones concretas: postular, vender, crear o crecer.",
    color: "bg-brand/10 text-secondary",
  },
];

export function Features() {
  return (
    <section id="camino" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-secondary">
            Cómo funciona
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Te ayudamos a encontrar tu camino
          </h2>
          <p className="mt-4 text-lg text-muted">
            No te damos respuestas genéricas. Te acompañamos a descubrir qué camino
            tiene sentido para ti y cómo recorrerlo con confianza.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((item) => (
            <article
              key={item.title}
              className="card-surface relative rounded-[20px] border border-neutral-light p-6 transition-all duration-300 hover:-translate-y-1"
            >
              <span className="font-heading text-4xl font-bold text-secondary/15 dark:text-secondary/25">
                {item.step}
              </span>
              <div
                className={`mb-4 mt-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl ${item.color}`}
              >
                <item.icon size={24} />
              </div>
              <h3 className="font-heading text-xl font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-3 text-sm text-muted leading-relaxed">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
