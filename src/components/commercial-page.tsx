import Link from "next/link";
import { siteName, siteUrl } from "@/src/lib/site";
import type { CommercialPageData } from "@/src/lib/seo-pages";
import { JsonLd } from "./json-ld";
import { SeoFooter, SeoHeader } from "./seo-chrome";

const commercialFaqs: Record<string, { question: string; answer: string }[]> = {
  "pallets-de-madera": [{ question: "¿Qué medidas de pallets de madera tienen?", answer: "Trabajamos con pallet Arlog de 1.200 × 1.000 mm, pallet Euro de 1.200 × 800 mm y medidas especiales a consultar." }, { question: "¿Puedo pedir una cotización por cantidad?", answer: "Sí. Indicá la medida, cantidad y destino en el formulario para recibir una propuesta orientada a tu operación." }],
  "pallets-nuevos": [{ question: "¿Qué información necesitan para cotizar pallets nuevos?", answer: "Medida, tipo de pallet, cantidad, empresa, contacto y destino. También podés sumar detalles de la carga." }, { question: "¿Fabrican pallets nuevos a medida?", answer: "Sí. Recibimos consultas por medidas especiales y evaluamos el requerimiento antes de confirmar una propuesta." }],
  "pallets-reciclados": [{ question: "¿Venden pallets usados o reciclados?", answer: "El formulario permite solicitar pallet usado/reciclado o reciclado seleccionado. La disponibilidad se confirma según medida y cantidad." }, { question: "¿Puedo consultar por una medida específica?", answer: "Sí. Indicá la medida buscada y el uso previsto para que podamos revisar la alternativa disponible." }],
  "pallets-a-medida": [{ question: "¿Qué datos conviene enviar para un pallet a medida?", answer: "Medida o plano, tipo de carga, peso aproximado, cantidad y destino. El campo de detalles permite sumar restricciones del circuito." }, { question: "¿Puedo pedir una configuración especial para tambores?", answer: "Sí. Contanos diámetro, peso, cantidad y forma de manipulación para evaluar el pallet para tambor." }],
  "pallets-para-exportacion": [{ question: "¿Fabrican pallets para exportación?", answer: "Recibimos consultas para exportación y revisamos destino, medida y requisitos de tratamiento antes de cotizar." }, { question: "¿El pallet para exportación incluye CATEM?", answer: "El tratamiento depende del destino y del requisito aplicable. Indicá la información de tu embarque para confirmarlo." }],
  "pallets-para-logistica": [{ question: "¿Qué pallet conviene para logística?", answer: "Depende de la medida de la carga, el espacio y el circuito. Podemos comparar Arlog, Euro o una opción especial." }, { question: "¿Coordinan entregas?", answer: "Sí. La coordinación se revisa según cantidad y destino; escribinos con tu localidad para confirmarla." }],
  "pallets-para-industria": [{ question: "¿Pueden adaptar el pallet al circuito industrial?", answer: "Sí. Evaluamos medidas estándar o especiales según la carga, el espacio y la forma de movimiento." }, { question: "¿Publican la capacidad de carga?", answer: "No usamos una capacidad genérica para todos los casos. La recomendación se realiza con los datos concretos de la operación." }],
  "pallets-para-depositos": [{ question: "¿Qué medida sirve para mi depósito?", answer: "La elección depende del espacio y de la carga. Podés consultar por Arlog, Euro o una medida especial." }, { question: "¿Hay pallets nuevos y reciclados?", answer: "Sí. Podés indicar si buscás pallet nuevo, usado/reciclado o reciclado seleccionado." }],
  "pallets-buenos-aires": [{ question: "¿Qué zonas de Buenos Aires atienden?", answer: "La cobertura informada incluye Buenos Aires, CABA, zona Norte, zona Oeste y zona Sur. Confirmamos cada destino según el pedido." }, { question: "¿Hacen entregas en el interior del país?", answer: "La web informa envíos a todo el país; la coordinación se confirma según cantidad, localidad y destino." }],
};

