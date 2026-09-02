import { houses, housePath, type House } from "./houses";
import { bg } from "./i18n/bg";
import type { HouseId } from "./i18n/types";
import { photo } from "./photos";
import {
  BUSINESS_ID,
  EMAIL,
  FACEBOOK_URL,
  GEO,
  HOME_URL,
  LOGO_SRC,
  OG_IMAGE_SRC,
  PHONE_SCHEMA,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  WEBSITE_ID,
  absoluteUrl,
  business
} from "./site";

type JsonLdObject = Record<string, unknown>;

const amenities = [
  "Топъл минерален басейн",
  "Вътрешен паркинг",
  "Оборудвана кухня",
  "Камина и парно",
  "Барбекю на въглища",
  "Баня и тоалетна",
  "Голям озеленен двор",
  "Безплатен Wi-Fi"
];

function lodgingBusinessBase(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": ["LodgingBusiness", "LocalBusiness"],
    "@id": BUSINESS_ID,
    name: SITE_NAME,
    alternateName: ["Guest Houses Parka", "Parka Villas"],
    description: SITE_DESCRIPTION,
    url: HOME_URL,
    telephone: PHONE_SCHEMA,
    email: EMAIL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}${LOGO_SRC}`,
      width: 512,
      height: 512
    },
    image: `${SITE_URL}${OG_IMAGE_SRC}`,
    priceRange: "€€",
    currenciesAccepted: "EUR, BGN",
    paymentAccepted: "Брой, банков превод",
    sameAs: [FACEBOOK_URL],
    geo: {
      "@type": "GeoCoordinates",
      latitude: GEO.latitude,
      longitude: GEO.longitude
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: business.streetAddress,
      addressLocality: business.city,
      postalCode: business.postalCode,
      addressRegion: business.region,
      addressCountry: business.country
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: PHONE_SCHEMA,
        contactType: "reservations",
        availableLanguage: ["Bulgarian", "English"],
        areaServed: "BG"
      }
    ],
    amenityFeature: amenities.map((name) => ({
      "@type": "LocationFeatureSpecification",
      name,
      value: true
    })),
    areaServed: [
      { "@type": "City", name: "Sapareva Banya" },
      { "@type": "AdministrativeArea", name: "Kyustendil Province" },
      { "@type": "Country", name: "Bulgaria" }
    ],
    hasMap: `${HOME_URL}#contact`
  };
}

function houseOffer(house: House): JsonLdObject {
  const copy = bg.houses[house.id as HouseId];
  const pageUrl = absoluteUrl(housePath(house.id));
  const imageUrl = `${SITE_URL}${photo(house.cover).src}`;

  const offer: JsonLdObject = {
    "@type": "Offer",
    itemOffered: {
      "@type": "Accommodation",
      "@id": `${pageUrl}#accommodation`,
      name: copy.name,
      description: copy.metaDescription,
      url: pageUrl,
      image: imageUrl,
      numberOfBedrooms: house.bedrooms,
      occupancy: {
        "@type": "QuantitativeValue",
        maxValue: house.sleepsMax ?? house.sleeps,
        unitText: "guests"
      },
      amenityFeature: copy.features.map((name) => ({
        "@type": "LocationFeatureSpecification",
        name,
        value: true
      })),
      containedInPlace: { "@id": BUSINESS_ID }
    }
  };

  if (house.rate.kind === "split") {
    offer.priceCurrency = "EUR";
    offer.price = house.rate.weekday;
    offer.description = `От ${house.rate.weekday} € делник / ${house.rate.weekend} € уикенд за цялата къща на нощувка.`;
  } else {
    offer.priceCurrency = "EUR";
    offer.price = house.rate.min;
    offer.description = `От ${house.rate.min} € до ${house.rate.max} € на сектор за нощувка.`;
  }

  return offer;
}

export function buildHomePageSchemas(input: {
  faqs: { question: string; answer: string }[];
}): JsonLdObject[] {
  const homeUrl = HOME_URL;

  return [
    {
      ...lodgingBusinessBase(),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Къща за гости и вилни къщи в Сапарева баня",
        itemListElement: houses.map((house, index) => ({
          ...houseOffer(house),
          position: index + 1
        }))
      },
      potentialAction: {
        "@type": "ReserveAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: PHONE_SCHEMA,
          actionPlatform: [
            "http://schema.org/DesktopWebPlatform",
            "http://schema.org/MobileWebPlatform"
          ]
        },
        result: {
          "@type": "LodgingReservation",
          name: "Резервация на вилна къща в Сапарева баня"
        }
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: HOME_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: "bg-BG",
      publisher: { "@id": BUSINESS_ID },
      potentialAction: {
        "@type": "SearchAction",
        target: `${absoluteUrl("/galeriya")}?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${homeUrl}#webpage`,
      url: homeUrl,
      name: `${SITE_NAME} — къща за гости в Сапарева баня с топъл минерален басейн`,
      description: SITE_DESCRIPTION,
      inLanguage: "bg-BG",
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": BUSINESS_ID },
      breadcrumb: { "@id": `${homeUrl}#breadcrumb` },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${SITE_URL}${OG_IMAGE_SRC}`,
        caption: `${SITE_NAME} — минерален басейн и вилни къщи в Сапарева баня`
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": `${homeUrl}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Начало",
          item: homeUrl
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${homeUrl}#faq`,
      mainEntity: input.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer
        }
      }))
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": `${homeUrl}#houses`,
      name: "Къща за гости в Сапарева баня с четири самостоятелни вилни къщи",
      itemListElement: houses.map((house, index) => {
        const copy = bg.houses[house.id as HouseId];
        return {
          "@type": "ListItem",
          position: index + 1,
          name: copy.name,
          url: absoluteUrl(housePath(house.id))
        };
      })
    }
  ];
}

