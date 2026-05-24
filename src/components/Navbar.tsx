"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "./ui/Button";
import { ThemeToggle } from "./ThemeToggle";

import { HashLink } from "./HashLink";
import { LABOR_PATH_HASH } from "@/lib/labor-path";

const navLinks = [
  { label: "Inicio", href: "/#inicio" },
  { label: "Cómo funciona", href: `/${LABOR_PATH_HASH}` },
  { label: "Rutas", href: "/#rutas" },
  { label: "Ejemplos", href: "/#ejemplos" },
  { label: "FAQ", href: "/#faq" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-neutral-light/60 bg-surface/90 backdrop-blur-lg">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3 lg:px-8">
        <Link href="/" aria-label="Synervia inicio" className="shrink-0">
          <Logo />
        </Link>

        <ul className="hidden items-center gap-5 xl:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <HashLink
                href={link.href}
                className="text-sm font-medium text-muted transition-colors hover:text-secondary"
              >
                {link.label}
              </HashLink>
            </li>
          ))}
        </ul>

        <div className="hidden shrink-0 items-center gap-3 md:flex">
          <ThemeToggle />
          <Link href="/login">
            <Button variant="secondary" className="!py-2.5 !px-5 text-sm">
              Iniciar sesión
            </Button>
          </Link>
          <Link href="/registro">
            <Button className="!py-2.5 !px-5 text-sm whitespace-nowrap">
              <span className="hidden lg:inline">Descubre tu camino</span>
              <span className="lg:hidden">Registrarse</span>
            </Button>
          </Link>
        </div>

        <div className="flex shrink-0 items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="rounded-lg p-2 text-foreground"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-neutral-light bg-surface-elevated px-6 py-4 md:hidden">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <HashLink
                  href={link.href}
                  className="block text-base font-medium text-foreground"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </HashLink>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-3">
            <Link href="/login" onClick={() => setOpen(false)}>
              <Button variant="secondary" className="w-full">
                Iniciar sesión
              </Button>
            </Link>
            <Link href="/registro" onClick={() => setOpen(false)}>
              <Button className="w-full">Descubre tu camino</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
