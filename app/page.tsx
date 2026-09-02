import type { Metadata } from "next";
import { JsonLdScripts } from "./components/json-ld-scripts";
import { HomePage } from "./components/home-page";
import { bg } from "./lib/i18n/bg";
import { buildHomePageSchemas } from "./lib/json-ld";
import { OG_IMAGE_SRC, SITE_DESCRIPTION, SITE_KEYWORDS, SITE_NAME, HOME_URL } from "./lib/site";

const canonicalUrl = HOME_URL;

export const metadata: Metadata = {
  title: `${SITE_NAME} — къща за гости в Сапарева баня с топъл минерален басейн`,
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  alternates: {
    canonical: canonicalUrl,
    languages: {
      "bg-BG": canonicalUrl,
      "en-GB": canonicalUrl
    }
  },
  openGraph: {
    type: "website",
    locale: "bg_BG",
    alternateLocale: ["en_GB"],
    url: canonicalUrl,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — къща за гости в Сапарева баня с топъл минерален басейн`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: OG_IMAGE_SRC,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — минерален басейн и вилни къщи в Сапарева баня`
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Сапарева баня`,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE_SRC]
  }
};

export default function Page() {
  const schemas = buildHomePageSchemas({ faqs: bg.faq.items });

  return (
    <>
      <JsonLdScripts schemas={schemas} />
      <HomePage />
    </>
  );
}
