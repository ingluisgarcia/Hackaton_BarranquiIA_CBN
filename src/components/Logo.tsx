import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
  onDark?: boolean;
};

const sizeClasses = {
  sm: "h-14",
  md: "h-20",
  lg: "h-24",
};

export function Logo({ className = "", size = "sm", onDark = false }: LogoProps) {
  return (
    <div
      className={cn(
        "inline-flex shrink-0",
        onDark && "rounded-xl bg-white px-3 py-2",
        className
      )}
    >
      <Image
        src="/logo-synervia.png"
        alt="Synervia — Conecta tu talento, impulsa tu futuro"
        width={1024}
        height={682}
        className={cn("w-auto rounded-lg object-contain", sizeClasses[size])}
        priority={size === "sm"}
      />
    </div>
  );
}
