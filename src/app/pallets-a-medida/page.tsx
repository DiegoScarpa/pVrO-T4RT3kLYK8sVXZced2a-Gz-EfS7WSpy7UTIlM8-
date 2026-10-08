import type { Metadata } from "next";
import { CommercialPage } from "@/src/components/commercial-page";
import { commercialPages } from "@/src/lib/seo-pages";

export const metadata: Metadata = { title: { absolute: commercialPages["pallets-a-medida"].title }, description: commercialPages["pallets-a-medida"].description, alternates: { canonical: "/pallets-a-medida/" } };
export default function Page() { return <CommercialPage data={commercialPages["pallets-a-medida"]} />; }
