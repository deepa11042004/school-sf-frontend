import type { Metadata } from "next";
import Competition from "@/components/Competition/Competition";
export const metadata: Metadata = {
  title: "CMSFullForm Dashboard - OpenSource CMS",
  description: "CmsFullForm dashboard build with Next.js and Tailwind CSS",
};

export default function page() {
  return (
    <>       
      <Competition />
    </>
  );
}
