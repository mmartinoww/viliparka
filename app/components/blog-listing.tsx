import type { BlogPost } from "../lib/blog";
import { BlogCard } from "./blog-card";

type BlogListingProps = {
  posts: BlogPost[];
};

export function BlogListing({ posts }: BlogListingProps) {
  const [featured, ...rest] = posts;

  return (
    <div className="blog-listing">
      {featured ? <BlogCard post={featured} featured /> : null}
      {rest.length > 0 ? (
        <div className="blog-grid">
          {rest.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
