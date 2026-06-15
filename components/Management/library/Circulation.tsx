"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Plus,
  Search,
  FileText,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface CirculationRecord {
  id: string;
  studentName: string;
  bookTitle: string;
  accessionNumber: string;
  issuedDate: string;
  dueDate: string;
  status: "Issued" | "Returned" | "Overdue";
}

export default function Circulation() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [keyword, setKeyword] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);

  // Dummy data - keeping it empty to show the "No issues found." state as requested
  const dummyRecords: CirculationRecord[] = [];

  const filteredRecords = dummyRecords.filter((record) => {
    const matchesStatus = statusFilter === "all" || record.status.toLowerCase() === statusFilter.toLowerCase();
    // Subject filter logic would go here if subject was in the record
    const matchesKeyword =
      keyword === "" ||
      record.studentName.toLowerCase().includes(keyword.toLowerCase()) ||
      record.bookTitle.toLowerCase().includes(keyword.toLowerCase()) ||
      record.accessionNumber.toLowerCase().includes(keyword.toLowerCase());
    
    return matchesStatus && matchesKeyword;
  });

  const totalPages = Math.ceil(filteredRecords.length / parseInt(entriesPerPage));
  const startIndex = (currentPage - 1) * parseInt(entriesPerPage);
  const endIndex = startIndex + parseInt(entriesPerPage);
  const currentRecords = filteredRecords.slice(startIndex, endIndex);

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
          
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Circulation (Issues/Returns)
            </h1>
            
          <div className="flex gap-3">
            <Link href="/management/library/circulation/create">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm">
              <Plus className="mr-2 h-4 w-4" />
              Issue Book
            </Button>
            </Link>
          </div>
        </div>

        {/* Filter Section */}
        <Card className="shadow-sm">
          <CardContent className="p-4 sm:p-6">
            <div className="grid gap-4 md:grid-cols-4">
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Transactions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Transactions</SelectItem>
                    <SelectItem value="issued">Issued</SelectItem>
                    <SelectItem value="returned">Returned</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Subject</Label>
                <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Subjects" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subjects</SelectItem>
                    <SelectItem value="math">Mathematics</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label>Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    type="text"
                    placeholder="Student, Book Title, or Accession No..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="pl-10 focus-visible:ring-indigo-500"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Table Section */}
        <Card className="shadow-sm">
          <CardContent className="p-0">
            {/* Table Controls */}
            <div className="p-4 md:p-6 bg-white flex flex-col sm:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100">
              <div className="flex items-center gap-2 text-sm">
                <span>Show</span>
                <Select
                  value={entriesPerPage}
                  onValueChange={(val) => {
                    setEntriesPerPage(val);
                    setCurrentPage(1);
                  }}
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
                Showing {filteredRecords.length === 0 ? 0 : startIndex + 1} to{" "}
                {Math.min(endIndex, filteredRecords.length)} of{" "}
                {filteredRecords.length} entries
              </div>
            </div>

            {/* Data Table */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50/10 hover:bg-slate-50/10">
                    <TableHead className="text-xs font-semibold  uppercase tracking-wider py-3">
                      Student
                    </TableHead>
                    <TableHead className="text-xs font-semibold  uppercase tracking-wider py-3">
                      Book / Accession
                    </TableHead>
                    <TableHead className="text-xs font-semibold  uppercase tracking-wider py-3">
                      Issued Date
                    </TableHead>
                    <TableHead className="text-xs font-semibold  uppercase tracking-wider py-3">
                      Due Date
                    </TableHead>
                    <TableHead className="text-xs font-semibold  uppercase tracking-wider py-3">
                      Status
                    </TableHead>
                    <TableHead className="text-xs font-semibold  uppercase tracking-wider text-right py-3">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentRecords.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-64 text-center">
                        <div className="flex flex-col items-center justify-center gap-2 text-slate-400">
                          <div className="p-3 rounded-full bg-slate-100">
                            <FileText className="h-8 w-8 text-slate-400" />
                          </div>
                          <p className="text-sm font-medium text-slate-500">
                            No issues found.
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
                        <TableCell className="py-3 font-medium">
                          {record.studentName}
                        </TableCell>
                        <TableCell className="py-3">
                          <div className="flex flex-col">
                            <span className="font-medium">{record.bookTitle}</span>
                            <span className="text-xs text-slate-500">
                              Acc: {record.accessionNumber}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="py-3 text-slate-600">
                          {record.issuedDate}
                        </TableCell>
                        <TableCell className="py-3 text-slate-600">
                          {record.dueDate}
                        </TableCell>
                        <TableCell className="py-3">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              record.status === "Issued"
                                ? "bg-blue-100 text-blue-800"
                                : record.status === "Returned"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {record.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right py-3">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="border border-black/20 dark:border-white/20"
                            >
                              Return
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="border border-black/20 dark:border-white/20"
                            >
                              Edit
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
                  <div className="text-sm text-slate-600">
                    Showing {filteredRecords.length === 0 ? 0 : startIndex + 1} to{" "}
                    {Math.min(endIndex, filteredRecords.length)} of{" "}
                    {filteredRecords.length} entries
                  </div>
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
                        setCurrentPage((prev) =>
                          Math.min(totalPages, prev + 1)
                        )
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