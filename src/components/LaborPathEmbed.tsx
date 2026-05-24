"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";
import { Bot, MessageCircle, Sparkles } from "lucide-react";
import {
  LABOR_PATH_ANCHOR,
  LABOR_PATH_IFRAME_SRC,
} from "@/lib/labor-path";
import { useScrollFreeze } from "@/hooks/useScrollFreeze";

export { LABOR_PATH_ANCHOR, LABOR_PATH_IFRAME_SRC } from "@/lib/labor-path";

const IFRAME_ORIGIN = new URL(LABOR_PATH_IFRAME_SRC).origin;

type LaborPathEmbedProps = {
  className?: string;
  variant?: "compact" | "full";
  iframeRef?: React.RefObject<HTMLIFrameElement | null>;
};

export function LaborPathEmbed({
  className,
  variant = "full",
  iframeRef,
}: LaborPathEmbedProps) {
  return (
    <div
      className={cn(
        "relative w-full contain-layout contain-paint overscroll-none [overflow-anchor:none]",
        className
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-[20px] bg-neutral-light/30 ring-1 ring-neutral-light dark:bg-neutral-light/10",
          variant === "full"
            ? "h-[min(560px,72vh)] min-h-[480px] shadow-[0_12px_40px_rgba(11,45,107,0.12)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
            : "h-[400px]"
        )}
      >
        <iframe
          ref={iframeRef}
          src={LABOR_PATH_IFRAME_SRC}
          title="Orientación laboral con especialista virtual"
          className="absolute inset-0 h-full w-full border-0"
          allow="microphone; camera; display-capture"
        />
      </div>
    </div>
  );
}

export function LaborPathSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useScrollFreeze(sectionRef, iframeRef, { iframeOrigin: IFRAME_ORIGIN });

  return (
    <>
      <div
        id={LABOR_PATH_ANCHOR}
        className="pointer-events-none relative -top-28 h-0 scroll-mt-28"
        aria-hidden="true"
      />
      <div
        ref={sectionRef}
        className="mt-16 overscroll-none contain-layout [overflow-anchor:none]"
      >
        <div className="overflow-hidden rounded-[24px] border border-secondary/20 bg-surface-elevated shadow-[var(--shadow-card-value)]">
          <div className="grid lg:grid-cols-[minmax(0,340px)_1fr] xl:grid-cols-[minmax(0,380px)_1fr]">
            <aside className="flex flex-col justify-center border-b border-neutral-light bg-gradient-to-br from-secondary/10 via-surface-elevated to-accent/5 p-8 lg:border-b-0 lg:border-r lg:p-10">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1.5 text-xs font-semibold text-accent">
                <span className="inline-flex h-2 w-2 rounded-full bg-accent" />
                Especialista en línea
              </span>

              <h3 className="mt-5 font-heading text-2xl font-bold leading-tight text-foreground sm:text-3xl">
                Conoce a tu guía del camino laboral
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                Habla con nuestra orientadora virtual, explora el programa y
                descubre cómo prepararte para el mundo del empleo.
              </p>

              <ul className="mt-8 space-y-4">
                {[
                  {
                    icon: MessageCircle,
                    text: "Pregunta lo que necesites en tiempo real",
                  },
                  {
                    icon: Bot,
                    text: "Recibe orientación personalizada con IA",
                  },
                  {
                    icon: Sparkles,
                    text: "Explora módulos del programa laboral",
                  },
                ].map(({ icon: Icon, text }) => (
                  <li
                    key={text}
                    className="flex items-start gap-3 text-sm text-foreground"
                  >
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                      <Icon size={16} />
                    </span>
                    {text}
                  </li>
                ))}
              </ul>
            </aside>

            <div className="overscroll-contain p-5 sm:p-6 lg:p-8 [overflow-anchor:none]">
              <div className="mb-4 flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-foreground">
                  Ventana de orientación
                </p>
                <span className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary">
                  Camino laboral
                </span>
              </div>
              <LaborPathEmbed variant="full" iframeRef={iframeRef} />
              <p className="mt-4 text-center text-xs text-muted">
                Usa el micrófono o escribe para interactuar con la especialista.
                Para mover la página, haz clic fuera de esta sección o pulsa Esc.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
