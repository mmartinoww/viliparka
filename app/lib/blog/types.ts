import type { PhotoId } from "../photos";

export type BlogCategory = {
  slug: string;
  title: string;
  description: string;
};

export type BlogSection = {
  heading: string;
  paragraphs: string[];
  listItems?: string[];
  photoId?: PhotoId;
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  dateModified?: string;
  category: string;
  keywords: string[];
  author: string;
  excerpt: string;
  coverPhotoId: PhotoId;
  intro: string;
  sections: BlogSection[];
  conclusionTitle: string;
  conclusionParagraphs: string[];
};
