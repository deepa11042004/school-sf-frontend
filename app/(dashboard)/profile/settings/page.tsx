import type { Metadata } from "next";
import Content from "@/components/profile/content";
export const metadata: Metadata = {
  title: "CMSFullForm Dashboard - OpenSource CMS",
  description: "CmsFullForm dashboard build with Next.js and Tailwind CSS",
};

export default function SettingsPage() {
  return (
    <>
      <Content />
    </>
  );
}
