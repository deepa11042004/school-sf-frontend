"use client";

import { Fragment, useState } from "react";
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

interface FeeHeadDetail {
  feeName: string;
  value: number;
}

interface FeeSplit {
  total: number;
  details: FeeHeadDetail[];
}

interface FeeCell {
  due: FeeSplit;
  paid: FeeSplit;
  pending: FeeSplit;
}

interface StudentFeeRecord {
  sno: number;
  roll: string;
  name: string;
  className: string;
  fatherName: string;
  fatherPhone: string;
  monthly: Partial<Record<string, FeeCell>>; // FIX: Partial — not every month is guaranteed
  total: FeeCell;
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
] as const;

// FIX: Sticky offsets must match actual rendered widths:
// S.No: 40px | Roll: 80px → offset 40 | Details: 260px → offset 120 | Phone: 120px → offset 380
const STICKY_LEFT = {
  sno: "0px",
  roll: "40px",
  details: "120px",
  phone: "380px",
} as const;

// ─── Helper: empty cell (for months with no data) ─────────────────────────────

function makeEmptyCell(): FeeCell {
  return {
    due: { total: 0, details: [{ feeName: "—", value: 0 }] },
    paid: { total: 0, details: [{ feeName: "—", value: 0 }] },
    pending: { total: 0, details: [{ feeName: "—", value: 0 }] },
  };
}

// ─── Helper: build a simple single-fee-head FeeCell ──────────────────────────

function makeCell(due: number, paid: number, feeName = "MON"): FeeCell {
  const pending = Math.max(0, due - paid);
  return {
    due: { total: due, details: [{ feeName, value: due }] },
    paid: { total: paid, details: [{ feeName, value: paid }] },
    pending: { total: pending, details: [{ feeName, value: pending }] },
  };
}

// ─── Dummy Data ───────────────────────────────────────────────────────────────

const dummyRecords: StudentFeeRecord[] = [
  {
    sno: 1,
    roll: "18",
    name: "AADESH KUMAR YADAV",
    className: "NC - A",
    fatherName: "RAJESH SINGH YADAV",
    fatherPhone: "9719044221",
    monthly: {
      APR: {
        due: {
          total: 2550,
          details: [
            { feeName: "MON", value: 1650 },
            { feeName: "ANN", value: 900 },
          ],
        },
        paid: {
          total: 763,
          details: [
            { feeName: "MON", value: 763 },
            { feeName: "ANN", value: 0 },
          ],
        },
        pending: {
          total: 1787,
          details: [
            { feeName: "MON", value: 887 },
            { feeName: "ANN", value: 900 },
          ],
        },
      },
      MAY: makeCell(1500, 1500),
      JUN: makeCell(1500, 1500),
      JUL: makeCell(1500, 1500),
      AUG: makeCell(1800, 1800),
      SEP: makeCell(1800, 1800),
      OCT: makeCell(1500, 1500),
      NOV: makeCell(1500, 1500),
      DEC: makeCell(1500, 1500),
      JAN: makeCell(1800, 1800),
      FEB: makeCell(1500, 1500),
      MAR: makeCell(1500, 500),
    },
    total: {
      due: {
        total: 19950,
        details: [
          { feeName: "MON", value: 19050 },
          { feeName: "ANN", value: 900 },
        ],
      },
      paid: {
        total: 18163, // FIX: was 18263 — actual sum: 763+1500*8+1800*3+500 = 18163
        details: [
          { feeName: "MON", value: 17263 },
          { feeName: "ANN", value: 0 },
        ],
      },
      pending: {
        total: 1787,
        details: [
          { feeName: "MON", value: 887 },
          { feeName: "ANN", value: 900 },
        ],
      },
    },
  },
  {
    sno: 2,
    roll: "21",
    name: "ANKIT KUMAR YADAV",
    className: "NC - A",
    fatherName: "RINKU KUMAR YADAV",
    fatherPhone: "8564851235",
    monthly: {
      APR: {
        due: {
          total: 2550,
          details: [
            { feeName: "MON", value: 1650 },
            { feeName: "ANN", value: 900 },
          ],
        },
        paid: {
          total: 763,
          details: [
            { feeName: "MON", value: 763 },
            { feeName: "ANN", value: 0 },
          ],
        },
        pending: {
          total: 1787,
          details: [
            { feeName: "MON", value: 887 },
            { feeName: "ANN", value: 900 },
          ],
        },
      },
      MAY: makeCell(1500, 1500),
      JUN: makeCell(1500, 1500),
      JUL: makeCell(1500, 1500),
      AUG: makeCell(1800, 1800),
      SEP: makeCell(1800, 1800),
      OCT: makeCell(1500, 1500),
      NOV: makeCell(1500, 1500),
      DEC: makeCell(1500, 1500),
      JAN: makeCell(1800, 1800),
      FEB: makeCell(1500, 1500),
      MAR: makeCell(1500, 500),
    },
    total: {
      due: {
        total: 19950,
        details: [
          { feeName: "MON", value: 19050 },
          { feeName: "ANN", value: 900 },
        ],
      },
      paid: {
        total: 18163, // FIX: was 18263 — actual sum: 763+1500*8+1800*3+500 = 18163
        details: [
          { feeName: "MON", value: 17263 },
          { feeName: "ANN", value: 0 },
        ],
      },
      pending: {
        total: 1787,
        details: [
          { feeName: "MON", value: 887 },
          { feeName: "ANN", value: 900 },
        ],
      },
    },
  },
];

