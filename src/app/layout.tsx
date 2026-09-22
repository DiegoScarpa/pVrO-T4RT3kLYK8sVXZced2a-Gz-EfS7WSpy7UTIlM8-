import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "News Intelligence",
  description: "A calm, source-transparent daily news briefing.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
