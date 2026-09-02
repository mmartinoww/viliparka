import type { Metadata, Viewport } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import { ScrollToTop } from "./components/scroll-to-top";
import { LanguageProvider } from "./lib/i18n/language-provider";
import {
  EMAIL,
  FACEBOOK_URL,
  HOME_URL,
  OG_IMAGE_SRC,
  PHONE_SCHEMA,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_URL,
  business
} from "./lib/site";
import "./globals.css";

const display = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-display"
});

const body = Manrope({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-body"
});

const canonicalUrl = HOME_URL;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: `${SITE_NAME} — къща за гости в Сапарева баня с топъл минерален басейн`,
    template: `%s | ${SITE_NAME}`
  },

  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  applicationName: SITE_NAME,

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
    description:
      "Къща за гости в Сапарева баня с топъл минерален басейн целогодишно: четири самостоятелни къщи, тих двор, паркинг, барбекю и настаняване до 28 гости.",
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
    title: `${SITE_NAME} — къща за гости в Сапарева баня`,
    description:
      "Къща за гости в Сапарева баня с четири самостоятелни къщи, топъл минерален басейн и затворен двор с паркинг.",
    images: [OG_IMAGE_SRC]
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1
    }
  },

  authors: [{ name: SITE_NAME, url: HOME_URL }],
  category: "Вилни къщи и настаняване",

  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" }
    ],
    apple: "/icons/apple-touch-icon.png"
  },

  other: {
    "geo.region": "BG-10",
    "geo.placename": `${business.city}, Bulgaria`,
    "geo.position": `${business.city};42.286831;23.254034`,
    ICBM: "42.286831, 23.254034",
    "contact:phone_number": PHONE_SCHEMA,
    "contact:email": EMAIL,
    "contact:facebook": FACEBOOK_URL
  }
};

export const viewport: Viewport = {
  themeColor: "#0a2116",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bg" className={`${display.variable} ${body.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#0a2116" />
        <meta name="format-detection" content="telephone=yes" />
        <meta name="author" content={SITE_NAME} />
        <meta name="publisher" content={SITE_NAME} />
        <meta name="copyright" content={SITE_NAME} />
        <meta name="rating" content="general" />
        <meta name="referrer" content="origin-when-cross-origin" />
        <link rel="icon" href="/icons/favicon.ico" sizes="any" />
        <link rel="icon" href="/icons/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
      </head>
      <body>
        <LanguageProvider>
          {children}
          <ScrollToTop />
        </LanguageProvider>
      </body>
    </html>
  );
}
