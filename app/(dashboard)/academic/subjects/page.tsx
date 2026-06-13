import type { Metadata } from "next";
import Subjects from "@/components/Academic/Subjects";

export const metadata: Metadata = {
  title: " SF-Software Dashboard - OpenSource CMS",
  description: " SF-Software dashboard build with Next.js and Tailwind CSS",
};

export default function page() {
  return (
    <>
      <Subjects />
    </>
  );
}
 