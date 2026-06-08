"use client";

import { useState } from "react";
import { ArrowRight, GraduationCap, Search, Users, ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { promoteStudents } from "@/components/data/promote";

export default function PromoteStudentsPage() {
  const [students] = useState(promoteStudents);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState("10");

  const totalPages = Math.ceil(students.length / parseInt(entriesPerPage));
  const startIndex = (currentPage - 1) * parseInt(entriesPerPage);
  const endIndex = startIndex + parseInt(entriesPerPage);
  const currentStudents = students.slice(startIndex, endIndex);

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
    <div className="space-y-6 p-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Promote Students</h1>

        
      </div>

      {/* Class Selection */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Class Promotion Setup
          </CardTitle>
          <div className="flex justify-end">
            <Button>
              <Search className="mr-2 h-4 w-4" />
              Fetch Students
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3 items-end">
            {/* Source Class */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Select Source Class</label>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Class & Section" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="1-a">Class 1 - Section A</SelectItem>
                  <SelectItem value="1-b">Class 1 - Section B</SelectItem>
                  <SelectItem value="2-a">Class 2 - Section A</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* FLOW ARROW (NEW DESIGN ELEMENT) */}
            <div className="flex flex-col items-center justify-center text-muted-foreground">
              <ArrowRight className="h-6 w-6 animate-pulse" />
              <span className="text-xs mt-1">Promotion Flow</span>
            </div>

            {/* Destination Class */}
            <div className="space-y-3">
              <label className="text-sm font-medium">
                Promote To Class & Section
              </label>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Destination Class" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="2-a">Class 2 - Section A</SelectItem>
                  <SelectItem value="2-b">Class 2 - Section B</SelectItem>
                  <SelectItem value="3-a">Class 3 - Section A</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card className="border-dashed">
        <CardContent className="py-4">
          <p className="text-muted-foreground text-sm">
            Select Source Class and click <strong>Fetch Students</strong> to
            view students available for promotion.
          </p>
        </CardContent>
      </Card>

      {/* Students List */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Students Eligible for Promotion
          </CardTitle>
          <div className="flex justify-end">
            <Button size="lg">Promote Selected Students</Button>
          </div>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left">
                  <th className="w-12 py-3">
                    <input
                      type="checkbox"
                      className="rounded border-transparent  text-slate-700"
                    />
                  </th>
                  <th className="py-3">Admission No.</th>
                  <th className="py-3">Student Name</th>
                  <th className="py-3">Current Section</th>
                </tr>
              </thead>

              <tbody>
                {currentStudents.map((student) => (
                  <tr key={student.id} className="border-b transition-colors  ">
                    <td className="py-4 ">
                      <input
                        type="checkbox"
                        className="rounded border-transparent  text-slate-700"
                      />
                    </td>

                    <td>{student.admissionNo}</td>

                    <td className="font-medium">{student.name}</td>

                    <td>{student.section}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 0 && (
            <div className="p-6 ">
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
  );
}