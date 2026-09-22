import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pallets Argentina | Pallets de madera para operaciones que no paran",
  description: "Fabricamos pallets de madera eucaliptus saligna, medidas estándar y especiales para empresas de todo el país.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
