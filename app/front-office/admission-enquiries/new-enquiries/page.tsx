import type { Metadata } from "next";
import Layout from "@/components/cmsfullform/layout";
import NewEnuiries from "@/components/front-office/internal/NewEnuiries";
export const metadata: Metadata = {
  title: " SF-Software Dashboard - OpenSource CMS",
  description: " SF-Software dashboard build with Next.js and Tailwind CSS",
};

export default function page() {
  return (
    <Layout>
     <NewEnuiries/>
    </Layout>
  );
}
