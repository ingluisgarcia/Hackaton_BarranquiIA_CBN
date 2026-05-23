"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { ROLE_DASHBOARD, REGISTERABLE_ROLES } from "@/lib/roles";
import type { UserRole } from "@/lib/supabase/database.types";

export type AuthState = {
  error?: string;
  success?: string;
  redirectTo?: string;
};

function mapAuthError(message: string): string {
  const lower = message.toLowerCase();

  if (lower.includes("email rate limit exceeded")) {
    return "Se alcanzó el límite de emails. Intenta de nuevo en unos minutos o contacta al administrador.";
  }

  if (lower.includes("email not confirmed")) {
    return "Debes confirmar tu email antes de iniciar sesión. Revisa tu bandeja de entrada.";
  }

  if (lower.includes("invalid login credentials")) {
    return "Credenciales inválidas. Verifica tu email y contraseña.";
  }

  if (lower.includes("user already registered") || lower.includes("already been registered")) {
    return "Este email ya está registrado. Intenta iniciar sesión.";
  }

  return message;
}

async function registerViaEdgeFunction(input: {
  email: string;
  password: string;
  full_name: string;
  role: string;
}) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  const response = await fetch(`${supabaseUrl}/functions/v1/register-user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${anonKey}`,
      apikey: anonKey,
    },
    body: JSON.stringify(input),
  });

  const payload = await response.json();

  if (!response.ok) {
    return { error: mapAuthError(payload.error ?? "No se pudo crear la cuenta.") };
  }

  return { session: payload.session as { access_token: string; refresh_token: string } };
}

export async function loginAction(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Email y contraseña son obligatorios." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: mapAuthError(error.message) };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "No se pudo iniciar sesión. Intenta de nuevo." };
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profileError || !profile?.role) {
    await supabase.auth.signOut();
    return {
      error:
        "Tu cuenta no tiene un perfil configurado. Contacta al administrador.",
    };
  }

  revalidatePath("/dashboard");
  return { redirectTo: ROLE_DASHBOARD[profile.role as UserRole] };
}

export async function registerAction(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const fullName = String(formData.get("full_name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirm_password") ?? "");
  const role = String(formData.get("role") ?? "emprendedor");

  if (!fullName || !email || !password) {
    return { error: "Todos los campos son obligatorios." };
  }

  if (password.length < 6) {
    return { error: "La contraseña debe tener al menos 6 caracteres." };
  }

  if (password !== confirmPassword) {
    return { error: "Las contraseñas no coinciden." };
  }

  if (!(REGISTERABLE_ROLES as readonly string[]).includes(role)) {
    return { error: "Rol no válido." };
  }

  const result = await registerViaEdgeFunction({
    email,
    password,
    full_name: fullName,
    role,
  });

  if (result.error) {
    return { error: result.error };
  }

  if (!result.session) {
    return {
      success: "Cuenta creada. Ya puedes iniciar sesión.",
    };
  }

  const supabase = await createClient();
  const { error: sessionError } = await supabase.auth.setSession(result.session);

  if (sessionError) {
    return {
      success: "Cuenta creada. Inicia sesión con tu email y contraseña.",
    };
  }

  revalidatePath("/dashboard");
  return { redirectTo: ROLE_DASHBOARD[role as UserRole] };
}

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
