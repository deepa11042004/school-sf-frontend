"use client";

import {
  Calendar as CalendarIcon,
  FileText,
  UserCheck,
  CreditCard,
  BookOpen,
  FileBarChart,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface QuickLinkProps {
  title: string;
  icon: React.ReactNode;
  bgColor: string;
  textColor: string;
}

const QuickLinkTemp = ({ title, icon, bgColor, textColor }: QuickLinkProps) => (
  <Button
    variant="ghost"
    className={`flex flex-col items-center justify-center gap-2 h-20 w-full py-4 px-2 rounded-xl ${bgColor} ${textColor} hover:opacity-80 transition-opacity`}
  >
    {icon}
    <span className="text-xs font-medium text-center leading-tight break-words">
      {title}
    </span>
  </Button>
);

export default function QuickLink() {
  return (
    <div className="h-full w-full">
      <Card>
        <CardHeader>
          <CardTitle>Quick Links</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <QuickLinkTemp
              title="Calendar"
              icon={<CalendarIcon className="h-6 w-6 text-emerald-600" />}
              bgColor="bg-emerald-50 dark:bg-emerald-900/20"
              textColor="text-emerald-700 dark:text-emerald-400"
            />
            <QuickLinkTemp
              title="Exam Result"
              icon={<FileText className="h-6 w-6 text-violet-600" />}
              bgColor="bg-violet-50 dark:bg-violet-900/20"
              textColor="text-violet-700 dark:text-violet-400"
            />
            <QuickLinkTemp
              title="Attendance"
              icon={<UserCheck className="h-6 w-6 text-amber-600" />}
              bgColor="bg-amber-50 dark:bg-amber-900/20"
              textColor="text-amber-700 dark:text-amber-400"
            />
            <QuickLinkTemp
              title="Fees"
              icon={<CreditCard className="h-6 w-6 text-blue-600" />}
              bgColor="bg-blue-50 dark:bg-blue-900/20"
              textColor="text-blue-700 dark:text-blue-400"
            />
            <QuickLinkTemp
              title="Home Works"
              icon={<BookOpen className="h-6 w-6 text-rose-600" />}
              bgColor="bg-rose-50 dark:bg-rose-900/20"
              textColor="text-rose-700 dark:text-rose-400"
            />
            <QuickLinkTemp
              title="Reports"
              icon={<FileBarChart className="h-6 w-6 text-teal-600" />}
              bgColor="bg-teal-50 dark:bg-teal-900/20"
              textColor="text-teal-700 dark:text-teal-400"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
