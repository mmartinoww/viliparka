"use client";

import Link from "next/link";
import { PageFrame } from "./page-frame";
import { Photo } from "./photo";
import { PhotoGallery } from "./photo-gallery";
import {
  IconArrowRight,
  IconBed,
  IconCheck,
  IconChevronRight,
  IconPhone,
  IconTag,
  IconUsers,
  IconViber
} from "../icons";
import { formatEur, getHouse, housePath, houses } from "../lib/houses";
import { useCopy } from "../lib/i18n/language-provider";
import type { HouseId } from "../lib/i18n/types";
import { PHONE_PRIMARY_HREF, VIBER_HREF, withTrailingSlash } from "../lib/site";

export function HousePage({ houseId }: { houseId: HouseId }) {
  const t = useCopy();
  const house = getHouse(houseId);
  const copy = t.houses[houseId];

  if (!house) return null;

  const sleeps = house.sleepsMax ? `${house.sleeps}\u2013${house.sleepsMax}` : `${house.sleeps}`;

  return (
    <PageFrame
      intro={
        <section className="page-hero" aria-labelledby="house-heading">
          <div className="page-hero__media">
            <Photo id={house.cover} fill priority sizes="100vw" />
          </div>
          <div className="page-hero__scrim" aria-hidden="true" />

          <div className="page-hero__inner">
            <nav className="breadcrumb" aria-label={t.actions.backToHouses}>
              <Link href="/">{t.nav.home}</Link>
              <IconChevronRight size={14} />
              <Link href={withTrailingSlash("/#houses")}>{t.nav.houses}</Link>
              <IconChevronRight size={14} />
              <span>{copy.name}</span>
            </nav>
            <p className="eyebrow">{copy.tagline}</p>
            <h1 id="house-heading">{copy.name}</h1>
            <p className="page-hero__lead">{copy.summary}</p>
            <div className="cta-row">
              <a className="button button--primary" href={PHONE_PRIMARY_HREF}>
                <IconPhone size={18} />
                {t.actions.book}
              </a>
              <a className="button button--ghost" href={VIBER_HREF}>
                <IconViber size={22} />
                Viber
              </a>
            </div>
          </div>
        </section>
      }
    >
      {/* ---------- Facts & description ---------- */}
      <section className="band band--light" aria-labelledby="house-detail-heading">
        <div className="band__inner">
          <h2 className="visually-hidden" id="house-detail-heading">
            {copy.name} — {copy.tagline}
          </h2>

          <div className="house-facts">
            <div className="house-fact">
              <span className="house-fact__label">
                <IconUsers size={15} />
                {t.housesSection.guestsLabel}
              </span>
              <span className="house-fact__value">{sleeps}</span>
            </div>
            <div className="house-fact">
              <span className="house-fact__label">
                <IconBed size={15} />
                {t.housesSection.bedroomsLabel}
              </span>
              <span className="house-fact__value">{house.bedrooms}</span>
            </div>

            {house.rate.kind === "split" ? (
              <>
                <div className="house-fact">
                  <span className="house-fact__label">
                    <IconTag size={15} />
                    {t.housesSection.weekdayLabel}
                  </span>
                  <span className="house-fact__value">
                    {formatEur(house.rate.weekday)}{" "}
                    <small>/ {t.housesSection.nightLabel}</small>
                  </span>
                </div>
                <div className="house-fact">
                  <span className="house-fact__label">
                    <IconTag size={15} />
                    {t.housesSection.weekendLabel}
                  </span>
                  <span className="house-fact__value">
                    {formatEur(house.rate.weekend)}{" "}
                    <small>/ {t.housesSection.nightLabel}</small>
                  </span>
                </div>
              </>
            ) : (
              <div className="house-fact">
                <span className="house-fact__label">
                  <IconTag size={15} />
                  {t.housesSection.perSectorLabel}
                </span>
                <span className="house-fact__value">
                  {house.rate.min}&ndash;{formatEur(house.rate.max)}{" "}
                  <small>/ {t.housesSection.nightLabel}</small>
                </span>
              </div>
            )}
          </div>

          <div className="split split--narrow-media split--top">
            <div className="split__body">
              {copy.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
              <span className="travel-chip">
                <IconUsers size={16} />
                {copy.goodFor}
              </span>
              <ul className="feature-pills">
                {copy.features.map((feature) => (
                  <li className="feature-pill" key={feature}>
                    <IconCheck size={15} />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="split__media">
              <div className="split__frame split__frame--tall">
                <Photo id={house.photos[1] ?? house.cover} sizes="(max-width: 900px) 100vw, 44vw" />
              </div>
              <div className="split__inset">
                <Photo
                  id={house.photos[2] ?? house.cover}
                  sizes="(max-width: 900px) 40vw, 20vw"
                />
              </div>
            </div>
          </div>

          <p className="price-note">{t.housesSection.priceFootnote}</p>
        </div>
      </section>

      {/* ---------- Gallery ---------- */}
      <section className="band band--light-alt" aria-labelledby="house-gallery-heading">
        <div className="band__inner">
          <div className="section-heading">
            <p className="eyebrow">{t.galleryPage.eyebrow}</p>
            <h2 className="section-heading__title" id="house-gallery-heading">
              {copy.name}
            </h2>
          </div>
          <PhotoGallery ids={house.photos} />
        </div>
      </section>

      {/* ---------- Other houses + CTA ---------- */}
      <section className="band band--deep band--glow" aria-labelledby="other-houses-heading">
        <div className="band__inner">
          <div className="section-heading section-heading--center">
            <p className="eyebrow">{t.housesSection.eyebrow}</p>
            <h2 className="section-heading__title" id="other-houses-heading">
              {t.housesSection.otherTitle}
            </h2>
          </div>

          <nav className="house-nav" aria-label={t.nav.houses}>
            {houses.map((other) => (
              <Link
                key={other.id}
                href={housePath(other.id)}
                className={`house-nav__link${
                  other.id === houseId ? " house-nav__link--active" : ""
                }`}
                aria-current={other.id === houseId ? "page" : undefined}
              >
                {t.houses[other.id].name}
                {other.id === houseId ? null : <IconArrowRight size={16} />}
              </Link>
            ))}
          </nav>

          <div className="cta-panel" style={{ marginTop: 44 }}>
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
