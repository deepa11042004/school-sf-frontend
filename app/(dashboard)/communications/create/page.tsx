import type { Metadata } from "next";
import CreateCommunications from "@/components/communications/internal/CreateCommunications";

export const metadata: Metadata = {
  title: "CMSFullForm Dashboard - OpenSource CMS",
  description: "CmsFullForm dashboard build with Next.js and Tailwind CSS",
};

export default function page() {
  return (
    <>       
      < CreateCommunications />
    </>
  );
}
