import type { Metadata } from 'next';
import './globals.css';
import './quote-form.css';
import './targeted-updates.css';

export const metadata: Metadata = {
  title: 'Pallets Argentina | Pallets de madera para operaciones que no paran',
  description: 'Fabricamos pallets de madera, medidas estándar y especiales para empresas de todo el país.',
  icons: {
    icon: '/pallets-argentina-logo.png',
    shortcut: '/pallets-argentina-logo.png',
    apple: '/pallets-argentina-logo.png',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>;
}
