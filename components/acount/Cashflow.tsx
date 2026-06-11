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
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  FileText,
  ArrowUpCircle,
  ArrowDownCircle,
  Wallet,
  Upload,
  Sheet,
  RefreshCcw,
} from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface CashflowRecord {
  id: string;
  date: string;
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

const dummyRecords: CashflowRecord[] = [
  {
    id: "1",
    date: "2026-06-06",
    totalIncome: 2000.0,
    totalExpense: 0.0,
    balance: 2000.0,
  },
  {
    id: "2",
    date: "2026-06-04",
    totalIncome: 4000.0,
    totalExpense: 0.0,
    balance: 4000.0,
  },
  {
    id: "3",
    date: "2026-06-03",
    totalIncome: 3400.0,
    totalExpense: 0.0,
    balance: 3400.0,
  },
  {
    id: "4",
    date: "2026-06-01",
    totalIncome: 4800.0,
    totalExpense: 0.0,
    balance: 4800.0,
  },
  {
    id: "5",
    date: "2026-05-31",
    totalIncome: 2900.0,
    totalExpense: 0.0,
    balance: 2900.0,
  },
  {
    id: "6",
    date: "2026-05-26",
    totalIncome: 3413.0,
    totalExpense: 0.0,
    balance: 3413.0,
  },
  {
    id: "7",
    date: "2026-05-22",
    totalIncome: 3900.0,
    totalExpense: 300.0,
    balance: 3600.0,
  },
  {
    id: "8",
    date: "2026-05-16",
    totalIncome: 7000.0,
    totalExpense: 0.0,
    balance: 7000.0,
  },
  {
    id: "9",
    date: "2026-05-03",
    totalIncome: 0.0,
    totalExpense: 100.0,
    balance: -100.0,
  },
];

export default function Cashflow() {
  const [academicYear, setAcademicYear] = useState("2026-27");
  const [startDate, setStartDate] = useState<Date | undefined>(
    new Date(2026, 4, 1),
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    new Date(2026, 5, 10),
  );

  const [entriesPerPage, setEntriesPerPage] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);

  const totalIncome = dummyRecords.reduce((sum, r) => sum + r.totalIncome, 0);
  const totalExpense = dummyRecords.reduce((sum, r) => sum + r.totalExpense, 0);
  const [openExportDialog, setOpenExportDialog] = useState(false);

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
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Cashflow Summary
            </h1>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setOpenExportDialog(true)}
              className="hover:bg-gray-300 dark:hover:bg-neutral-900 border border-black/20 dark:border-white/20"
            >
              <Upload className="mr-2 h-4 w-4" />
              Export
            </Button>

            <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm">
              <RefreshCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>
        </div>

        <Dialog open={openExportDialog} onOpenChange={setOpenExportDialog}>
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

                    setOpenExportDialog(false);
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

                    setOpenExportDialog(false);
                  }}
                >
                  Select
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm text-muted-foreground">Total Income</p>

                <h3 className="mt-2 text-2xl font-bold text-green-600">
                  {formatCurrency(totalIncome)}
                </h3>
              </div>

              <ArrowUpCircle className="h-10 w-10 text-green-600" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm text-muted-foreground">Total Expense</p>

                <h3 className="mt-2 text-2xl font-bold text-red-600">
                  {formatCurrency(totalExpense)}
                </h3>
              </div>

              <ArrowDownCircle className="h-10 w-10 text-red-600" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm text-muted-foreground">Net Balance</p>

                <h3 className="mt-2 text-2xl font-bold text-indigo-600">
                  {formatCurrency(totalIncome)}
                </h3>
              </div>

              <Wallet className="h-10 w-10 text-indigo-600" />
            </CardContent>
          </Card>
        </div>

        {/* Filter Section */}
        <Card className="shadow-sm">
          <CardContent className="p-4 sm:p-6">
            <div className="grid gap-4 md:grid-cols-4">
              <div className="space-y-2">
                <Label>Academic Year</Label>
                <Select value={academicYear} onValueChange={setAcademicYear}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2025-26">2025-26</SelectItem>
                    <SelectItem value="2026-27">2026-27</SelectItem>
                    <SelectItem value="2027-28">2027-28</SelectItem>
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

              <div className="flex items-end">
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm">
                  <Search className="mr-2 h-4 w-4" />
                  Generate
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Table Section */}
        <Card className="shadow-sm">
          <CardContent className="p-0">
            {/* Table Controls */}
            <div className="p-4 md:p-6 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100">
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
              <div className="text-sm text-slate-600">
                Showing {dummyRecords.length === 0 ? 0 : startIndex + 1} to{" "}
                {Math.min(endIndex, dummyRecords.length)} of{" "}
                {dummyRecords.length} entries
              </div>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50/10 hover:bg-slate-50/10">
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                      Date
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3 text-right">
                      Total Income (Credit)
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3 text-right">
                      Total Expense (Debit)
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3 text-right">
                      Balance (Net)
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dummyRecords.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="h-64 text-center">
                        <div className="flex flex-col items-center justify-center gap-2 text-slate-400">
                          <div className="p-3 rounded-full bg-slate-100">
                            <FileText className="h-8 w-8 text-slate-400" />
                          </div>
                          <p className="text-sm font-medium text-slate-500">
                            No cashflow records found.
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
                        <TableCell className="py-3 font-medium  ">
                          {new Date(record.date).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </TableCell>
                        <TableCell className="py-3 text-right font-medium text-green-600">
                          {record.totalIncome > 0
                            ? `₹${formatCurrency(record.totalIncome)}`
                            : "0.00"}
                        </TableCell>
                        <TableCell className="py-3 text-right font-medium text-red-600">
                          {record.totalExpense > 0
                            ? `₹${formatCurrency(record.totalExpense)}`
                            : "0.00"}
                        </TableCell>
                        <TableCell
                          className={`py-3 text-right font-bold ${record.balance < 0 ? "text-red-600" : "text-green-600"}`}
                        >
                          ₹{formatCurrency(record.balance)}
                        </TableCell>
                      </TableRow>
                    ))
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
