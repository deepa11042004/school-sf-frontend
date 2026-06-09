"use client";

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
import {
  ClipboardList ,
  CalendarIcon,
  Upload,
  Sheet,
  FileText,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface AttendanceRecord {
  id: string;
  name: string;
  rollNo: string;
  workingDays: number;
  present: number;
  absent: number;
  late: number;
  halfDay: number;
  percentage: number;
  dailyStatus: Record<string, string>;
}

const dates = Array.from({ length: 11 }, (_, i) => new Date(2026, 0, i + 1));

const dummyRecords: AttendanceRecord[] = [
  {
    id: "1",
    name: "AADESH KUMAR YADAV",
    rollNo: "18",
    workingDays: 11,
    present: 9,
    absent: 1,
    late: 1,
    halfDay: 0,
    percentage: 81.8,
    dailyStatus: {
      "2026-01-01": "P",
      "2026-01-02": "P",
      "2026-01-03": "A",
      "2026-01-04": "P",
      "2026-01-05": "L",
      "2026-01-06": "P",
      "2026-01-07": "P",
      "2026-01-08": "P",
      "2026-01-09": "P",
      "2026-01-10": "P",
      "2026-01-11": "P",
    },
  },
  {
    id: "2",
    name: "AAYUSH SAKLANI",
    rollNo: "5",
    workingDays: 11,
    present: 10,
    absent: 0,
    late: 1,
    halfDay: 0,
    percentage: 90.9,
    dailyStatus: {
      "2026-01-01": "P",
      "2026-01-02": "P",
      "2026-01-03": "P",
      "2026-01-04": "L",
      "2026-01-05": "P",
      "2026-01-06": "P",
      "2026-01-07": "P",
      "2026-01-08": "P",
      "2026-01-09": "P",
      "2026-01-10": "P",
      "2026-01-11": "P",
    },
  },
  {
    id: "3",
    name: "ABHISHEK SHARMA",
    rollNo: "12",
    workingDays: 11,
    present: 7,
    absent: 3,
    late: 1,
    halfDay: 0,
    percentage: 63.6,
    dailyStatus: {
      "2026-01-01": "P",
      "2026-01-02": "A",
      "2026-01-03": "P",
      "2026-01-04": "A",
      "2026-01-05": "P",
      "2026-01-06": "L",
      "2026-01-07": "A",
      "2026-01-08": "P",
      "2026-01-09": "P",
      "2026-01-10": "P",
      "2026-01-11": "P",
    },
  },
];

export default function StudentAttendanceReport() {
  const [selectedClass, setSelectedClass] = useState("default");
  const [selectedSection, setSelectedSection] = useState("default");
  const [startDate, setStartDate] = useState<Date | undefined>(
    new Date(2026, 0, 1),
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    new Date(2026, 5, 10),
  );
  const [openFormatDialog, setOpenFormatDialog] = useState(false);

  // Pagination state
  const [entriesPerPage, setEntriesPerPage] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "P":
        return "bg-green-100 text-green-800";
      case "A":
        return "bg-red-100 text-red-800";
      case "L":
        return "bg-yellow-100 text-yellow-800";
      case "H":
        return "bg-cyan-100 text-cyan-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(dummyRecords.length / parseInt(entriesPerPage));
  const startIndex = (currentPage - 1) * parseInt(entriesPerPage);
  const endIndex = startIndex + parseInt(entriesPerPage);
  const currentRecords = dummyRecords.slice(startIndex, endIndex);

  const handleEntriesPerPageChange = (value: string) => {
    setEntriesPerPage(value);
    setCurrentPage(1);
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Student Attendance Report
            </h1>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setOpenFormatDialog(true);
              }}
              className="hover:bg-gray-300 dark:hover:bg-neutral-900 border border-black/20 dark:border-white/20"
            >
              <Upload className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm">
              <ClipboardList  className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
          </div>
        </div>

        {/* Format Dialog */}
        <Dialog open={openFormatDialog} onOpenChange={setOpenFormatDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Choose Export Format</DialogTitle>
              <DialogDescription>
                Select the format for exporting attendance data.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2">
              {/* PDF */}
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-3">
                  <FileText className="h-10 w-10 text-red-500" />
                  <div>
                    <p className="font-medium">PDF Format</p>
                    <p className="text-sm text-muted-foreground">
                      Export as PDF document
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => {
                    console.log("Generate PDF");
                    setOpenFormatDialog(false);
                  }}
                >
                  Select
                </Button>
              </div>

              {/* CSV */}
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-3">
                  <Sheet className="h-10 w-10 text-green-600" />
                  <div>
                    <p className="font-medium">CSV Format</p>
                    <p className="text-sm text-muted-foreground">
                      Export as CSV file
                    </p>
                  </div>
                </div>
                <Button
                  variant="secondary"
                  onClick={() => {
                    console.log("Generate CSV");
                    setOpenFormatDialog(false);
                  }}
                >
                  Select
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Filter Section */}
        <Card className="shadow-sm">
          <CardContent className="p-4 sm:p-6">
            <div className="grid gap-4 md:grid-cols-4">
              <div className="space-y-2">
                <Label>Class</Label>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Select Class</SelectItem>
                    <SelectItem value="nc">NC</SelectItem>
                    <SelectItem value="1">Class 1</SelectItem>
                    <SelectItem value="2">Class 2</SelectItem>
                    <SelectItem value="3">Class 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Section</Label>
                <Select
                  value={selectedSection}
                  onValueChange={setSelectedSection}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Section" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Select Section</SelectItem>
                    <SelectItem value="a">A</SelectItem>
                    <SelectItem value="b">B</SelectItem>
                    <SelectItem value="c">C</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !startDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? (
                        format(startDate, "dd/MM/yyyy")
                      ) : (
                        <span>Select date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !endDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? (
                        format(endDate, "dd/MM/yyyy")
                      ) : (
                        <span>Select date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              
            </div>
          </CardContent>
        </Card>

        {/* Report Table */}
        <Card className="shadow-sm">
          <CardContent className="p-0">
            <div className="p-6 flex   items-center  justify-between gap-4  ">
              <div>
                <h2 className="text-lg font-semibold">Attendance Report</h2>
                <div className="text-sm text-slate-600 mt-1">
                  Report: {startDate ? format(startDate, "dd MMM yyyy") : "-"} -{" "}
                  {endDate ? format(endDate, "dd MMM yyyy") : "-"}
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span>Show</span>
                <Select
                  value={entriesPerPage}
                  onValueChange={handleEntriesPerPageChange}
                >
                  <SelectTrigger className="w-[70px] h-8 bg-white">
                    <SelectValue placeholder="10" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
                <span>entries</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50/10 hover:bg-slate-50/10">
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3 whitespace-nowrap">
                      Student
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3 whitespace-nowrap text-center">
                      Roll No
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3 whitespace-nowrap text-center">
                      Working Days
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3 whitespace-nowrap text-center">
                      Present
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3 whitespace-nowrap text-center">
                      Absent
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3 whitespace-nowrap text-center">
                      Late
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3 whitespace-nowrap text-center">
                      Half Day
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3 whitespace-nowrap text-center">
                      %
                    </TableHead>
                    {dates.map((date) => (
                      <TableHead
                        key={date.toISOString()}
                        className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3 text-center whitespace-nowrap"
                      >
                        {format(date, "dd MMM")}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentRecords.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={8 + dates.length}
                        className="h-64 text-center"
                      >
                        <div className="flex flex-col items-center justify-center gap-2 text-slate-400">
                          <div className="p-3 rounded-full bg-slate-100">
                            <FileText className="h-8 w-8 text-slate-400" />
                          </div>
                          <p className="text-sm font-medium text-slate-500">
                            No attendance records found.
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    currentRecords.map((record) => (
                      <TableRow
                        key={record.id}
                        className="border-b last:border-b-0 hover:bg-gray-300 dark:hover:bg-neutral-800 transition-colors"
                      >
                        <TableCell className="py-3 font-medium whitespace-nowrap">
                          {record.name}
                        </TableCell>
                        <TableCell className="py-3 whitespace-nowrap">
                          {record.rollNo}
                        </TableCell>
                        <TableCell className="py-3 text-center whitespace-nowrap">
                          {record.workingDays}
                        </TableCell>
                        <TableCell className="py-3 text-center whitespace-nowrap">
                          {record.present}
                        </TableCell>
                        <TableCell className="py-3 text-center whitespace-nowrap">
                          {record.absent}
                        </TableCell>
                        <TableCell className="py-3 text-center whitespace-nowrap">
                          {record.late}
                        </TableCell>
                        <TableCell className="py-3 text-center whitespace-nowrap">
                          {record.halfDay}
                        </TableCell>
                        <TableCell className="py-3 text-center whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                            {record.percentage}%
                          </span>
                        </TableCell>
                        {dates.map((date) => {
                          const dateKey = format(date, "yyyy-MM-dd");
                          const status = record.dailyStatus[dateKey] || "-";
                          return (
                            <TableCell
                              key={dateKey}
                              className="py-3 text-center whitespace-nowrap"
                            >
                              <span
                                className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium ${getStatusColor(
                                  status,
                                )}`}
                              >
                                {status}
                              </span>
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {totalPages > 0 && (
              <div className="p-6  ">
                <div className="flex   items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(1, prev - 1))
                      }
                      disabled={currentPage === 1}
                      className="h-8 w-8 p-0"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>

                    <div className="flex items-center gap-1">
                      {getPageNumbers().map((page, index) => {
                        if (page === "...") {
                          return (
                            <span
                              key={`ellipsis-${index}`}
                              className="px-3 py-1 text-slate-400"
                            >
                              ...
                            </span>
                          );
                        }
                        return (
                          <Button
                            key={page}
                            variant={
                              currentPage === page ? "default" : "outline"
                            }
                            size="sm"
                            onClick={() => setCurrentPage(page as number)}
                            className={`h-8 w-8 p-0 ${
                              currentPage === page
                                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                                : "hover:bg-slate-100/20"
                            }`}
                          >
                            {page}
                          </Button>
                        );
                      })}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="h-8 w-8 p-0"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
