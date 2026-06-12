import type { Metadata } from "next";
import Houses from "@/components/settings/Houses";
export const metadata: Metadata = {
  title: "CMSFullForm Dashboard - OpenSource CMS",
  description: "CmsFullForm dashboard build with Next.js and Tailwind CSS",
};

export default function page() {
  return (
    <>
      <Houses />
    </>
  );
}
