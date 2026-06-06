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
import { postalDummyData, type PostalRecord } from "@/components/data/postal";
import {
  Printer,
  Plus,
  Filter,
  ChevronLeft,
  ChevronRight,
  FileText,
  Sheet,
  Search,
} from "lucide-react";
import { format } from "date-fns";

interface PostalProps {
  notices?: PostalRecord[];
  onAddNotice?: () => void;
  onEditNotice?: (id: string) => void;
  onPrintList?: () => void;
  isLoading?: boolean;
}
export default function Postal({
  notices = postalDummyData,
  onAddNotice,
  onEditNotice,
  isLoading = false,
}: PostalProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("all");
  const [entriesPerPage, setEntriesPerPage] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);

  const [openPrintDialog, setOpenPrintDialog] = useState(false);
  const data = notices.length ? notices : postalDummyData;

  // Filter notices based on date and class
  const filteredNotices = data.filter((notice) => {
    const matchesSearch =
      notice.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notice.referenceNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notice.title.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDirection =
      selectedClass === "all" || notice.direction === selectedClass;

    const matchesDate =
      !selectedDate ||
      format(notice.date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");

    return matchesSearch && matchesDirection && matchesDate;
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
              Postal Dispatch/Receive
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
                  placeholder="Search Type or Ref No..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="pl-10   focus-visible:ring-indigo-500"
                />
              </div>

              {/* Filters +  Date Picker */}
              <div className="flex flex-wrap w-full lg:w-auto gap-3">
                <Select value={selectedClass} onValueChange={handleClassChange}>
                  <SelectTrigger className="w-full lg:w-[180px]  ">
                    <SelectValue placeholder="All Directions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Directions</SelectItem>
                    <SelectItem value="dispatch">Dispatch</SelectItem>
                    <SelectItem value="receive">Receive</SelectItem>
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
            {/* Data Table */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50/10 hover:bg-slate-50/10   ">
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                      Type
                    </TableHead>

                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                      Reference No
                    </TableHead>

                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                      Title
                    </TableHead>

                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                      Direction
                    </TableHead>

                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                      Date
                    </TableHead>

                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider text-right py-3">
                      Actions
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
                        className="border-b last:border-b-0 hover:bg-gray-300 dark:hover:bg-neutral-800 transition-colors"
                      >
                        <TableCell>{notice.type}</TableCell>

                        <TableCell>REF-{notice.referenceNo}</TableCell>

                        <TableCell className="py-3 max-w-xs truncate">{notice.title}</TableCell>

                        <TableCell>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              notice.direction === "dispatch"
                                ? "bg-indigo-100 text-indigo-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {notice.direction}
                          </span>
                        </TableCell>

                        <TableCell className="py-3">
                          {notice.date
                            ? format(new Date(notice.date), "MMM dd, yyyy")
                            : "-"}
                        </TableCell>

                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="border border-black/20 dark:border-white/20"
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
