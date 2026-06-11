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
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  FileText,
  Upload,
  RefreshCcw,
  Sheet,
  Filter,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface LedgerRecord {
  id: string;
  date: string;
  description: string;
  type: "Credit" | "Debit";
  amount: number;
  paymentMode: string;
  ref: string;
}

const dummyRecords: LedgerRecord[] = [
  {
    id: "1",
    date: "2026-06-06",
    description: "Fee Payment - Receipt #REC-0014",
    type: "Credit",
    amount: 2000.0,
    paymentMode: "CASH",
    ref: "FeePayment #14",
  },
  {
    id: "2",
    date: "2026-06-04",
    description: "Fee Payment - Receipt #REC-0013",
    type: "Credit",
    amount: 1000.0,
    paymentMode: "CASH",
    ref: "FeePayment #13",
  },
  {
    id: "3",
    date: "2026-06-04",
    description: "Fee Payment - Receipt #REC-0012",
    type: "Credit",
    amount: 1000.0,
    paymentMode: "CASH",
    ref: "FeePayment #12",
  },
  {
    id: "4",
    date: "2026-06-04",
    description: "Fee Payment - Receipt #REC-0011",
    type: "Credit",
    amount: 2000.0,
    paymentMode: "CASH",
    ref: "FeePayment #11",
  },
  {
    id: "5",
    date: "2026-06-03",
    description: "Fee Payment - Receipt #REC-0010",
    type: "Credit",
    amount: 3000.0,
    paymentMode: "CASH",
    ref: "FeePayment #10",
  },
  {
    id: "6",
    date: "2026-06-03",
    description: "Fee Payment - Receipt #REC-0009",
    type: "Credit",
    amount: 400.0,
    paymentMode: "CASH",
    ref: "FeePayment #9",
  },
  {
    id: "7",
    date: "2026-06-01",
    description: "Fee Payment - Receipt #REC-0008",
    type: "Credit",
    amount: 2400.0,
    paymentMode: "CASH",
    ref: "FeePayment #8",
  },
  {
    id: "8",
    date: "2026-06-01",
    description: "Fee Payment - Receipt #REC-0007",
    type: "Credit",
    amount: 2400.0,
    paymentMode: "CASH",
    ref: "FeePayment #7",
  },
  {
    id: "9",
    date: "2026-05-31",
    description: "Fee Payment - Receipt #REC-0006",
    type: "Credit",
    amount: 2900.0,
    paymentMode: "CASH",
    ref: "FeePayment #6",
  },
  {
    id: "10",
    date: "2026-05-26",
    description: "Fee Payment - Receipt #REC-0005",
    type: "Credit",
    amount: 2650.0,
    paymentMode: "CASH",
    ref: "FeePayment #5",
  },
  {
    id: "11",
    date: "2026-05-26",
    description: "Fee Payment - Receipt #REC-0004",
    type: "Credit",
    amount: 763.0,
    paymentMode: "CASH",
    ref: "FeePayment #4",
  },
  {
    id: "12",
    date: "2026-05-22",
    description: "Fee Payment - Receipt #REC-0003",
    type: "Credit",
    amount: 900.0,
    paymentMode: "UPI",
    ref: "FeePayment #3",
  },
  {
    id: "13",
    date: "2026-05-22",
    description: "XYZ -",
    type: "Debit",
    amount: 300.0,
    paymentMode: "Cash",
    ref: "Expense #2",
  },
  {
    id: "14",
    date: "2026-05-22",
    description: "Fee Payment - Receipt #REC-0002",
    type: "Credit",
    amount: 3000.0,
    paymentMode: "CASH",
    ref: "FeePayment #2",
  },
  {
    id: "15",
    date: "2026-05-16",
    description: "Fee Payment - Receipt #REC-0001",
    type: "Credit",
    amount: 7000.0,
    paymentMode: "CASH",
    ref: "FeePayment #1",
  },
  {
    id: "16",
    date: "2026-05-10",
    description: "Office Supplies Purchase",
    type: "Debit",
    amount: 150.0,
    paymentMode: "CASH",
    ref: "Expense #1",
  },
];

