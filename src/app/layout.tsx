import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Poppins } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Synervia | Encuentra tu camino laboral o emprendedor",
  description:
    "Te ayudamos a descubrir si tu camino es el empleo o el emprendimiento, desarrollar las competencias que necesitas y dar el primer paso con confianza.",
  keywords: [
    "encontrar tu camino",
    "orientación vocacional",
    "empleabilidad juvenil",
    "emprendimiento",
    "inteligencia artificial",
    "desarrollo profesional",
    "Colombia",
  ],
  openGraph: {
    title: "Synervia | Encuentra tu camino laboral o emprendedor",
    description:
      "Descubre si tu camino es el empleo o el emprendimiento. IA y mentoría para jóvenes que buscan dirección.",
    type: "website",
  },
  icons: {
    icon: "/logo-synervia.png",
    apple: "/logo-synervia.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${inter.variable} antialiased`}
        suppressHydrationWarning
      >
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){try{var t=localStorage.getItem("theme");var d=window.matchMedia("(prefers-color-scheme: dark)").matches;var dark=t==="dark"||(t!=="light"&&d);document.documentElement.classList.toggle("dark",dark);}catch(e){}})();`}
        </Script>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
