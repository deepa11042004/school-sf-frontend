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
  Printer,
  ChevronLeft,
  ChevronRight,
  Upload,
  RefreshCcw,
  Sheet,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface StudentFeeRecord {
  sno: number;
  roll: string;
  name: string;
  className: string;
  fatherName: string;
  fatherPhone: string;
  monthly: Partial<Record<string, boolean>>;
  total: {
    due: number;
    paid: number;
    pending: number;
  };
}

// ─── Constants ────────────────────────────────────────────────────────────────

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
  "APR", "MAY", "JUN", "JUL", "AUG", "SEP",
  "OCT", "NOV", "DEC", "JAN", "FEB", "MAR",
] as const;

// Sticky offsets must match actual rendered widths:
// S.No: 40px | Roll: 80px → offset 40 | Details: 260px → offset 120 | Phone: 120px → offset 380
const STICKY_LEFT = {
  sno: "0px",
  roll: "40px",
  details: "120px",
  phone: "380px",
} as const;

// ─── Dummy Data ───────────────────────────────────────────────────────────────

const dummyRecords: StudentFeeRecord[] = [
  {
    sno: 1, roll: "18", name: "AADESH KUMAR YADAV", className: "NC - A",
    fatherName: "RAJESH SINGH YADAV", fatherPhone: "9719044221",
    monthly: { APR: true, MAY: true, JUN: true, JUL: false, AUG: false, SEP: false, OCT: false, NOV: false, DEC: false, JAN: false, FEB: false, MAR: false },
    total: { due: 19500, paid: 5400, pending: 14100 }
  },
  {
    sno: 2, roll: "8", name: "AARISH", className: "II - A",
    fatherName: "ARSHAD AHMAD", fatherPhone: "9917554641",
    monthly: { APR: true, MAY: false, JUN: false, JUL: false, AUG: false, SEP: false, OCT: false, NOV: false, DEC: false, JAN: false, FEB: false, MAR: false },
    total: { due: 22500, paid: 2650, pending: 19850 }
  },
  {
    sno: 3, roll: "25", name: "AARUSHI", className: "III - A",
    fatherName: "SHYAM SINGH", fatherPhone: "9639196426",
    monthly: { APR: false, MAY: false, JUN: false, JUL: false, AUG: false, SEP: false, OCT: false, NOV: false, DEC: false, JAN: false, FEB: false, MAR: false },
    total: { due: 23700, paid: 0, pending: 23700 }
  },
  {
    sno: 4, roll: "19", name: "AAYAN", className: "VI - A",
    fatherName: "MUNNE", fatherPhone: "7248590482",
    monthly: { APR: false, MAY: false, JUN: false, JUL: false, AUG: false, SEP: false, OCT: false, NOV: false, DEC: false, JAN: false, FEB: false, MAR: false },
    total: { due: 27350, paid: 0, pending: 27350 }
  },
  {
    sno: 5, roll: "5", name: "AAYUSH SAKLANI", className: "NC - A",
    fatherName: "BHAWANI DATT SAKLANI", fatherPhone: "7037847903",
    monthly: { APR: true, MAY: false, JUN: false, JUL: false, AUG: false, SEP: false, OCT: false, NOV: false, DEC: false, JAN: false, FEB: false, MAR: false },
    total: { due: 19500, paid: 2900, pending: 10660 }
  },
  {
    sno: 6, roll: "7", name: "ABHAY KUMAR", className: "I - A",
    fatherName: "UMESH KUMAR", fatherPhone: "8755524404",
    monthly: { APR: false, MAY: false, JUN: false, JUL: false, AUG: false, SEP: false, OCT: false, NOV: false, DEC: false, JAN: false, FEB: false, MAR: false },
    total: { due: 21300, paid: 763, pending: 20537 }
  }
];

// ─── Grand Total: computed from dummyRecords ──────────────────────────────────

function computeGrandTotal() {
  let grandDue = 0, grandPaid = 0, grandPending = 0;
  for (const s of dummyRecords) {
    grandDue += s.total.due;
    grandPaid += s.total.paid;
    grandPending += s.total.pending;
  }
  return { due: grandDue, paid: grandPaid, pending: grandPending };
}

const grandTotal = computeGrandTotal();

// ─── Main Component ───────────────────────────────────────────────────────────

