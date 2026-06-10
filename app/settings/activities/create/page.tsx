import type { Metadata } from "next";
import Layout from "@/components/cmsfullform/layout"
import CreateAdditionalActivities from "@/components/settings/internal/CreateAdditionalActivities";

export const metadata: Metadata = {
  title: " SF-Software Dashboard - OpenSource CMS",
  description: " SF-Software dashboard build with Next.js and Tailwind CSS",
};

export default function page() {
  return (
    <Layout>
      <CreateAdditionalActivities />
    </Layout>
  );
}
 