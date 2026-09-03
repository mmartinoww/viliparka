import Link from "next/link";
import { IconArrowRight } from "../icons";
import {
  formatBlogDate,
  getBlogPath,
  getCategoryBySlug,
  type BlogPost
} from "../lib/blog";
import { photo } from "../lib/photos";

type BlogCardProps = {
  post: BlogPost;
  featured?: boolean;
};

export function BlogCard({ post, featured = false }: BlogCardProps) {
  const category = getCategoryBySlug(post.category);
  const cover = photo(post.coverPhotoId);

  return (
    <article className={`blog-card${featured ? " blog-card--featured" : ""}`}>
      <Link href={getBlogPath(post.slug)} className="blog-card__media" aria-label={post.title}>
        <img src={cover.src} alt="" loading={featured ? "eager" : "lazy"} />
      </Link>
      <div className="blog-card__body">
        <div className="blog-card__meta">
          {category ? <span>{category.title}</span> : null}
          <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
        </div>
        <h2 className="blog-card__title">
          <Link href={getBlogPath(post.slug)}>{post.title}</Link>
        </h2>
        <p className="blog-card__excerpt">{post.excerpt}</p>
        <Link href={getBlogPath(post.slug)} className="blog-card__link">
          Прочетете статията
          <IconArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
}
