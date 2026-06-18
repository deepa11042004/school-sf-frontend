"use client";

import {
  CalendarDays,
  CalendarCheck ,
  Percent,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const attendanceData = [
  {
    month: "Apr",
    working: 0,
    present: 0,
    absent: 0,
    leaves: 0,
    holidays: 0,
    rate: 0,
  },
  {
    month: "May",
    working: 2,
    present: 2,
    absent: 0,
    leaves: 0,
    holidays: 0,
    rate: 100,
  },
  {
    month: "Jun",
    working: 1,
    present: 1,
    absent: 0,
    leaves: 0,
    holidays: 0,
    rate: 100,
  },
  {
    month: "Jul",
    working: 0,
    present: 0,
    absent: 0,
    leaves: 0,
    holidays: 0,
    rate: 0,
  },
  {
    month: "Aug",
    working: 0,
    present: 0,
    absent: 0,
    leaves: 0,
    holidays: 0,
    rate: 0,
  },
  {
    month: "Sep",
    working: 0,
    present: 0,
    absent: 0,
    leaves: 0,
    holidays: 0,
    rate: 0,
  },
  {
    month: "Oct",
    working: 0,
    present: 0,
    absent: 0,
    leaves: 0,
    holidays: 0,
    rate: 0,
  },
  {
    month: "Nov",
    working: 0,
    present: 0,
    absent: 0,
    leaves: 0,
    holidays: 0,
    rate: 0,
  },
  {
    month: "Dec",
    working: 0,
    present: 0,
    absent: 0,
    leaves: 0,
    holidays: 0,
    rate: 0,
  },
  {
    month: "Jan",
    working: 0,
    present: 0,
    absent: 0,
    leaves: 0,
    holidays: 0,
    rate: 0,
  },
  {
    month: "Feb",
    working: 0,
    present: 0,
    absent: 0,
    leaves: 0,
    holidays: 0,
    rate: 0,
  },
  {
    month: "Mar",
    working: 0,
    present: 0,
    absent: 0,
    leaves: 0,
    holidays: 0,
    rate: 0,
  },
];

const chartConfig = {
  present: {
    label: "Present Days",
    color: "hsl(var(--chart-1))",
  },
  working: {
    label: "Working Days",
    color: "hsl(var(--chart-2))",
  },
};

export default function AttendanceTab() {
  return (
    <div className="space-y-6">
      {/* Statistics */}
      <div className="grid gap-4 md:grid-cols-3">
       <Card>
  <CardContent className="flex items-center p-6">
    <div className="rounded-full bg-indigo-100 p-3 dark:bg-indigo-900/20">
      <CalendarDays className="h-6 w-6 text-indigo-600" />
    </div>

    <div className="ml-4">
      <p className="text-sm font-medium text-muted-foreground">
        Working Days (Excl. Holidays)
      </p>

      <p className="text-3xl font-bold tracking-tight">
        3
      </p>
    </div>
  </CardContent>
</Card>

<Card>
  <CardContent className="flex items-center p-6">
    <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/20">
      <CalendarCheck  className="h-6 w-6 text-green-600" />
    </div>

    <div className="ml-4">
      <p className="text-sm font-medium text-muted-foreground">
        Present Days
      </p>

      <p className="text-3xl font-bold tracking-tight text-green-600">
        3
      </p>
    </div>
  </CardContent>
</Card>

<Card>
  <CardContent className="flex items-center p-6">
    <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900/20">
      <Percent className="h-6 w-6 text-blue-600" />
    </div>

    <div className="ml-4">
      <p className="text-sm font-medium text-muted-foreground">
        Attendance Rate
      </p>

      <p className="text-3xl font-bold tracking-tight text-blue-600">
        100%
      </p>
    </div>
  </CardContent>
</Card>
      </div>

      {/* Chart */}
      <Card>
        <CardHeader>
          <CardTitle>
            Monthly Attendance Breakdown
          </CardTitle>
        </CardHeader>

        <CardContent>
          <ChartContainer
            config={chartConfig}
            className="h-[350px] w-full"
          >
            <BarChart data={attendanceData}>
              <CartesianGrid vertical={false} />

              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
              />

              <YAxis allowDecimals={false} />

              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent />}
              />

              <Bar
                dataKey="present"
                fill="var(--color-present)"
                radius={4}
              />

              <Bar
                dataKey="working"
                fill="var(--color-working)"
                radius={4}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Monthly Report */}
      <Card>
        <CardHeader>
          <CardTitle>
            Detailed Monthly Report
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Month</TableHead>
                <TableHead>Working Days</TableHead>
                <TableHead>Present Days</TableHead>
                <TableHead>Absent Days</TableHead>
                <TableHead>Approved Leaves</TableHead>
                <TableHead>Holidays</TableHead>
                <TableHead>Attendance Rate</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {attendanceData.map((row) => (
                <TableRow key={row.month}>
                  <TableCell className="font-medium">
                    {row.month}
                  </TableCell>

                  <TableCell  >{row.working}</TableCell>

                  <TableCell className="text-green-600">{row.present}</TableCell>

                  <TableCell className="text-red-600">{row.absent}</TableCell>

                  <TableCell className="text-blue-600">{row.leaves}</TableCell>

                  <TableCell className="text-sky-600">{row.holidays}</TableCell>

                  <TableCell>
                    <Badge
                      className={
                        row.rate >= 75
                          ? "bg-green-600 text-white"
                          : "bg-red-600 text-white"
                      }
                    >
                      {row.rate}%
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}