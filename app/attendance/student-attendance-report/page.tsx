import type { Metadata } from "next";
import Layout from "@/components/cmsfullform/layout"
import StudentAttendanceReport from "@/components/Attendance/StudentAttendanceReport";

export const metadata: Metadata = {
  title: " SF-Software Dashboard - OpenSource CMS",
  description: " SF-Software dashboard build with Next.js and Tailwind CSS",
};

export default function page() {
  return (
    <Layout>
      <StudentAttendanceReport />
    </Layout>
  );
}
 