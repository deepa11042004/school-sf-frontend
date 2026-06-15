import type { Metadata } from "next";
import Hostel from "@/components/Management/Hostel/Hostel";
export const metadata: Metadata = {
  title: "CMSFullForm Dashboard - OpenSource CMS",
  description: "CmsFullForm dashboard build with Next.js and Tailwind CSS",
};

export default function page() {
  return (
    <>
      <Hostel />
    </>
  );
}
