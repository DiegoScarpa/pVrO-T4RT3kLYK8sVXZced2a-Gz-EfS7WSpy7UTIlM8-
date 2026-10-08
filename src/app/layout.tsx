import type { Metadata } from 'next';
import './globals.css';
import './quote-form.css';
import './targeted-updates.css';
import { siteName, siteUrl } from '../lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Pallets de Madera en Argentina | Pallets Argentina', template: `%s | ${siteName}` },
  description: 'Fabricación y venta de pallets de madera para depósitos, logística y exportación en Argentina.',
  applicationName: siteName,
  creator: siteName,
  publisher: siteName,
  alternates: { canonical: '/' },
  openGraph: { type: 'website', locale: 'es_AR', url: siteUrl, siteName, title: 'Pallets de Madera en Argentina | Pallets Argentina', description: 'Fabricación y venta de pallets de madera para empresas en Argentina.' },
  twitter: { card: 'summary', title: 'Pallets de Madera en Argentina | Pallets Argentina', description: 'Fabricación y venta de pallets de madera para empresas en Argentina.' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
  icons: {
    icon: '/pallets-argentina-logo.png',
    shortcut: '/pallets-argentina-logo.png',
    apple: '/pallets-argentina-logo.png',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es-AR"><body>{children}</body></html>;
}
