"use client";

import { useEffect } from "react";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a[href^=\"#\"]");
      if (!anchor) return;

      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;

      const element = document.querySelector(id);
      if (!element) return;

      e.preventDefault();
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      window.history.pushState(null, "", id);
    };

    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  return <>{children}</>;
}
