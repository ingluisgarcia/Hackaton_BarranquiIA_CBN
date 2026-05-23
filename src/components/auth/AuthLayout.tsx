import Link from "next/link";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AuthCarousel } from "@/components/auth/AuthCarousel";

export function AuthLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen bg-background">
      <div className="absolute right-4 top-4 z-10 sm:right-6 sm:top-6">
        <ThemeToggle />
      </div>

      <div className="relative hidden w-1/2 overflow-hidden gradient-bg lg:flex lg:flex-col lg:p-12">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-accent/20 blur-3xl" />

        <Logo size="md" />

        <AuthCarousel />

        <p className="mt-8 text-sm text-white/60">
          Encuentra tu camino · Empleo o emprendimiento
        </p>
      </div>

      <div className="flex w-full flex-col justify-center bg-surface px-6 py-12 lg:w-1/2 lg:px-16">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <Logo size="md" />
          </div>
          <h1 className="font-heading text-3xl font-bold text-foreground">
            {title}
          </h1>
          <p className="mt-2 text-muted">{subtitle}</p>
          <div className="mt-8">{children}</div>
          <p className="mt-8 text-center text-sm text-muted">
            <Link href="/" className="font-medium text-secondary hover:underline">
              ← Volver al inicio
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
