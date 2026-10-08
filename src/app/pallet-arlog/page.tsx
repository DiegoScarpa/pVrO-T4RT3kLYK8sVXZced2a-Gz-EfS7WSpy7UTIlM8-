import type { Metadata } from "next";
import { ProductPage } from "@/src/components/commercial-page";
import { productPages } from "@/src/lib/seo-pages";

export const metadata: Metadata = { title: { absolute: productPages["pallet-arlog"].title }, description: productPages["pallet-arlog"].description, alternates: { canonical: "/pallet-arlog/" } };
export default function Page() { return <ProductPage slug="pallet-arlog" data={productPages["pallet-arlog"]} />; }
