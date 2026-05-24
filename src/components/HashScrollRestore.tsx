"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { scrollToAnchor } from "@/lib/scroll-to-anchor";

export function HashScrollRestore() {
  const pathname = usePathname();

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    const id = hash.replace(/^#/, "");
    const timer = window.setTimeout(() => {
      scrollToAnchor(id);
    }, 100);

    return () => window.clearTimeout(timer);
  }, [pathname]);

  return null;
}