export default function GeneralLedger() {
  const [academicYear, setAcademicYear] = useState("2026-27");
  const [startDate, setStartDate] = useState<Date | undefined>(
    new Date(2026, 4, 1),
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    new Date(2026, 5, 10),
  );
  const [transactionType, setTransactionType] = useState("all");
  const [paymentMode, setPaymentMode] = useState("all");

  const [entriesPerPage, setEntriesPerPage] = useState("15");
  const [currentPage, setCurrentPage] = useState(1);
  const [openExportDialog, setOpenExportDialog] = useState(false);

  const filteredRecords = dummyRecords.filter((record) => {
    const matchesType =
      transactionType === "all" ||
      record.type.toLowerCase() === transactionType.toLowerCase();
    const matchesMode =
      paymentMode === "all" ||
      record.paymentMode.toLowerCase() === paymentMode.toLowerCase();
    return matchesType && matchesMode;
  });

  const [openFilterDialog, setOpenFilterDialog] = useState(false);

  const activeFilterCount =
    (transactionType !== "all" ? 1 : 0) + (paymentMode !== "all" ? 1 : 0);

  const hasActiveFilters = activeFilterCount > 0;

  const clearFilters = () => {
    setTransactionType("all");
    setPaymentMode("all");
  };

  const totalPages = Math.ceil(
    filteredRecords.length / parseInt(entriesPerPage),
  );
  const startIndex = (currentPage - 1) * parseInt(entriesPerPage);
  const endIndex = startIndex + parseInt(entriesPerPage);
  const currentRecords = filteredRecords.slice(startIndex, endIndex);

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
              General Ledger
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
        {/* export button popup */}
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

              {/* filter */}
              <div className="space-y-2 flex justify-end items-end">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setOpenFilterDialog(true)}
                  >
                    <Filter className="mr-2 h-4 w-4" />
                    Filters
                    {hasActiveFilters && (
                      <span className="ml-2 rounded-full bg-primary text-primary-foreground px-2 py-0.5 text-xs font-medium">
                        {activeFilterCount}
                      </span>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* filter popup  */}

        <Dialog open={openFilterDialog} onOpenChange={setOpenFilterDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Filter Transactions</DialogTitle>

              <DialogDescription>
                Apply filters to narrow down transaction records.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2">
              {/* Transaction Type */}
              <div className="space-y-2">
                <Label>Transaction Type</Label>

                <Select
                  value={transactionType}
                  onValueChange={setTransactionType}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>

                    <SelectItem value="credit">Credit</SelectItem>

                    <SelectItem value="debit">Debit</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Payment Mode */}
              <div className="space-y-2">
                <Label>Payment Mode</Label>

                <Select value={paymentMode} onValueChange={setPaymentMode}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Modes" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="all">All Modes</SelectItem>

                    <SelectItem value="cash">Cash</SelectItem>

                    <SelectItem value="upi">UPI</SelectItem>

                    <SelectItem value="card">Card</SelectItem>

                    <SelectItem value="bank">Bank Transfer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>

              <Button onClick={() => setOpenFilterDialog(false)}>
                Apply Filters
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

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
                    <SelectItem value="15">15</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
                <span>entries</span>
              </div>
              <div className="text-sm text-slate-600">
                Showing {filteredRecords.length === 0 ? 0 : startIndex + 1} to{" "}
                {Math.min(endIndex, filteredRecords.length)} of{" "}
                {filteredRecords.length} results
              </div>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50/10 hover:bg-slate-50/10">
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                      Date
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                      Description
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                      Type
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3 text-right">
                      Amount
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                      Payment Mode
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                      Ref
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecords.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-64 text-center">
                        <div className="flex flex-col items-center justify-center gap-2 text-slate-400">
                          <div className="p-3 rounded-full bg-slate-100">
                            <FileText className="h-8 w-8 text-slate-400" />
                          </div>
                          <p className="text-sm font-medium text-slate-500">
                            No ledger records found.
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
                        <TableCell className="py-3 font-medium   whitespace-nowrap">
                          {new Date(record.date).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </TableCell>
                        <TableCell className="py-3  ">
                          {record.description}
                        </TableCell>
                        <TableCell className="py-3">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              record.type === "Credit"
                                ? "bg-green-700 text-white"
                                : "bg-red-700 text-white"
                            }`}
                          >
                            {record.type}
                          </span>
                        </TableCell>
                        <TableCell
                          className={`py-3 text-right font-medium whitespace-nowrap ${
                            record.type === "Credit"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          ₹{formatCurrency(record.amount)}
                        </TableCell>
                        <TableCell className="py-3   ">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 uppercase">
                            {record.paymentMode}
                          </span>
                        </TableCell>
                        <TableCell className="py-3  font-mono text-sm">
                          {record.ref}
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
