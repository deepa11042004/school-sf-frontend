import type { Metadata } from "next";
import Layout from "@/components/cmsfullform/layout";
import ClassHostel from "@/components/fee/ClassHostel";

export const metadata: Metadata = {
  title: "CMSFullForm Dashboard - OpenSource CMS",
  description: "CmsFullForm dashboard build with Next.js and Tailwind CSS",
};

export default function page() {
  return (
    <Layout>       
      <ClassHostel/>
    </Layout>
  );
}
