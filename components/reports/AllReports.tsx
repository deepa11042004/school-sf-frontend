"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import {
  CalendarCheck,
  UserCheck,
  GraduationCap,
  FileBadge,
  IndianRupee,
  IdCard,
  Ticket,
  ChevronRight,
} from "lucide-react";

const reportCategories = [
  {
    title: "Attendance Reports",
    items: [
      {
        title: "Student Attendance",
        description: "Monthly attendance summary",
        icon: CalendarCheck,
        color: "bg-blue-100 text-blue-600",
        href: "/reports/attendance/student",
      },
      {
        title: "Staff Attendance",
        description: "Staff monthly attendance",
        icon: UserCheck,
        color: "bg-emerald-100 text-emerald-600",
        href: "/reports/attendance/staff",
      },
    ],
  },
  {
    title: "Academic Reports",
    items: [
      {
        title: "Examinations",
        description: "View exam results and reports",
        icon: GraduationCap,
        color: "bg-purple-100 text-purple-600",
        href: "/reports/academic/examinations",
      },
      {
        title: "Get Report Card",
        description: "Generate bulk report cards in PDF",
        icon: FileBadge,
        color: "bg-indigo-100 text-indigo-600",
        href: "/reports/academic/report-cards",
      },
    ],
  },
  {
    title: "Financial Reports",
    items: [
      {
        title: "Class Tuition Fees",
        description: "Fee collection status by class",
        icon: IndianRupee,
        color: "bg-amber-100 text-amber-600",
        href: "/reports/financial/tuition-fees",
      },
    ],
  },
  {
    title: "Student Reports",
    items: [
      {
        title: "ID Card Generator",
        description: "Generate Student ID Cards",
        icon: IdCard,
        color: "bg-cyan-100 text-cyan-600",
        href: "/reports/student/id-cards",
      },
      {
        title: "Admit Card Generator",
        description: "Print Exam Admit Cards",
        icon: Ticket,
        color: "bg-rose-100 text-rose-600",
        href: "/reports/student/admit-cards",
      },
    ],
  },
];

export default function ReportsDashboard() {
  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight ">
          Reports Dashboard
        </h1>

        {/* Categories Grid */}
        <div className="space-y-8">
          {reportCategories.map((category) => (
            <div key={category.title} className="space-y-4">
              <h2 className="text-lg font-semibold  flex items-center gap-3">
                {category.title}
                <div className="h-px flex-1 bg-slate-200" />
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.items.map((item) => (
                  <Link key={item.title} href={item.href}>
                    <Card className="group hover:border-indigo-200 hover:shadow-md transition-all duration-200 cursor-pointer h-full">
                      <CardContent className="p-6 flex items-start gap-4">
                        <div
                          className={`p-3 rounded-xl ${item.color} shrink-0`}
                        >
                          <item.icon className="h-6 w-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold   ">{item.title}</h3>
                          <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                        <ChevronRight className="h-5 w-5   group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
