import type { Metadata } from "next";
import Circulation from "@/components/Management/library/Circulation";
export const metadata: Metadata = {
  title: "CMSFullForm Dashboard - OpenSource CMS",
  description: "CmsFullForm dashboard build with Next.js and Tailwind CSS",
};

export default function page() {
  return (
    <>
      <Circulation />
    </>
  );
}
