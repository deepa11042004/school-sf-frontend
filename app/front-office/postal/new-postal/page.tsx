import type { Metadata } from "next";
import Layout from "@/components/cmsfullform/layout";
import NewPostal from "@/components/front-office/internal/NewPostal";
export const metadata: Metadata = {
  title: " SF-Software Dashboard - OpenSource CMS",
  description: " SF-Software dashboard build with Next.js and Tailwind CSS",
};

export default function page() {
  return (
    <Layout>
      <NewPostal />
    </Layout>
  );
}
