export const SITE_URL = "https://parka-villas.com";

export const LOGO_SRC = "/identity/logo-parka.png";
export const LOGO_SM_GOLD_SRC = "/identity/logo-sm-gold.svg";
export const LOGO_SM_GREEN_SRC = "/identity/logo-sm-green.svg";
export const OG_IMAGE_SRC = "/identity/og-image.jpg";

export const SITE_NAME = "Вилни къщи Парка";
export const SITE_NAME_EN = "Guest Houses Parka";

export const SITE_DESCRIPTION =
  "Къща за гости в Сапарева баня с топъл минерален басейн целогодишно: четири самостоятелни вилни къщи, вътрешен паркинг, камини, барбекю и настаняване за 4 до 28 гости.";

export const SITE_KEYWORDS = [
  "къща за гости Сапарева баня",
  "къща за гости в Сапарева баня",
  "къща за гости с басейн Сапарева баня",
  "къща за гости с минерален басейн",
  "вилни къщи Сапарева баня",
  "къщи за гости Сапарева баня",
  "наем на къща Сапарева баня",
  "минерален басейн Сапарева баня",
  "топъл басейн целогодишно",
  "вилни къщи с басейн",
  "настаняване Сапарева баня",
  "къща за група Сапарева баня",
  "къща с барбекю Сапарева баня",
  "къща с паркинг Сапарева баня",
  "вилни къщи Парка",
  "Parka Villas",
  "parka-villas.com",
  "vilni kashti Sapareva Banya",
  "guest house Sapareva Banya",
  "mineral pool Bulgaria",
  "holiday houses Rila"
];

export const BUSINESS_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const HOME_URL = `${SITE_URL}/`;

export const PHONE_PRIMARY_DISPLAY = "0889 506 139";
export const PHONE_PRIMARY_HREF = "tel:+359889506139";
export const PHONE_SECONDARY_DISPLAY = "0889 170 052";
export const PHONE_SECONDARY_HREF = "tel:+359889170052";
export const PHONE_SCHEMA = "+359889506139";
export const VIBER_HREF = "viber://chat?number=%2B359889506139";
export const EMAIL = "parkasp@abv.bg";
export const EMAIL_HREF = `mailto:${EMAIL}`;
export const FACEBOOK_URL = "https://www.facebook.com/www.parka.saparevabanya.info/";

export const GEO = { latitude: 42.286831, longitude: 23.254034 };

export const business = {
  legalName: "Вилни къщи Парка",
  streetAddress: "ул. Черна скала 6",
  city: "Сапарева баня",
  cityEn: "Sapareva Banya",
  postalCode: "2650",
  region: "Кюстендил",
  country: "BG",
  description: SITE_DESCRIPTION,
  siteUrl: HOME_URL
};

export const mapEmbedSrc = `https://www.google.com/maps?q=${GEO.latitude},${GEO.longitude}&z=16&hl=bg&output=embed`;
export const mapLinkHref = `https://www.google.com/maps/search/?api=1&query=${GEO.latitude},${GEO.longitude}`;

/**
 * next.config sets trailingSlash: true — every page URL must end with `/`.
 * Use this for internal Link hrefs and hash links like `/#houses`.
 */
export function withTrailingSlash(path: string): string {
  if (!path.startsWith("/")) return path;
  if (path === "/") return path;
  const [pathname, hash] = path.split("#");
  const normalised = pathname.endsWith("/") ? pathname : `${pathname}/`;
  return hash ? `${normalised}#${hash}` : normalised;
}

/** Absolute canonical URL for a site path (always includes trailing slash). */
export function absoluteUrl(path: string = "/"): string {
  return `${SITE_URL}${withTrailingSlash(path)}`;
}
