"use client";

import Link from "next/link";
import { PageFrame } from "./page-frame";
import { Photo } from "./photo";
import { Steam } from "./steam";
import {
  IconArrowRight,
  IconBed,
  IconCar,
  IconCheck,
  IconDroplet,
  IconFlame,
  IconGrill,
  IconPhone,
  IconPin,
  IconPlus,
  IconTree,
  IconUsers,
  IconUtensils,
  IconViber,
  IconWaves
} from "../icons";
import { formatEur, housePath, houses, type House } from "../lib/houses";
import { useCopy } from "../lib/i18n/language-provider";
import { HERO_PHOTO } from "../lib/photos";
import { PHONE_PRIMARY_HREF, VIBER_HREF, withTrailingSlash } from "../lib/site";

const amenityIcons = [
  IconWaves,
  IconCar,
  IconUtensils,
  IconFlame,
  IconGrill,
  IconDroplet,
  IconTree,
  IconPin
];

const aroundPhotos = ["geyser", "sevenLakes", "monastery", "craterLake"] as const;

export function HomePage() {
  const t = useCopy();

  return (
    <PageFrame
      intro={
        <section className="hero" aria-labelledby="hero-heading">
          <div className="hero__media">
            <Photo id={HERO_PHOTO} fill priority sizes="100vw" />
          </div>
          <div className="hero__scrim" aria-hidden="true" />
          <Steam />

          <div className="hero__container">
            <div className="hero__content">
              <p className="eyebrow hero__eyebrow">{t.hero.eyebrow}</p>

              <h1 className="hero__title" id="hero-heading">
                <span className="hero__titleTop">{t.hero.titleLine1}</span>
                <span className="hero__titleMain">{t.hero.titleLine2}</span>
                <span className="hero__titlePlace">{t.hero.titlePlace}</span>
              </h1>

              <p className="hero__lead">{t.hero.lead}</p>

              <ul className="hero__usp">
                {t.hero.usp.map((item) => (
                  <li key={item}>
                    <IconCheck size={18} />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="cta-row">
                <a className="button button--primary" href={PHONE_PRIMARY_HREF}>
                  <IconPhone size={18} />
                  {t.actions.call}
                </a>
                <a className="button button--ghost" href="#houses">
                  {t.actions.viewHouses}
                  <span className="button__levitate">
                    <IconArrowRight size={18} />
                  </span>
                </a>
              </div>

              <dl className="hero__stats">
                {t.hero.stats.map((stat) => (
                  <div className="hero__stat" key={stat.label}>
                    <dt className="visually-hidden">{stat.label}</dt>
                    <dd className="hero__statValue">{stat.value}</dd>
                    <dd className="hero__statLabel">{stat.label}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
      }
    >
      {/* ---------- About ---------- */}
      <section className="band band--light" aria-labelledby="about-heading">
        <div className="band__inner">
          <div className="split split--narrow-media">
            <div className="split__body">
              <div className="section-heading" style={{ marginBottom: 0 }}>
                <p className="eyebrow">{t.about.eyebrow}</p>
                <h2 className="section-heading__title" id="about-heading">
                  {t.about.title}
                </h2>
              </div>
              {t.about.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
              <blockquote className="quote">
                <p className="quote__text">
                  {t.about.quote}
                  <cite className="quote__author">{t.about.quoteAuthor}</cite>
                </p>
              </blockquote>
            </div>

            <div className="split__media">
              <div className="split__frame split__frame--tall">
                <Photo
                  id="house1Flowers"
                  sizes="(max-width: 900px) 100vw, 46vw"
                  className="split__image"
                />
              </div>
              <div className="split__inset">
                <Photo id="gardenLawn" sizes="(max-width: 900px) 40vw, 20vw" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Houses ---------- */}
      <section className="band band--deep band--glow" id="houses" aria-labelledby="houses-heading">
        <div className="band__inner">
          <div className="section-heading section-heading--center">
            <p className="eyebrow">{t.housesSection.eyebrow}</p>
            <h2 className="section-heading__title" id="houses-heading">
              {t.housesSection.title}
            </h2>
            <p className="lead">{t.housesSection.lead}</p>
          </div>

          <div className="house-grid">
            {houses.map((house) => (
              <HouseCard key={house.id} house={house} />
            ))}
          </div>

          <p className="price-note">{t.housesSection.priceFootnote}</p>
        </div>
      </section>

      {/* ---------- Mineral pool ---------- */}
      <section className="band band--light-alt" id="pool" aria-labelledby="pool-heading">
        <div className="band__inner">
          <div className="split split--reverse">
            <div className="split__body">
              <div className="section-heading" style={{ marginBottom: 0 }}>
                <p className="eyebrow">{t.pool.eyebrow}</p>
                <h2 className="section-heading__title" id="pool-heading">
                  {t.pool.title}
                </h2>
              </div>
              {t.pool.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
              <ul className="check-list">
                {t.pool.points.map((point) => (
                  <li key={point}>
                    <IconCheck size={18} />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div className="split__media">
              <div className="split__frame split__frame--square">
                <Photo id="poolWinter" sizes="(max-width: 900px) 100vw, 50vw" />
                <span className="split__badge">
                  <IconWaves size={16} />
                  {t.pool.points[0]}
                </span>
              </div>
              <div className="split__inset">
                <Photo id="poolSummer" sizes="(max-width: 900px) 40vw, 22vw" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Amenities ---------- */}
      <section className="band band--light" aria-labelledby="amenities-heading">
        <div className="band__inner">
          <div className="section-heading section-heading--center">
            <p className="eyebrow">{t.amenities.eyebrow}</p>
            <h2 className="section-heading__title" id="amenities-heading">
              {t.amenities.title}
            </h2>
            <p className="lead">{t.amenities.lead}</p>
          </div>

          <div className="amenity-grid">
            {t.amenities.items.map((item, index) => {
              const Icon = amenityIcons[index] ?? IconCheck;
              return (
                <article className="amenity-card" key={item.title}>
                  <span className="amenity-card__icon">
                    <Icon size={23} />
                  </span>
                  <h3 className="amenity-card__title">{item.title}</h3>
                  <p className="amenity-card__text">{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- Around ---------- */}
      <section className="band band--deep" aria-labelledby="around-heading">
        <div className="band__inner">
          <div className="section-heading">
            <p className="eyebrow">{t.aroundSection.eyebrow}</p>
            <h2 className="section-heading__title" id="around-heading">
              {t.aroundSection.title}
            </h2>
            <p className="lead">{t.aroundSection.lead}</p>
          </div>

          <div className="around-grid">
            {t.aroundSection.cards.map((card, index) => (
              <article className="around-card" key={card.title}>
                <div className="around-card__media">
                  <Photo
                    id={aroundPhotos[index]}
                    fill
                    sizes="(max-width: 700px) 100vw, 25vw"
                    className="around-card__image"
                  />
                </div>
                <h3 className="around-card__title">{card.title}</h3>
                <p className="around-card__text">{card.text}</p>
              </article>
            ))}
          </div>

          <div className="cta-row" style={{ marginTop: 32 }}>
            <Link
              className="button button--ghost"
              href={withTrailingSlash("/zabelezhitelnosti")}
            >
              {t.actions.readMore}
              <span className="button__levitate">
                <IconArrowRight size={18} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="band band--deep band--glow" aria-labelledby="faq-heading">
        <div className="band__inner">
          <div className="section-heading section-heading--center">
            <p className="eyebrow">{t.faq.eyebrow}</p>
            <h2 className="section-heading__title" id="faq-heading">
              {t.faq.title}
            </h2>
            <p className="lead">{t.faq.lead}</p>
          </div>

          <div className="faq-list">
            {t.faq.items.map((item) => (
              <details className="faq-item" key={item.question}>
                <summary className="faq-item__question">
                  {item.question}
                  <span className="faq-item__icon" aria-hidden="true">
                    <IconPlus size={15} />
                  </span>
                </summary>
                <p className="faq-item__answer">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Closing CTA ---------- */}
      <section className="band band--light" aria-labelledby="cta-heading">
        <div className="band__inner">
          <div className="cta-panel">
            <p className="eyebrow">{t.ctaPanel.eyebrow}</p>
            <h2 className="cta-panel__title" id="cta-heading">
              {t.ctaPanel.title}
            </h2>
            <p className="cta-panel__text">{t.ctaPanel.text}</p>
            <div className="cta-row">
              <a className="button button--primary" href={PHONE_PRIMARY_HREF}>
                <IconPhone size={18} />
                {t.actions.call}
              </a>
              <a className="button button--ghost" href={VIBER_HREF}>
                <IconViber size={18} />
                {t.actions.viber}
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}

function HouseCard({ house }: { house: House }) {
  const t = useCopy();
  const copy = t.houses[house.id];
  const sleeps = house.sleepsMax ? `${house.sleeps}\u2013${house.sleepsMax}` : `${house.sleeps}`;

  return (
    <article className="house-card">
      <div className="house-card__media">
        <span className="house-card__number">{house.number}</span>
        <Photo
          id={house.cover}
          sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 25vw"
          fill
          className="house-card__image"
        />
        <div className="house-card__specs">
          <span className="house-card__spec">
            <IconUsers size={14} />
            {sleeps}
          </span>
          <span className="house-card__spec">
            <IconBed size={14} />
            {house.bedrooms}
          </span>
        </div>
      </div>

      <div className="house-card__body">
        <div className="house-card__title">
          <h3 className="house-card__name">{copy.name}</h3>
          <span className="house-card__tagline">{copy.tagline}</span>
        </div>
        <p className="house-card__summary">{copy.summary}</p>

        <div className="house-card__foot">
          <span className="price">
            <span className="price__label">
              {house.rate.kind === "split"
                ? t.housesSection.nightLabel
                : t.housesSection.perSectorLabel}
            </span>
            <span className="price__value">
              {house.rate.kind === "split"
                ? `${t.housesSection.fromLabel} ${formatEur(house.rate.weekday)}`
                : `${house.rate.min}\u2013${formatEur(house.rate.max)}`}
            </span>
          </span>
          <span className="house-card__link" aria-hidden="true">
            <IconArrowRight size={17} />
          </span>
        </div>
      </div>

      <Link href={housePath(house.id)} className="house-card__cover-link">
        <span className="visually-hidden">{`${t.actions.seeHouse}: ${copy.name}`}</span>
      </Link>
    </article>
  );
}
