import Link from "next/link";
import { Building2, Globe2, GraduationCap, Handshake, Landmark } from "lucide-react";
import { Button } from "./ui/Button";

const partners = [
  {
    icon: Landmark,
    title: "Gobiernos y entidades públicas",
    description:
      "Programas de empleabilidad juvenil, políticas de inclusión económica e impacto social medible a escala territorial.",
  },
  {
    icon: Handshake,
    title: "Organizaciones sociales",
    description:
      "Cooperación internacional, fundaciones y ONG que buscan acompañar jóvenes en contextos de vulnerabilidad económica.",
  },
  {
    icon: GraduationCap,
    title: "Instituciones educativas",
    description:
      "Universidades, SENA y centros de formación que integran movilidad económica en sus programas de egreso.",
  },
];

const modelPoints = [
  "Acceso amplio para jóvenes a través de alianzas institucionales",
  "Suscripción institucional como modelo principal de sostenibilidad",
  "Impacto social medible como base de financiación",
  "Sin barreras de pago directo para el usuario final",
];

export function Pricing() {
  return (
    <section id="alianzas" className="gradient-bg-soft py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-secondary">
            Sostenibilidad
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Un modelo pensado para el impacto social
          </h2>
          <p className="mt-4 text-lg text-muted">
            Synervia busca garantizar acceso amplio para los jóvenes mientras
            construye sostenibilidad financiera a través de alianzas
            estratégicas e institucionales.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {partners.map((partner) => (
            <article
              key={partner.title}
              className="card-surface rounded-[20px] border border-neutral-light p-8 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                <partner.icon size={24} />
              </div>
              <h3 className="font-heading text-xl font-semibold text-foreground">
                {partner.title}
              </h3>
              <p className="mt-3 text-sm text-muted leading-relaxed">
                {partner.description}
              </p>
            </article>
          ))}
        </div>

        <div className="card-surface mx-auto mt-12 max-w-3xl rounded-[20px] border border-neutral-light p-8 lg:p-10">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl gradient-bg">
              <Globe2 size={28} className="text-white" />
            </div>
            <h3 className="font-heading text-2xl font-bold text-foreground">
              ¿Eres una institución aliada?
            </h3>
            <p className="mt-3 max-w-xl text-muted">
              Trabajemos juntos para llevar movilidad económica juvenil a más
              territorios de Colombia y Latinoamérica.
            </p>
            <ul className="mt-6 grid w-full gap-3 text-left sm:grid-cols-2">
              {modelPoints.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-2 text-sm text-muted"
                >
                  <Building2 size={16} className="mt-0.5 shrink-0 text-accent" />
                  {point}
                </li>
              ))}
            </ul>
            <Link href="/registro" className="mt-8">
              <Button size="lg">Solicitar alianza</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
