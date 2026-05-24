"use client";

import { cn } from "@/lib/utils";
import { scrollToAnchor } from "@/lib/scroll-to-anchor";

type ButtonBaseProps = {
  variant?: "primary" | "secondary";
  size?: "default" | "lg";
  children: React.ReactNode;
  className?: string;
};

const buttonStyles = (
  variant: ButtonBaseProps["variant"],
  size: ButtonBaseProps["size"],
  className?: string,
  disabled?: boolean
) =>
  cn(
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
  );

type ButtonAsButton = ButtonBaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = ButtonBaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({
  variant = "primary",
  size = "default",
  className,
  children,
  ...props
}: ButtonProps) {
  if ("href" in props && props.href) {
    const { href, onClick, ...anchorProps } = props;

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
      onClick?.(event);

      if (href.startsWith("#")) {
        event.preventDefault();
        scrollToAnchor(href.slice(1));
      }
    };

    return (
      <a
        href={href}
        onClick={handleClick}
        className={buttonStyles(variant, size, className)}
        {...anchorProps}
      >
        {children}
      </a>
    );
  }

  const { disabled, ...buttonProps } = props as ButtonAsButton;

  return (
    <button
      disabled={disabled}
      className={buttonStyles(variant, size, className, disabled)}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
