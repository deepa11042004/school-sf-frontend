import type { Metadata } from "next";
import CreateHostel from "@/components/Management/Hostel/internal/CreateHostel";
export const metadata: Metadata = {
  title: "CMSFullForm Dashboard - OpenSource CMS",
  description: "CmsFullForm dashboard build with Next.js and Tailwind CSS",
};

export default function page() {
  return (
    <>
      <CreateHostel />
    </>
  );
}
