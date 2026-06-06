"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
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
  Filter,
  Plus,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { dummyVisitors } from "@/components/data/visitorData";

export default function VisitorsLog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [purpose, setPurpose] = useState("all");
  const [entriesPerPage, setEntriesPerPage] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter visitors based on search and purpose
  const filteredVisitors = dummyVisitors.filter((visitor) => {
    const matchesSearch =
      visitor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visitor.phone.includes(searchTerm);
    const matchesPurpose =
      purpose === "all" ||
      visitor.purpose.toLowerCase() === purpose.toLowerCase();
    return matchesSearch && matchesPurpose;
  });

  // Pagination logic
  const totalPages = Math.ceil(
    filteredVisitors.length / parseInt(entriesPerPage),
  );
  const startIndex = (currentPage - 1) * parseInt(entriesPerPage);
  const endIndex = startIndex + parseInt(entriesPerPage);
  const currentVisitors = filteredVisitors.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  const handleFilterChange = (newPurpose: string) => {
    setPurpose(newPurpose);
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
              Visitors Log
            </h1>
          </div>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Visitor
          </Button>
        </div>

        {/* Search and Filter Section */}
        <Card className="shadow-sm  ">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              {/* Search Input */}
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Search by Name or Phone."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="pl-10   focus-visible:ring-indigo-500"
                />
              </div>

              {/* Filters */}
              <div className="flex w-full md:w-auto gap-3">
                <Select value={purpose} onValueChange={handleFilterChange}>
                  <SelectTrigger className="w-full md:w-[180px]  ">
                    <SelectValue placeholder="All Purposes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Purposes</SelectItem>
                    <SelectItem value="meeting">Admission Inquiry</SelectItem>
                    <SelectItem value="interview">Parent Meet</SelectItem>
                    <SelectItem value="delivery">Interview</SelectItem>
                    <SelectItem value="delivery">Vendor</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant="secondary"
                  className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 border-0"
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
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
              <div className="flex items-center gap-2 text-sm  ">
                <span>Show</span>
                <Select
                  value={entriesPerPage}
                  onValueChange={handleEntriesPerPageChange}
                >
                  <SelectTrigger className="w-[70px] h-8  ">
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
                Showing {filteredVisitors.length === 0 ? 0 : startIndex + 1} to{" "}
                {Math.min(endIndex, filteredVisitors.length)} of{" "}
                {filteredVisitors.length} entries
              </div>
            </div>

            {/* Data Table */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
<<<<<<< HEAD
                  <TableRow className=" border-b border-slate-200">
=======
                  <TableRow className="bg-slate-50/10 hover:bg-slate-50/10 border-b border-slate-200">
>>>>>>> b8766311c17f412fb1d1d184f814b2a2ae32e961
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                      Visitor Name
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                      Phone
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                      Purpose
                    </TableHead>
<<<<<<< HEAD
                    <TableHead className="text-xs font-semibold  text-slate-500 uppercase tracking-wider py-3">
                      No. of <br /> Persons
=======
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                      No. of Persons
>>>>>>> b8766311c17f412fb1d1d184f814b2a2ae32e961
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                      Date
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                      In Time
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                      Out Time
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider text-right py-3">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentVisitors.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="h-64 text-center">
                        <div className="flex flex-col items-center justify-center gap-2 text-slate-400">
                          <div className="p-3 rounded-full bg-red-50">
                            <AlertCircle className="h-6 w-6 text-red-500" />
                          </div>
                          <p className="text-sm font-medium text-slate-500">
                            No visitors found
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    currentVisitors.map((visitor) => (
                      <TableRow
                        key={visitor.id}
                        className="border-b dark:border-white/20 border-black/20 last:border-b-0 hover:bg-slate-50/50 transition-colors"
                      >
                        <TableCell className="font-medium py-3">
                          {visitor.name}
                        </TableCell>
                        <TableCell className="py-3">{visitor.phone}</TableCell>
                        <TableCell className="py-3">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 capitalize">
                            {visitor.purpose}
                          </span>
                        </TableCell>
<<<<<<< HEAD
                        <TableCell className="py-3 max-w-3 items-center justify-center text-center truncate">
                          {visitor.persons}
                        </TableCell>

=======
                        <TableCell className="py-3">
                          {visitor.persons}
                        </TableCell>
>>>>>>> b8766311c17f412fb1d1d184f814b2a2ae32e961
                        <TableCell className="py-3">
                          {visitor.date
                            ? format(new Date(visitor.date), "MMM dd, yyyy")
                            : "-"}
                        </TableCell>
<<<<<<< HEAD

                        

                        <TableCell className="py-3">{visitor.inTime}</TableCell>
                        <TableCell className="py-3   items-center text-center">
                          {visitor.outTime}
                        </TableCell>
                        <TableCell className="text-right py-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="border border-white/20"
                          >
=======
                        <TableCell className="py-3">{visitor.inTime}</TableCell>
                        <TableCell className="py-3">
                          {visitor.outTime}
                        </TableCell>
                        <TableCell className="text-right py-3">
                          <Button variant="ghost" size="sm">
>>>>>>> b8766311c17f412fb1d1d184f814b2a2ae32e961
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
<<<<<<< HEAD
                                : "hover:bg-slate-100/20"
=======
                                 : "hover:bg-slate-100/20"
>>>>>>> b8766311c17f412fb1d1d184f814b2a2ae32e961
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
