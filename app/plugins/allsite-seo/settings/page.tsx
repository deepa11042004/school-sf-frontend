import type { Metadata } from "next";
import { AllSiteSEOSettings } from "@/components/plugins/allsite-seo/settings";

export const metadata: Metadata = {
  title: " SF-Software Dashboard - OpenSource CMS",
  description: " SF-Software dashboard build with Next.js and Tailwind CSS",
};

export default function AllSiteSEOSettingsPage() {
  return <AllSiteSEOSettings />;
}
