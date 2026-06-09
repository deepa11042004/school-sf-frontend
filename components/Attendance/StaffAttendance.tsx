"use client";

import { useState } from "react";
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
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Save,
} from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface StaffAttendance {
  id: string;
  name: string;
  designation: string;  
  status: string;
  note: string;
}

const staff: StaffAttendance[] = [
  {
    id: "1",
    name: "AADESH KUMAR YADAV",
    designation:"-",
    status: "Present",
    note: "",
  },
  { id: "2", name: "AAYUSH SAKLANI",  designation:"-",status: "Present", note: "" },
  {
    id: "3",
    name: "ABHISHEK SHARMA",
     designation:"-",

    status: "Absent",
    note: "",
  },
  { id: "4", name: "ADITYA VERMA", designation:"-",  status: "Late", note: "" },
  { id: "5", name: "AKASH GUPTA",  designation:"-", status: "Present", note: "" },
  { id: "6", name: "AKASH GUPTA",  designation:"-", status: "Present", note: "" },
  { id: "7", name: "AKASH GUPTA",  designation:"-", status: "Present", note: "" },
  { id: "8", name: "AKASH GUPTA",  designation:"-", status: "Present", note: "" },
  { id: "9", name: "AKASH GUPTA",  designation:"-", status: "Present", note: "" },
  { id: "10", name: "AKASH GUPTA",  designation:"-", status: "Present", note: "" },
  { id: "11", name: "AKASH GUPTA",  designation:"-", status: "Present", note: "" },
  { id: "12", name: "AKASH GUPTA",  designation:"-", status: "Present", note: "" },
  { id: "13", name: "AKASH GUPTA",  designation:"-", status: "Present", note: "" },
  { id: "14", name: "AKASH GUPTA",  designation:"-", status: "Present", note: "" },
  { id: "15", name: "AKASH GUPTA",  designation:"-", status: "Present", note: "" },
   
];

export default function StaffAttendance() {
  
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );
  const [students, setStudents] = useState(staff);
  const [entriesPerPage, setEntriesPerPage] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);

  const handleStatusChange = (studentId: string, newStatus: string) => {
    setStudents(
      students.map((staff) =>
        staff.id === studentId ? { ...staff, status: newStatus } : staff,
      ),
    );
  };

  const handleNoteChange = (studentId: string, note: string) => {
    setStudents(
      students.map((staff) =>
        staff.id === studentId ? { ...staff, note } : staff,
      ),
    );
  };

  const handleMarkAll = (status: string) => {
    setStudents(students.map((staff) => ({ ...staff, status })));
  };

  const getStatusButtonClass = (status: string, currentStatus: string) => {
    const baseClass =
      "px-3 py-1.5 text-xs font-medium rounded-md border transition-colors";

    if (status === currentStatus) {
      if (status === "Present")
        return `${baseClass} bg-indigo-600 text-white border-indigo-600`;

      if (status === "Absent")
        return `${baseClass} bg-red-600 text-white border-red-600`;

      if (status === "Late")
        return `${baseClass} bg-yellow-500 text-white border-yellow-500`;

      if (status === "Half day")
        return `${baseClass} bg-cyan-600 text-white border-cyan-600`;

      if (status === "Holiday")
        return `${baseClass} bg-cyan-600 text-white border-cyan-600`;

      if (status === "Leave")
        return `${baseClass} bg-cyan-600 text-white border-cyan-600`;
    }

    if (status === "Present")
      return `${baseClass} bg-indigo-600/10 text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-white`;

    if (status === "Absent")
      return `${baseClass} bg-red-600/10 text-red-600 border-red-600 hover:bg-red-600 hover:text-white`;

    if (status === "Late")
      return `${baseClass} bg-yellow-600/10 text-yellow-600 border-yellow-600 hover:bg-yellow-600 hover:text-white`;

    return `${baseClass} bg-cyan-600/10 text-cyan-600 border-cyan-600 hover:bg-cyan-600 hover:text-white`;
  };

  const totalPages = Math.ceil(students.length / parseInt(entriesPerPage));
  const startIndex = (currentPage - 1) * parseInt(entriesPerPage);
  const endIndex = startIndex + parseInt(entriesPerPage);
  const currentStudents = students.slice(startIndex, endIndex);

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
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Staff Attendance
            </h1>
          </div>
          <div className="flex gap-3">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm px-6">
              <Save className="mr-2 h-4 w-4" />
              Save Attendance
            </Button>
          </div>
        </div>

        {/* Filter Section */}
        <Card className="shadow-sm">
          <CardContent className="p-4 sm:p-6">
            <div className="flex justify-between items-center">
              <div className="space-y-2">
                <Label>Date *</Label>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
                      {selectedDate ? (
                        format(selectedDate, "dd/MM/yyyy")
                      ) : (
                        <span>Select date</span>
                      )}
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <Button className="w-full md:w-auto md:min-w-[120px] self-end bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm">
                <Search className="mr-2 h-4 w-4" />
                Fetch
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Student List */}
        <Card className="shadow-sm">
          <CardContent className="p-0">
            {/* Table Controls */}
            <div className="p-4 md:p-6  flex flex-col gap-4 border-b border-slate-100">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <h2 className="text-lg font-semibold">Student List</h2>

                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-medium">Mark All As:</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleMarkAll("Present")}
                    className="border-indigo-600 text-indigo-600  "
                  >
                    Present
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleMarkAll("Absent")}
                    className="border-red-500 text-red-600"
                  >
                    Absent
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleMarkAll("Late")}
                    className="border-yellow-500 text-yellow-600"
                  >
                    Late
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleMarkAll("Holiday")}
                    className="border-cyan-500 text-cyan-600"
                  >
                    Holiday
                  </Button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
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
                  Showing {students.length === 0 ? 0 : startIndex + 1} to{" "}
                  {Math.min(endIndex, students.length)} of {students.length}{" "}
                  entries
                </div>
              </div>
            </div>

            {/* Data Table */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50/10 hover:bg-slate-50/10">
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                      #
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                     Staff Name
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                      Designation
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                      Status
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                     Remark
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentStudents.map((staff, index) => (
                    <TableRow
                      key={staff.id}
                      className="border-b last:border-b-0 hover:bg-gray-300 dark:hover:bg-neutral-800 transition-colors"
                    >
                      <TableCell className="py-3 font-medium">
                        {startIndex + index + 1}
                      </TableCell>
                      <TableCell className="py-3 font-medium">
                        {staff.name}
                      </TableCell>
                       <TableCell className="py-3 font-medium">
                        {staff.designation}
                      </TableCell>
                      <TableCell className="py-3 max-w-sm">
                        <div className="flex flex-wrap gap-1">
                          {[
                            "Present",
                            "Absent",
                            "Late",
                            "Half day",
                            "Holiday",
                            "Leave",
                          ].map((status) => (
                            <button
                              key={status}
                              onClick={() =>
                                handleStatusChange(staff.id, status)
                              }
                              className={getStatusButtonClass(
                                status,
                                staff.status,
                              )}
                            >
                              {status}
                            </button>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="py-3">
                        <Input
                          type="text"
                          placeholder="Reason (Optional)"
                          value={staff.note}
                          onChange={(e) =>
                            handleNoteChange(staff.id, e.target.value)
                          }
                          className="w-full max-w-xs focus-visible:ring-indigo-500"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
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
