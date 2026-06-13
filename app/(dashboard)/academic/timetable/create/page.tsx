import type { Metadata } from "next";
import CreateTimeTable from "@/components/Academic/internal/CreateTimeTable";

export const metadata: Metadata = {
  title: " SF-Software Dashboard - OpenSource CMS",
  description: " SF-Software dashboard build with Next.js and Tailwind CSS",
};

export default function page() {
  return (
    <>
      <CreateTimeTable />
    </>
  );
}
 