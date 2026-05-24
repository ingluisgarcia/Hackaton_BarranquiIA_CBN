"use client";

import { useEffect, useRef } from "react";
import { clearUrlHash } from "@/lib/scroll-to-anchor";

type ScrollFreezeOptions = {
  iframeOrigin?: string;
};

export function useScrollFreeze(
  sectionRef: React.RefObject<HTMLElement | null>,
  iframeRef: React.RefObject<HTMLIFrameElement | null>,
  options: ScrollFreezeOptions = {}
) {
  const frozenRef = useRef(false);
  const scrollYRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const nativeScrollToRef = useRef<typeof window.scrollTo | null>(null);
  const nativeScrollIntoViewRef = useRef<
    typeof Element.prototype.scrollIntoView | null
  >(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    nativeScrollToRef.current = window.scrollTo.bind(window);
    nativeScrollIntoViewRef.current = Element.prototype.scrollIntoView;

    const restoreScroll = (y: number) => {
      nativeScrollToRef.current?.({ top: y, left: 0, behavior: "instant" });
    };

    const applyFreeze = () => {
      const y = scrollYRef.current;

      document.documentElement.style.scrollBehavior = "auto";
      document.documentElement.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${y}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
      document.body.dataset.embedScrollLock = "true";
    };

    const clearFreezeStyles = () => {
      document.documentElement.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      delete document.body.dataset.embedScrollLock;
    };

    const startLoop = () => {
      if (rafRef.current !== null) return;

      const tick = () => {
        if (!frozenRef.current) {
          rafRef.current = null;
          return;
        }

        applyFreeze();
        rafRef.current = requestAnimationFrame(tick);
      };

      rafRef.current = requestAnimationFrame(tick);
    };

    const stopLoop = () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };

    const freeze = () => {
      if (!frozenRef.current) {
        scrollYRef.current = window.scrollY;
        frozenRef.current = true;
      }

      clearUrlHash();
      applyFreeze();
      startLoop();
    };

    const unfreeze = () => {
      if (!frozenRef.current) return;

      const y = scrollYRef.current;
      frozenRef.current = false;
      stopLoop();
      clearFreezeStyles();
      restoreScroll(y);
    };

    const isInSection = (target: EventTarget | null) =>
      target instanceof Node && section.contains(target);

    const isIframeTarget = (target: EventTarget | null) => {
      const iframe = iframeRef.current;
      return (
        target instanceof HTMLIFrameElement ||
        (iframe !== null && target === iframe)
      );
    };

    window.scrollTo = ((...args: Parameters<typeof window.scrollTo>) => {
      if (!frozenRef.current) {
        return nativeScrollToRef.current!(...args);
      }

      if (typeof args[0] === "number") {
        return;
      }

      const options = args[0];
      if (options && "embedRestore" in options) {
        return nativeScrollToRef.current!(...args);
      }

      restoreScroll(scrollYRef.current);
    }) as typeof window.scrollTo;

    Element.prototype.scrollIntoView = function (
      this: Element,
      ...args: Parameters<Element["scrollIntoView"]>
    ) {
      if (frozenRef.current) {
        restoreScroll(scrollYRef.current);
        return;
      }

      return nativeScrollIntoViewRef.current!.apply(this, args);
    };

    const onPointerDown = (event: PointerEvent) => {
      if (isInSection(event.target) || isIframeTarget(event.target)) {
        if (!frozenRef.current) {
          scrollYRef.current = window.scrollY;
        }
        freeze();
        return;
      }

      if (frozenRef.current) {
        unfreeze();
      }
    };

    const onWindowBlur = () => {
      if (section.matches(":hover") || frozenRef.current) {
        if (!frozenRef.current) {
          scrollYRef.current = window.scrollY;
        }
        freeze();
      }
    };

    const onScroll = () => {
      if (!frozenRef.current) return;
      restoreScroll(scrollYRef.current);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && frozenRef.current) {
        unfreeze();
      }
    };

    const onMessage = (event: MessageEvent) => {
      if (options.iframeOrigin && event.origin !== options.iframeOrigin) {
        return;
      }
      if (frozenRef.current) {
        freeze();
      }
    };

    document.addEventListener("pointerdown", onPointerDown, { capture: true });
    window.addEventListener("blur", onWindowBlur);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("message", onMessage);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown, {
        capture: true,
      });
      window.removeEventListener("blur", onWindowBlur);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("message", onMessage);
      stopLoop();

      if (nativeScrollToRef.current) {
        window.scrollTo = nativeScrollToRef.current;
      }
      if (nativeScrollIntoViewRef.current) {
        Element.prototype.scrollIntoView = nativeScrollIntoViewRef.current;
      }

      if (frozenRef.current) {
        frozenRef.current = false;
        clearFreezeStyles();
      }
    };
  }, [iframeRef, options.iframeOrigin, sectionRef]);
}
