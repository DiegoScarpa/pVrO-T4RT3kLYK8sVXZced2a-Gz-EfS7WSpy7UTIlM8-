import type { Metadata } from "next";
import { CommercialPage } from "@/src/components/commercial-page";
import { commercialPages } from "@/src/lib/seo-pages";

export const metadata: Metadata = { title: { absolute: commercialPages["pallets-para-exportacion"].title }, description: commercialPages["pallets-para-exportacion"].description, alternates: { canonical: "/pallets-para-exportacion/" } };
export default function Page() { return <CommercialPage data={commercialPages["pallets-para-exportacion"]} />; }
