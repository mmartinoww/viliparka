import type { Metadata } from "next";
import Link from "next/link";
import { BlogListing } from "../components/blog-listing";
import { JsonLdScripts } from "../components/json-ld-scripts";
import { PageFrame } from "../components/page-frame";
import { Photo } from "../components/photo";
import { IconChevronRight, IconPhone, IconViber } from "../icons";
import { blogPosts } from "../lib/blog";
import { buildBlogIndexSchemas } from "../lib/json-ld";
import {
  OG_IMAGE_SRC,
  PHONE_PRIMARY_HREF,
  SITE_NAME,
  VIBER_HREF,
  absoluteUrl
} from "../lib/site";

const pageUrl = absoluteUrl("/blog");
const description =
  "Съвети от Вилни къщи Парка за почивка в Сапарева баня: избор на къща за гости, минерален басейн, Рила и удобна подготовка за пътуване.";

export const metadata: Metadata = {
  title: "Блог — съвети за почивка в Сапарева баня",
  description,
  keywords: [
    "блог Сапарева баня",
    "съвети Сапарева баня",
    "къща за гости Сапарева баня",
    "минерален басейн Сапарева баня",
    SITE_NAME
  ],
  alternates: {
    canonical: pageUrl,
    languages: {
      "bg-BG": pageUrl,
      "en-GB": pageUrl
    }
  },
  openGraph: {
    type: "website",
    locale: "bg_BG",
    url: pageUrl,
    siteName: SITE_NAME,
    title: "Блог — съвети за почивка в Сапарева баня",
    description,
    images: [
      {
        url: OG_IMAGE_SRC,
        width: 1200,
        height: 630,
        alt: "Вилни къщи Парка — блог за Сапарева баня"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Блог — Вилни къщи Парка",
    description,
    images: [OG_IMAGE_SRC]
  }
};

export default function BlogPage() {
  return (
    <>
      <JsonLdScripts schemas={buildBlogIndexSchemas()} />
      <PageFrame
        intro={
          <section className="page-hero" aria-labelledby="blog-heading">
            <div className="page-hero__media">
              <Photo id="rilaPanorama" fill priority sizes="100vw" />
            </div>
            <div className="page-hero__scrim" aria-hidden="true" />

            <div className="page-hero__inner">
              <nav className="breadcrumb" aria-label="Блог">
                <Link href="/">Начало</Link>
                <IconChevronRight size={14} />
                <span>Блог</span>
              </nav>
              <p className="eyebrow">Полезно за пътуването</p>
              <h1 id="blog-heading">Съвети за почивка в Сапарева баня</h1>
              <p className="page-hero__lead">
                Кратки, практични статии за къщи за гости, топъл минерален басейн,
                Рила и спокойна организация на пътуването.
              </p>
            </div>
          </section>
        }
      >
        <section className="band band--light" aria-labelledby="blog-posts-heading">
          <div className="band__inner">
            <div className="section-heading section-heading--wide">
              <p className="eyebrow">Статии</p>
              <h2 className="section-heading__title" id="blog-posts-heading">
                Полезни насоки от домакините
              </h2>
              <p>
                Пишем за нещата, които гостите най-често питат преди резервация:
                басейнът, локацията, къщите, зимата и разходките около Сапарева баня.
              </p>
            </div>
            <BlogListing posts={blogPosts} />
          </div>
        </section>

        <section className="band band--deep band--glow" aria-labelledby="blog-cta-heading">
          <div className="band__inner">
            <div className="cta-panel">
              <p className="eyebrow">Резервации</p>
              <h2 className="cta-panel__title" id="blog-cta-heading">
                Питайте директно за свободни дати
              </h2>
              <p className="cta-panel__text">
                Кажете колко души сте, за кои дати пътувате и дали искате една къща
                или целия двор.
              </p>
              <div className="cta-row">
                <a className="button button--primary" href={PHONE_PRIMARY_HREF}>
                  <IconPhone size={18} />
                  Обадете се
                </a>
                <a className="button button--ghost" href={VIBER_HREF}>
                  <IconViber size={22} />
                  Пишете във Viber
                </a>
              </div>
            </div>
          </div>
        </section>
      </PageFrame>
    </>
  );
}
