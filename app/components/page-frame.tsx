"use client";

import { RevealOnScroll } from "../reveal-on-scroll";
import { SiteFooter } from "../site-footer";
import { SiteHeader } from "../site-header";
import { useCopy } from "../lib/i18n/language-provider";

/**
 * Shared page chrome. `intro` sits inside `.hero-intro` next to the header, which
 * is what the header's pinning threshold measures against.
 */
export function PageFrame({
  intro,
  children
}: {
  intro: React.ReactNode;
  children: React.ReactNode;
}) {
  const t = useCopy();

  return (
    <>
      <a className="skip-link" href="#main-content">
        {t.actions.skipToContent}
      </a>
      <div className="hero-intro">
        <SiteHeader />
        {intro}
      </div>
      <main id="main-content">{children}</main>
      <SiteFooter />
      <RevealOnScroll />
    </>
  );
}
