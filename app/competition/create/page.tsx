import type { Metadata } from "next";
import CreateCompetition from "@/components/Competition/internal/CreateCompetition";
import Layout from "@/components/cmsfullform/layout";

export const metadata: Metadata = {
  title: "CMSFullForm Dashboard - OpenSource CMS",
  description: "CmsFullForm dashboard build with Next.js and Tailwind CSS",
};

export default function page() {
  return (
    <Layout>       
      <CreateCompetition />
    </Layout>
  );
}
