"use client";

import { useEffect, useState } from "react";
import { IconArrowUp } from "../icons";
import { useCopy } from "../lib/i18n/language-provider";

export function ScrollToTop() {
  const t = useCopy();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      className={`scroll-top${visible ? " scroll-top--visible" : ""}`}
      aria-label={t.actions.toTop}
      tabIndex={visible ? 0 : -1}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <IconArrowUp size={20} />
    </button>
  );
}
