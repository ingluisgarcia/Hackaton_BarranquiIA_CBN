"use client";



import { useActionState, useEffect } from "react";

import { useRouter } from "next/navigation";

import Link from "next/link";

import { registerAction, type AuthState } from "@/app/auth/actions";

import { Button } from "@/components/ui/Button";



const initialState: AuthState = {};



const inputClassName =

  "w-full rounded-[12px] border border-neutral-light bg-surface-elevated px-4 py-3 text-foreground outline-none placeholder:text-muted focus:border-secondary focus:ring-[3px] focus:ring-secondary/20 transition-shadow";



const roles = [
  {
    value: "estudiante",
    label: "Estudiante",
    description: "Quiero aprender y ser más competente en el mundo laboral",
  },
  {
    value: "emprendedor",
    label: "Emprendedor",
    description: "Quiero hacer crecer mi negocio con IA",
  },
  {
    value: "mentor",
    label: "Mentor",
    description: "Quiero guiar y apoyar a otros en su camino",
  },
];



export function RegisterForm() {

  const router = useRouter();

  const [state, formAction, pending] = useActionState(

    registerAction,

    initialState

  );



  useEffect(() => {

    if (state.redirectTo) {

      router.push(state.redirectTo);

    }

  }, [state.redirectTo, router]);



  return (

    <form action={formAction} className="space-y-5">

      {state.error && (

        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/40 dark:text-red-200">

          {state.error}

        </div>

      )}



      {state.success && (

        <div className="rounded-xl border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-foreground dark:border-accent/30 dark:bg-accent/15">

          {state.success}

        </div>

      )}



      <div>

        <label htmlFor="full_name" className="mb-2 block text-sm font-medium text-foreground">

          Nombre completo

        </label>

        <input

          id="full_name"

          name="full_name"

          type="text"

          required

          placeholder="Tu nombre"

          className={inputClassName}

        />

      </div>



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

        <label className="mb-2 block text-sm font-medium text-foreground">

          Tipo de perfil

        </label>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">

          {roles.map((role) => (

            <label

              key={role.value}

              className="cursor-pointer rounded-xl border border-neutral-light bg-surface-elevated p-4 transition-colors has-[:checked]:border-secondary has-[:checked]:bg-secondary/5 dark:has-[:checked]:bg-secondary/15"

            >

              <input

                type="radio"

                name="role"

                value={role.value}

                defaultChecked={role.value === "estudiante"}

                className="sr-only"

              />

              <span className="block font-medium text-foreground">{role.label}</span>

              <span className="mt-1 block text-xs text-muted">{role.description}</span>

            </label>

          ))}

        </div>

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

          minLength={6}

          autoComplete="new-password"

          placeholder="Mínimo 6 caracteres"

          className={inputClassName}

        />

      </div>



      <div>

        <label htmlFor="confirm_password" className="mb-2 block text-sm font-medium text-foreground">

          Confirmar contraseña

        </label>

        <input

          id="confirm_password"

          name="confirm_password"

          type="password"

          required

          minLength={6}

          autoComplete="new-password"

          placeholder="Repite tu contraseña"

          className={inputClassName}

        />

      </div>



      <Button type="submit" className="w-full" disabled={pending}>

        {pending ? "Creando cuenta..." : "Crear cuenta"}

      </Button>



      <p className="text-center text-sm text-muted">

        ¿Ya tienes cuenta?{" "}

        <Link href="/login" className="font-medium text-secondary hover:underline">

          Inicia sesión

        </Link>

      </p>

    </form>

  );

}

