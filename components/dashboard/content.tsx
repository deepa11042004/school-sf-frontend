"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar as CalendarIcon,
  IndianRupee,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import TopStats from "./TopStats";
import QuickLink from "./QuickLink";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 20 }, (_, i) => currentYear - 10 + i);

export default function Content() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [month, setMonth] = useState<Date>(new Date());

  const handleMonthChange = (value: string) => {
    const newDate = new Date(month);
    newDate.setMonth(parseInt(value));
    setMonth(newDate);
  };

  const handleYearChange = (value: string) => {
    const newDate = new Date(month);
    newDate.setFullYear(parseInt(value));
    setMonth(newDate);
  };

  return (
    <div className="min-h-screen p-4  bg-background">
      <div className="max-w-8xl mx-auto space-y-4  ">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Admin Dashboard
        </h1>

        <TopStats />

        <div className="flex gap-6">
          {/* Quick Links */}

          <QuickLink />

          <div className="h-full w-full flex items-center justify-center">
            <div className="space-y-4 sm:space-y-6 w-fit pr-5">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <TrendingUp className="h-4 w-4 shrink-0" />
                    <span className="text-sm">Total Collection</span>
                  </div>

                  <div className="flex items-center gap-1 text-green-500">
                    <IndianRupee className="h-6 w-6" />
                    <p className="text-2xl sm:text-3xl font-bold">64,522.24</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <TrendingDown className="h-4 w-4 shrink-0" />
                    <span className="text-sm">Total Expenses</span>
                  </div>

                  <div className="flex items-center gap-1 text-red-500">
                    <IndianRupee className="h-6 w-6" />
                    <p className="text-2xl sm:text-3xl font-bold">60,522.24</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Schedules Calendar */}

            <Card className="h-full w-full ">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle>Schedules</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-purple-600 hover:text-purple-700 dark:text-purple-400 shrink-0"
                >
                  + Add New
                </Button>
              </CardHeader>
              <CardContent>
                {/* Month / Year Selectors */}
                <div className="flex gap-2 mb-3">
                  <Select
                    value={String(month.getMonth())}
                    onValueChange={handleMonthChange}
                  >
                    <SelectTrigger className="flex-1 h-8 text-sm min-w-0">
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>
                    <SelectContent>
                      {MONTHS.map((m, i) => (
                        <SelectItem key={m} value={String(i)}>
                          {m}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={String(month.getFullYear())}
                    onValueChange={handleYearChange}
                  >
                    <SelectTrigger className="w-24 h-8 text-sm shrink-0">
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                      {YEARS.map((y) => (
                        <SelectItem key={y} value={String(y)}>
                          {y}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-center overflow-x-auto w-full">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    month={month}
                    onMonthChange={setMonth}
                    className="rounded-md border w-full max-w-full"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
