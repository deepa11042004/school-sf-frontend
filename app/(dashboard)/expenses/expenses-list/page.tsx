import type { Metadata } from "next";
import ExpensesList from "@/components/expenses/ExpensesList";
export const metadata: Metadata = {
  title: "CMSFullForm Dashboard - OpenSource CMS",
  description: "CmsFullForm dashboard build with Next.js and Tailwind CSS",
};

export default function page() {
  return (
    <>       
      <ExpensesList />
    </>
  );
}
