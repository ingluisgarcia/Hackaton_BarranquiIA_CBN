"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const buttonStyles =
  "relative z-20 inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-neutral-light bg-surface-elevated text-foreground shadow-sm transition-all hover:border-secondary hover:bg-neutral-light/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40 disabled:cursor-wait";

export function ThemeToggle({ className }: { className?: string }) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      disabled={!mounted}
      suppressHydrationWarning
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(buttonStyles, !mounted && "opacity-80", className)}
      aria-label={
        mounted
          ? isDark
            ? "Activar modo claro"
            : "Activar modo oscuro"
          : "Cargando tema"
      }
      title={mounted ? (isDark ? "Modo claro" : "Modo oscuro") : undefined}
    >
      {!mounted ? (
        <span className="inline-block h-[18px] w-[18px]" aria-hidden />
      ) : isDark ? (
        <Sun size={18} className="text-accent" aria-hidden />
      ) : (
        <Moon size={18} className="text-secondary" aria-hidden />
      )}
    </button>
  );
}
