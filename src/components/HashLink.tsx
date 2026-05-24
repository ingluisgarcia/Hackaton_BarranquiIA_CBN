"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { scrollToAnchor } from "@/lib/scroll-to-anchor";

type HashLinkProps = {
  href: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
};

export function HashLink({ href, className, children, onClick }: HashLinkProps) {
  const pathname = usePathname();
  const hashIndex = href.indexOf("#");
  const hash = hashIndex >= 0 ? href.slice(hashIndex) : "";
  const path = hashIndex >= 0 ? href.slice(0, hashIndex) || "/" : href;

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.();

    if (!hash) return;

    if (pathname === path) {
      event.preventDefault();
      scrollToAnchor(hash.replace(/^#/, ""));
    }
  };

  return (
    <Link href={href} className={className} onClick={handleClick} scroll={false}>
      {children}
    </Link>
  );
}
