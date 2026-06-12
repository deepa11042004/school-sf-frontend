import type { Metadata } from "next";
import Reports from "@/components/fee/Reports";
export const metadata: Metadata = {
  title: "CMSFullForm Dashboard - OpenSource CMS",
  description: "CmsFullForm dashboard build with Next.js and Tailwind CSS",
};

export default function page() {
  return (
    <>       
      <Reports/>
    </>
  );
}
