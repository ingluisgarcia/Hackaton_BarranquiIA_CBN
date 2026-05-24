import Link from "next/link";
import { ArrowRight, Instagram, Linkedin, Youtube } from "lucide-react";
import { Logo } from "./Logo";
import { HashLink } from "./HashLink";
import { LABOR_PATH_HASH } from "@/lib/labor-path";

const footerLinks = [
  { label: "Inicio", href: "/#inicio" },
  { label: "Cómo funciona", href: `/${LABOR_PATH_HASH}` },
  { label: "Rutas", href: "/#rutas" },
  { label: "Ejemplos", href: "/#ejemplos" },
  { label: "FAQ", href: "/#faq" },
];

const socials = [
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
  { name: "TikTok", icon: null, href: "#" },
  { name: "YouTube", icon: Youtube, href: "#" },
];

function TikTokIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-neutral-light bg-brand text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="relative overflow-hidden rounded-[24px] border border-white/15 bg-white/[0.07] p-8 text-center backdrop-blur-sm lg:p-14">
          <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-accent/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-secondary/25 blur-3xl" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.08),transparent_55%)]" />

          <div className="relative mx-auto max-w-2xl">
            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90">
              Comienza gratis
            </span>

            <h2 className="mt-6 font-heading text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
              ¿Listo para encontrar tu camino?
            </h2>

            <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-white/75 sm:text-lg">
              Da el primer paso hacia ser competente en el mundo laboral o capaz de
              emprender con confianza.
            </p>

            <Link
              href="/registro"
              className="group mt-8 inline-flex items-center justify-center gap-2 rounded-[14px] bg-white px-8 py-4 text-base font-semibold text-brand shadow-lg shadow-black/20 transition-all duration-300 hover:bg-white/95 hover:shadow-xl active:scale-[0.98] sm:text-lg"
            >
              Descubre tu camino
              <ArrowRight
                size={20}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Logo size="md" onDark />
            <p className="mt-4 max-w-md text-sm text-white/70 leading-relaxed">
              Te ayudamos a descubrir si tu camino es el empleo, el
              emprendimiento o ambos — y te acompañamos para que lo recorras con
              confianza.
            </p>
            <div className="mt-6 flex gap-4">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white transition-colors hover:bg-white/20"
                >
                  {social.icon ? (
                    <social.icon size={20} />
                  ) : (
                    <TikTokIcon size={20} />
                  )}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-heading font-semibold">Enlaces</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <HashLink
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </HashLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold">Contacto</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li>hola@synervia.com</li>
              <li>Barranquilla, Colombia</li>
              <li>Lun - Vie, 9am - 6pm</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-sm text-white/50">
            © {new Date().getFullYear()} Synervia. Todos los derechos
            reservados.
          </p>
          <div className="flex gap-6 text-sm text-white/50">
            <a href="#" className="hover:text-white/80">
              Términos
            </a>
            <a href="#" className="hover:text-white/80">
              Privacidad
            </a>
            <a href="#" className="hover:text-white/80">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
