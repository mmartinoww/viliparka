import { withTrailingSlash } from "../site";
import { kashtaZaGostiSaparevaBanyaKakDaIzberem } from "./posts/kashta-za-gosti-sapareva-banya-kak-da-izberem";
import { mineralenBaseynZimataSaparevaBanya } from "./posts/mineralen-baseyn-zimata-sapareva-banya";
import type { BlogCategory, BlogPost } from "./types";

export type { BlogCategory, BlogPost };

export const blogCategories: BlogCategory[] = [
  {
    slug: "sapareva-banya",
    title: "Сапарева баня",
    description: "Практични съвети за избор на настаняване, локация и почивка в Сапарева баня."
  },
  {
    slug: "baseyn-i-rila",
    title: "Басейн и Рила",
    description: "Идеи за топъл минерален басейн, зимна почивка и разходки около Рила."
  }
];

export const blogPosts: BlogPost[] = [
  kashtaZaGostiSaparevaBanyaKakDaIzberem,
  mineralenBaseynZimataSaparevaBanya
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getCategoryBySlug(slug: string): BlogCategory | undefined {
  return blogCategories.find((category) => category.slug === slug);
}

export function getBlogPath(slug: string): string {
  return withTrailingSlash(`/blog/${slug}`);
}

export function formatBlogDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("bg-BG", { day: "numeric", month: "long", year: "numeric" });
}
