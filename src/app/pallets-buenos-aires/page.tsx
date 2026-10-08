import type { Metadata } from "next";
import { CommercialPage } from "@/src/components/commercial-page";
import { commercialPages } from "@/src/lib/seo-pages";

export const metadata: Metadata = { title: { absolute: commercialPages["pallets-buenos-aires"].title }, description: commercialPages["pallets-buenos-aires"].description, alternates: { canonical: "/pallets-buenos-aires/" } };
export default function Page() { return <CommercialPage data={commercialPages["pallets-buenos-aires"]} />; }
