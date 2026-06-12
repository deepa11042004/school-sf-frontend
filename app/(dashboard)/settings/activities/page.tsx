import type { Metadata } from "next";
import Activities from "@/components/settings/Activities";
export const metadata: Metadata = {
  title: "CMSFullForm Dashboard - OpenSource CMS",
  description: "CmsFullForm dashboard build with Next.js and Tailwind CSS",
};

export default function page() {
  return (
    <>
      <Activities />
    </>
  );
}
