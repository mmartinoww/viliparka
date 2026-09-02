import type { MetadataRoute } from "next";
import { houses, housePath } from "./lib/houses";
import { absoluteUrl } from "./lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: absoluteUrl("/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0
    },
    ...houses.map((house) => ({
      url: absoluteUrl(housePath(house.id)),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9
    })),
    {
      url: absoluteUrl("/zabelezhitelnosti"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75
    },
    {
      url: absoluteUrl("/galeriya"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7
    }
  ];
}
