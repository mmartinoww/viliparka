import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HousePage } from "../../components/house-page";
import { getHouse, houses } from "../../lib/houses";
import { bg } from "../../lib/i18n/bg";
import type { HouseId } from "../../lib/i18n/types";
import { SITE_URL, withTrailingSlash } from "../../lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return houses.map((house) => ({ slug: house.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const house = getHouse(slug);
  if (!house) return {};

  const copy = bg.houses[house.id as HouseId];

  return {
    title: `${copy.name} — ${copy.tagline}`,
    description: copy.metaDescription,
    alternates: { canonical: `${SITE_URL}${withTrailingSlash(`/vili/${house.id}`)}` },
    openGraph: {
      title: `${copy.name} — вилни къщи Парка, Сапарева баня`,
      description: copy.metaDescription
    }
  };
}

export default async function Page({ params }: Params) {
  const { slug } = await params;
  const house = getHouse(slug);
  if (!house) notFound();

  return <HousePage houseId={house.id} />;
}
