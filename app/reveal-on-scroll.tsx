"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const revealSelectors = [
  ".section-heading",
  ".house-card",
  ".amenity-card",
  ".around-card",
  ".split__body",
  ".split__media",
  ".around-block__body",
  ".around-block__media",
  ".faq-item",
  ".cta-panel",
  ".house-fact",
  ".feature-pill",
  ".gallery-tile",
  ".house-nav__link",
  ".site-footer__panel",
  ".site-footer__aside",
  ".quote"
].join(",");

export function RevealOnScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const elements = Array.from(document.querySelectorAll<HTMLElement>(revealSelectors));
    if (!elements.length) return;

    document.documentElement.classList.add("reveal-ready");

    // Siblings inside the same container fade in one after the other.
    const groupCounts = new Map<Element, number>();
    elements.forEach((element) => {
      element.classList.add("reveal-item");
      const parent = element.parentElement;
      const index = parent ? groupCounts.get(parent) ?? 0 : 0;
      element.style.setProperty("--reveal-delay", `${Math.min(index, 8) * 65}ms`);
      if (parent) groupCounts.set(parent, index + 1);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0 }
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("reveal-ready");
      elements.forEach((element) => {
        element.classList.remove("reveal-item", "is-visible");
        element.style.removeProperty("--reveal-delay");
      });
    };
  }, [pathname]);

  return null;
}
