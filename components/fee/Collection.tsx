"use client"
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileText, Search, RefreshCcw } from "lucide-react";

export default function Collection() {
  const [feehead, setfeehead] = useState("");
  const [Class, setClass] = useState("default");
  const [fromMonth, setFromMonth] = useState("start");
  const [toMonth, setToMonth] = useState("end");

  const months = [
    { value: "start", label: "Start" },
    { value: "april", label: "April" },
    { value: "may", label: "May" },
    { value: "june", label: "June" },
    { value: "july", label: "July" },
    { value: "august", label: "August" },
    { value: "september", label: "September" },
    { value: "october", label: "October" },
    { value: "november", label: "November" },
    { value: "december", label: "December" },
    { value: "january", label: "January" },
    { value: "february", label: "February" },
    { value: "march", label: "March" },
    { value: "end", label: "End" },
  ];

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
             Fees Collection Report

            </h1>
          </div>

          <div className="flex gap-3">
            <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm">
              <Search className="mr-2 h-4 w-4" />
              Apply
            </Button>

            <Button
              variant="outline"
              className="hover:bg-gray-300 dark:hover:bg-neutral-900 border border-black/20 dark:border-white/20"
            >
              <RefreshCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>
        </div>

        {/* Filter Section */}
        <Card className="shadow-sm">
          <CardContent className="p-4 sm:p-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              

              <div className="space-y-2">
                <Label>Class </Label>
                <Select required value={Class} onValueChange={setClass}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Class" />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem value="default">Select Classes</SelectItem>
                    <SelectItem value="all">All Classes</SelectItem>
                    <SelectItem value="class1"> Class 1 </SelectItem>
                    <SelectItem value="class2"> Class 2 </SelectItem>
                    <SelectItem value="class3"> Class 3 </SelectItem>
                    <SelectItem value="class4"> Class 4 </SelectItem>
                  </SelectContent>
                </Select>
              </div>


              <div className="space-y-2">
                <Label>Fee Head</Label>
                <Select
                  required
                  value={feehead}
                  onValueChange={setfeehead}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Fee Head" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Fee Type</SelectItem>
                    <SelectItem value="monthly">Monthly Fee</SelectItem>
                    <SelectItem value="exam">Exam Fee</SelectItem>
                    <SelectItem value="annual">Annual Fee</SelectItem>
                    <SelectItem value="admission">Admission Fee</SelectItem>
                  </SelectContent>
                </Select>
              </div>


              <div className="space-y-2">
                <Label>From Month (optional)</Label>
                <Select value={fromMonth} onValueChange={setFromMonth}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Month" />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((m) => (
                      <SelectItem key={m.value} value={m.value}>
                        {m.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>To Month (optional)</Label>
                <Select value={toMonth} onValueChange={setToMonth}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Month" />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((m) => (
                      <SelectItem key={m.value} value={m.value}>
                        {m.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Report Info & Table Section */}
        <Card className="shadow-sm">
          <CardContent className="p-0">
            <div className="p-4 md:p-6 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100">
              <h2 className="text-lg font-semibold">Report Details</h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-600">Total Students:</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                  0 Students
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50/10 hover:bg-slate-50/10">
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                      Student Name
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                      Class
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                      Route
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                      Month
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3 text-right">
                      Amount
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                      Status
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={6} className="h-64 text-center">
                      <div className="flex flex-col items-center justify-center gap-2 text-slate-400">
                        <div className="p-3 rounded-full bg-slate-100">
                          <FileText className="h-8 w-8 text-slate-400" />
                        </div>
                        <p className="text-sm font-medium text-slate-500">
                          No transport assignments found for the selected
                          filters.
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
