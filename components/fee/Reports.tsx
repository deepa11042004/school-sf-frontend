"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
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
  Search,
  FileText,
  Download,
  Printer,
  ChevronLeft,
  ChevronRight,
  Upload,
  RefreshCcw,
  Sheet,
} from "lucide-react";

// Types for cleaner data handling

interface FeeDetail {
  feeName: string;
  value: number;
}

interface FeeCell {
  due: string | number;
  paid: string | number;
  pending: string | number;
  details?: FeeDetail[];
}

 
interface StudentFeeRecord {
  sno: number;
  roll: string;
  name: string;
  className: string;
  fatherName: string;
  phone: string;
  monthly: Record<string, FeeCell>;
  total: FeeCell;
}

const MONTHS = [
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

const ReportMonths = [
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
  "JAN",
  "FEB",
  "MAR",
];

// Mocked subset of the provided data for demonstration
const dummyRecords: StudentFeeRecord[] = [
  {
    sno: 1,
    roll: "18",
    name: "AADESH KUMAR YADAV",
    className: "NC - A",
    fatherName: "RAJESH SINGH YADAV",
    phone: "9719044221",
    monthly: {
      APR: { due: 1500, paid: 2400, pending: 0, details:[{feeName:"MON",value:1500},{feeName:"ANN",value:900}] },
      MAY: { due: 1500, paid: 1500, pending: 0,   },
      JUN: { due: 1500, paid: 1500, pending: 0,   },
      JUL: { due: 1500, paid: 1500, pending: 0, },
      AUG: { due: 1800, paid: 1800, pending: 0, },
      SEP: { due: 1800, paid: 1800, pending: 0, },
      OCT: { due: 1500, paid: 1500, pending: 0 },
      NOV: { due: 1500, paid: 1500, pending: 0 },
      DEC: { due: 1500, paid: 1500, pending: 0 },
      JAN: { due: 1800, paid: 1800, pending: 0 },
      FEB: { due: 1500, paid: 1500, pending: 0 },
      MAR: { due: 1500, paid: 1500, pending: 0 },
    },
    total: { due: 19500, paid: 5400, pending: 14100 },
  },
  
];

const formatCurrency = (val: string | number) => {
  const num = typeof val === "string" ? parseFloat(val.replace(/,/g, "")) : val;
  return isNaN(num) ? val : `₹${num.toLocaleString("en-IN")}`;
};

const FeeCellComponent = ({
  data,
  isTotal = false,
}: {
  data: FeeCell;
  isTotal?: boolean;
}) => (
  <div className="text-xs leading-tight space-y-0.5 min-w-[80px]">
    {data.details && (
      <div className="text-slate-400 font-mono whitespace-pre-line">
        {data.paid}
      </div>
    )}
    <div className="flex justify-between gap-2">
      <span className="text-slate-600">{formatCurrency(data.due)}</span>
      {Number(data.paid) > 0 && (
        <span className="text-green-600 font-medium">
          {formatCurrency(data.paid)}
        </span>
      )}
      {Number(data.pending) > 0 && (
        <span className="text-amber-600 font-medium">
          {formatCurrency(data.pending)}
        </span>
      )}
    </div>
    {!data.details && Number(data.due) === 0 && (
      <span className="text-slate-300">-</span>
    )}
  </div>
);

export default function FeesReport() {
  const [selectedClass, setSelectedClass] = useState("default");
  const [selectedFeeHead, setSelectedFeeHead] = useState("all");
  const [fromMonth, setFromMonth] = useState("start");
  const [toMonth, setToMonth] = useState("end");
  const [openFormatDialog, setOpenFormatDialog] = useState(false);
  const [entriesPerPage, setEntriesPerPage] = useState("5");
  const [currentPage, setCurrentPage] = useState(1);

  // Simple pagination for demonstration
  const totalPages = Math.ceil(dummyRecords.length / parseInt(entriesPerPage));
  const startIndex = (currentPage - 1) * parseInt(entriesPerPage);
  const endIndex = startIndex + parseInt(entriesPerPage);
  const currentStudents = dummyRecords.slice(startIndex, endIndex);

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
      <div className="max-w-[100rem] mx-auto space-y-6">
        {/* Header Section */}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Fees Report
            </h1>
          </div>

          <div className="flex gap-3">
            <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm">
              <Search className="mr-2 h-4 w-4" />
              Generate Report
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

        {/* Filters */}
        <Card className="shadow-sm">
          <CardContent className="p-4 sm:p-6">
            <div className="grid gap-4 md:grid-cols-4">
              <div className="space-y-2">
                <Label>Class </Label>
                <Select
                  required
                  value={selectedClass}
                  onValueChange={setSelectedClass}
                >
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
                <Label>Fee Head *</Label>
                <Select
                  value={selectedFeeHead}
                  onValueChange={setSelectedFeeHead}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Fee Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Fee Types</SelectItem>
                    <SelectItem value="tuition">Tuition Fee</SelectItem>
                    <SelectItem value="transport">Transport Fee</SelectItem>
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
                    {MONTHS.map((m) => (
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
                    {MONTHS.map((m) => (
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

        {/* Report Table */}
        <Card className="shadow-sm">
          <CardContent className="p-0">
            {/* Toolbar */}
            <div className="p-4 md:p-6 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-semibold">
                  Report for NC (A) — All Fee Types
                </h2>
                <p className="text-sm  mt-1 ">
                  Total Students:{" "}
                  <span className="font-medium p-0.5 rounded-sm bg-indigo-600 hover:bg-indigo-700   shadow-sm">
                    39 Students
                  </span>
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Printer className="mr-2 h-4 w-4" /> Print
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setOpenFormatDialog(true)}
                >
                  <Upload className="mr-2 h-4 w-4" /> Export{" "}
                </Button>
              </div>
            </div>

            <Dialog open={openFormatDialog} onOpenChange={setOpenFormatDialog}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Choose Export Format</DialogTitle>

                  <DialogDescription>
                    Select the format for exporting student data.
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
                      }}
                    >
                      Select
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* Scrollable Table */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  {/* Row 1: Group Headers */}
                  <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
                    <TableHead
                      rowSpan={2}
                      className="sticky left-0 z-20 bg-slate-50/95 min-w-[40px] text-center"
                    >
                      S.No.
                    </TableHead>
                    <TableHead
                      rowSpan={2}
                      className="sticky left-0 z-20 min-w-[80px] text-center"
                    >
                      Roll No
                    </TableHead>
                    <TableHead
                      rowSpan={2}
                      className="sticky left-[80px] z-20 bg-slate-50/95 min-w-[280px]"
                    >
                      Student Details
                    </TableHead>
                    {ReportMonths.map((item) => (
                      <TableHead
                        key={item}
                        colSpan={3}
                        className="text-center bg-indigo-50/50 border-l border-slate-200"
                      >
                        {item}
                      </TableHead>
                    ))}
                    <TableHead
                      colSpan={3}
                      className="text-center bg-indigo-100/50 border-l-2 border-indigo-200 font-bold text-indigo-900"
                    >
                      TOTAL
                    </TableHead>
                  </TableRow>
                  {/* Row 2: Sub Headers */}
                  <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
                    {/* Student columns already covered */}
                    {ReportMonths.map((item) => (
                      <>
                        <TableHead
                          key={`${item}-due`}
                          className="bg-slate-50/50 text-xs font-medium text-slate-500 border-l border-slate-200"
                        >
                          Due
                        </TableHead>
                        <TableHead
                          key={`${item}-paid`}
                          className="bg-green-50/30 text-xs font-medium text-green-700"
                        >
                          Paid
                        </TableHead>
                        <TableHead
                          key={`${item}-pend`}
                          className="bg-amber-50/30 text-xs font-medium text-amber-700"
                        >
                          Pend.
                        </TableHead>
                      </>
                    ))}
                    <TableHead className="bg-indigo-50/50 text-xs font-bold text-indigo-700 border-l-2 border-indigo-200">
                      Due
                    </TableHead>
                    <TableHead className="bg-indigo-50/50 text-xs font-bold text-indigo-700">
                      Paid
                    </TableHead>
                    <TableHead className="bg-indigo-50/50 text-xs font-bold text-indigo-700">
                      Pend.
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dummyRecords.map((student) => (
                    <TableRow
                      key={student.sno}
                      className="hover:bg-gray-50/50 transition-colors group"
                    >
                      <TableCell className="sticky left-0 z-10 bg-white group-hover:bg-gray-50 font-medium text-slate-500 text-center">
                        {student.sno}
                      </TableCell>
                      <TableCell className="sticky left-[40px] z-10 bg-white group-hover:bg-gray-50 font-medium text-slate-500 text-center">
                        {student.roll}
                      </TableCell>
                      <TableCell className="sticky left-[80px] z-10 bg-white group-hover:bg-gray-50 py-3">
                        <div className="flex flex-col">
                          <span className="font-semibold text-slate-900">
                            {student.name}{" "}
                            <span className="text-slate-400 font-normal text-sm">
                              ({student.className})
                            </span>
                          </span>
                          <span className="text-sm text-slate-500">
                            {student.fatherName}
                          </span>
                          <span className="text-sm text-slate-400">
                            {student.phone}
                          </span>
                        </div>
                      </TableCell>
                      {ReportMonths.map((item) => (
                        <TableCell
                          key={item}
                          className="border-l border-slate-100"
                        >
                          <FeeCellComponent data={student.monthly[item]} />
                        </TableCell>
                      ))}
                      <TableCell className="border-l-2 border-indigo-100 bg-indigo-50/20">
                        <FeeCellComponent data={student.total} isTotal />
                      </TableCell>
                    </TableRow>
                  ))}

                  {/* Grand Total Row */}
                  <TableRow className="bg-slate-100 font-bold hover:bg-slate-100  ">
                    <TableCell
                      colSpan={2}
                      className="sticky left-0 z-10 bg-slate-100 text-slate-900 uppercase tracking-wide "
                    >
                      Grand Total
                    </TableCell>
                    {ReportMonths.map((item) => (
                      <TableCell
                        key={`gt-${item}`}
                        className="border-l border-slate-300"
                      >
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-700">₹57,000</span>
                          <span className="text-green-700">₹2,495</span>
                          <span className="text-amber-700">₹51,595</span>
                        </div>
                        <div className="text-[10px] text-slate-500">
                          (Dis: 2,910)
                        </div>
                      </TableCell>
                    ))}
                    <TableCell className="border-l-2 border-indigo-300 bg-indigo-100/40">
                      <div className="flex justify-between text-xs text-indigo-900">
                        <span>₹742,000</span>
                        <span>₹16,500</span>
                        <span>₹690,580</span>
                      </div>
                      <div className="text-[10px] text-indigo-700">
                        (Dis: 34,920)
                      </div>
                    </TableCell>
                  </TableRow>

                  {dummyRecords.length === 0 && (
                    <TableRow>
                      <TableCell
                        colSpan={40}
                        className="h-48 text-center text-slate-500"
                      >
                        <div className="flex flex-col items-center justify-center gap-2">
                          <FileText className="h-8 w-8 text-slate-300" />
                          <p className="text-sm font-medium">
                            No fee data available for the selected filters.
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {totalPages > 0 && (
              <div className="p-4 sm:p-6 border-t border-slate-100">
                <div className="flex items-center justify-center">
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
