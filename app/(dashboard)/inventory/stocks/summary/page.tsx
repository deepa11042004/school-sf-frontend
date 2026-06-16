import type { Metadata } from "next";
import StockSummary from "@/components/Inventory/StockSummary";

export const metadata: Metadata = {
  title: " SF-Software Dashboard - OpenSource CMS",
  description: " SF-Software dashboard build with Next.js and Tailwind CSS",
};

export default function page() {
  return (
    <>
      <StockSummary />
    </>
  );
}
  