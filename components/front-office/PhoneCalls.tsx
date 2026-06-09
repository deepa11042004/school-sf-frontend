"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Search,
  Filter,
  Plus,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  CalendarIcon,
} from "lucide-react";
import { format } from "date-fns";

// [CHANGE 1]: Fixed the import to match the exported name 'dummyCalls'
import { dummyCalls } from "@/components/data/dummyCalls";

interface CallLog {
  id: string;
  name: string;
  phone: string;
  date: Date;
  nextFollowUp: Date;
  callType: string;
  description: string;
}

interface CallsLogProps {
  calls?: CallLog[];
  onAddCall?: () => void;
  onEditCall?: (id: string) => void;
  isLoading?: boolean;
}

export default function PhoneCalls({
  calls = dummyCalls,
  onAddCall,
  onEditCall,
  isLoading = false,
}: CallsLogProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [callType, setCallType] = useState("all");
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);
  const [entriesPerPage, setEntriesPerPage] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);
  const [openFilterDialog, setOpenFilterDialog] = useState(false);

  const activeFilterCount = (dateFilter ? 1 : 0) + (callType !== "all" ? 1 : 0);

  const hasActiveFilters = activeFilterCount > 0;

  // Filter calls based on search, call type, and date
  const filteredCalls = calls.filter((call) => {
    const matchesSearch =
      call.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      call.phone.includes(searchTerm);
    const matchesCallType =
      callType === "all" ||
      call.callType.toLowerCase() === callType.toLowerCase();
    const matchesDate =
      !dateFilter ||
      format(call.date, "yyyy-MM-dd") === format(dateFilter, "yyyy-MM-dd");
    return matchesSearch && matchesCallType && matchesDate;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredCalls.length / parseInt(entriesPerPage));
  const startIndex = (currentPage - 1) * parseInt(entriesPerPage);
  const endIndex = startIndex + parseInt(entriesPerPage);
  const currentCalls = filteredCalls.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  const handleFilterChange = (value: string) => {
    setCallType(value);
    setCurrentPage(1);
  };

  const handleEntriesPerPageChange = (value: string) => {
    setEntriesPerPage(value);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleDateFilterChange = (date: Date | undefined) => {
    setDateFilter(date);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setCallType("all");
    setDateFilter(undefined);
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

  return (
    <div className="min-h-screen   p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold  tracking-tight">
              Calls Log
            </h1>
          </div>
          <Link href="/front-office/phone-calls/add-calls">
          <Button
            onClick={onAddCall}
            className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Call
          </Button>
          </Link>
        </div>

        {/* filter pop up dialog */}

        <Dialog open={openFilterDialog} onOpenChange={setOpenFilterDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Filter Phone Calls</DialogTitle>

              <DialogDescription>
                Apply filters to narrow down call records.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2">
              {/* Call Type */}

              <Label>Call Type</Label>

              <Select value={callType} onValueChange={setCallType}>
                <SelectTrigger>
                  <SelectValue placeholder="All Call Types" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="all">All Call Types</SelectItem>

                  <SelectItem value="followup">Follow Up</SelectItem>

                  <SelectItem value="new">New Inquiry</SelectItem>

                  <SelectItem value="complaint">Complaint</SelectItem>

                  <SelectItem value="feedback">Feedback</SelectItem>

                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
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

        {/* Search and Filter Section */}
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

              {/* Filters */}
              <div className="flex flex-wrap w-full lg:w-auto gap-3">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full lg:w-auto justify-start text-left font-normal  "
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateFilter
                        ? format(dateFilter, "MM/dd/yyyy")
                        : "mm/dd/yyyy"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dateFilter}
                      onSelect={handleDateFilterChange}
                    />
                  </PopoverContent>
                </Popover>

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
          </CardContent>
        </Card>

        {/* Table Section */}
        <Card className="shadow-sm  ">
          <CardContent className="p-0">
            {/* Table Controls (Show entries) */}
            <div className="p-4 md:p-6  flex flex-col sm:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm ">
                <span>Show</span>
                <Select
                  value={entriesPerPage}
                  onValueChange={handleEntriesPerPageChange}
                >
                  <SelectTrigger className="w-[70px] h-8 ">
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
                Showing {filteredCalls.length === 0 ? 0 : startIndex + 1} to{" "}
                {Math.min(endIndex, filteredCalls.length)} of{" "}
                {filteredCalls.length} entries
              </div>
            </div>

            {/* Data Table */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50/10 hover:bg-slate-50/10   ">
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                      Name
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                      Phone
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                      Date
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                      Next Follow Up
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                      Call Type
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                      Description
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
                  ) : currentCalls.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-64 text-center">
                        <div className="flex flex-col items-center justify-center gap-2 text-slate-400">
                          <div className="p-3 rounded-full bg-red-50">
                            <AlertCircle className="h-6 w-6 text-red-500" />
                          </div>
                          <p className="text-sm font-medium text-slate-500">
                            {hasActiveFilters
                              ? "No calls found matching your filters"
                              : "No calls found"}
                          </p>
                          {hasActiveFilters && (
                            <Button
                              variant="link"
                              onClick={clearFilters}
                              className="text-indigo-600 hover:text-indigo-700"
                            >
                              Clear all filters
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    currentCalls.map((call) => (
                      <TableRow
                        key={call.id}
                        className="border-b last:border-b-0  hover:bg-gray-300 dark:hover:bg-neutral-800 transition-colors"
                      >
                        <TableCell className="font-medium py-3">
                          {call.name}
                        </TableCell>
                        <TableCell className="py-3">{call.phone}</TableCell>
                        <TableCell className="py-3">
                          {format(call.date, "MMM dd, yyyy")}
                        </TableCell>
                        <TableCell className="py-3">
                          {format(call.nextFollowUp, "MMM dd, yyyy")}
                        </TableCell>
                        <TableCell className="py-3">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                            ${
                              call.callType.toLowerCase() === "followup"
                                ? "bg-blue-100 text-blue-800"
                                : call.callType.toLowerCase() === "new"
                                  ? "bg-green-100 text-green-800"
                                  : call.callType.toLowerCase() === "complaint"
                                    ? "bg-red-100 text-red-800"
                                    : call.callType.toLowerCase() === "feedback"
                                      ? "bg-purple-100 text-purple-800"
                                      : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {call.callType}
                          </span>
                        </TableCell>
                        <TableCell
                          className="py-3 max-w-10 truncate"
                          title={call.description}
                        >
                          {call.description}
                        </TableCell>
                        <TableCell className="text-right py-3 ">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="border border-black/20  dark:border-white/20"
                            onClick={() => onEditCall?.(call.id)}
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
