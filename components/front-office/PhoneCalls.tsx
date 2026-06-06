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
import { Search, Filter, Plus, AlertCircle, ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react";
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
  // [CHANGE 2]: Set the default value to dummyCalls instead of an empty array
  calls = dummyCalls, 
  onAddCall, 
  onEditCall,
  isLoading = false 
}: CallsLogProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [callType, setCallType] = useState("all");
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);
  const [entriesPerPage, setEntriesPerPage] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter calls based on search, call type, and date
  const filteredCalls = calls.filter((call) => {
    const matchesSearch =
      call.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      call.phone.includes(searchTerm);
    const matchesCallType = callType === "all" || call.callType.toLowerCase() === callType.toLowerCase();
    const matchesDate = !dateFilter || format(call.date, "yyyy-MM-dd") === format(dateFilter, "yyyy-MM-dd");
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

  const hasActiveFilters = searchTerm || callType !== "all" || dateFilter;

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
          <Button 
            onClick={onAddCall}
            className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Call
          </Button>
        </div>

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
                      {dateFilter ? format(dateFilter, "MM/dd/yyyy") : "mm/dd/yyyy"}
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

                <Select value={callType} onValueChange={handleFilterChange}>
                  <SelectTrigger className="w-full lg:w-[180px]  ">
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
        <Card className="shadow-sm  ">
          <CardContent className="p-0">
            {/* Table Controls (Show entries) */}
           <div className="p-4 md:p-6  flex flex-col sm:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <span>Show</span>
                <Select value={entriesPerPage} onValueChange={handleEntriesPerPageChange}>
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
                Showing {filteredCalls.length === 0 ? 0 : startIndex + 1} to {Math.min(endIndex, filteredCalls.length)} of {filteredCalls.length} entries
              </div>
            </div>

            {/* Data Table */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                   <TableRow className="bg-slate-50/10 hover:bg-slate-50/10 border-b border-slate-200">
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
                            {hasActiveFilters ? "No calls found matching your filters" : "No calls found"}
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
                        className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/50 transition-colors"
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
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                            ${call.callType.toLowerCase() === 'followup' ? 'bg-blue-100 text-blue-800' : 
                              call.callType.toLowerCase() === 'new' ? 'bg-green-100 text-green-800' :
                              call.callType.toLowerCase() === 'complaint' ? 'bg-red-100 text-red-800' :
                              call.callType.toLowerCase() === 'feedback' ? 'bg-purple-100 text-purple-800' :
                              'bg-gray-100 text-gray-800'}`}>
                            {call.callType}
                          </span>
                        </TableCell>
                        <TableCell className="py-3 max-w-10 truncate" title={call.description}>
                          {call.description}
                        </TableCell>
                        <TableCell className="text-right py-3 ">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="border border-white/20"
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