export function CommercialPage({ data }: { data: CommercialPageData }) {
  const canonical = `${siteUrl}/${data.slug}`;
  const faqs = commercialFaqs[data.slug] ?? [];
  return <>
    <JsonLd data={{
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: data.title,
      description: data.description,
      url: canonical,
      isPartOf: { "@type": "WebSite", name: siteName, url: siteUrl },
      breadcrumb: { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Inicio", item: `${siteUrl}/` }, { "@type": "ListItem", position: 2, name: data.h1, item: canonical }] },
      mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })),
    }} />
    <SeoHeader />
    <main className="seo-page">
      <section className="seo-hero section-shell">
        <p className="eyebrow"><span className="eyebrow-dot" /> {data.eyebrow}</p>
        <h1>{data.h1}</h1>
        <p className="seo-intro">{data.intro}</p>
        <Link className="button button-dark" href="/#cotizar">Solicitar cotización <span>↗</span></Link>
      </section>
      <section className="seo-content section-shell">
        {data.sections.map((section) => <article className="seo-content-block" key={section.heading}>
          <h2>{section.heading}</h2>
          {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
        </article>)}
      </section>
      <section className="seo-faq section-shell" aria-labelledby="seo-faq-heading"><p className="eyebrow"><span className="eyebrow-dot" /> Preguntas frecuentes</p><h2 id="seo-faq-heading">Antes de<br /><em>cotizar.</em></h2><div className="seo-faq-list">{faqs.map((faq) => <details key={faq.question}><summary>{faq.question}<span>+</span></summary><p>{faq.answer}</p></details>)}</div></section>
      <section className="seo-related section-shell" aria-labelledby="related-heading">
        <p className="eyebrow"><span className="eyebrow-dot" /> Continuá explorando</p>
        <h2 id="related-heading">Soluciones para<br /><em>tu operación.</em></h2>
        <div className="seo-link-grid">{data.related.map((link) => <a className="seo-link-card" href={link.href} key={link.href}>{link.label}<span>↗</span></a>)}</div>
      </section>
      <section className="seo-cta"><div className="section-shell"><h2>¿Necesitás cotizar<br /><em>pallets?</em></h2><p>Enviá medida, cantidad y destino. Te respondemos con una recomendación clara.</p><Link className="button button-lime" href="/#cotizar">Hablar con Pallets Argentina <span>↗</span></Link></div></section>
    </main>
    <SeoFooter />
  </>;
}

export function ProductPage({ data, slug }: { data: { title: string; description: string; eyebrow: string; h1: string; intro: string; facts: readonly string[]; paragraphs: readonly string[]; related: readonly { href: string; label: string }[] }; slug: string }) {
  const canonical = `${siteUrl}/${slug}`;
  return <>
    <JsonLd data={{
      "@context": "https://schema.org",
      "@type": "Product",
      name: data.h1,
      description: data.description,
      url: canonical,
      image: `${siteUrl}/pallets-argentina-logo.png`,
      brand: { "@type": "Brand", name: siteName },
      category: "Pallets de madera",
    }} />
    <SeoHeader />
    <main className="seo-page">
      <section className="seo-hero section-shell">
        <p className="eyebrow"><span className="eyebrow-dot" /> {data.eyebrow}</p>
        <h1>{data.h1}</h1>
        <p className="seo-intro">{data.intro}</p>
        <Link className="button button-dark" href="/#cotizar">Cotizar este pallet <span>↗</span></Link>
      </section>
      <section className="product-detail section-shell">
        <div><h2>Información del<br /><em>producto.</em></h2><ul className="product-facts">{data.facts.map((fact) => <li key={fact}>{fact}</li>)}</ul></div>
        <div className="product-detail-copy">{data.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
      </section>
      <section className="seo-related section-shell" aria-labelledby="product-related-heading"><p className="eyebrow"><span className="eyebrow-dot" /> También puede interesarte</p><h2 id="product-related-heading">Encontrá la opción<br /><em>correcta.</em></h2><div className="seo-link-grid">{data.related.map((link) => <a className="seo-link-card" href={link.href} key={link.href}>{link.label}<span>↗</span></a>)}</div></section>
      <section className="seo-cta"><div className="section-shell"><h2>¿Querés una<br /><em>cotización?</em></h2><p>Contanos la medida, cantidad y destino de tu pedido.</p><Link className="button button-lime" href="/#cotizar">Solicitar cotización <span>↗</span></Link></div></section>
    </main>
    <SeoFooter />
  </>;
}
