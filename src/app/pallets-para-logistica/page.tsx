import type { Metadata } from "next";
import { CommercialPage } from "@/src/components/commercial-page";
import { commercialPages } from "@/src/lib/seo-pages";

export const metadata: Metadata = { title: { absolute: commercialPages["pallets-para-logistica"].title }, description: commercialPages["pallets-para-logistica"].description, alternates: { canonical: "/pallets-para-logistica" } };
export default function Page() { return <CommercialPage data={commercialPages["pallets-para-logistica"]} />; }
