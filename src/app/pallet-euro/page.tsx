import type { Metadata } from "next";
import { ProductPage } from "@/src/components/commercial-page";
import { productPages } from "@/src/lib/seo-pages";

export const metadata: Metadata = { title: { absolute: productPages["pallet-euro"].title }, description: productPages["pallet-euro"].description, alternates: { canonical: "/pallet-euro" } };
export default function Page() { return <ProductPage slug="pallet-euro" data={productPages["pallet-euro"]} />; }
