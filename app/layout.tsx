import type { Metadata, Viewport } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import { ScrollToTop } from "./components/scroll-to-top";
import { LanguageProvider } from "./lib/i18n/language-provider";
import { OG_IMAGE_SRC, SITE_URL } from "./lib/site";
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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Вилни къщи Парка — Сапарева баня с топъл минерален басейн",
    template: "%s | Вилни къщи Парка"
  },
  description:
    "Четири самостоятелни вилни къщи в центъра на Сапарева баня с топъл минерален басейн целогодишно, вътрешен паркинг, камини и барбекю. Настаняване за 4 до 28 гости.",
  applicationName: "Вилни къщи Парка",
  authors: [{ name: "Вилни къщи Парка" }],
  openGraph: {
    type: "website",
    locale: "bg_BG",
    alternateLocale: ["en_GB"],
    siteName: "Вилни къщи Парка",
    title: "Вилни къщи Парка — Сапарева баня с топъл минерален басейн",
    description:
      "Четири самостоятелни къщи в един тих двор в центъра на Сапарева баня, с топъл минерален басейн, който работи и през зимата.",
    images: [{ url: OG_IMAGE_SRC, width: 1200, height: 630 }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Вилни къщи Парка — Сапарева баня",
    description:
      "Четири къщи, топъл минерален басейн и затворен двор с паркинг, в центъра на Сапарева баня.",
    images: [OG_IMAGE_SRC]
  },
  icons: {
    icon: "/icons/icon-source.png",
    apple: "/icons/icon-source.png"
  }
};

export const viewport: Viewport = {
  themeColor: "#0a2116",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bg" className={`${display.variable} ${body.variable}`}>
      <body>
        <LanguageProvider>
          {children}
          <ScrollToTop />
        </LanguageProvider>
      </body>
    </html>
  );
}
