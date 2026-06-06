"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input"; 
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Printer,
  Plus,
  CalendarIcon,
  Filter,
  ChevronLeft,
  ChevronRight,
  FileText,
  Sheet,
Search
} from "lucide-react";
import { format } from "date-fns";
import { generateHalfDayNotices } from "@/components/data/hafday";

interface HalfDayNotice {
  id: string;
  studentName: string;
  studentId: string;
  className: string;
  outTime: Date;
  reason: string;
  guardianName: string;
  guardianContact: string;
}

interface HalfDayNoticesProps {
  notices?: HalfDayNotice[];
  onAddNotice?: () => void;
  onEditNotice?: (id: string) => void;
  onPrintList?: () => void;
  isLoading?: boolean;
}

const dummyNotices = generateHalfDayNotices(20);

export default function HalfDayNotices({
  notices = dummyNotices,
  onAddNotice,
  onEditNotice,  
  isLoading = false,
}: HalfDayNoticesProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("all");
  const [entriesPerPage, setEntriesPerPage] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);
  const [dummyNotices] = useState(() => generateHalfDayNotices(20));
  const [openPrintDialog, setOpenPrintDialog] = useState(false);
  const data = notices.length ? notices : dummyNotices;

  // Filter notices based on date and class
  const filteredNotices = data.filter((notice) => {
    const matchesDate =
      !selectedDate ||
      format(notice.outTime, "yyyy-MM-dd") ===
        format(selectedDate, "yyyy-MM-dd");
    const matchesClass =
      selectedClass === "all" ||
      notice.className.toLowerCase() === selectedClass.toLowerCase();
    return matchesDate && matchesClass;
  });

  // Pagination logic
  const totalPages = Math.ceil(
    filteredNotices.length / parseInt(entriesPerPage),
  );
  const startIndex = (currentPage - 1) * parseInt(entriesPerPage);
  const endIndex = startIndex + parseInt(entriesPerPage);
  const currentNotices = filteredNotices.slice(startIndex, endIndex);

  const handleClassChange = (value: string) => {
    setSelectedClass(value);
    setCurrentPage(1);
  };

  const handleEntriesPerPageChange = (value: string) => {
    setEntriesPerPage(value);
    setCurrentPage(1);
  };

  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date);
    setCurrentPage(1);
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedDate(new Date());
    setSelectedClass("all");
    setCurrentPage(1);
  };

  // Generate page numbers to display
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

  const hasActiveFilters = selectedClass !== "all";

  return (
    <div className="min-h-screen   p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Half Day Notices
            </h1>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setOpenPrintDialog(true)}
              className="border-0 hover:bg-gray-300 dark:hover:bg-neutral-900"
            >
              <Printer className="mr-2 h-4 w-4" />
              Print List
            </Button>

            <Button
              onClick={onAddNotice}
              className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Notice
            </Button>
          </div>
        </div>

        <Dialog open={openPrintDialog} onOpenChange={setOpenPrintDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Choose which format you want to use</DialogTitle>
            </DialogHeader>

            <div className="grid gap-4 mt-4">
              {/* PDF */}
              <div className="flex items-center justify-between border rounded-lg p-4">
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
                    setOpenPrintDialog(false);
                  }}
                >
                  Select
                </Button>
              </div>

              {/* Excel */}
              <div className="flex items-center justify-between border rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <Sheet className="h-10 w-10 text-green-600" />
                  <div>
                    <p className="font-medium">Excel Format</p>
                    <p className="text-sm text-muted-foreground">
                      Export as XLSX file
                    </p>
                  </div>
                </div>

                <Button
                  variant="secondary"
                  onClick={() => {
                    console.log("Generate Excel");
                    setOpenPrintDialog(false);
                  }}
                >
                  Select
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Filter Section */}
        <Card className="shadow-sm  ">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">

              {/* Search Input */}
              <div className="relative w-full lg:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Search Name or Phone..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="pl-10   focus-visible:ring-indigo-500"
                />
              </div>


              

              {/* Filters +  Date Picker */}
              <div className="flex flex-wrap w-full lg:w-auto gap-3">

                {/* Date Picker */}
              <div className="w-full lg:w-auto">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full lg:w-auto justify-start text-left font-normal  "
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-slate-500" />
                      {selectedDate
                        ? format(selectedDate, "MM/dd/yyyy")
                        : "mm/dd/yyyy"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={handleDateChange}
                    />
                  </PopoverContent>
                </Popover>
              </div>

                <Select value={selectedClass} onValueChange={handleClassChange}>
                  <SelectTrigger className="w-full lg:w-[180px]  ">
                    <SelectValue placeholder="All Classes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Classes</SelectItem>
                    <SelectItem value="class-1">Class 1</SelectItem>
                    <SelectItem value="class-2">Class 2</SelectItem>
                    <SelectItem value="class-3">Class 3</SelectItem>
                    <SelectItem value="class-4">Class 4</SelectItem>
                    <SelectItem value="class-5">Class 5</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant="secondary"
                  className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 border-0"
                  onClick={clearFilters}
                >
                  <Filter className="mr-2 h-4 w-4" />
                  {hasActiveFilters ? "Clear Filters" : "Filter"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Table Section */}
        <Card className="shadow-sm ">
          <CardContent className="p-0">
            {/* Table Controls (Show entries) */}
            <div className="p-4 md:p-6 bg-white flex flex-col sm:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm  ">
                <span>Show</span>
                <Select
                  value={entriesPerPage}
                  onValueChange={handleEntriesPerPageChange}
                >
                  <SelectTrigger className="w-[70px] h-8 bg-white  ">
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
                Showing {filteredNotices.length === 0 ? 0 : startIndex + 1} to{" "}
                {Math.min(endIndex, filteredNotices.length)} of{" "}
                {filteredNotices.length} entries
              </div>
            </div>

            {/* Data Table */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50/10 hover:bg-slate-50/10   ">
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                      #
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                      Student Details
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                      Class
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                      Out Time
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500  uppercase tracking-wider py-3">
                      Reason
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                      Guardian
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                      Phone
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider text-right py-3">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-64 text-center">
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : currentNotices.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-64 text-center">
                        <div className="flex flex-col items-center justify-center gap-2 text-slate-400">
                          <div className="p-3 rounded-full bg-slate-100">
                            <FileText className="h-8 w-8 text-slate-400" />
                          </div>
                          <p className="text-sm font-medium text-slate-500">
                            No half day notices found for this date.
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    currentNotices.map((notice, index) => (
                      <TableRow
                        key={notice.id}
                        className="border-b last:border-b-0  hover:bg-gray-300 dark:hover:bg-neutral-800 transition-colors"
                      >
                        <TableCell className="py-3 text-slate-600">
                          {startIndex + index + 1}
                        </TableCell>
                        <TableCell className="py-3">
                          <div className="flex flex-col">
                            <span className="font-medium  ">
                              {notice.studentName}
                            </span>
                            <span className="text-sm text-slate-500">
                              ID: {notice.studentId}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="py-3">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                            {notice.className}
                          </span>
                        </TableCell>
                        <TableCell className="py-3  ">
                          {format(notice.outTime, "hh:mm a")}
                        </TableCell>

                        <TableCell className="py-3 max-w-36 truncate  ">
                          {notice.reason}
                        </TableCell>

                        <TableCell className="py-3">
                          {notice.guardianName}
                        </TableCell>
                        <TableCell className="text-sm  ">
                          {notice.guardianContact}
                        </TableCell>
                        <TableCell className="text-right py-3 ">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="border border-black/20  dark:border-white/20"
                            onClick={() => onEditNotice?.(notice.id)}
                          >
                            Edit
                          </Button>
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
                <div className="flex items-center justify-cener">
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
