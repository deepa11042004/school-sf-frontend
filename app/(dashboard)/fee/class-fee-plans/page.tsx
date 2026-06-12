import type { Metadata } from "next";
import ClassFeePlans from "@/components/fee/ClassFeePlans";

export const metadata: Metadata = {
  title: "CMSFullForm Dashboard - OpenSource CMS",
  description: "CmsFullForm dashboard build with Next.js and Tailwind CSS",
};

export default function page() {
  return (
    <>       
      <ClassFeePlans />
    </>
  );
}
