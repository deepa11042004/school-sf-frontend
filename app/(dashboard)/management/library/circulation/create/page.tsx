import type { Metadata } from "next";
import CreateCirculation from "@/components/Management/library/internal/CreateCirculation";
export const metadata: Metadata = {
  title: "CMSFullForm Dashboard - OpenSource CMS",
  description: "CmsFullForm dashboard build with Next.js and Tailwind CSS",
};

export default function page() {
  return (
    <>
      <CreateCirculation />
    </>
  );
}
