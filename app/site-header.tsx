"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useState } from "react";
import { LanguageSwitch } from "./components/language-switch";
import { BrandMark, IconClose, IconMenu, IconPhone } from "./icons";
import { useCopy } from "./lib/i18n/language-provider";
import { PHONE_PRIMARY_HREF, withTrailingSlash } from "./lib/site";

const AROUND_PATH = withTrailingSlash("/zabelezhitelnosti");
const GALLERY_PATH = withTrailingSlash("/galeriya");
const BLOG_PATH = withTrailingSlash("/blog");

export function SiteHeader() {
  const t = useCopy();
  const pathname = usePathname();
  const panelId = useId();
  const [menuOpen, setMenuOpen] = useState(false);
  const [pinned, setPinned] = useState(false);

  const nav = [
    { href: "/", label: t.nav.home },
    { href: withTrailingSlash("/#houses"), label: t.nav.houses },
    { href: withTrailingSlash("/#pool"), label: t.nav.pool },
    { href: AROUND_PATH, label: t.nav.around },
    { href: GALLERY_PATH, label: t.nav.gallery },
    { href: BLOG_PATH, label: t.nav.blog },
    { href: withTrailingSlash("/#contact"), label: t.nav.contact }
  ];

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("site-menu-open", menuOpen);
    document.body.classList.toggle("site-menu-open", menuOpen);
    return () => {
      root.classList.remove("site-menu-open");
      document.body.classList.remove("site-menu-open");
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen, closeMenu]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 880) closeMenu();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [closeMenu]);

  // Pin the header once the visitor has scrolled past most of the opening hero.
  useEffect(() => {
    const onScroll = () => {
      const intro = document.querySelector<HTMLElement>(".hero-intro");
      const threshold = intro ? intro.offsetHeight * 0.55 : 220;
      setPinned(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href.includes("#")) return false;
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <button
        type="button"
        tabIndex={menuOpen ? 0 : -1}
        aria-label={t.actions.close}
        className={`site-header__backdrop${menuOpen ? " site-header__backdrop--open" : ""}`}
        onClick={closeMenu}
      />

      <header className={`site-header${pinned ? " site-header--pinned" : ""}`}>
        <div className="site-header__cluster">
          <div className="site-header__shell">
            <Link href="/" className="site-header__brand" onClick={closeMenu}>
              <BrandMark size={36} className="site-header__mark" />
              <span className="site-header__wordmark">
                <span className="site-header__kicker">{t.brand.kicker}</span>
                <span className="site-header__name">{t.brand.name}</span>
              </span>
            </Link>

            <nav className="site-header__nav site-header__nav--desktop" aria-label={t.actions.menu}>
              <ul className="site-header__navList">
                {nav.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className={`site-header__navLink${
                        isActive(item.href) ? " site-header__navLink--active" : ""
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="site-header__actions">
              <LanguageSwitch />
              <a href={PHONE_PRIMARY_HREF} className="site-header__cta">
                <IconPhone size={17} />
                {t.actions.callShort}
              </a>
              <button
                type="button"
                className="site-header__menuToggle"
                aria-expanded={menuOpen}
                aria-controls={panelId}
                aria-label={t.actions.menu}
                onClick={() => setMenuOpen((open) => !open)}
              >
                {menuOpen ? <IconClose /> : <IconMenu />}
              </button>
            </div>
          </div>

          <div
            id={panelId}
            className={`site-header__mobilePanel${
              menuOpen ? " site-header__mobilePanel--open" : ""
            }`}
            hidden={!menuOpen}
          >
            {nav.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                className="site-header__mobileLink"
                style={{ "--link-delay": `${index * 45}ms` } as React.CSSProperties}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}
            <div className="site-header__mobileFoot">
              <LanguageSwitch />
              <a href={PHONE_PRIMARY_HREF} className="site-header__cta" onClick={closeMenu}>
                <IconPhone size={17} />
                {t.actions.call}
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
