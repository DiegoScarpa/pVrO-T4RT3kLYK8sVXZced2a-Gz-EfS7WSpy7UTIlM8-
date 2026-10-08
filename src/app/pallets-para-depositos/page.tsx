import type { Metadata } from "next";
import { CommercialPage } from "@/src/components/commercial-page";
import { commercialPages } from "@/src/lib/seo-pages";

export const metadata: Metadata = { title: { absolute: commercialPages["pallets-para-depositos"].title }, description: commercialPages["pallets-para-depositos"].description, alternates: { canonical: "/pallets-para-depositos/" } };
export default function Page() { return <CommercialPage data={commercialPages["pallets-para-depositos"]} />; }
