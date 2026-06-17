import type { Metadata } from "next";
import CreateStaff from "@/components/peoples/internal/CreateStaff";

export const metadata: Metadata = {
  title: " SF-Software Dashboard - OpenSource CMS",
  description: " SF-Software dashboard build with Next.js and Tailwind CSS",
};

export default function page() {
  return (
   
    <CreateStaff/>
     
  );
}
 