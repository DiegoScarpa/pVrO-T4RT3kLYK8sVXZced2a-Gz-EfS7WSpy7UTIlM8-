import Link from "next/link";
import type { Route } from "next";
import { siteName, siteUrl } from "@/src/lib/site";
import type { BlogPost } from "@/src/lib/blog";
import { JsonLd } from "./json-ld";
import { SeoFooter, SeoHeader } from "./seo-chrome";

function postUrl(slug: string) {
  return `${siteUrl}/blog/${slug}`;
}

export function BlogIndexPage({ posts }: { posts: readonly BlogPost[] }) {
  const canonical = `${siteUrl}/blog`;
  return <>
    <JsonLd data={{ "@context": "https://schema.org", "@type": "CollectionPage", name: `Blog | ${siteName}`, description: "Guías prácticas para elegir, cotizar y usar pallets de madera en operaciones de empresa.", url: canonical, isPartOf: { "@type": "WebSite", name: siteName, url: siteUrl }, mainEntity: { "@type": "ItemList", itemListElement: posts.map((post, index) => ({ "@type": "ListItem", position: index + 1, url: postUrl(post.slug), name: post.title })) } }} />
    <SeoHeader />
    <main className="seo-page blog-page">
      <section className="seo-hero section-shell">
        <p className="eyebrow"><span className="eyebrow-dot" /> Ideas para tu operación</p>
        <h1>Blog de pallets<br /><em>para empresas.</em></h1>
        <p className="seo-intro">Información práctica sobre medidas, productos y cotizaciones para ayudar a tomar decisiones de compra.</p>
      </section>
      <section className="section-shell blog-list" aria-label="Artículos">
        {posts.map((post, index) => <article className="blog-card" key={post.slug}>
          <div className="blog-card-meta"><span>{post.category}</span><time dateTime={post.publishedAt}>{new Date(`${post.publishedAt}T12:00:00`).toLocaleDateString("es-AR", { day: "numeric", month: "long", year: "numeric" })}</time></div>
          <p className="blog-card-number">{String(index + 1).padStart(2, "0")}</p>
          <h2><Link href={`/blog/${post.slug}` as Route}>{post.title}</Link></h2>
          <p className="blog-card-excerpt">{post.excerpt}</p>
          <Link className="text-link" href={`/blog/${post.slug}` as Route}>Leer artículo <span>↗</span></Link>
        </article>)}
      </section>
      <section className="seo-cta"><div className="section-shell"><h2>¿Tenés un pedido<br /><em>en mente?</em></h2><p>Contanos qué medida, cantidad y destino necesitás cotizar.</p><Link className="button button-lime" href="/#cotizar">Solicitar cotización <span>↗</span></Link></div></section>
    </main>
    <SeoFooter />
  </>;
}

export function BlogArticlePage({ post, relatedPosts }: { post: BlogPost; relatedPosts: readonly BlogPost[] }) {
  const canonical = postUrl(post.slug);
  const date = new Date(`${post.publishedAt}T12:00:00`).toISOString();
  return <>
    <JsonLd data={{
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.description,
      datePublished: date,
      dateModified: date,
      mainEntityOfPage: canonical,
      author: { "@type": "Organization", name: siteName },
      publisher: { "@type": "Organization", name: siteName, logo: { "@type": "ImageObject", url: `${siteUrl}/pallets-argentina-logo.png` } },
    }} />
    <SeoHeader />
    <main className="seo-page blog-page">
      <article>
        <header className="blog-article-header section-shell">
          <p className="eyebrow"><span className="eyebrow-dot" /> {post.category}</p>
          <h1>{post.title}</h1>
          <p className="seo-intro">{post.excerpt}</p>
          <time dateTime={post.publishedAt}>{new Date(`${post.publishedAt}T12:00:00`).toLocaleDateString("es-AR", { day: "numeric", month: "long", year: "numeric" })}</time>
        </header>
        <div className="blog-article-content section-shell">
          {post.sections.map((section) => <section className="seo-content-block" key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {section.bullets && <ul>{section.bullets.map((item) => <li key={item}>{item}</li>)}</ul>}
          </section>)}
        </div>
      </article>
      <section className="blog-article-cta"><div className="section-shell"><p className="eyebrow eyebrow-lime"><span className="eyebrow-dot" /> Sigamos la conversación</p><h2>¿Necesitás cotizar<br /><em>pallets?</em></h2><p>Compartí medida, cantidad y destino para recibir asesoramiento.</p><Link className="button button-lime" href="/#cotizar">Hablar con Pallets Argentina <span>↗</span></Link></div></section>
      <section className="section-shell blog-related"><div className="blog-related-heading"><p className="eyebrow"><span className="eyebrow-dot" /> Más información</p><h2>Seguí leyendo.</h2><Link className="text-link" href="/blog">Ver todos los artículos <span>↗</span></Link></div><div className="blog-related-grid">{relatedPosts.map((related) => <article className="blog-related-card" key={related.slug}><p>{related.category}</p><h3><Link href={`/blog/${related.slug}` as Route}>{related.title}</Link></h3><Link className="text-link" href={`/blog/${related.slug}` as Route}>Leer artículo <span>↗</span></Link></article>)}</div></section>
    </main>
    <SeoFooter />
  </>;
}
