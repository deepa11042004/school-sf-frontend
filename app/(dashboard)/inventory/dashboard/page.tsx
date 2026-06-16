import type { Metadata } from "next";
import Dashboard from "@/components/Inventory/Dashboard";

export const metadata: Metadata = {
  title: " SF-Software Dashboard - OpenSource CMS",
  description: " SF-Software dashboard build with Next.js and Tailwind CSS",
};

export default function page() {
  return (
    <>
      <Dashboard />
    </>
  );
}
