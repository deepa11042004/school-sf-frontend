import type { Metadata } from "next";
import AllReports from "@/components/reports/AllReports";
export const metadata: Metadata = {
  title: "CMSFullForm Dashboard - OpenSource CMS",
  description: "CmsFullForm dashboard build with Next.js and Tailwind CSS",
};

export default function page() {
  return (
    <>
      <AllReports />
    </>
  );
}
