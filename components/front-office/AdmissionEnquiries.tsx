"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Search,
  Plus,
  CalendarIcon,
  Filter,
  ChevronLeft,
  ChevronRight,
  FileText,
} from "lucide-react";
import { format } from "date-fns";
import AdmisionStats from "./AdmisionStats";
import {
  admissionEnquiriesDummyData,
  type AdmissionEnquiry,
} from "@/components/data/admission-enquiries";

interface AdmissionEnquiriesProps {
  enquiries?: AdmissionEnquiry[];
  onAddEnquiry?: () => void;
  onEditEnquiry?: (id: string) => void;
}

export default function AdmissionEnquiries({
  enquiries = admissionEnquiriesDummyData,
  onAddEnquiry,
  onEditEnquiry,
}: AdmissionEnquiriesProps) {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSource, setSelectedSource] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [entriesPerPage, setEntriesPerPage] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter enquiries based on search, date, source, and status
  const filteredEnquiries = enquiries.filter((enquiry) => {
    const matchesSearch =
      enquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.phone.includes(searchTerm);

    const matchesDate =
      !selectedDate ||
      format(enquiry.enquiryDate, "yyyy-MM-dd") ===
        format(selectedDate, "yyyy-MM-dd");

    const matchesSource =
      selectedSource === "all" ||
      enquiry.source.toLowerCase() === selectedSource.toLowerCase();

    const matchesStatus =
      selectedStatus === "all" ||
      enquiry.status.toLowerCase() === selectedStatus.toLowerCase();

    return matchesSearch && matchesDate && matchesSource && matchesStatus;
  });

  // Pagination logic
  const totalPages = Math.ceil(
    filteredEnquiries.length / parseInt(entriesPerPage),
  );
  const startIndex = (currentPage - 1) * parseInt(entriesPerPage);
  const endIndex = startIndex + parseInt(entriesPerPage);
  const currentEnquiries = filteredEnquiries.slice(startIndex, endIndex);

  const handleSourceChange = (value: string) => {
    setSelectedSource(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
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
    setSearchTerm("");
    setSelectedDate(undefined);
    setSelectedSource("all");
    setSelectedStatus("all");
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

  const hasActiveFilters = selectedSource !== "all" || selectedStatus !== "all";

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Admission Enquiries
            </h1>
          </div>
          <div className="flex gap-3">
            <Button
              variant="secondary"
              className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 border-0"
              onClick={clearFilters}
            >
              <Filter className="mr-2 h-4 w-4" />
              {hasActiveFilters ? "Clear Filters" : "Filter"}
            </Button>

            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm">
              <Plus className="mr-2 h-4 w-4" />
              New Enquiry
            </Button>
          </div>
        </div>

        {/* admision stats from diffent file */}
        <AdmisionStats />

        {/* Filter Section */}
        <Card className="shadow-sm">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              {/* Search Input */}
              <div className="relative w-full lg:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Search by Name or Phone..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="pl-10 focus-visible:ring-indigo-500"
                />
              </div>

              {/* Filters + Date Picker */}
              <div className="flex flex-wrap w-full lg:w-auto gap-3">
                {/* Date Picker */}
                <div className="w-full lg:w-auto">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full lg:w-auto justify-start text-left font-normal"
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

                <Select
                  value={selectedSource}
                  onValueChange={handleSourceChange}
                >
                  <SelectTrigger className="w-full lg:w-[180px]">
                    <SelectValue placeholder="All Sources" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sources</SelectItem>
                    <SelectItem value="website">Website</SelectItem>
                    <SelectItem value="walk-in">Walk-in</SelectItem>
                    <SelectItem value="phone call">Phone Call</SelectItem>
                    <SelectItem value="referral">Referral</SelectItem>
                    <SelectItem value="social media">Social Media</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={selectedStatus}
                  onValueChange={handleStatusChange}
                >
                  <SelectTrigger className="w-full lg:w-[180px]">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="follow-up">Follow-up</SelectItem>
                    <SelectItem value="converted">Converted</SelectItem>
                    <SelectItem value="lost">Lost</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Table Section */}
        <Card className="shadow-sm">
          <CardContent className="p-0">
            {/* Table Controls (Show entries) */}
            <div className="p-4 md:p-6 bg-white flex flex-col sm:flex-row items-start md:items-center justify-between gap-4">
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
                Showing {filteredEnquiries.length === 0 ? 0 : startIndex + 1} to{" "}
                {Math.min(endIndex, filteredEnquiries.length)} of{" "}
                {filteredEnquiries.length} entries
              </div>
            </div>

            {/* Data Table */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50/10 hover:bg-slate-50/10">
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                      Name
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                      Phone
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                      Source
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                      Enquiry Date
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                      Last Follow Up
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                      Next Follow Up
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                      Status
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider text-right py-3">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentEnquiries.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="h-64 text-center">
                        <div className="flex flex-col items-center justify-center gap-2 text-slate-400">
                          <div className="p-3 rounded-full bg-slate-100">
                            <FileText className="h-8 w-8 text-slate-400" />
                          </div>
                          <p className="text-sm font-medium text-slate-500">
                            No enquiries found.
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    currentEnquiries.map((enquiry) => (
                      <TableRow
                        key={enquiry.id}
                        className="border-b last:border-b-0 hover:bg-gray-300 dark:hover:bg-neutral-800 transition-colors"
                      >
                        <TableCell className="py-3 font-medium">
                          {enquiry.name}
                          <span className="flex items-center gap-1 mt-2 text-slate-500">
                            {enquiry.className}
                          </span>
                        </TableCell>
                        <TableCell className="py-3 max-w-xs truncate">
                          {enquiry.phone}
                        </TableCell>
                        <TableCell className="py-3">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                              enquiry.source === "website"
                                ? "bg-blue-100 text-blue-800"
                                : enquiry.source === "walk-in"
                                  ? "bg-green-100 text-green-800"
                                  : enquiry.source === "phone call"
                                    ? "bg-purple-100 text-purple-800"
                                    : enquiry.source === "referral"
                                      ? "bg-orange-100 text-orange-800"
                                      : "bg-pink-100 text-pink-800"
                            }`}
                          >
                            {enquiry.source}
                          </span>
                        </TableCell>
                        <TableCell className="py-3">
                          {format(
                            new Date(enquiry.enquiryDate),
                            "MMM dd, yyyy",
                          )}
                        </TableCell>
                        <TableCell className="py-3">
                          {format(
                            new Date(enquiry.lastFollowUp),
                            "MMM dd, yyyy",
                          )}
                        </TableCell>
                        <TableCell className="py-3">
                          {format(
                            new Date(enquiry.nextFollowUp),
                            "MMM dd, yyyy",
                          )}
                        </TableCell>
                        <TableCell className="py-3">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                              enquiry.status === "converted"
                                ? "bg-green-100 text-green-800"
                                : enquiry.status === "new"
                                  ? "bg-blue-100 text-blue-800"
                                  : enquiry.status === "follow-up"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                            }`}
                          >
                            {enquiry.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right py-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="border border-black/20 dark:border-white/20"
                            onClick={() => onEditEnquiry?.(enquiry.id)}
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
