import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLdScripts } from "../../components/json-ld-scripts";
import { HousePage } from "../../components/house-page";
import { getHouse, housePath, houses } from "../../lib/houses";
import { bg } from "../../lib/i18n/bg";
import type { HouseId } from "../../lib/i18n/types";
import { buildHousePageSchemas } from "../../lib/json-ld";
import { photo } from "../../lib/photos";
import { SITE_NAME, absoluteUrl } from "../../lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return houses.map((house) => ({ slug: house.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const house = getHouse(slug);
  if (!house) return {};

  const copy = bg.houses[house.id as HouseId];
  const pageUrl = absoluteUrl(housePath(house.id));
  const image = photo(house.cover).src;

  return {
    title: `${copy.name} — ${copy.tagline}`,
    description: copy.metaDescription,
    keywords: [
      `${copy.name} Сапарева баня`,
      "вилни къщи Сапарева баня",
      "къща за гости Сапарева баня",
      "минерален басейн",
      `${house.sleepsMax ?? house.sleeps} гости`,
      `${house.bedrooms} спални`,
      "наем на къща Сапарева баня",
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
      title: `${copy.name} — ${SITE_NAME}, Сапарева баня`,
      description: copy.metaDescription,
      images: [
        {
          url: image,
          width: photo(house.cover).width,
          height: photo(house.cover).height,
          alt: `${copy.name} — ${SITE_NAME}, Сапарева баня`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: `${copy.name} — ${SITE_NAME}`,
      description: copy.metaDescription,
      images: [image]
    }
  };
}

export default async function Page({ params }: Params) {
  const { slug } = await params;
  const house = getHouse(slug);
  if (!house) notFound();

  const schemas = buildHousePageSchemas(house);

  return (
    <>
      <JsonLdScripts schemas={schemas} />
      <HousePage houseId={house.id} />
    </>
  );
}
