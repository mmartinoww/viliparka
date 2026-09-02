import type { Metadata } from "next";
import { JsonLdScripts } from "../components/json-ld-scripts";
import { AroundPage } from "../components/around-page";
import { buildAroundPageSchemas } from "../lib/json-ld";
import { OG_IMAGE_SRC, SITE_NAME, absoluteUrl } from "../lib/site";

const pageUrl = absoluteUrl("/zabelezhitelnosti");
const description =
  "Какво да видите от вилни къщи Парка: гейзерът в Сапарева баня, Седемте рилски езера през Паничище, Рилският манастир и екопътеките в Рила, с времето за път до всяко място.";

export const metadata: Metadata = {
  title: "Забележителности около Сапарева баня — гейзерът, Рилските езера, манастирът",
  description,
  keywords: [
    "забележителности Сапарева баня",
    "гейзер Сапарева баня",
    "Седемте рилски езера",
    "Рилски манастир",
    "Паничище",
    "екопътеки Рила",
    "къде да отидем от Сапарева баня",
    "вилни къщи Сапарева баня",
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
    title: "Забележителности около Сапарева баня",
    description,
    images: [
      {
        url: OG_IMAGE_SRC,
        width: 1200,
        height: 630,
        alt: "Забележителности около Сапарева баня — вилни къщи Парка"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Забележителности около Сапарева баня",
    description,
    images: [OG_IMAGE_SRC]
  }
};

export default function Page() {
  return (
    <>
      <JsonLdScripts schemas={buildAroundPageSchemas()} />
      <AroundPage />
    </>
  );
}