// ─── Grand Total: computed from dummyRecords ──────────────────────────────────

function computeGrandTotal() {
  const monthlyTotals: Record<
    string,
    { due: number; paid: number; pending: number }
  > = {};
  let grandDue = 0,
    grandPaid = 0,
    grandPending = 0;

  for (const month of ReportMonths) {
    let mDue = 0,
      mPaid = 0,
      mPending = 0;
    for (const s of dummyRecords) {
      const cell = s.monthly[month] ?? makeEmptyCell();
      mDue += cell.due.total;
      mPaid += cell.paid.total;
      mPending += cell.pending.total;
    }
    monthlyTotals[month] = { due: mDue, paid: mPaid, pending: mPending };
    grandDue += mDue;
    grandPaid += mPaid;
    grandPending += mPending;
  }

  return {
    monthlyTotals,
    grand: { due: grandDue, paid: grandPaid, pending: grandPending },
  };
}

const grandTotal = computeGrandTotal();

// ─── FeeSplitColumn ───────────────────────────────────────────────────────────

const FeeSplitColumn = ({
  data,
  colorClass,
}: {
  data: FeeSplit;
  colorClass: "due" | "paid" | "pending";
}) => {
  const isRed =
    colorClass === "pending"
      ? data.total > 0
      : colorClass === "paid"
        ? data.total === 0
        : false;

  return (
    <div className="text-xs leading-tight min-w-[68px]">
      {data.details.map((d, idx) => (
        // FIX: use idx in key to avoid duplicate feeName collisions
        <div
          key={`${d.feeName}-${idx}`}
          className="flex justify-between gap-1 text-slate-500 tabular-nums"
        >
          <span className="shrink-0">{d.feeName}:</span>
          <span>{d.value.toLocaleString("en-IN")}</span>
        </div>
      ))}
      <div className="border-t border-slate-300 my-0.5" />
      <div
        className={`font-semibold tabular-nums ${isRed ? "text-red-600" : "text-blue-600"}`}
      >
        {data.total.toLocaleString("en-IN")}
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function FeesReport() {
  const [selectedClass, setSelectedClass] = useState("default");
  const [selectedFeeHead, setSelectedFeeHead] = useState("all");
  const [fromMonth, setFromMonth] = useState("start");
  const [toMonth, setToMonth] = useState("end");
  const [openFormatDialog, setOpenFormatDialog] = useState(false);
  const [entriesPerPage, setEntriesPerPage] = useState(10); // FIX: was const, now state
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(dummyRecords.length / entriesPerPage);
  const currentStudents = dummyRecords.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage,
  );

  // FIX: stable, unique page numbers with string keys for ellipsis
  const getPageNumbers = (): (number | string)[] => {
    if (totalPages <= 1) return [];
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else if (currentPage <= 3) {
      pages.push(1, 2, 3, 4, "...", totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      );
    } else {
      pages.push(
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages,
      );
    }
    return pages;
  };

  // FIX: correct column count: 4 fixed + 12 months * 3 cols + 3 total cols = 43
  const TOTAL_STICKY_COLS = 4;
  const TOTAL_COLS = TOTAL_STICKY_COLS + ReportMonths.length * 3 + 3;

  // Inline sticky style helper (uses style prop, not Tailwind, for dynamic pixel values)
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

  // Background classes for sticky cells (prevents bleed-through on scroll)
  // FIX: bg must be explicitly set on sticky cells
  const stickyBg = "bg-white dark:bg-neutral-950";
  const stickyHeadBg = "bg-slate-50 dark:bg-neutral-900";

  return (
    <div className="min-h-screen p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-[100rem] mx-auto space-y-4 sm:space-y-6">
        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight">
            Fees Report
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

        {/* ── Filters ── */}
        <Card className="shadow-sm">
          <CardContent className="p-3 sm:p-4 md:p-6">
            {/* FIX: grid is 1 col on mobile, 2 on sm, 4 on lg */}
            <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-1.5 sm:space-y-2">
                <Label className="text-xs sm:text-sm">Class</Label>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger className="h-8 sm:h-9 text-xs sm:text-sm">
                    <SelectValue placeholder="Select Class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Select Classes</SelectItem>
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
                <Select
                  value={selectedFeeHead}
                  onValueChange={setSelectedFeeHead}
                >
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
                <Label className="text-xs sm:text-sm">
                  From Month (optional)
                </Label>
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
                <Label className="text-xs sm:text-sm">
                  To Month (optional)
                </Label>
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
                  Report for NC (A) — All Fee Types
                </h2>
                <p className="text-xs sm:text-sm mt-1">
                  Total Students:{" "}
                  <span className="font-medium px-1.5 py-0.5 rounded-sm bg-indigo-600 text-white text-xs">
                    {dummyRecords.length} Students
                  </span>
                </p>
              </div>
              {/* FIX: entries-per-page selector + export/print controls */}
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
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs h-7 sm:h-8"
                >
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
                        <p className="text-sm text-muted-foreground">
                          Export as PDF document
                        </p>
                      </div>
                    </div>
                    <Button onClick={() => setOpenFormatDialog(false)}>
                      Select
                    </Button>
                  </div>
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
                      onClick={() => setOpenFormatDialog(false)}
                    >
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
                  {/* Row 1 — month group headers */}
                  <TableRow className="hover:bg-transparent">
                    <TableHead
                      rowSpan={2}
                      style={stickyHeadStyle("sno")}
                      className={`${stickyHeadBg} min-w-[40px] w-[40px] text-slate-500 text-center border-b border-slate-200`}
                    >
                      S.No.
                    </TableHead>
                    <TableHead
                      rowSpan={2}
                      style={stickyHeadStyle("roll")}
                      className={`${stickyHeadBg} min-w-[80px] w-[80px] text-slate-500 text-center border-b border-slate-200`}
                    >
                      Roll
                    </TableHead>
                    <TableHead
                      rowSpan={2}
                      style={stickyHeadStyle("details")}
                      className={`${stickyHeadBg} min-w-[260px] w-[260px] text-slate-500 border-b border-slate-200`}
                    >
                      Student Details
                    </TableHead>
                    <TableHead
                      rowSpan={2}
                      style={stickyHeadStyle("phone")}
                      className={`${stickyHeadBg} min-w-[120px] w-[120px] text-slate-500 border-b border-slate-200`}
                    >
                      Father / Phone
                    </TableHead>

                    {ReportMonths.map((month) => (
                      <TableHead
                        key={month}
                        colSpan={3}
                        className="text-center bg-indigo-50 dark:bg-indigo-950/30 border-l border-slate-200 font-semibold text-indigo-800"
                      >
                        {month}
                      </TableHead>
                    ))}

                    <TableHead
                      colSpan={3}
                      className="text-center border-2 border-indigo-300 font-bold  "
                    >
                      TOTAL
                    </TableHead>
                  </TableRow>

                  {/* Row 2 — Due / Paid / Pend sub-headers */}
                  <TableRow className="hover:bg-transparent">
                    {ReportMonths.map((month) => (
                      <Fragment key={`sub-${month}`}>
                        <TableHead className="text-xs font-medium text-blue-600 bg-slate-50 dark:bg-neutral-900 border-l border-slate-200 py-1.5 whitespace-nowrap">
                          Due
                        </TableHead>
                        <TableHead className="text-xs font-medium text-green-700 bg-green-50/60 dark:bg-green-950/20 py-1.5 whitespace-nowrap">
                          Paid
                        </TableHead>
                        <TableHead className="text-xs font-medium text-red-500 bg-slate-50 dark:bg-neutral-900 py-1.5 whitespace-nowrap">
                          Pend.
                        </TableHead>
                      </Fragment>
                    ))}
                    <TableHead className="text-xs font-bold text-indigo-700 border-l-2 border-indigo-200 bg-indigo-50/80 dark:bg-indigo-950/30 py-1.5">
                      Due
                    </TableHead>
                    <TableHead className="text-xs font-bold text-indigo-700 bg-indigo-50/80 dark:bg-indigo-950/30 py-1.5">
                      Paid
                    </TableHead>
                    <TableHead className="text-xs font-bold text-indigo-700 bg-indigo-50/80 dark:bg-indigo-950/30 py-1.5">
                      Pend.
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {currentStudents.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={TOTAL_COLS}
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
                  ) : (
                    currentStudents.map((student) => (
                      <TableRow
                        key={student.sno}
                        className="hover:bg-slate-50/60 dark:hover:bg-neutral-900/50 transition-colors"
                      >
                        {/* ── Fixed columns (with explicit bg to prevent scroll bleed) ── */}
                        <TableCell
                          style={stickyStyle("sno")}
                          className={`${stickyBg} text-center text-xs font-medium `}
                        >
                          {student.sno}
                        </TableCell>
                        <TableCell
                          style={stickyStyle("roll")}
                          className={`${stickyBg} text-center text-xs font-medium `}
                        >
                          {student.roll}
                        </TableCell>
                        <TableCell
                          style={stickyStyle("details")}
                          className={`${stickyBg} py-2`}
                        >
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
                        <TableCell
                          style={stickyStyle("phone")}
                          className={`${stickyBg} text-xs whitespace-nowrap`}
                        >
                          {student.fatherPhone}
                        </TableCell>

                        {/* ── Monthly cells (FIX: safe access with ?? makeEmptyCell()) ── */}
                        {ReportMonths.map((month) => {
                          const cell =
                            student.monthly[month] ?? makeEmptyCell();
                          return (
                            <Fragment key={`${student.sno}-${month}`}>
                              <TableCell className="border-l border-slate-100 align-top py-1.5 px-2">
                                <FeeSplitColumn
                                  data={cell.due}
                                  colorClass="due"
                                />
                              </TableCell>
                              <TableCell className="align-top py-1.5 px-2">
                                <FeeSplitColumn
                                  data={cell.paid}
                                  colorClass="paid"
                                />
                              </TableCell>
                              <TableCell className="align-top py-1.5 px-2">
                                <FeeSplitColumn
                                  data={cell.pending}
                                  colorClass="pending"
                                />
                              </TableCell>
                            </Fragment>
                          );
                        })}

                        {/* ── Total columns ── */}
                        <TableCell className="border-l-2 border-indigo-100 align-top py-1.5 px-2">
                          <FeeSplitColumn
                            data={student.total.due}
                            colorClass="due"
                          />
                        </TableCell>
                        <TableCell className=" align-top py-1.5 px-2">
                          <FeeSplitColumn
                            data={student.total.paid}
                            colorClass="paid"
                          />
                        </TableCell>
                        <TableCell className=" align-top py-1.5 px-2">
                          <FeeSplitColumn
                            data={student.total.pending}
                            colorClass="pending"
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  )}

                  {/* Grand Total Row — FIX: computed from actual data, not hardcoded */}
                  <TableRow className="bg-slate-100 dark:bg-neutral-900 hover:bg-slate-100 dark:hover:bg-neutral-900 font-semibold border-t-2 border-slate-300">
                    <TableCell
                      colSpan={TOTAL_STICKY_COLS}
                      style={{ position: "sticky", left: 0, zIndex: 10 }}
                      className="bg-slate-100 dark:bg-neutral-900 text-center uppercase tracking-wide text-xs font-bold whitespace-nowrap"
                    >
                      Grand Total
                    </TableCell>
                    {ReportMonths.map((month) => {
                      const mt = grandTotal.monthlyTotals[month] ?? {
                        due: 0,
                        paid: 0,
                        pending: 0,
                      };
                      return (
                        <Fragment key={`gt-${month}`}>
                          <TableCell className="border-l border-slate-300 text-xs text-blue-700 tabular-nums py-2 px-2 font-semibold">
                            ₹{mt.due.toLocaleString("en-IN")}
                          </TableCell>
                          <TableCell className="text-xs text-green-700 tabular-nums py-2 px-2 font-semibold">
                            ₹{mt.paid.toLocaleString("en-IN")}
                          </TableCell>
                          <TableCell
                            className={`text-xs tabular-nums py-2 px-2 font-semibold ${mt.pending > 0 ? "text-red-600" : "text-slate-400"}`}
                          >
                            ₹{mt.pending.toLocaleString("en-IN")}
                          </TableCell>
                        </Fragment>
                      );
                    })}
                    <TableCell className="border-l-2 border-indigo-300   text-xs text-blue-800 tabular-nums py-2 px-2 font-bold">
                      ₹{grandTotal.grand.due.toLocaleString("en-IN")}
                    </TableCell>
                    <TableCell className=" border-l-2 border-indigo-300  text-xs text-green-700 tabular-nums py-2 px-2 font-bold">
                      ₹{grandTotal.grand.paid.toLocaleString("en-IN")}
                    </TableCell>
                    <TableCell
                      className={`border-l-2 border-indigo-300   text-xs tabular-nums py-2 px-2 font-bold ${grandTotal.grand.pending > 0 ? "text-red-600" : "text-slate-400"}`}
                    >
                      ₹{grandTotal.grand.pending.toLocaleString("en-IN")}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            {/* ── Pagination — only shown when there are multiple pages ── */}
            {totalPages > 1 && (
              <div className="p-3 sm:p-4 md:p-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-xs text-slate-500">
                  Showing {(currentPage - 1) * entriesPerPage + 1}–
                  {Math.min(currentPage * entriesPerPage, dummyRecords.length)}{" "}
                  of {dummyRecords.length} students
                </p>
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

                  {/* FIX: unique keys for ellipsis items using index */}
                  {getPageNumbers().map((page, i) =>
                    page === "..." ? (
                      <span
                        key={`ellipsis-${i}`}
                        className="px-2 py-1 text-slate-400 text-xs"
                      >
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
                    ),
                  )}

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
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
