import type { MetadataRoute } from "next";
import { HOME_URL } from "./lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Вилни къщи Парка — Сапарева баня",
    short_name: "Парка",
    description:
      "Четири самостоятелни вилни къщи с топъл минерален басейн в центъра на Сапарева баня.",
    start_url: "/",
    id: HOME_URL,
    scope: "/",
    display: "standalone",
    background_color: "#f8f4ea",
    theme_color: "#0a2116",
    lang: "bg",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable"
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable"
      }
    ]
  };
}
