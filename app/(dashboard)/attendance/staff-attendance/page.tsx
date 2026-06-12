import type { Metadata } from "next";
import StaffAttendance from "@/components/Attendance/StaffAttendance";

export const metadata: Metadata = {
  title: " SF-Software Dashboard - OpenSource CMS",
  description: " SF-Software dashboard build with Next.js and Tailwind CSS",
};

export default function page() {
  return (
    <>
      <StaffAttendance />
    </>
  );
}
 