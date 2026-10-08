import type { Metadata } from "next";
import { ProductPage } from "@/src/components/commercial-page";
import { productPages } from "@/src/lib/seo-pages";

export const metadata: Metadata = { title: { absolute: productPages["pallet-para-tambor"].title }, description: productPages["pallet-para-tambor"].description, alternates: { canonical: "/pallet-para-tambor/" } };
export default function Page() { return <ProductPage slug="pallet-para-tambor" data={productPages["pallet-para-tambor"]} />; }
