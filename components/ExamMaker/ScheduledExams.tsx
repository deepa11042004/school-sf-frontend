"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Search,
  ChevronLeft,
  ChevronRight,
  Plus,
  Filter,
  RefreshCcw,
  SquarePen,
  Star,
} from "lucide-react";

interface ScheduledExam {
  id: string;
  className: string;
  examType: string;
  dateRange: string;
  status: "Scheduled" | "Completed" | "Pending";
}

const initialExams: ScheduledExam[] = [
  {
    id: "1",
    className: "I A",
    examType: "FA 1",
    dateRange: "-",
    status: "Scheduled",
  },
  {
    id: "2",
    className: "I A",
    examType: "FA 2",
    dateRange: "-",
    status: "Scheduled",
  },
  {
    id: "3",
    className: "I A",
    examType: "SA 1",
    dateRange: "-",
    status: "Scheduled",
  },
  {
    id: "4",
    className: "I A",
    examType: "FA 3",
    dateRange: "-",
    status: "Scheduled",
  },
  {
    id: "5",
    className: "I A",
    examType: "FA 4",
    dateRange: "-",
    status: "Scheduled",
  },
  {
    id: "6",
    className: "I A",
    examType: "SA 2",
    dateRange: "-",
    status: "Scheduled",
  },
  {
    id: "7",
    className: "II A",
    examType: "FA 2",
    dateRange: "-",
    status: "Scheduled",
  },
  {
    id: "8",
    className: "II A",
    examType: "FA 1",
    dateRange: "-",
    status: "Scheduled",
  },
  {
    id: "9",
    className: "II A",
    examType: "SA 1",
    dateRange: "-",
    status: "Scheduled",
  },
  {
    id: "10",
    className: "II A",
    examType: "FA 3",
    dateRange: "-",
    status: "Scheduled",
  },
  {
    id: "11",
    className: "II A",
    examType: "FA 4",
    dateRange: "-",
    status: "Scheduled",
  },
  {
    id: "12",
    className: "II A",
    examType: "SA 2",
    dateRange: "-",
    status: "Scheduled",
  },
  {
    id: "13",
    className: "III A",
    examType: "FA 1",
    dateRange: "-",
    status: "Scheduled",
  },
  {
    id: "14",
    className: "III A",
    examType: "FA 2",
    dateRange: "-",
    status: "Scheduled",
  },
  {
    id: "15",
    className: "III A",
    examType: "SA 1",
    dateRange: "-",
    status: "Scheduled",
  },
  {
    id: "16",
    className: "III A",
    examType: "FA 3",
    dateRange: "-",
    status: "Scheduled",
  },
  {
    id: "17",
    className: "III A",
    examType: "FA 4",
    dateRange: "-",
    status: "Scheduled",
  },
  {
    id: "18",
    className: "III A",
    examType: "SA 2",
    dateRange: "-",
    status: "Scheduled",
  },
  {
    id: "19",
    className: "I A",
    examType: "FA 1",
    dateRange: "-",
    status: "Scheduled",
  },
  {
    id: "20",
    className: "I A",
    examType: "FA 2",
    dateRange: "-",
    status: "Scheduled",
  },
  {
    id: "21",
    className: "II A",
    examType: "FA 1",
    dateRange: "-",
    status: "Scheduled",
  },
  {
    id: "22",
    className: "II A",
    examType: "FA 2",
    dateRange: "-",
    status: "Scheduled",
  },
  {
    id: "23",
    className: "III A",
    examType: "FA 1",
    dateRange: "-",
    status: "Scheduled",
  },
  {
    id: "24",
    className: "III A",
    examType: "FA 2",
    dateRange: "-",
    status: "Scheduled",
  },
];

