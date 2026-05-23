import { AuthLayout } from "@/components/auth/AuthLayout";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata = {
  title: "Registro | Synervia",
};

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Crea tu cuenta"
      subtitle="Descubre si tu camino es el empleo o el emprendimiento"
    >
      <RegisterForm />
    </AuthLayout>
  );
}
