import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { QuoteForm } from "../components/quote-form";
import { FaqList } from "../components/faq-list";
import { JsonLd } from "../components/json-ld";
import { faqs, products, siteName, siteUrl } from "../lib/site";

export const metadata: Metadata = {
  title: "Pallets de Madera en Argentina | Pallets Argentina",
  description: "Fabricación y venta de pallets de madera para depósitos, logística y exportación. Pallets Arlog, Euro, a medida y reciclados. Cotizá tu pedido.",
  alternates: { canonical: "/" },
};

const productImages = {
  "pallet-arlog": "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https%3A//assets.cdn.filesafe.space/IBVC0ujkEUoZsdBxS8Hv/media/66747496e6de7ec756e5f1f3.png",
  "pallet-euro": "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https%3A//assets.cdn.filesafe.space/IBVC0ujkEUoZsdBxS8Hv/media/667474ea01d4bdf77387663a.png",
  "pallet-para-tambor": "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https%3A//assets.cdn.filesafe.space/IBVC0ujkEUoZsdBxS8Hv/media/6674749619bb7a0b93405762.png",
} as const;

export default function Home() {
  return <>
    <JsonLd data={{
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "Organization", name: siteName, url: siteUrl, logo: `${siteUrl}/pallets-argentina-logo.png`, email: "ventas@palletsargentina.com", telephone: "+54 11 2843 5793", areaServed: ["Buenos Aires", "Ciudad Autónoma de Buenos Aires", "Argentina"], contactPoint: { "@type": "ContactPoint", contactType: "sales", email: "ventas@palletsargentina.com", telephone: "+54 11 2843 5793", availableLanguage: "Spanish" } },
        { "@type": "WebSite", name: siteName, url: siteUrl, inLanguage: "es-AR" },
        { "@type": "FAQPage", mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) },
      ],
    }} />
    <main>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Pallets Argentina, inicio"><Image className="brand-logo" src="/pallets-argentina-logo.png" alt="Pallets Argentina" width={714} height={349} priority /></a>
        <nav className="desktop-nav" aria-label="Navegación principal"><a href="#productos">Productos</a><a href="/pallets-de-madera">Pallets de madera</a><a href="/pallets-buenos-aires">Buenos Aires</a></nav>
        <a className="header-cta" href="#cotizar">Cotizar <span>↗</span></a>
      </header>

      <section id="inicio" className="hero section-shell">
        <div className="hero-copy"><p className="eyebrow"><span className="eyebrow-dot" /> Fabricación y venta en Argentina</p><h1>Pallets de madera<br /><span>para tu operación.</span></h1><p className="hero-intro">Fabricamos pallets de madera para empresas que necesitan mover cargas con seguridad, continuidad y menos improvisación.</p><div className="hero-actions"><a className="button button-dark" href="#cotizar">Pedí tu cotización <span>↗</span></a><a className="text-link" href="#productos">Ver productos <span>↓</span></a></div><div className="hero-note"><span>✓</span> Madera seleccionada <span>•</span> Fabricación a medida</div></div>
        <div className="hero-art" aria-label="Pallets de madera en depósito" role="img"><div className="hero-image" /><div className="hero-stamp"><strong>Desde el 2000</strong><span>+20 años de experiencia</span></div></div>
      </section>

      <section className="trust-strip"><div className="section-shell trust-grid"><p className="trust-lead">Una base confiable para<br /><strong>operaciones que no paran.</strong></p><div className="trust-stat"><strong>+20</strong><span>años de experiencia</span></div><div className="trust-stat"><strong>100%</strong><span>asesoría personalizada</span></div><div className="trust-stat"><strong>AR</strong><span>ENVÍOS A TODO EL PAÍS</span></div></div></section>

      <section id="productos" className="section-shell products-section"><div className="section-heading"><div><p className="eyebrow"><span className="eyebrow-dot" /> Lo que fabricamos</p><h2>Una solución para<br /><em>cada carga.</em></h2></div><p className="section-summary">Elegí una medida estándar o contanos qué necesitás. Te ayudamos a encontrar el pallet correcto para tu circuito.</p></div><div className="product-grid">{products.map((product) => <article className="product-card" key={product.name}><div className="product-image-wrap"><Image src={productImages[product.slug as keyof typeof productImages]} alt={`${product.name} de madera${product.size === "A medida" ? " a medida" : ` de ${product.size}`}`} width={1200} height={900} loading="lazy" /><span className="product-tag">{product.tag}</span></div><div className="product-content"><div><p className="product-number">{product.number}</p><h3>{product.name}</h3><p>{product.detail}</p></div><a href={`/${product.slug}`} aria-label={`Conocer ${product.name}`}>↗</a></div></article>)}</div><div className="section-followup"><p>¿Buscás otra configuración, estado o destino?</p><a className="text-link" href="/pallets-de-madera">Ver todas las soluciones <span>↗</span></a></div></section>

      <section className="solutions-section"><div className="section-shell"><div className="section-heading"><div><p className="eyebrow"><span className="eyebrow-dot" /> Soluciones para empresas</p><h2>Del depósito<br /><em>al destino.</em></h2></div><p className="section-summary">Páginas específicas para elegir un pallet según el uso, la medida y el lugar de entrega.</p></div><div className="solution-grid"><a className="solution-card" href="/pallets-para-logistica"><span>01</span><strong>Pallets para logística</strong><small>Depósitos, transporte y distribución.</small><b>↗</b></a><a className="solution-card" href="/pallets-a-medida"><span>02</span><strong>Pallets a medida</strong><small>Una configuración para tu circuito.</small><b>↗</b></a><a className="solution-card" href="/pallets-para-exportacion"><span>03</span><strong>Pallets para exportación</strong><small>Consultá requisitos y tratamiento.</small><b>↗</b></a></div></div></section>

      <section id="nosotros" className="about-section"><div className="section-shell about-grid"><div className="about-image"><div className="about-photo" /><span className="about-caption">Hechos para el trabajo real.</span></div><div className="about-copy"><p className="eyebrow"><span className="eyebrow-dot" /> ¿Por qué Pallets Argentina?</p><h2>La calidad se nota<br /><em>cuando hace falta.</em></h2><p>Somos especialistas en pallets de madera. Trabajamos con un control de calidad estricto para que cada unidad responda en depósito, camión y destino.</p><p>Fabricamos medidas estándar y especiales, con atención directa y respuesta rápida. Porque tu operación no puede esperar.</p><a className="text-link text-link-light" href="#cotizar">Hablemos de tu operación <span>↗</span></a></div></div></section>

      <section id="faq" className="section-shell faq-section"><div className="faq-intro"><p className="eyebrow"><span className="eyebrow-dot" /> Antes de cotizar</p><h2>Lo que suelen<br /><em>preguntarnos.</em></h2></div><FaqList /></section>

      <section id="cotizar" className="quote-section"><div className="section-shell quote-grid"><div className="quote-copy"><p className="eyebrow eyebrow-lime"><span className="eyebrow-dot" /> Empecemos</p><h2>Contanos qué<br /><em>necesitás mover.</em></h2><p>Respondemos rápido con una recomendación clara y una cotización a medida.</p><div className="contact-details"><a href="https://wa.me/541128435793" target="_blank" rel="noreferrer"><span className="contact-label">WhatsApp</span><span className="contact-value"><svg className="contact-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.1 11.5a8.1 8.1 0 0 1-12 7.1L4 20l1.4-4a8.1 8.1 0 1 1 14.7-4.5Z" fill="none" stroke="currentColor" strokeWidth="1.7" /><path d="M8.4 8.2c.2-.4.5-.4.8-.4h.5c.2 0 .4.1.5.4l.7 1.7c.1.2.1.4-.1.6l-.6.7c.6 1.1 1.5 2 2.7 2.6l.7-.7c.2-.2.4-.2.6-.1l1.7.8c.3.1.4.3.3.6-.2.8-.8 1.4-1.6 1.5-1.1.2-2.9-.7-4.4-2.1-1.5-1.4-2.5-3.1-2.3-4.3.1-.5.3-1 .5-1.3Z" fill="currentColor" /></svg>11 2843 5793 ↗</span></a><a href="mailto:ventas@palletsargentina.com"><span className="contact-label">Email</span><span className="contact-value"><svg className="contact-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3.2" y="5.5" width="17.6" height="13" rx="1.4" fill="none" stroke="currentColor" strokeWidth="1.7" /><path d="m4.2 7 7.1 5.2a1.2 1.2 0 0 0 1.4 0L19.8 7" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>ventas@palletsargentina.com ↗</span></a></div></div><QuoteForm /></div></section>

      <footer className="site-footer"><div className="section-shell footer-grid"><a className="brand brand-footer" href="#inicio"><Image className="brand-logo" src="/pallets-argentina-logo.png" alt="Pallets Argentina" width={714} height={349} /></a><p>Una base confiable para operaciones que no paran.</p><div className="footer-links"><a href="#productos">Productos</a><a href="/pallets-de-madera">Pallets de madera</a><a href="/pallets-buenos-aires">Buenos Aires</a><a href="#cotizar">Contacto</a></div></div><div className="section-shell footer-bottom"><span>© 2024 Pallets Argentina</span><span>Buenos Aires · Argentina</span></div></footer>
    </main>
  </>;
}
