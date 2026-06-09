import type { Metadata } from "next";
import Layout from "@/components/cmsfullform/layout"
import StaffAttendanceReport from "@/components/Attendance/StaffAttendanceReport";

export const metadata: Metadata = {
  title: " SF-Software Dashboard - OpenSource CMS",
  description: " SF-Software dashboard build with Next.js and Tailwind CSS",
};

export default function page() {
  return (
    <Layout>
      <StaffAttendanceReport />
    </Layout>
  );
}
 