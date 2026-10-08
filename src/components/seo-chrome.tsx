import Link from "next/link";
import Image from "next/image";

export function SeoHeader() {
  return <header className="site-header seo-header">
    <Link className="brand" href="/" aria-label="Pallets Argentina, inicio"><Image className="brand-logo" src="/pallets-argentina-logo.png" alt="Pallets Argentina" width={714} height={349} /></Link>
    <nav className="desktop-nav" aria-label="Navegación principal">
      <a href="/pallets-de-madera">Pallets</a>
      <a href="/pallets-para-logistica">Soluciones</a>
      <a href="/pallets-buenos-aires">Buenos Aires</a>
    </nav>
    <Link className="header-cta" href="/#cotizar">Cotizar <span>↗</span></Link>
  </header>;
}

export function SeoFooter() {
  return <footer className="site-footer"><div className="section-shell footer-grid"><Link className="brand brand-footer" href="/"><Image className="brand-logo" src="/pallets-argentina-logo.png" alt="Pallets Argentina" width={714} height={349} /></Link><p>Una base confiable para operaciones que no paran.</p><div className="footer-links"><a href="/pallets-de-madera">Pallets de madera</a><a href="/pallets-para-exportacion">Exportación</a><Link href="/#cotizar">Contacto</Link></div></div><div className="section-shell footer-bottom"><span>© 2024 Pallets Argentina</span><span>Buenos Aires · Argentina</span></div></footer>;
}
