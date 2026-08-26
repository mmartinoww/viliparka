import type { Metadata } from "next";
import { AroundPage } from "../components/around-page";
import { SITE_URL, withTrailingSlash } from "../lib/site";

export const metadata: Metadata = {
  title: "Забележителности около Сапарева баня — гейзерът, Рилските езера, манастирът",
  description:
    "Какво да видите от вилни къщи Парка: гейзерът в Сапарева баня, Седемте рилски езера през Паничище, Рилският манастир и екопътеките в Рила, с времето за път до всяко място.",
  alternates: { canonical: `${SITE_URL}${withTrailingSlash("/zabelezhitelnosti")}` }
};

export default function Page() {
  return <AroundPage />;
}
