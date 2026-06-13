import type { Metadata } from "next";
import CreateStudyMaterials from "@/components/Academic/internal/CreateStudyMaterials";

export const metadata: Metadata = {
  title: " SF-Software Dashboard - OpenSource CMS",
  description: " SF-Software dashboard build with Next.js and Tailwind CSS",
};

export default function page() {
  return (
    <>
      <CreateStudyMaterials />
    </>
  );
}
 