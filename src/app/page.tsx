import Link from "next/link";
import { FaqList } from "@/src/components/faq-list";
import { PalletMark } from "@/src/components/pallet-mark";
import { QuoteForm } from "@/src/components/quote-form";
import { contact, products, serviceAreas, services } from "@/src/lib/site";

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <p className={`eyebrow ${light ? "eyebrow-light" : ""}`}><span className="eyebrow-dot" />{children}</p>;
}

export default function Home() {
  return <main>
    <header className="site-header">
      <Link className="brand" href="#inicio" aria-label="Pallets Argentina, inicio"><span className="brand-mark">PA</span><span>Pallets<br /><em>Argentina</em></span></Link>
      <nav className="desktop-nav" aria-label="Navegación principal"><a href="#productos">Productos</a><a href="#servicios">Servicios</a><a href="#nosotros">Nosotros</a><a href="#cobertura">Cobertura</a></nav>
      <a className="header-cta" href="#cotizar">Cotizar <span>↗</span></a>
    </header>

    <section id="inicio" className="hero section-shell">
      <div className="hero-copy">
        <Eyebrow>Logística que arranca desde abajo</Eyebrow>
        <h1>Pallets que<br /><span>aguantan el ritmo.</span></h1>
        <p className="hero-intro">Fabricamos pallets de madera para que tu operación se mueva con seguridad, continuidad y menos improvisación.</p>
        <div className="hero-actions"><a className="button button-dark" href="#cotizar">Pedí tu cotización <span>↗</span></a><a className="text-link" href="#productos">Ver productos <span>↓</span></a></div>
        <div className="hero-note"><span>✓</span> Eucaliptus saligna seleccionado <span>•</span> Fabricación a medida</div>
      </div>
      <div className="hero-art" aria-label="Pallets de madera en depósito" role="img"><div className="hero-image" /><div className="hero-stamp"><strong>Desde 2014</strong><span>Calidad que<br />se sostiene</span></div><div className="hero-side-note">PALLETS<br /><span>BUENOS AIRES · ARG</span></div><div className="hero-pallet"><PalletMark /></div></div>
    </section>

    <section className="trust-strip"><div className="section-shell trust-grid"><p className="trust-lead">Una base confiable para<br /><strong>operaciones que no paran.</strong></p><div className="trust-stat"><strong>+10</strong><span>años de experiencia</span></div><div className="trust-stat"><strong>100%</strong><span>asesoría personalizada</span></div><div className="trust-stat"><strong>AR</strong><span>entregas en todo el país</span></div></div></section>

    <section id="productos" className="section-shell products-section"><div className="section-heading"><div><Eyebrow>Lo que fabricamos</Eyebrow><h2>Una solución para<br /><em>cada carga.</em></h2></div><p className="section-summary">Elegí una medida estándar o contanos qué necesitás. Te ayudamos a encontrar el pallet correcto para tu circuito.</p></div><div className="product-grid">{products.map((product) => <article className={`product-card product-card-${product.tone}`} key={product.name}><div className="product-image-wrap"><div className="product-illustration"><PalletMark variant={product.tone} /></div><span className="product-tag">{product.tag}</span></div><div className="product-content"><div><p className="product-number">{product.number}</p><h3>{product.name}</h3><p>{product.description}</p><small>{product.size}</small></div><a href="#cotizar" aria-label={`Cotizar ${product.name}`}>↗</a></div></article>)}</div></section>

    <section id="servicios" className="services-section"><div className="section-shell"><div className="section-heading section-heading-light"><div><Eyebrow light>Cómo trabajamos</Eyebrow><h2>Más que un pallet.<br /><em>Una respuesta.</em></h2></div><p className="section-summary">Entendemos el ritmo de tu operación y te acompañamos desde la elección del modelo hasta la entrega.</p></div><div className="service-list">{services.map((service) => <article className="service-row" key={service.number}><span>{service.number}</span><h3>{service.title}</h3><p>{service.description}</p><a href="#cotizar" aria-label={`Consultar por ${service.title}`}>↗</a></article>)}</div></div></section>

    <section id="nosotros" className="about-section"><div className="section-shell about-grid"><div className="about-image"><div className="about-photo" /><span className="about-caption">Hechos para el trabajo real.</span></div><div className="about-copy"><Eyebrow>Por qué Pallets Argentina</Eyebrow><h2>La calidad se nota<br /><em>cuando hace falta.</em></h2><p>Somos especialistas en pallets de madera eucaliptus saligna. Trabajamos con un control de calidad estricto para que cada unidad responda en el depósito, en el camión y en el destino.</p><p>Fabricamos medidas estándar y especiales, con atención directa y respuesta rápida. Porque tu operación no puede esperar.</p><a className="text-link text-link-light" href="#cotizar">Hablemos de tu operación <span>↗</span></a></div></div></section>

    <section id="cobertura" className="coverage-section section-shell"><div className="coverage-copy"><Eyebrow>Donde necesitás llegar</Eyebrow><h2>Una red que parte<br /><em>desde Buenos Aires.</em></h2><p>Coordinamos entregas para acompañar operaciones en CABA, Gran Buenos Aires y distintos puntos del interior.</p><a className="text-link" href="#cotizar">Consultá por tu zona <span>↗</span></a></div><div className="coverage-map" aria-label="Mapa ilustrado de cobertura en Argentina"><div className="map-glow" /><div className="map-pin pin-ba">BA</div><div className="map-pin pin-norte">NOA</div><div className="map-pin pin-centro">CENTRO</div><div className="map-label">ARGENTINA<br /><span>cobertura coordinada</span></div></div><div className="area-list">{serviceAreas.map((area) => <span key={area}>{area}</span>)}</div></section>

    <section id="faq" className="faq-section section-shell"><div className="faq-intro"><Eyebrow>Antes de cotizar</Eyebrow><h2>Lo que suelen<br /><em>preguntarnos.</em></h2></div><FaqList /></section>

    <section id="cotizar" className="quote-section"><div className="section-shell quote-grid"><div className="quote-copy"><Eyebrow light>Empecemos</Eyebrow><h2>Contanos qué<br /><em>necesitás mover.</em></h2><p>Respondemos rápido con una recomendación clara y una cotización a medida.</p><div className="contact-details"><a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noreferrer"><span>WhatsApp</span>{contact.whatsappLabel} ↗</a><a href={`mailto:${contact.email}`}><span>Email</span>{contact.email} ↗</a></div></div><QuoteForm /></div></section>

    <footer className="site-footer"><div className="section-shell footer-grid"><Link className="brand brand-footer" href="#inicio"><span className="brand-mark">PA</span><span>Pallets<br /><em>Argentina</em></span></Link><p>Una base confiable para operaciones que no paran.</p><div className="footer-links"><a href="#productos">Productos</a><a href="#servicios">Servicios</a><a href="#nosotros">Nosotros</a><a href="#cotizar">Contacto</a></div><small>© {new Date().getFullYear()} Pallets Argentina · {contact.location}</small></div></footer>
  </main>;
}
