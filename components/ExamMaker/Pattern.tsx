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
import { Search, ChevronLeft, ChevronRight, Plus } from "lucide-react";

interface ExamPattern {
  id: string;
  name: string;
  description: string;
  types: string[];
}

const dummyPatterns: ExamPattern[] = [
  {
    id: "1",
    name: "PATAN 1",
    description: "NC TO 5",
    types: ["FA 1", "FA 2", "SA 1", "FA 3", "FA 4", "SA 2"],
  },
];

export default function Pattern() {
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);
  const [patterns, setPatterns] = useState<ExamPattern[]>(dummyPatterns);

  // Filter based on search term
  const filteredPatterns = patterns.filter(
    (pattern) =>
      pattern.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pattern.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pattern.types.some((type) =>
        type.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
  );

  // Pagination calculation
  const totalPages = Math.ceil(
    filteredPatterns.length / parseInt(entriesPerPage),
  );
  const startIndex = (currentPage - 1) * parseInt(entriesPerPage);
  const endIndex = startIndex + parseInt(entriesPerPage);
  const currentPatterns = filteredPatterns.slice(startIndex, endIndex);

  const handleEntriesPerPageChange = (value: string) => {
    setEntriesPerPage(value);
    setCurrentPage(1);
  };

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
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Exam Patterns
            </h1>

            <div>
              <Link href="/exam-maker/pattern/create">
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Pattern
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Data Table Section */}
        <Card className="shadow-sm border border-slate-100 dark:border-neutral-800">
          <CardContent className="p-0">
            {/* Top Controls */}
            <div className="p-4 md:p-6 bg-white dark:bg-[#0F0F12] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-neutral-800">
              {/* Row Per Page */}
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <span>Row Per Page</span>
                <Select
                  value={entriesPerPage}
                  onValueChange={handleEntriesPerPageChange}
                >
                  <SelectTrigger className="w-[70px] h-8 bg-white dark:bg-neutral-900 border-slate-200 dark:border-neutral-800">
                    <SelectValue placeholder="10" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
                <span>Entries</span>
              </div>

              {/* Search input */}
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 focus-visible:ring-indigo-500 bg-white dark:bg-neutral-900 border-slate-200 dark:border-neutral-850"
                />
              </div>
            </div>

            {/* Table layout */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50/10 hover:bg-slate-50/10 border-b border-slate-100 dark:border-neutral-800">
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                      Name
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                      Description
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                      Types
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider text-right py-3">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPatterns.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="h-40 text-center">
                        <div className="flex flex-col items-center justify-center gap-2 text-slate-400">
                          <p className="text-sm font-medium text-slate-500">
                            No exam patterns found.
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    currentPatterns.map((pattern) => (
                      <TableRow
                        key={pattern.id}
                        className="border-b last:border-b-0 border-slate-100 dark:border-neutral-800 hover:bg-gray-300 dark:hover:bg-neutral-800 transition-colors"
                      >
                        <TableCell className="py-4 font-semibold text-slate-900 dark:text-white">
                          {pattern.name}
                        </TableCell>
                        <TableCell className="py-4 text-slate-650 dark:text-slate-300">
                          {pattern.description}
                        </TableCell>
                        <TableCell className="py-4">
                          <div className="flex flex-wrap gap-1.5">
                            {pattern.types.map((type, idx) => (
                              <span
                                key={idx}
                                className="bg-indigo-600 text-white rounded-full text-xs font-medium px-2.5 py-0.5 "
                              >
                                {type}
                              </span>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="text-right py-4">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="border border-black/20 dark:border-white/20"
                            >
                              Edit
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="border border-red-600 dark:border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                            >
                              Delete
                            </Button>
                          </div>
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
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
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
