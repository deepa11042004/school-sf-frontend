import type { Metadata } from "next";
import Ledger from "@/components/acount/Ledger";

export const metadata: Metadata = {
  title: " SF-Software Dashboard - OpenSource CMS",
  description: " SF-Software dashboard build with Next.js and Tailwind CSS",
};

export default function page() {
  return (
    <>
      <Ledger />
    </>
  );
}
 