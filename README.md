# Synervia

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

## Marca

| Token | Valor |
|-------|-------|
| Primary | `#0B2D6B` |
| Secondary | `#1677F2` |
| Accent | `#36D98A` |
| Support | `#22C7D6` |
| Heading font | Poppins |
| Body font | Inter |
