import type { Metadata } from "next";
import { CommercialPage } from "@/src/components/commercial-page";
import { commercialPages } from "@/src/lib/seo-pages";

export const metadata: Metadata = { title: { absolute: commercialPages["pallets-nuevos"].title }, description: commercialPages["pallets-nuevos"].description, alternates: { canonical: "/pallets-nuevos/" } };
export default function Page() { return <CommercialPage data={commercialPages["pallets-nuevos"]} />; }
