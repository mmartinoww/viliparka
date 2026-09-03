import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogCard } from "../../components/blog-card";
import { JsonLdScripts } from "../../components/json-ld-scripts";
import { PageFrame } from "../../components/page-frame";
import { Photo } from "../../components/photo";
import { IconChevronRight, IconPhone, IconViber } from "../../icons";
import {
  blogPosts,
  formatBlogDate,
  getBlogPath,
  getBlogPostBySlug,
  getCategoryBySlug
} from "../../lib/blog";
import { buildBlogPostSchemas } from "../../lib/json-ld";
import { photo } from "../../lib/photos";
import {
  PHONE_PRIMARY_HREF,
  SITE_NAME,
  VIBER_HREF,
  absoluteUrl,
  withTrailingSlash
} from "../../lib/site";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  const pageUrl = absoluteUrl(getBlogPath(post.slug));
  const cover = photo(post.coverPhotoId);

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: pageUrl,
      languages: {
        "bg-BG": pageUrl,
        "en-GB": pageUrl
      }
    },
    openGraph: {
      type: "article",
      locale: "bg_BG",
      url: pageUrl,
      siteName: SITE_NAME,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      modifiedTime: post.dateModified ?? post.date,
      authors: [post.author],
      images: [
        {
          url: cover.src,
          width: cover.width,
          height: cover.height,
          alt: post.title
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [cover.src]
    }
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const category = getCategoryBySlug(post.category);
  const relatedPosts = blogPosts.filter((candidate) => candidate.slug !== post.slug).slice(0, 2);

  return (
    <>
      <JsonLdScripts schemas={buildBlogPostSchemas(post)} />
      <PageFrame
        intro={
          <section className="page-hero" aria-labelledby="blog-post-heading">
            <div className="page-hero__media">
              <Photo id={post.coverPhotoId} fill priority sizes="100vw" />
            </div>
            <div className="page-hero__scrim" aria-hidden="true" />

            <div className="page-hero__inner">
              <nav className="breadcrumb" aria-label="Навигационна пътека">
                <Link href="/">Начало</Link>
                <IconChevronRight size={14} />
                <Link href={withTrailingSlash("/blog")}>Блог</Link>
                <IconChevronRight size={14} />
                <span>{category?.title ?? "Статия"}</span>
              </nav>
              {category ? <p className="eyebrow">{category.title}</p> : null}
              <h1 id="blog-post-heading">{post.title}</h1>
              <p className="page-hero__lead blog-post__byline">
                <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
                {" · "}
                {post.author}
              </p>
            </div>
          </section>
        }
      >
        <section className="band band--light" aria-label={post.title}>
          <div className="band__inner">
            <article className="blog-post" itemScope itemType="https://schema.org/BlogPosting">
              <meta itemProp="headline" content={post.title} />
              <meta itemProp="description" content={post.description} />
              <meta itemProp="datePublished" content={post.date} />
              <meta itemProp="dateModified" content={post.dateModified ?? post.date} />
              <meta itemProp="author" content={post.author} />

              <p className="blog-post__intro">{post.intro}</p>

              {post.sections.map((section) => (
                <section className="blog-post__section" key={section.heading}>
                  <h2>{section.heading}</h2>
                  {section.photoId ? (
                    <figure className="blog-post__media">
                      <Photo id={section.photoId} sizes="(max-width: 900px) 100vw, 860px" />
                    </figure>
                  ) : null}
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.listItems ? (
                    <ul>
                      {section.listItems.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}

              <section className="blog-post__conclusion">
                <h2>{post.conclusionTitle}</h2>
                {post.conclusionParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <div className="cta-row blog-post__cta">
                  <a className="button button--primary" href={PHONE_PRIMARY_HREF}>
                    <IconPhone size={18} />
                    Обадете се
                  </a>
                  <a className="button button--ghost" href={VIBER_HREF}>
                    <IconViber size={22} />
                    Пишете във Viber
                  </a>
                </div>
              </section>
            </article>
          </div>
        </section>

        {relatedPosts.length > 0 ? (
          <section className="band band--light-alt" aria-labelledby="related-blog-heading">
            <div className="band__inner">
              <div className="section-heading">
                <p className="eyebrow">Още по темата</p>
                <h2 className="section-heading__title" id="related-blog-heading">
                  Полезни статии
                </h2>
              </div>
              <div className="blog-grid">
                {relatedPosts.map((relatedPost) => (
                  <BlogCard key={relatedPost.slug} post={relatedPost} />
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </PageFrame>
    </>
  );
}
