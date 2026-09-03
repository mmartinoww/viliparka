import type { MetadataRoute } from "next";
import { blogPosts, getBlogPath } from "./lib/blog";
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
    },
    {
      url: absoluteUrl("/blog"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.65
    },
    ...blogPosts.map((post) => ({
      url: absoluteUrl(getBlogPath(post.slug)),
      lastModified: post.dateModified ? new Date(post.dateModified) : new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.6
    }))
  ];
}
