import type { Metadata } from "next";
import { CommercialPage } from "@/src/components/commercial-page";
import { commercialPages } from "@/src/lib/seo-pages";

export const metadata: Metadata = { title: { absolute: commercialPages["pallets-reciclados"].title }, description: commercialPages["pallets-reciclados"].description, alternates: { canonical: "/pallets-reciclados" } };
export default function Page() { return <CommercialPage data={commercialPages["pallets-reciclados"]} />; }
