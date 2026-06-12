import type { Metadata } from "next";
import CreateHeadExpenses from "@/components/expenses/internal/CreateHeadExpenses";
export const metadata: Metadata = {
  title: "CMSFullForm Dashboard - OpenSource CMS",
  description: "CmsFullForm dashboard build with Next.js and Tailwind CSS",
};

export default function page() {
  return (
    <>       
      <CreateHeadExpenses />
    </>
  );
}
