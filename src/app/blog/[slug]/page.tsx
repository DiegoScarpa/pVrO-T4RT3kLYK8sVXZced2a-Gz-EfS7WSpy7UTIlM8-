import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticlePage } from "@/src/components/blog-pages";
import { blogPosts } from "@/src/lib/blog";
import { siteName } from "@/src/lib/site";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((entry) => entry.slug === slug);
  if (!post) return { title: `Artículo no encontrado | ${siteName}`, robots: { index: false, follow: false } };
  return {
    title: { absolute: post.metaTitle },
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: "article", title: post.metaTitle, description: post.description, publishedTime: new Date(`${post.publishedAt}T12:00:00Z`).toISOString(), url: `/blog/${post.slug}` },
  };
}

export default async function BlogArticleRoute({ params }: PageProps) {
  const { slug } = await params;
  const postIndex = blogPosts.findIndex((entry) => entry.slug === slug);
  if (postIndex < 0) notFound();
  const post = blogPosts[postIndex];
  const relatedPosts = blogPosts.filter((entry) => entry.slug !== slug).slice(0, 2);
  return <BlogArticlePage post={post} relatedPosts={relatedPosts} />;
}
