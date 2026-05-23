import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "default" | "lg";
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "default",
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center font-medium transition-all duration-300 cursor-pointer",
        "rounded-[14px] active:scale-[0.98]",
        size === "default" && "px-6 py-3.5 text-base",
        size === "lg" && "px-8 py-4 text-lg",
        variant === "primary" && [
          "bg-secondary text-white shadow-md shadow-secondary/20",
          "hover:bg-gradient-to-r hover:from-secondary hover:to-accent hover:shadow-lg hover:shadow-accent/20",
        ],
        variant === "secondary" && [
          "border border-neutral-light bg-surface-elevated text-foreground",
          "hover:border-secondary/40 hover:bg-neutral-light/30",
        ],
        disabled && "cursor-not-allowed opacity-60 active:scale-100",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