export function buildHousePageSchemas(house: House): JsonLdObject[] {
  const copy = bg.houses[house.id as HouseId];
  const pageUrl = absoluteUrl(housePath(house.id));
  const imageUrl = `${SITE_URL}${photo(house.cover).src}`;

  return [
    lodgingBusinessBase(),
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: `${copy.name} — ${copy.tagline} | ${SITE_NAME}`,
      description: copy.metaDescription,
      inLanguage: "bg-BG",
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": `${pageUrl}#accommodation` },
      breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: imageUrl,
        caption: `${copy.name} — ${SITE_NAME}, Сапарева баня`
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Начало",
          item: HOME_URL
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Къщите",
          item: `${HOME_URL}#houses`
        },
        {
          "@type": "ListItem",
          position: 3,
          name: copy.name,
          item: pageUrl
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "VacationRental",
      "@id": `${pageUrl}#accommodation`,
      name: `${copy.name} — ${SITE_NAME}`,
      description: copy.metaDescription,
      url: pageUrl,
      image: house.photos.map((photoId) => `${SITE_URL}${photo(photoId).src}`),
      numberOfBedrooms: house.bedrooms,
      occupancy: {
        "@type": "QuantitativeValue",
        maxValue: house.sleepsMax ?? house.sleeps,
        unitText: "guests"
      },
      amenityFeature: copy.features.map((name) => ({
        "@type": "LocationFeatureSpecification",
        name,
        value: true
      })),
      containedInPlace: { "@id": BUSINESS_ID },
      offers: {
        "@type": "Offer",
        priceCurrency: "EUR",
        price: house.rate.kind === "split" ? house.rate.weekday : house.rate.min,
        availability: "https://schema.org/InStock",
        url: pageUrl,
        description:
          house.rate.kind === "split"
            ? `${house.rate.weekday} € делник / ${house.rate.weekend} € уикенд за цялата къща на нощувка.`
            : `${house.rate.min}–${house.rate.max} € на сектор за нощувка.`
      }
    }
  ];
}

export function buildGalleryPageSchemas(): JsonLdObject[] {
  const pageUrl = absoluteUrl("/galeriya");

  return [
    lodgingBusinessBase(),
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: "Галерия — вилни къщи Парка в Сапарева баня",
      description:
        "Снимки от вилни къщи Парка: топлият минерален басейн през зимата и лятото, дворът, четирите къщи отвътре и природата около Сапарева баня.",
      inLanguage: "bg-BG",
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": BUSINESS_ID },
      breadcrumb: { "@id": `${pageUrl}#breadcrumb` }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Начало",
          item: HOME_URL
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Галерия",
          item: pageUrl
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${pageUrl}#collection`,
      name: "Галерия на вилни къщи Парка",
      description:
        "Фотографии от минералния басейн, двора, интериорите на четирите къщи и околността на Сапарева баня.",
      url: pageUrl,
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": BUSINESS_ID }
    }
  ];
}

export function buildAroundPageSchemas(): JsonLdObject[] {
  const pageUrl = absoluteUrl("/zabelezhitelnosti");

  const attractions = bg.aroundPage.blocks.map((block) => ({
    "@type": "TouristAttraction",
    name: block.title,
    description: block.paragraphs.join(" "),
    touristType: "Family, Nature, Culture"
  }));

  return [
    lodgingBusinessBase(),
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: "Забележителности около Сапарева баня — гейзерът, Рилските езера, манастирът",
      description:
        "Какво да видите от вилни къщи Парка: гейзерът в Сапарева баня, Седемте рилски езера през Паничище, Рилският манастир и екопътеките в Рила.",
      inLanguage: "bg-BG",
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": BUSINESS_ID },
      breadcrumb: { "@id": `${pageUrl}#breadcrumb` }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Начало",
          item: HOME_URL
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Околността",
          item: pageUrl
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "TouristDestination",
      "@id": `${pageUrl}#destination`,
      name: "Сапарева баня и Рила",
      description:
        "Сапарева баня е удобна база за гейзера, минералните бани, Седемте рилски езера, Рилския манастир и Panichishte.",
      url: pageUrl,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Kyustendil Province"
      },
      touristType: ["Family", "Nature", "Wellness"]
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": `${pageUrl}#attractions`,
      name: "Забележителности около Сапарева баня",
      itemListElement: attractions.map((attraction, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: attraction
      }))
    }
  ];
}
