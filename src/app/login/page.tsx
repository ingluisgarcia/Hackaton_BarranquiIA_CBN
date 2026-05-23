import { AuthLayout } from "@/components/auth/AuthLayout";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata = {
  title: "Iniciar sesión | Synervia",
};

const ERROR_MESSAGES: Record<string, string> = {
  auth_callback_failed: "No se pudo confirmar tu sesión. Intenta iniciar sesión de nuevo.",
  profile_missing: "Tu cuenta no tiene perfil. Contacta al administrador.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string; error?: string }>;
}) {
  const params = await searchParams;
  const initialError = params.error
    ? ERROR_MESSAGES[params.error] ?? "Ocurrió un error. Intenta de nuevo."
    : undefined;

  return (
    <AuthLayout
      title="Bienvenido de vuelta"
      subtitle="Inicia sesión para acceder a tu panel"
    >
      <LoginForm redirectTo={params.redirect} initialError={initialError} />
    </AuthLayout>
  );
}
