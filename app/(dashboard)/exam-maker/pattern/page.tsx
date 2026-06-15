import type { Metadata } from "next";
import Pattern from "@/components/ExamMaker/Pattern";

export const metadata: Metadata = {
  title: "CMSFullForm Dashboard - OpenSource CMS",
  description: "CmsFullForm dashboard build with Next.js and Tailwind CSS",
};

export default function page() {
  return (
    <Pattern />
  );
}
