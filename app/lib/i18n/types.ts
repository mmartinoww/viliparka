import type { PhotoId } from "../photos";

export const LOCALES = ["bg", "en"] as const;

export type Locale = (typeof LOCALES)[number];

export type HouseId = "kashta-1" | "kashta-2" | "kashta-3" | "kashta-4";

type Titled = { title: string; text: string };

export type Dictionary = {
  locale: Locale;
  htmlLang: string;
  /** Short label shown on the language switch, e.g. "BG". */
  code: string;
  /** Accessible name of the switch option, e.g. "Български". */
  name: string;

  brand: {
    kicker: string;
    name: string;
    tagline: string;
  };

  nav: {
    home: string;
    houses: string;
    pool: string;
    around: string;
    gallery: string;
    contact: string;
  };

  actions: {
    call: string;
    callShort: string;
    book: string;
    viber: string;
    email: string;
    viewHouses: string;
    readMore: string;
    seeHouse: string;
    backToHouses: string;
    allPhotos: string;
    openInMaps: string;
    close: string;
    previous: string;
    next: string;
    skipToContent: string;
    toTop: string;
    menu: string;
    switchLanguage: string;
  };

  hero: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    titlePlace: string;
    lead: string;
    usp: string[];
    stats: { value: string; label: string }[];
  };

  about: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    quote: string;
    quoteAuthor: string;
  };

  housesSection: {
    eyebrow: string;
    title: string;
    otherTitle: string;
    lead: string;
    guestsLabel: string;
    bedroomsLabel: string;
    fromLabel: string;
    weekdayLabel: string;
    weekendLabel: string;
    perSectorLabel: string;
    nightLabel: string;
    priceFootnote: string;
  };

  pool: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    points: string[];
  };

  amenities: {
    eyebrow: string;
    title: string;
    lead: string;
    items: Titled[];
  };

  aroundSection: {
    eyebrow: string;
    title: string;
    lead: string;
    cards: Titled[];
  };

  faq: {
    eyebrow: string;
    title: string;
    lead: string;
    items: { question: string; answer: string }[];
  };

  ctaPanel: {
    eyebrow: string;
    title: string;
    text: string;
  };

  footer: {
    heading: string;
    intro: string;
    addressLabel: string;
    phoneLabel: string;
    emailLabel: string;
    followLabel: string;
    mapTitle: string;
    linksTitle: string;
    rights: string;
    note: string;
  };

  houses: Record<
    HouseId,
    {
      name: string;
      tagline: string;
      metaDescription: string;
      summary: string;
      paragraphs: string[];
      features: string[];
      goodFor: string;
    }
  >;

  aroundPage: {
    eyebrow: string;
    title: string;
    lead: string;
    blocks: {
      title: string;
      paragraphs: string[];
      travelLabel: string;
      travel: string;
    }[];
    outro: { title: string; text: string };
  };

  galleryPage: {
    eyebrow: string;
    title: string;
    lead: string;
    groups: { pool: string; property: string; interiors: string; around: string };
    filterAll: string;
  };

  /** Alt text for every photograph, keyed by photo id. */
  photoAlt: Record<PhotoId, string>;
};
