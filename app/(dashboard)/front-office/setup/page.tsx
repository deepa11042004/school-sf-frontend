import type { Metadata } from "next";
import FrontOfficeSetup from "@/components/front-office/FrontOfficeSetup";
export const metadata: Metadata = {
  title: " SF-Software Dashboard - OpenSource CMS",
  description: " SF-Software dashboard build with Next.js and Tailwind CSS",
};

export default function page() {
  return (
    <>
      <FrontOfficeSetup />
    </>
  );
}
 