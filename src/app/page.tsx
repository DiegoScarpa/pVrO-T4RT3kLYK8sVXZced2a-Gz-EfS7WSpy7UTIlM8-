'use client';

import { useState } from 'react';
import { QuoteForm } from '../components/quote-form';

const products = [
  { name: 'Pallet Arlog', detail: 'La medida estándar para mover más, con menos fricción.', image: 'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https%3A//assets.cdn.filesafe.space/IBVC0ujkEUoZsdBxS8Hv/media/66747496e6de7ec756e5f1f3.png', tag: 'Más elegido' },
  { name: 'Pallet Euro', detail: 'Precisión y compatibilidad para operaciones exigentes.', image: 'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https%3A//assets.cdn.filesafe.space/IBVC0ujkEUoZsdBxS8Hv/media/667474ea01d4bdf77387663a.png', tag: 'Exportación' },
  { name: 'Pallet para tambor', detail: 'Una base estable para cargas cilíndricas y pesadas.', image: 'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https%3A//assets.cdn.filesafe.space/IBVC0ujkEUoZsdBxS8Hv/media/6674749619bb7a0b93405762.png', tag: 'Especial' },
];

const faqs = [
  ['¿Trabajan medidas especiales?', 'Sí. Fabricamos medidas estándar y especiales según el tipo de carga, el circuito y el espacio disponible.'],
  ['¿Qué madera utilizan?', 'Trabajamos principalmente con eucaliptus saligna seleccionado por su resistencia, confiabilidad y durabilidad.'],
  ['¿Hacen entregas?', 'Coordinamos la entrega según volumen y destino. Escribinos con tu localidad para confirmar disponibilidad.'],
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Pallets Argentina, inicio"><img className="brand-logo" src="/pallets-argentina-logo.png" alt="Pallets Argentina" /></a>
        <nav className="desktop-nav" aria-label="Navegación principal"><a href="#productos">Productos</a><a href="#nosotros">Nosotros</a><a href="#faq">Preguntas frecuentes</a></nav>
        <a className="header-cta" href="#cotizar">Cotizar <span>↗</span></a>
      </header>

      <section id="inicio" className="hero section-shell">
        <div className="hero-copy"><p className="eyebrow"><span className="eyebrow-dot" /> Logística que arranca desde abajo</p><h1>Pallets que<br /><span>aguantan el ritmo.</span></h1><p className="hero-intro">Fabricamos pallets de madera para que tu operación se mueva con seguridad, continuidad y menos improvisación.</p><div className="hero-actions"><a className="button button-dark" href="#cotizar">Pedí tu cotización <span>↗</span></a><a className="text-link" href="#productos">Ver productos <span>↓</span></a></div><div className="hero-note"><span>✓</span> Eucaliptus saligna seleccionado <span>•</span> Fabricación a medida</div></div>
        <div className="hero-art" aria-label="Pallets de madera en depósito" role="img"><div className="hero-image" /><div className="hero-stamp"><strong>Desde 2014</strong><span>Calidad que<br />se sostiene</span></div><div className="hero-side-note">PALLETS<br /><span>BUENOS AIRES · ARG</span></div></div>
      </section>

      <section className="trust-strip"><div className="section-shell trust-grid"><p className="trust-lead">Una base confiable para<br /><strong>operaciones que no paran.</strong></p><div className="trust-stat"><strong>+10</strong><span>años de experiencia</span></div><div className="trust-stat"><strong>100%</strong><span>asesoría personalizada</span></div><div className="trust-stat"><strong>AR</strong><span>entregas en todo el país</span></div></div></section>

      <section id="productos" className="section-shell products-section"><div className="section-heading"><div><p className="eyebrow"><span className="eyebrow-dot" /> Lo que fabricamos</p><h2>Una solución para<br /><em>cada carga.</em></h2></div><p className="section-summary">Elegí una medida estándar o contanos qué necesitás. Te ayudamos a encontrar el pallet correcto para tu circuito.</p></div><div className="product-grid">{products.map((product, index) => <article className={`product-card product-card-${index + 1}`} key={product.name}><div className="product-image-wrap"><img src={product.image} alt={product.name} /><span className="product-tag">{product.tag}</span></div><div className="product-content"><div><p className="product-number">0{index + 1}</p><h3>{product.name}</h3><p>{product.detail}</p></div><a href="#cotizar" aria-label={`Cotizar ${product.name}`}>↗</a></div></article>)}</div></section>

      <section id="nosotros" className="about-section"><div className="section-shell about-grid"><div className="about-image"><div className="about-photo" /><span className="about-caption">Hechos para el trabajo real.</span></div><div className="about-copy"><p className="eyebrow"><span className="eyebrow-dot" /> Por qué Pallets Argentina</p><h2>La calidad se nota<br /><em>cuando hace falta.</em></h2><p>Somos especialistas en pallets de madera eucaliptus saligna. Trabajamos con un control de calidad estricto para que cada unidad responda en el depósito, en el camión y en el destino.</p><p>Fabricamos medidas estándar y especiales, con atención directa y respuesta rápida. Porque tu operación no puede esperar.</p><a className="text-link text-link-light" href="#cotizar">Hablemos de tu operación <span>↗</span></a></div></div></section>

      <section id="faq" className="section-shell faq-section"><div className="faq-intro"><p className="eyebrow"><span className="eyebrow-dot" /> Antes de cotizar</p><h2>Lo que suelen<br /><em>preguntarnos.</em></h2></div><div className="faq-list">{faqs.map(([question, answer], index) => <div className={`faq-item ${openFaq === index ? 'is-open' : ''}`} key={question}><button onClick={() => setOpenFaq(openFaq === index ? -1 : index)} aria-expanded={openFaq === index}><span>0{index + 1}</span><strong>{question}</strong><i>{openFaq === index ? '−' : '+'}</i></button>{openFaq === index && <p>{answer}</p>}</div>)}</div></section>

      <section id="cotizar" className="quote-section"><div className="section-shell quote-grid"><div className="quote-copy"><p className="eyebrow eyebrow-lime"><span className="eyebrow-dot" /> Empecemos</p><h2>Contanos qué<br /><em>necesitás mover.</em></h2><p>Respondemos rápido con una recomendación clara y una cotización a medida.</p><div className="contact-details"><a href="https://wa.me/541128435793" target="_blank" rel="noreferrer"><span>WhatsApp</span>11 2843 5793 ↗</a><a href="mailto:info@palletsargentina.com"><span>Email</span>info@palletsargentina.com ↗</a></div></div><QuoteForm /></div></section>

      <footer className="site-footer"><div className="section-shell footer-grid"><a className="brand brand-footer" href="#inicio"><img className="brand-logo" src="/pallets-argentina-logo.png" alt="Pallets Argentina" /></a><p>Una base confiable para operaciones que no paran.</p><div className="footer-links"><a href="#productos">Productos</a><a href="#nosotros">Nosotros</a><a href="#cotizar">Contacto</a></div></div><div className="section-shell footer-bottom"><span>© 2024 Pallets Argentina</span><span>Buenos Aires · Argentina</span></div></footer>
    </main>
  );
}
