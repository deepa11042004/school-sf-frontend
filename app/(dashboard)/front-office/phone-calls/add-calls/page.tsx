import type { Metadata } from "next";
import AddPhoneCall from "@/components/front-office/internal/AddPhoneCall";

export const metadata: Metadata = {
  title: " SF-Software Dashboard - OpenSource CMS",
  description: " SF-Software dashboard build with Next.js and Tailwind CSS",
};

export default function page() {
  return (
    <>
      <AddPhoneCall/>
       
    </>
  );
}
 