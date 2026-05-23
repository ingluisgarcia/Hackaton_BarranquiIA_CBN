"use client";

import Link from "next/link";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { logoutAction } from "@/app/auth/actions";
import { ROLE_LABELS } from "@/lib/roles";
import type { UserRole } from "@/lib/supabase/database.types";

export function DashboardHeader({
  fullName,
  role,
}: {
  fullName: string;
  role: UserRole;
}) {
  return (
    <header className="border-b border-neutral-light bg-surface-elevated">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/">
          <Logo size="sm" />
        </Link>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <span className="hidden rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary sm:inline dark:bg-secondary/20">
            {ROLE_LABELS[role]}
          </span>
          <span className="hidden text-sm text-muted sm:inline">{fullName}</span>
          <form action={logoutAction}>
            <button
              type="submit"
              className="rounded-xl border border-neutral-light px-4 py-2 text-sm font-medium text-foreground transition hover:bg-neutral-light/50"
            >
              Cerrar sesión
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
