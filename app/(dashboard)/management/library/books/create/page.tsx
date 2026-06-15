import type { Metadata } from "next";
import CreateBooks from "@/components/Management/library/internal/CreateBooks";
export const metadata: Metadata = {
  title: "CMSFullForm Dashboard - OpenSource CMS",
  description: "CmsFullForm dashboard build with Next.js and Tailwind CSS",
};

export default function page() {
  return (
    <>
      <CreateBooks />
    </>
  );
}
