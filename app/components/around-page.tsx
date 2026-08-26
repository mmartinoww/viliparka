"use client";

import Link from "next/link";
import { PageFrame } from "./page-frame";
import { Photo } from "./photo";
import {
  IconArrowRight,
  IconChevronRight,
  IconClock,
  IconMountain,
  IconPhone,
  IconViber
} from "../icons";
import { useCopy } from "../lib/i18n/language-provider";
import type { PhotoId } from "../lib/photos";
import { PHONE_PRIMARY_HREF, VIBER_HREF, withTrailingSlash } from "../lib/site";

const blockPhotos: PhotoId[] = ["geyser", "sevenLakes", "monastery", "craterLake"];

export function AroundPage() {
  const t = useCopy();

  return (
    <PageFrame
      intro={
        <section className="page-hero" aria-labelledby="around-heading">
          <div className="page-hero__media">
            <Photo id="lakeWinter" fill priority sizes="100vw" />
          </div>
          <div className="page-hero__scrim" aria-hidden="true" />

          <div className="page-hero__inner">
            <nav className="breadcrumb" aria-label={t.nav.around}>
              <Link href="/">{t.nav.home}</Link>
              <IconChevronRight size={14} />
              <span>{t.nav.around}</span>
            </nav>
            <p className="eyebrow">{t.aroundPage.eyebrow}</p>
            <h1 id="around-heading">{t.aroundPage.title}</h1>
            <p className="page-hero__lead">{t.aroundPage.lead}</p>
          </div>
        </section>
      }
    >
      <section className="band band--light">
        <div className="band__inner">
          {t.aroundPage.blocks.map((block, index) => (
            <article className="around-block" key={block.title}>
              <div className="around-block__body">
                <h2>{block.title}</h2>
                {block.paragraphs.map((paragraph, paragraphIndex) => (
                  <p key={paragraphIndex}>{paragraph}</p>
                ))}
                <span className="travel-chip">
                  <IconClock size={16} />
                  {block.travel}
                  <span>· {block.travelLabel}</span>
                </span>
              </div>

              <div className="around-block__media">
                <Photo
                  id={blockPhotos[index]}
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                  priority={index === 0}
                />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="band band--deep band--glow" aria-labelledby="around-outro-heading">
        <div className="band__inner">
          <div className="split">
            <div className="split__body">
              <p className="eyebrow">
                <IconMountain size={16} />
                {t.aroundSection.eyebrow}
              </p>
              <h2 id="around-outro-heading">{t.aroundPage.outro.title}</h2>
              <p>{t.aroundPage.outro.text}</p>
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

            <div className="split__media">
              <div className="split__frame split__frame--wide">
                <Photo id="rilaPanorama" sizes="(max-width: 900px) 100vw, 50vw" />
              </div>
            </div>
          </div>

          <div className="cta-row" style={{ marginTop: 40, justifyContent: "center" }}>
            <Link className="button button--ghost" href={withTrailingSlash("/galeriya")}>
              {t.actions.allPhotos}
              <span className="button__levitate">
                <IconArrowRight size={18} />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
