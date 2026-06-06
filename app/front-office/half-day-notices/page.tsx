import type { Metadata } from "next";
import Layout from "@/components/cmsfullform/layout"
import HalfDayNotices from "@/components/front-office/HalfDayNotices";
export const metadata: Metadata = {
  title: " SF-Software Dashboard - OpenSource CMS",
  description: " SF-Software dashboard build with Next.js and Tailwind CSS",
};

export default function page() {
  return (
    <Layout>
      <HalfDayNotices />
    </Layout>
  );
}
 