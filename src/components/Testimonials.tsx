import { Briefcase, Rocket, Shuffle } from "lucide-react";

const stories = [
  {
    icon: Briefcase,
    name: "Camila, 24 años",
    before: "No sabía qué estudiar ni dónde buscar empleo.",
    path: "Camino laboral",
    after:
      "Descubrió aptitudes en atención al cliente y marketing digital. Hoy trabaja en una startup local.",
    color: "bg-secondary/10 text-secondary",
  },
  {
    icon: Rocket,
    name: "Javier, 28 años",
    before: "Quería emprender pero no sabía si su idea funcionaría.",
    path: "Camino emprendedor",
    after:
      "Validó su negocio de servicios de diseño, consiguió sus primeros clientes y hoy factura cada mes.",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: Shuffle,
    name: "Laura, 22 años",
    before: "Oscilaba entre buscar empleo y trabajar por su cuenta.",
    path: "Camino híbrido",
    after:
      "Encontró un equilibrio: freelance de edición de video mientras construye su marca personal.",
    color: "bg-support/10 text-support",
  },
];

export function Testimonials() {
  return (
    <section id="ejemplos" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-secondary">
            Ejemplos reales
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Cada camino es diferente
          </h2>
          <p className="mt-4 text-lg text-muted">
            Lo que todos tienen en común: empezaron sin claridad y encontraron
            la ruta que tenía sentido para ellos.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {stories.map((story) => (
            <article
              key={story.name}
              className="card-surface flex flex-col rounded-[20px] border border-neutral-light p-6 transition-all duration-300 hover:-translate-y-1"
            >
              <div
                className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl ${story.color}`}
              >
                <story.icon size={24} />
              </div>
              <p className="font-semibold text-foreground">{story.name}</p>
              <span className="mt-2 inline-block w-fit rounded-full bg-neutral-light/50 px-3 py-1 text-xs font-medium text-muted dark:bg-neutral-light/20">
                {story.path}
              </span>

              <div className="mt-5 flex-1 space-y-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                    Antes
                  </p>
                  <p className="mt-1 text-sm text-muted leading-relaxed">
                    {story.before}
                  </p>
                </div>
                <div className="border-t border-neutral-light pt-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-secondary">
                    Después
                  </p>
                  <p className="mt-1 text-sm text-foreground leading-relaxed">
                    {story.after}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
