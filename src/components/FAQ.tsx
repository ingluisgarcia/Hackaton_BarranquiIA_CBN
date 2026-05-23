"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "¿Qué significa encontrar mi camino?",
    answer:
      "Significa descubrir si tu mejor opción hoy es prepararte para el mundo laboral, emprender un negocio, o combinar ambos. Synervia te ayuda a tomar esa decisión con claridad y un plan concreto.",
  },
  {
    question: "¿Y si no sé si quiero empleo o emprender?",
    answer:
      "Es lo más común. La plataforma analiza tus habilidades, intereses y contexto para recomendarte la ruta más viable — sin presionarte. Puedes explorar ambos caminos y decidir con información real.",
  },
  {
    question: "¿Cómo me ayuda la inteligencia artificial?",
    answer:
      "Actúa como un mentor que te orienta paso a paso: identifica tus fortalezas, sugiere qué competencias desarrollar y te indica acciones concretas según el camino que elijas.",
  },
  {
    question: "¿Necesito experiencia previa?",
    answer:
      "No. Synervia está pensada para jóvenes que están empezando, cambiando de rumbo o buscando dirección. Partimos de tu situación actual, no de un currículum perfecto.",
  },
  {
    question: "¿Puedo cambiar de camino después?",
    answer:
      "Sí. Tu camino puede evolucionar: muchos jóvenes empiezan buscando empleo y luego emprenden, o viceversa. La plataforma se adapta contigo en cada etapa.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-secondary">
            FAQ
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Preguntas frecuentes
          </h2>
          <p className="mt-4 text-lg text-muted">
            Resolvemos las dudas más comunes sobre cómo encontrar tu camino.
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <article
                key={faq.question}
                className="overflow-hidden rounded-[16px] border border-neutral-light bg-surface-elevated transition-shadow hover:shadow-md"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  <span className="pr-4 font-heading font-semibold text-foreground">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-muted transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="px-6 pb-5 text-muted leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
