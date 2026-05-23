"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginAction, type AuthState } from "@/app/auth/actions";
import { Button } from "@/components/ui/Button";

const initialState: AuthState = {};

const inputClassName =
  "w-full rounded-[12px] border border-neutral-light bg-surface-elevated px-4 py-3 text-foreground outline-none placeholder:text-muted focus:border-secondary focus:ring-[3px] focus:ring-secondary/20 transition-shadow";

export function LoginForm({
  redirectTo,
  initialError,
}: {
  redirectTo?: string;
  initialError?: string;
}) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(loginAction, {
    ...initialState,
    error: initialError,
  });

  useEffect(() => {
    if (state.redirectTo) {
      router.push(state.redirectTo);
    }
  }, [state.redirectTo, router]);

  return (
    <form action={formAction} className="space-y-5">
      {redirectTo && <input type="hidden" name="redirect" value={redirectTo} />}

      {state.error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/40 dark:text-red-200">
          {state.error}
        </div>
      )}

      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="tu@email.com"
          className={inputClassName}
        />
      </div>

      <div>
        <label htmlFor="password" className="mb-2 block text-sm font-medium text-foreground">
          Contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          placeholder="••••••••"
          className={inputClassName}
        />
      </div>

      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Iniciando sesión..." : "Iniciar sesión"}
      </Button>

      <p className="text-center text-sm text-muted">
        ¿No tienes cuenta?{" "}
        <Link href="/registro" className="font-medium text-secondary hover:underline">
          Regístrate gratis
        </Link>
      </p>
    </form>
  );
}
