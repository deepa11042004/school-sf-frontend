import type { Metadata } from "next";
import CreateScheduledExams from "@/components/ExamMaker/internal/CreateScheduledExams";

export const metadata: Metadata = {
  title: "CMSFullForm Dashboard - OpenSource CMS",
  description: "CmsFullForm dashboard build with Next.js and Tailwind CSS",
};

export default function page() {
  return <CreateScheduledExams />;
}
