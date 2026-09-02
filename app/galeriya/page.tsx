import type { Metadata } from "next";
import { JsonLdScripts } from "../components/json-ld-scripts";
import { GalleryPage } from "../components/gallery-page";
import { buildGalleryPageSchemas } from "../lib/json-ld";
import { OG_IMAGE_SRC, SITE_NAME, absoluteUrl } from "../lib/site";

const pageUrl = absoluteUrl("/galeriya");
const description =
  "Снимки от вилни къщи Парка: топлият минерален басейн през зимата и лятото, дворът, четирите къщи отвътре и природата около Сапарева баня.";

export const metadata: Metadata = {
  title: "Галерия — вилни къщи Парка в Сапарева баня",
  description,
  keywords: [
    "галерия вилни къщи Сапарева баня",
    "снимки минерален басейн",
    "къщи за гости Сапарева баня",
    "вилни къщи Парка",
    "настаняване Сапарева баня",
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
    title: "Галерия — вилни къщи Парка в Сапарева баня",
    description,
    images: [
      {
        url: OG_IMAGE_SRC,
        width: 1200,
        height: 630,
        alt: "Галерия — вилни къщи Парка, Сапарева баня"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Галерия — вилни къщи Парка",
    description,
    images: [OG_IMAGE_SRC]
  }
};

export default function Page() {
  return (
    <>
      <JsonLdScripts schemas={buildGalleryPageSchemas()} />
      <GalleryPage />
    </>
  );
}
