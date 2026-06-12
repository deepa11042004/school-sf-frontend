import type { Metadata } from "next";
import RolesAndPermissions from "@/components/settings/RolesAndPermissions";
export const metadata: Metadata = {
  title: "CMSFullForm Dashboard - OpenSource CMS",
  description: "CmsFullForm dashboard build with Next.js and Tailwind CSS",
};

export default function page() {
  return (
    <>
      <RolesAndPermissions />
    </>
  );
}
