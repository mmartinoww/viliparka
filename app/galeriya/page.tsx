import type { Metadata } from "next";
import { GalleryPage } from "../components/gallery-page";
import { SITE_URL, withTrailingSlash } from "../lib/site";

export const metadata: Metadata = {
  title: "Галерия — вилни къщи Парка в Сапарева баня",
  description:
    "Снимки от вилни къщи Парка: топлият минерален басейн през зимата и лятото, дворът, четирите къщи отвътре и природата около Сапарева баня.",
  alternates: { canonical: `${SITE_URL}${withTrailingSlash("/galeriya")}` }
};

export default function Page() {
  return <GalleryPage />;
}
