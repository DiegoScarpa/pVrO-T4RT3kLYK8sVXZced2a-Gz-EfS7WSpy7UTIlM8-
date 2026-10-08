import type { Metadata } from "next";
import { CommercialPage } from "@/src/components/commercial-page";
import { commercialPages } from "@/src/lib/seo-pages";

export const metadata: Metadata = { title: { absolute: commercialPages["pallets-de-madera"].title }, description: commercialPages["pallets-de-madera"].description, alternates: { canonical: "/pallets-de-madera" } };
export default function Page() { return <CommercialPage data={commercialPages["pallets-de-madera"]} />; }
