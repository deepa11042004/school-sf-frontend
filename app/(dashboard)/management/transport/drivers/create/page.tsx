import type { Metadata } from "next";
import CreateDrivers from "@/components/Management/Transport/internal/CreateDrivers";
export const metadata: Metadata = {
  title: "CMSFullForm Dashboard - OpenSource CMS",
  description: "CmsFullForm dashboard build with Next.js and Tailwind CSS",
};

export default function page() {
  return (
    <>
      < CreateDrivers />
    </>
  );
}
