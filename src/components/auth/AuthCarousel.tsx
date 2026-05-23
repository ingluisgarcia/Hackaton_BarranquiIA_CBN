"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Bot,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Rocket,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";

type Slide = {
  id: string;
  title: string;
  description: string;
  visual: "logo" | "mentor" | "paths" | "network" | "impact";
};

const slides: Slide[] = [
  {
    id: "logo",
    title: "Encuentra tu camino",
    description:
      "Descubre si tu ruta es el mundo laboral, el emprendimiento o una combinación de ambos.",
    visual: "logo",
  },
  {
    id: "mentor",
    title: "Orientación con IA",
    description:
      "Un mentor que analiza tu perfil y te sugiere el camino más viable según tus habilidades y contexto.",
    visual: "mentor",
  },
  {
    id: "paths",
    title: "Empleo o emprender",
    description:
      "Dos caminos claros: ser competente en el mercado laboral o capaz de construir tu propio negocio.",
    visual: "paths",
  },
  {
    id: "network",
    title: "No caminas solo",
    description:
      "Conecta con otros jóvenes, mentores y oportunidades mientras recorres tu camino.",
    visual: "network",
  },
  {
    id: "impact",
    title: "Del potencial al primer paso",
    description:
      "Convierte la indecisión en un plan concreto con acciones que puedes empezar hoy.",
    visual: "impact",
  },
];

const AUTOPLAY_MS = 5500;

function SlideVisual({ type }: { type: Slide["visual"] }) {
  if (type === "logo") {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl bg-white/10 p-8 backdrop-blur-sm">
        <div className="rounded-2xl bg-black/20 p-4">
          <Image
            src="/logo-synervia.png"
            alt="Synervia"
            width={280}
            height={186}
            className="h-28 w-auto object-contain sm:h-32"
          />
        </div>
        <p className="mt-4 text-center text-sm font-medium text-white/90">
          Conecta tu talento · Impulsa tu futuro · Crea sin límites
        </p>
      </div>
    );
  }

  if (type === "mentor") {
    return (
      <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
            <Bot size={20} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Mentor IA</p>
            <p className="text-xs text-white/70">En línea · LatAm</p>
          </div>
          <span className="ml-auto rounded-full bg-accent/30 px-2.5 py-1 text-xs font-medium text-white">
            Activo
          </span>
        </div>
        <div className="space-y-3">
          <div className="rounded-xl bg-white/10 p-3 text-xs text-white/90">
            ¿Qué habilidades puedo monetizar este mes?
          </div>
          <div className="rounded-xl bg-white/20 p-3 text-xs text-white">
            Detecto oportunidades en diseño y redes sociales. ¿Te conecto con un
            equipo?
          </div>
        </div>
      </div>
    );
  }

  if (type === "paths") {
    const paths = [
      { icon: Briefcase, label: "Empleo formal", color: "bg-white/20" },
      { icon: Rocket, label: "Emprendimiento", color: "bg-accent/30" },
      { icon: TrendingUp, label: "Ingresos alternativos", color: "bg-secondary/40" },
    ];
    return (
      <div className="grid gap-3">
        {paths.map(({ icon: Icon, label, color }) => (
          <div
            key={label}
            className={`flex items-center gap-4 rounded-2xl border border-white/15 ${color} p-4 backdrop-blur-sm`}
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
              <Icon size={22} className="text-white" />
            </div>
            <span className="font-medium text-white">{label}</span>
          </div>
        ))}
      </div>
    );
  }

  if (type === "network") {
    const members = [
      { initial: "D", color: "#1677F2", role: "Diseño" },
      { initial: "V", color: "#36D98A", role: "Video" },
      { initial: "M", color: "#22C7D6", role: "Redes" },
      { initial: "P", color: "#0B2D6B", role: "Pauta" },
    ];
    return (
      <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
        <div className="grid grid-cols-2 gap-3">
          {members.map(({ initial, color, role }) => (
            <div
              key={role}
              className="flex items-center gap-3 rounded-xl bg-white/10 px-3 py-3"
            >
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold text-white"
                style={{ backgroundColor: color }}
              >
                {initial}
              </div>
              <span className="text-sm text-white/90">{role}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-white/10 px-4 py-3">
          <Users size={16} className="text-accent" />
          <p className="text-sm text-white/90">Equipo conectado por IA</p>
          <ArrowRight size={14} className="text-white/70" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {[
        { icon: Sparkles, label: "Habilidades detectadas", value: "5+" },
        { icon: TrendingUp, label: "Rutas sugeridas", value: "3" },
        { icon: Briefcase, label: "Microoportunidades", value: "12" },
      ].map(({ icon: Icon, label, value }) => (
        <div
          key={label}
          className="flex items-center justify-between rounded-2xl border border-white/15 bg-white/10 px-5 py-4 backdrop-blur-sm"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
              <Icon size={18} className="text-white" />
            </div>
            <span className="text-sm text-white/90">{label}</span>
          </div>
          <span className="font-heading text-xl font-bold text-white">{value}</span>
        </div>
      ))}
    </div>
  );
}

export function AuthCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((index: number) => {
    setActive((index + slides.length) % slides.length);
  }, []);

  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [paused]);

  return (
    <div
      className="relative flex flex-1 flex-col justify-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative min-h-[320px]">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-500 ease-out ${
              index === active
                ? "translate-x-0 opacity-100"
                : index < active
                  ? "-translate-x-4 opacity-0"
                  : "translate-x-4 opacity-0"
            }`}
            aria-hidden={index !== active}
          >
            <div className="mb-8">
              <SlideVisual type={slide.visual} />
            </div>
            <h2 className="font-heading text-3xl font-bold leading-tight text-white xl:text-4xl">
              {slide.title}
            </h2>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-white/80">
              {slide.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex items-center justify-between">
        <div className="flex gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => goTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === active
                  ? "w-8 bg-white"
                  : "w-2 bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Ir a slide: ${slide.title}`}
              aria-current={index === active}
            />
          ))}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={prev}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
            aria-label="Slide anterior"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={next}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
            aria-label="Slide siguiente"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