export default function ScheduledExams() {
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  // Filters State
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedPattern, setSelectedPattern] = useState("all");

  // Filter state values applied on clicking "Filter"
  const [appliedClass, setAppliedClass] = useState("all");
  const [appliedPattern, setAppliedPattern] = useState("all");

  const handleFilter = () => {
    setAppliedClass(selectedClass);
    setAppliedPattern(selectedPattern);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setSelectedClass("all");
    setSelectedPattern("all");
    setAppliedClass("all");
    setAppliedPattern("all");
    setSearchTerm("");
    setCurrentPage(1);
  };

  // Filter logic
  const filteredExams = initialExams.filter((exam) => {
    const matchesSearch =
      exam.className.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.examType.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesClass =
      appliedClass === "all" || exam.className === appliedClass;
    const matchesPattern = appliedPattern === "all" || appliedPattern === "all";

    return matchesSearch && matchesClass && matchesPattern;
  });

  // Pagination calculation
  const totalPages = Math.ceil(filteredExams.length / parseInt(entriesPerPage));
  const startIndex = (currentPage - 1) * parseInt(entriesPerPage);
  const endIndex = startIndex + parseInt(entriesPerPage);
  const currentExams = filteredExams.slice(startIndex, endIndex);

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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Scheduled Exams
          </h1>

          <div className="flex gap-3">
            {/* Filter Toggle Button */}

            <Link href="/exam-maker/exams/create">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm">
                <Plus className="mr-2 h-4 w-4" />
                Schedule Exam
              </Button>
            </Link>
          </div>
        </div>

        {/* Filter Section - Collapsible */}

        <Card className="shadow-sm">
          <CardContent className="p-4 md:p-6">
            <div className="grid gap-6 md:grid-cols-4 items-end">
              {/* Class select */}
              <div className="space-y-2">
                <Label>
                  Class <span className="text-destructive">*</span>
                </Label>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Classes</SelectItem>
                    <SelectItem value="I A">I A</SelectItem>
                    <SelectItem value="II A">II A</SelectItem>
                    <SelectItem value="III A">III A</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Exam Pattern select */}
              <div className="space-y-2">
                <Label>Exam Pattern</Label>
                <Select
                  value={selectedPattern}
                  onValueChange={setSelectedPattern}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Pattern" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Patterns</SelectItem>
                    <SelectItem value="PATAN 1">PATAN 1</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Actions */}
              <div className="flex justify-end items-center gap-3 md:col-span-2">
                <Button
                  onClick={handleFilter}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm flex-1 md:flex-initial px-6"
                >
                  Apply Filters
                </Button>
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="flex-1 bg-transparent md:flex-initial px-6"
                  size="sm"
                >
                  <RefreshCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Table Section */}
        <Card className="shadow-sm">
          <CardContent className="p-0">
            {/* Controls */}
            <div className="p-4 md:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4  ">
              <div className="flex items-center gap-2 text-sm  ">
                <span>Show</span>
                <Select
                  value={entriesPerPage}
                  onValueChange={handleEntriesPerPageChange}
                >
                  <SelectTrigger className="w-[70px] h-8">
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

              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 focus-visible:ring-indigo-500"
                />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50/10 hover:bg-slate-50/10  ">
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                      Class
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                      Exam Type
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                      Date Range
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                      Status
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider text-right py-3">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredExams.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="h-40 text-center">
                        <div className="flex flex-col items-center justify-center gap-2">
                          <div className="bg-slate-100 rounded-full p-3">
                            <Search className="h-6 w-6 text-slate-400" />
                          </div>
                          <p className="text-sm font-medium text-slate-500">
                            No scheduled exams found.
                          </p>
                          <p className="text-xs text-slate-400">
                            Try adjusting your search or filter criteria
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    currentExams.map((exam) => (
                      <TableRow key={exam.id}>
                        <TableCell className="py-4 font-semibold ">
                          {exam.className}
                        </TableCell>
                        <TableCell className="py-4  ">
                          {exam.examType}
                        </TableCell>
                        <TableCell className="py-4  ">
                          {exam.dateRange}
                        </TableCell>
                        <TableCell className="py-4">
                          <span className="bg-yellow-500 text-white  rounded-full text-xs font-medium px-2.5 py-0.5">
                            {exam.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right py-4">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="border border-black/20 dark:border-white/20"
                            >
                              <SquarePen className="w-4 h-4 mr-2" />
                              Marks
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="border border-blue-600 dark:border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                            >
                              <Star className="w-4 h-4 mr-2" />
                              Fill Grade
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
