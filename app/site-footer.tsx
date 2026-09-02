"use client";

import Link from "next/link";
import {
  BrandMark,
  IconFacebook,
  IconMail,
  IconPhone,
  IconPin,
  IconViber
} from "./icons";
import { useCopy } from "./lib/i18n/language-provider";
import { housePath } from "./lib/houses";
import {
  business,
  EMAIL,
  EMAIL_HREF,
  FACEBOOK_URL,
  mapEmbedSrc,
  mapLinkHref,
  PHONE_PRIMARY_DISPLAY,
  PHONE_PRIMARY_HREF,
  PHONE_SECONDARY_DISPLAY,
  PHONE_SECONDARY_HREF,
  VIBER_HREF,
  withTrailingSlash
} from "./lib/site";

export function SiteFooter() {
  const t = useCopy();
  const year = new Date().getFullYear();
  const city = t.locale === "bg" ? business.city : business.cityEn;
  const street = t.locale === "bg" ? business.streetAddress : "6 Cherna Skala St.";

  const links = [
    { href: withTrailingSlash("/#houses"), label: t.nav.houses },
    { href: withTrailingSlash("/#pool"), label: t.nav.pool },
    { href: withTrailingSlash("/zabelezhitelnosti"), label: t.nav.around },
    { href: withTrailingSlash("/galeriya"), label: t.nav.gallery },
    { href: housePath("kashta-1"), label: t.houses["kashta-1"].name },
    { href: housePath("kashta-2"), label: t.houses["kashta-2"].name },
    { href: housePath("kashta-3"), label: t.houses["kashta-3"].name },
    { href: housePath("kashta-4"), label: t.houses["kashta-4"].name }
  ];

  return (
    <footer className="site-footer" id="contact">
      <div className="site-footer__inner">
        <div className="site-footer__panel">
          <div className="site-footer__brand">
            <BrandMark size={40} className="site-header__mark" />
            <span className="site-header__wordmark">
              <span className="site-header__kicker">{t.brand.kicker}</span>
              <span className="site-header__name">{t.brand.name}</span>
            </span>
          </div>

          <h2 className="visually-hidden">{t.footer.heading}</h2>
          <p className="site-footer__intro">{t.footer.intro}</p>

          <ul className="contact-list">
            <li className="contact-item">
              <span className="contact-item__icon">
                <IconPin size={19} />
              </span>
              <span>
                <span className="contact-item__label">{t.footer.addressLabel}</span>
                <span className="contact-item__value">
                  <a href={mapLinkHref} target="_blank" rel="noreferrer">
                    {street}, {city}
                  </a>
                </span>
              </span>
            </li>
            <li className="contact-item">
              <span className="contact-item__icon">
                <IconPhone size={19} />
              </span>
              <span>
                <span className="contact-item__label">{t.footer.phoneLabel}</span>
                <span className="contact-item__value">
                  <a href={PHONE_PRIMARY_HREF}>{PHONE_PRIMARY_DISPLAY}</a>
                  <a href={PHONE_SECONDARY_HREF}>{PHONE_SECONDARY_DISPLAY}</a>
                </span>
              </span>
            </li>
            <li className="contact-item">
              <span className="contact-item__icon">
                <IconMail size={19} />
              </span>
              <span>
                <span className="contact-item__label">{t.footer.emailLabel}</span>
                <span className="contact-item__value">
                  <a href={EMAIL_HREF}>{EMAIL}</a>
                </span>
              </span>
            </li>
          </ul>

          <div>
            <span className="contact-item__label">{t.footer.followLabel}</span>
            <div className="social-row" style={{ marginTop: 10 }}>
              <a className="social-link" href={VIBER_HREF}>
                <IconViber size={18} />
                Viber
              </a>
              <a className="social-link" href={FACEBOOK_URL} target="_blank" rel="noreferrer">
                <IconFacebook size={18} />
                Facebook
              </a>
            </div>
          </div>
        </div>

        <div className="site-footer__aside">
          <div className="site-footer__mapWrap">
            <iframe
              src={mapEmbedSrc}
              title={t.footer.mapTitle}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="site-footer__links">
            <span className="site-footer__linksTitle">{t.footer.linksTitle}</span>
            <nav className="site-footer__linkList" aria-label={t.footer.linksTitle}>
              {links.map((link) => (
                <Link key={link.href} href={link.href}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <div className="site-footer__bar">
        <span>
          © {year} {t.brand.kicker} {t.brand.name}. {t.footer.rights}
        </span>
        <span>{t.footer.note}</span>
      </div>
    </footer>
  );
}
