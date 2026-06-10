import type { Metadata } from "next";
import CreateHouses from "@/components/settings/internal/CreateHouses";
import Layout from "@/components/cmsfullform/layout";

export const metadata: Metadata = {
  title: "CMSFullForm Dashboard - OpenSource CMS",
  description: "CmsFullForm dashboard build with Next.js and Tailwind CSS",
};

export default function page() {
  return (
    <Layout>
      <CreateHouses />
    </Layout>
  );
}
