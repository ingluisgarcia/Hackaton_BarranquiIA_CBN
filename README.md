# Synervia — Hackaton 2026

Plataforma de orientación laboral y emprendimiento impulsada por inteligencia artificial.

## Stack

- **Next.js 15** — React framework
- **Tailwind CSS 4** — Estilos
- **TypeScript** — Tipado estático
- **Lucide React** — Iconos

## Inicio rápido

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Estructura

```
src/
├── app/
│   ├── globals.css      # Tokens de marca y estilos globales
│   ├── layout.tsx       # Layout + metadata SEO
│   └── page.tsx         # Landing page
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Features.tsx
│   ├── Benefits.tsx
│   ├── Testimonials.tsx
│   ├── Pricing.tsx
│   ├── FAQ.tsx
│   ├── Footer.tsx
│   └── Logo.tsx
└── lib/
    └── utils.ts
```

## Publicar en GitHub

Desde la carpeta del proyecto, ejecuta **uno** de estos métodos:

**Opción A — archivo .cmd (recomendado en Windows):**
```cmd
scripts\publish-github.cmd
```

**Opción B — PowerShell sin cambiar políticas del sistema:**
```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\publish-github.ps1
```

**Opción C — comandos directos:**
```powershell
$env:PATH = "C:\Program Files\Git\cmd;C:\Program Files\GitHub CLI;" + $env:PATH
gh auth login -h github.com -p https -w
gh repo create Hackaton_2026 --public --source=. --remote=origin --push --description "Synervia - Plataforma Hackaton 2026"
```


| Token | Valor |
|-------|-------|
| Primary | `#0B2D6B` |
| Secondary | `#1677F2` |
| Accent | `#36D98A` |
| Support | `#22C7D6` |
| Heading font | Poppins |
| Body font | Inter |
