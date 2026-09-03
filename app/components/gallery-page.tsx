"use client";

import Link from "next/link";
import { PageFrame } from "./page-frame";
import { Photo } from "./photo";
import { PhotoGallery } from "./photo-gallery";
import { IconChevronRight, IconPhone, IconViber } from "../icons";
import { useCopy } from "../lib/i18n/language-provider";
import { galleryOrder } from "../lib/photos";
import { PHONE_PRIMARY_HREF, VIBER_HREF } from "../lib/site";

export function GalleryPage() {
  const t = useCopy();

  return (
    <PageFrame
      intro={
        <section className="page-hero" aria-labelledby="gallery-heading">
          <div className="page-hero__media">
            <Photo id="aerialWinter" fill priority sizes="100vw" />
          </div>
          <div className="page-hero__scrim" aria-hidden="true" />

          <div className="page-hero__inner">
            <nav className="breadcrumb" aria-label={t.nav.gallery}>
              <Link href="/">{t.nav.home}</Link>
              <IconChevronRight size={14} />
              <span>{t.nav.gallery}</span>
            </nav>
            <p className="eyebrow">{t.galleryPage.eyebrow}</p>
            <h1 id="gallery-heading">{t.galleryPage.title}</h1>
            <p className="page-hero__lead">{t.galleryPage.lead}</p>
          </div>
        </section>
      }
    >
      <section className="band band--light">
        <div className="band__inner">
          <PhotoGallery ids={galleryOrder} filterable />
        </div>
      </section>

      <section className="band band--deep band--glow">
        <div className="band__inner">
          <div className="cta-panel">
            <p className="eyebrow">{t.ctaPanel.eyebrow}</p>
            <h2 className="cta-panel__title">{t.ctaPanel.title}</h2>
            <p className="cta-panel__text">{t.ctaPanel.text}</p>
            <div className="cta-row">
              <a className="button button--primary" href={PHONE_PRIMARY_HREF}>
                <IconPhone size={18} />
                {t.actions.call}
              </a>
              <a className="button button--ghost" href={VIBER_HREF}>
                <IconViber size={22} />
                {t.actions.viber}
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
