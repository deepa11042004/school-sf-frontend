import type { Metadata } from "next";
import CreateClassFeePlans from "@/components/fee/internal/CreateClassFeePlans";
export const metadata: Metadata = {
  title: "CMSFullForm Dashboard - OpenSource CMS",
  description: "CmsFullForm dashboard build with Next.js and Tailwind CSS",
};

export default function page() {
  return (
    <>
      <CreateClassFeePlans />
    </>
  );
}
