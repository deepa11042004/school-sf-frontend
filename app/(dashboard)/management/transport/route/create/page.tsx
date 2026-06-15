import type { Metadata } from "next";
import CreateTrasnportRoutes from "@/components/Management/Transport/internal/CreateTrasnportRoutes";
export const metadata: Metadata = {
  title: "CMSFullForm Dashboard - OpenSource CMS",
  description: "CmsFullForm dashboard build with Next.js and Tailwind CSS",
};

export default function page() {
  return (
    <>
      <CreateTrasnportRoutes />
    </>
  );
}