export default function FeesCollectionReport() {
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedFeeHead, setSelectedFeeHead] = useState("all");
  const [fromMonth, setFromMonth] = useState("start");
  const [toMonth, setToMonth] = useState("end");
  const [openFormatDialog, setOpenFormatDialog] = useState(false);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const totalStudentsCount = 10; // As per your requirement
  const totalPages = Math.ceil(totalStudentsCount / entriesPerPage);
  
  // For dummy data pagination
  const currentStudents = dummyRecords.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const getPageNumbers = (): (number | string)[] => {
    if (totalPages <= 1) return [];
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else if (currentPage <= 3) {
      pages.push(1, 2, 3, 4, "...", totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
    }
    return pages;
  };

  const TOTAL_STICKY_COLS = 4;
  const TOTAL_COLS = TOTAL_STICKY_COLS + ReportMonths.length + 3; // 4 fixed + 12 months + 3 totals = 19

  const stickyStyle = (pos: keyof typeof STICKY_LEFT) =>
    ({
      position: "sticky",
      left: STICKY_LEFT[pos],
      zIndex: 10,
    }) as React.CSSProperties;

  const stickyHeadStyle = (pos: keyof typeof STICKY_LEFT) =>
    ({
      position: "sticky",
      left: STICKY_LEFT[pos],
      zIndex: 20,
    }) as React.CSSProperties;

  const stickyBg = "bg-white dark:bg-neutral-950";
  const stickyHeadBg = "bg-slate-50 dark:bg-neutral-900";

  return (
    <div className="min-h-screen p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-[100rem] mx-auto space-y-4 sm:space-y-6">
        {/* ── Header ── */}
        <div className="space-y-1">
           
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight">
              Fees Collection Report
            </h1>
            <div className="flex gap-2 sm:gap-3">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm text-xs sm:text-sm">
                <Search className="mr-1.5 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                Generate Report
              </Button>
              <Button
                variant="outline"
                className="hover:bg-gray-100 dark:hover:bg-neutral-900 border border-black/20 dark:border-white/20 text-xs sm:text-sm"
              >
                <RefreshCcw className="mr-1.5 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                Reset
              </Button>
            </div>
          </div>
        </div>

        {/* ── Filters ── */}
        <Card className="shadow-sm">
          <CardContent className="p-3 sm:p-4 md:p-6">
            <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-1.5 sm:space-y-2">
                <Label className="text-xs sm:text-sm">Class *</Label>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger className="h-8 sm:h-9 text-xs sm:text-sm">
                    <SelectValue placeholder="Select Class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Classes</SelectItem>
                    <SelectItem value="class1">Class 1</SelectItem>
                    <SelectItem value="class2">Class 2</SelectItem>
                    <SelectItem value="class3">Class 3</SelectItem>
                    <SelectItem value="class4">Class 4</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <Label className="text-xs sm:text-sm">Fee Head *</Label>
                <Select value={selectedFeeHead} onValueChange={setSelectedFeeHead}>
                  <SelectTrigger className="h-8 sm:h-9 text-xs sm:text-sm">
                    <SelectValue placeholder="All Fee Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Fee Types</SelectItem>
                    <SelectItem value="tuition">Tuition Fee</SelectItem>
                    <SelectItem value="transport">Transport Fee</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <Label className="text-xs sm:text-sm">From Month</Label>
                <Select value={fromMonth} onValueChange={setFromMonth}>
                  <SelectTrigger className="h-8 sm:h-9 text-xs sm:text-sm">
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

              <div className="space-y-1.5 sm:space-y-2">
                <Label className="text-xs sm:text-sm">To Month</Label>
                <Select value={toMonth} onValueChange={setToMonth}>
                  <SelectTrigger className="h-8 sm:h-9 text-xs sm:text-sm">
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

        {/* ── Report Table ── */}
        <Card className="shadow-sm">
          <CardContent className="p-0">
            {/* Toolbar */}
            <div className="p-3 sm:p-4 md:p-6 bg-white dark:bg-neutral-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 border-b border-slate-100 dark:border-neutral-800">
              <div>
                <h2 className="text-base sm:text-lg font-semibold">
                  Report for All Classes
                </h2>
                <p className="text-xs sm:text-sm mt-1">
                  Total Students:{" "}
                  <span className="font-medium px-1.5 py-0.5 rounded-sm  bg-indigo-600 text-white text-xs">
                    {totalStudentsCount} Students
                  </span>
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <Label className="text-xs whitespace-nowrap">Rows:</Label>
                  <Select
                    value={String(entriesPerPage)}
                    onValueChange={(v) => {
                      setEntriesPerPage(Number(v));
                      setCurrentPage(1);
                    }}
                  >
                    <SelectTrigger className="h-7 w-16 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[5, 10, 25, 50].map((n) => (
                        <SelectItem key={n} value={String(n)}>
                          {n}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button variant="outline" size="sm" className="text-xs h-7 sm:h-8">
                  <Printer className="mr-1.5 h-3.5 w-3.5" /> Print
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs h-7 sm:h-8"
                  onClick={() => setOpenFormatDialog(true)}
                >
                  <Upload className="mr-1.5 h-3.5 w-3.5" /> Export
                </Button>
              </div>
            </div>

            {/* Export Dialog */}
            <Dialog open={openFormatDialog} onOpenChange={setOpenFormatDialog}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Choose Export Format</DialogTitle>
                  <DialogDescription>
                    Select the format for exporting student fee data.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-2">
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-3">
                      <FileText className="h-10 w-10 text-red-500" />
                      <div>
                        <p className="font-medium">PDF Format</p>
                        <p className="text-sm text-muted-foreground">Export as PDF document</p>
                      </div>
                    </div>
                    <Button onClick={() => setOpenFormatDialog(false)}>Select</Button>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-3">
                      <Sheet className="h-10 w-10 text-green-600" />
                      <div>
                        <p className="font-medium">CSV Format</p>
                        <p className="text-sm text-muted-foreground">Export as CSV file</p>
                      </div>
                    </div>
                    <Button variant="secondary" onClick={() => setOpenFormatDialog(false)}>
                      Select
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* ── Table ── */}
            <div className="overflow-x-auto w-full">
              <Table className="border-collapse text-xs">
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead
                      style={stickyHeadStyle("sno")}
                      className={`${stickyHeadBg} min-w-[40px] w-[40px] text-slate-500 text-center border-b border-slate-200`}
                    >
                      S. No.
                    </TableHead>
                    <TableHead
                      style={stickyHeadStyle("roll")}
                      className={`${stickyHeadBg} min-w-[80px] w-[80px] text-slate-500 text-center border-b border-slate-200`}
                    >
                      Roll
                    </TableHead>
                    <TableHead
                      style={stickyHeadStyle("details")}
                      className={`${stickyHeadBg} min-w-[260px] w-[260px] text-slate-500 border-b border-slate-200`}
                    >
                      Details
                    </TableHead>
                    <TableHead
                      style={stickyHeadStyle("phone")}
                      className={`${stickyHeadBg} min-w-[120px] w-[120px] text-slate-500 border-b border-slate-200`}
                    >
                      Father Phone
                    </TableHead>

                    {ReportMonths.map((month) => (
                      <TableHead
                        key={month}
                        className="text-center  border-l border-slate-200 font-semibold   whitespace-nowrap"
                      >
                        {month}
                      </TableHead>
                    ))}

                    <TableHead className="text-center border-l-2 border-indigo-300  whitespace-nowrap">
                      Due
                    </TableHead>
                    <TableHead className="text-center  whitespace-nowrap">
                      Paid
                    </TableHead>
                    <TableHead className="text-center  whitespace-nowrap">
                      Pend
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {currentStudents.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={TOTAL_COLS} className="h-48 text-center text-slate-500">
                        <div className="flex flex-col items-center justify-center gap-2">
                          <FileText className="h-8 w-8 text-slate-300" />
                          <p className="text-sm font-medium">No fee data available for the selected filters.</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    currentStudents.map((student) => (
                      <TableRow
                        key={student.sno}
                        className="hover:bg-slate-50/60 dark:hover:bg-neutral-900/50 transition-colors border-b last:border-b-0"
                      >
                        <TableCell style={stickyStyle("sno")} className={`${stickyBg} text-center text-xs font-medium`}>
                          {student.sno}
                        </TableCell>
                        <TableCell style={stickyStyle("roll")} className={`${stickyBg} text-center text-xs font-medium`}>
                          {student.roll}
                        </TableCell>
                        <TableCell style={stickyStyle("details")} className={`${stickyBg} py-2`}>
                          <div className="flex flex-col gap-0.5">
                            <span className="font-semibold text-xs sm:text-sm leading-tight">
                              {student.name}{" "}
                              <span className="text-blue-500 font-normal text-xs">
                                ({student.className})
                              </span>
                            </span>
                            <span className="text-xs text-yellow-600">
                              {student.fatherName}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell style={stickyStyle("phone")} className={`${stickyBg} text-xs whitespace-nowrap`}>
                          {student.fatherPhone}
                        </TableCell>

                        {ReportMonths.map((month) => {
                          const isPaid = student.monthly[month] ?? false;
                          return (
                            <TableCell key={`${student.sno}-${month}`} className="border-l border-slate-100 items-center  text-xs font-medium">
                              {isPaid ? (
                                <span className="bg-green-700 text-white px-2 py-1 rounded-full w-fit">Yes</span>
                              ) : (
                                <span className="bg-red-700 text-white px-2 py-1 rounded-full w-fit">No</span>
                              )}
                            </TableCell>
                          );
                        })}

                        <TableCell className="border-l-2 border-indigo-100 text-xs text-blue-700 tabular-nums py-2 px-2 font-semibold text-right">
                          ₹{student.total.due.toLocaleString("en-IN")}
                        </TableCell>
                        <TableCell className="text-xs text-green-700 tabular-nums py-2 px-2 font-semibold text-right">
                          {student.total.paid > 0 ? `₹${student.total.paid.toLocaleString("en-IN")}` : "-"}
                        </TableCell>
                        <TableCell className="text-xs text-red-600 tabular-nums py-2 px-2 font-semibold text-right">
                          ₹{student.total.pending.toLocaleString("en-IN")}
                        </TableCell>
                      </TableRow>
                    ))
                  )}

                  {/* Grand Total Row */}
                  {/* <TableRow className="bg-slate-100 dark:bg-neutral-900 hover:bg-slate-100 dark:hover:bg-neutral-900 font-semibold border-t-2 border-slate-300">
                    <TableCell
                      colSpan={TOTAL_STICKY_COLS}
                      style={{ position: "sticky", left: 0, zIndex: 10 }}
                      className="bg-slate-100 dark:bg-neutral-900 text-center uppercase tracking-wide text-xs font-bold whitespace-nowrap"
                    >
                      Grand Total
                    </TableCell>
                    {ReportMonths.map((month) => (
                      <TableCell key={`gt-${month}`} className="border-l border-slate-300 text-center text-slate-400">
                        -
                      </TableCell>
                    ))}
                    <TableCell className="border-l-2 border-indigo-300 text-xs text-blue-800 tabular-nums py-2 px-2 font-bold text-right">
                      ₹{grandTotal.due.toLocaleString("en-IN")}
                    </TableCell>
                    <TableCell className="text-xs text-green-800 tabular-nums py-2 px-2 font-bold text-right">
                      ₹{grandTotal.paid.toLocaleString("en-IN")}
                    </TableCell>
                    <TableCell className="text-xs text-red-700 tabular-nums py-2 px-2 font-bold text-right">
                      ₹{grandTotal.pending.toLocaleString("en-IN")}
                    </TableCell>
                  </TableRow> */}
                </TableBody>
              </Table>
            </div>

            {/* ── Pagination ── */}
            {totalPages > 1 && (
              <div className="p-3 sm:p-4 md:p-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                 
                <div className="flex items-center gap-1.5">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="h-7 w-7 p-0"
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="h-3.5 w-3.5" />
                  </Button>

                  {getPageNumbers().map((page, i) =>
                    page === "..." ? (
                      <span key={`ellipsis-${i}`} className="px-2 py-1 text-slate-400 text-xs">
                        …
                      </span>
                    ) : (
                      <Button
                        key={`page-${page}`}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page as number)}
                        className={`h-7 w-7 p-0 text-xs ${
                          currentPage === page
                            ? "bg-indigo-600 text-white hover:bg-indigo-700"
                            : "hover:bg-slate-100"
                        }`}
                        aria-label={`Page ${page}`}
                        aria-current={currentPage === page ? "page" : undefined}
                      >
                        {page}
                      </Button>
                    )
                  )}

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="h-7 w-7 p-0"
                    aria-label="Next page"
                  >
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}