"use client";

import { useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Bot, MessageCircle, Sparkles } from "lucide-react";

export const LABOR_PATH_IFRAME_SRC =
  "https://hackaton.adolfo.lol/?mode=moodle&programId=1";

export const LABOR_PATH_ANCHOR = "camino-laboral";

const LOCK_MS = 4000;

function useEmbedScrollLock() {
  const containerRef = useRef<HTMLDivElement>(null);
  const anchorYRef = useRef<number | null>(null);
  const lockUntilRef = useRef(0);

  const beginLock = useCallback(() => {
    anchorYRef.current = window.scrollY;
    lockUntilRef.current = Date.now() + LOCK_MS;
  }, []);

  const endLock = useCallback(() => {
    anchorYRef.current = null;
    lockUntilRef.current = 0;
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const restoreIfLocked = () => {
      const anchorY = anchorYRef.current;
      if (anchorY === null || Date.now() > lockUntilRef.current) return;
      if (Math.abs(window.scrollY - anchorY) > 1) {
        window.scrollTo({ top: anchorY, left: 0, behavior: "instant" });
      }
    };

    const onScroll = () => restoreIfLocked();

    const onPointerDown = (event: PointerEvent) => {
      if (container.contains(event.target as Node)) {
        beginLock();
      }
    };

    const onWindowBlur = () => {
      if (container.matches(":hover")) {
        beginLock();
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Enter") return;
      if (Date.now() <= lockUntilRef.current) {
        requestAnimationFrame(restoreIfLocked);
      }
    };

    const onWheel = (event: WheelEvent) => {
      if (!container.contains(event.target as Node)) {
        endLock();
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { capture: true });
    window.addEventListener("blur", onWindowBlur);
    window.addEventListener("keydown", onKeyDown, { capture: true });
    window.addEventListener("wheel", onWheel, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointerdown", onPointerDown, { capture: true });
      window.removeEventListener("blur", onWindowBlur);
      window.removeEventListener("keydown", onKeyDown, { capture: true });
      window.removeEventListener("wheel", onWheel);
    };
  }, [beginLock, endLock]);

  return { containerRef, beginLock };
}

type LaborPathEmbedProps = {
  className?: string;
  variant?: "compact" | "full";
};

export function LaborPathEmbed({
  className,
  variant = "full",
}: LaborPathEmbedProps) {
  const { containerRef, beginLock } = useEmbedScrollLock();

  return (
    <div
      ref={containerRef}
      onPointerEnter={beginLock}
      className={cn(
        "relative w-full overscroll-contain [overflow-anchor:none]",
        className
      )}
    >
      <div
        className={cn(
          "overflow-hidden rounded-[20px] bg-neutral-light/30 ring-1 ring-neutral-light dark:bg-neutral-light/10",
          variant === "full" &&
            "shadow-[0_12px_40px_rgba(11,45,107,0.12)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
        )}
      >
        <iframe
          src={LABOR_PATH_IFRAME_SRC}
          title="Orientación laboral con especialista virtual"
          className={cn(
            "block w-full border-0",
            variant === "full"
              ? "h-[min(560px,72vh)] min-h-[480px]"
              : "h-[400px]"
          )}
          allow="microphone; camera; display-capture"
          tabIndex={0}
        />
      </div>
    </div>
  );
}

export function LaborPathSection() {
  return (
    <div id={LABOR_PATH_ANCHOR} className="mt-16 scroll-mt-28 [overflow-anchor:none]">
      <div className="overflow-hidden rounded-[24px] border border-secondary/20 bg-surface-elevated shadow-[var(--shadow-card-value)]">
        <div className="grid lg:grid-cols-[minmax(0,340px)_1fr] xl:grid-cols-[minmax(0,380px)_1fr]">
          <aside className="flex flex-col justify-center border-b border-neutral-light bg-gradient-to-br from-secondary/10 via-surface-elevated to-accent/5 p-8 lg:border-b-0 lg:border-r lg:p-10">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1.5 text-xs font-semibold text-accent">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
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
            <LaborPathEmbed variant="full" />
            <p className="mt-4 text-center text-xs text-muted">
              Usa el micrófono o escribe para interactuar con la especialista.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
