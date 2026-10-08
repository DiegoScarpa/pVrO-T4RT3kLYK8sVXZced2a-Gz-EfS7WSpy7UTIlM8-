import Link from "next/link";

export default function NotFound() {
  return <main className="not-found section-shell"><p className="eyebrow"><span className="eyebrow-dot" /> Pallets Argentina</p><h1>Esta página no está<br /><em>disponible.</em></h1><p>Volvé al inicio para conocer nuestros pallets de madera.</p><Link className="button button-dark" href="/">Ir al inicio <span>↗</span></Link></main>;
}
