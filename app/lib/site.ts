export const SITE_URL = "https://vilnikashtiparka.com";

export const LOGO_SRC = "/identity/logo-parka.png";
export const OG_IMAGE_SRC = "/identity/og-image.webp";

export const PHONE_PRIMARY_DISPLAY = "0889 506 139";
export const PHONE_PRIMARY_HREF = "tel:+359889506139";
export const PHONE_SECONDARY_DISPLAY = "0889 170 052";
export const PHONE_SECONDARY_HREF = "tel:+359889170052";
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
  country: "BG"
};

export const mapEmbedSrc = `https://www.google.com/maps?q=${GEO.latitude},${GEO.longitude}&z=16&hl=bg&output=embed`;
export const mapLinkHref = `https://www.google.com/maps/search/?api=1&query=${GEO.latitude},${GEO.longitude}`;

/**
 * next.config sets trailingSlash, so internal links are normalised here to avoid
 * a redirect hop on every navigation.
 */
export function withTrailingSlash(path: string): string {
  if (!path.startsWith("/")) return path;
  if (path === "/") return path;
  const [pathname, hash] = path.split("#");
  const normalised = pathname.endsWith("/") ? pathname : `${pathname}/`;
  return hash ? `${normalised}#${hash}` : normalised;
}
