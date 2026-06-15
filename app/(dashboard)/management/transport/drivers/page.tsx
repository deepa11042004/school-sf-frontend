import type { Metadata } from "next";
import Drivers from "@/components/Management/Transport/Drivers";
export const metadata: Metadata = {
  title: "CMSFullForm Dashboard - OpenSource CMS",
  description: "CmsFullForm dashboard build with Next.js and Tailwind CSS",
};

export default function page() {
  return (
    <>
      < Drivers />
    </>
  );
}
