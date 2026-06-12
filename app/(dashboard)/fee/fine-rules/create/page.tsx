import type { Metadata } from "next";
import CreateFineRule from "@/components/fee/internal/CreateFineRule";

export const metadata: Metadata = {
  title: "CMSFullForm Dashboard - OpenSource CMS",
  description: "CmsFullForm dashboard build with Next.js and Tailwind CSS",
};

export default function page() {
  return (
    <>       
      <CreateFineRule />
    </>
  );
}
