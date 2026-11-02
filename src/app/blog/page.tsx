import type { Metadata } from "next";
import { BlogIndexPage } from "@/src/components/blog-pages";
import { blogPosts } from "@/src/lib/blog";

export const metadata: Metadata = {
  title: { absolute: "Blog de Pallets para Empresas | Pallets Argentina" },
  description: "Guías prácticas sobre medidas, productos y cotizaciones de pallets de madera para operaciones de empresa.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return <BlogIndexPage posts={blogPosts} />;
}
