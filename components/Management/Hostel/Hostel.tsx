"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  Plus,
  Search,
  FileText,
  ChevronLeft,
  ChevronRight,
  FileChartColumnIncreasing,
  UserPlus,
  Pencil,
  Trash2,
  MoreVertical,
  Bed,
  Upload,
  Sheet
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
 
interface Hostel {
  id: string;
  name: string;
  type: string;
  warden: string;
  status: string;
  report: string;
}

export default function Hostel() {
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);
    
 const [openFormatDialog, setOpenFormatDialog] = useState(false);
  const dummyHostels: Hostel[] = [
    {
      id: "1",
      name: "B (01)",
      type: "Boys",
      warden: "-",
      status: "Active",
      report: "Available",
    },
  ];

  const filteredHostels = dummyHostels.filter(
    (hostel) =>
      hostel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hostel.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hostel.warden.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil(
    filteredHostels.length / parseInt(entriesPerPage),
  );
  const startIndex = (currentPage - 1) * parseInt(entriesPerPage);
  const endIndex = startIndex + parseInt(entriesPerPage);
  const currentHostels = filteredHostels.slice(startIndex, endIndex);

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
              Hostels
            </h1>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setOpenFormatDialog(true)}
              className="hover:bg-gray-300 dark:hover:bg-neutral-900 border border-black/20 dark:border-white/20"
            >
              <Upload className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Link href="/management/hostels/create">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Hostel
            </Button>
            </Link>
          </div>
        </div>

        {/* Export Dialog */}
        <Dialog open={openFormatDialog} onOpenChange={setOpenFormatDialog}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Choose Export Format</DialogTitle>
                  <DialogDescription>
                    Select the format for exporting student fee data.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-2">
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-3">
                      <FileText className="h-10 w-10 text-red-500" />
                      <div>
                        <p className="font-medium">PDF Format</p>
                        <p className="text-sm text-muted-foreground">Export as PDF document</p>
                      </div>
                    </div>
                    <Button onClick={() => setOpenFormatDialog(false)}>Select</Button>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-3">
                      <Sheet className="h-10 w-10 text-green-600" />
                      <div>
                        <p className="font-medium">CSV Format</p>
                        <p className="text-sm text-muted-foreground">Export as CSV file</p>
                      </div>
                    </div>
                    <Button variant="secondary" onClick={() => setOpenFormatDialog(false)}>
                      Select
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

        {/* Table Section */}
        <Card className="shadow-sm">
          <CardContent className="p-0">
            {/* Table Controls */}
            <div className="p-4 md:p-6 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4  ">
              <div className="flex items-center gap-2 text-sm">
                <span>Row Per Page</span>
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
                <span>Entries</span>
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

            {/* Data Table */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50/10 hover:bg-slate-50/10">
                    <TableHead className="text-xs font-semibold uppercase tracking-wider py-3">
                      Name
                    </TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider py-3">
                      Type
                    </TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider py-3">
                      Warden
                    </TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider py-3">
                      Status
                    </TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider py-3">
                      Report
                    </TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-right py-3">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentHostels.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-64 text-center">
                        <div className="flex flex-col items-center justify-center gap-2 text-slate-400">
                          <div className="p-3 rounded-full bg-slate-100">
                            <FileText className="h-8 w-8 text-slate-400" />
                          </div>
                          <p className="text-sm font-medium text-slate-500">
                            No hostels found.
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    currentHostels.map((hostel) => (
                      <TableRow
                        key={hostel.id}
                        className="border-b last:border-b-0 hover:bg-gray-300 dark:hover:bg-neutral-800 transition-colors"
                      >
                        <TableCell className="py-3 font-medium">
                          {hostel.name}
                        </TableCell>
                        <TableCell className="py-3">{hostel.type}</TableCell>
                        <TableCell className="py-3">{hostel.warden}</TableCell>
                        <TableCell className="py-3">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-700 text-white">
                            {hostel.status}
                          </span>
                        </TableCell>

                        <TableCell className="py-3">
                          {hostel.report === "Available" ? (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="border border-blue-600 dark:border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                            >
                              <FileChartColumnIncreasing className="h-4 w-4" />
                              Report
                            </Button>
                          ) : (
                            <span className="text-slate-400">-</span>
                          )}
                        </TableCell>

                        <TableCell className="text-right py-3">
                          <div className="flex items-center justify-end gap-2 z-100">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="h-4 w-4 " />
                                </Button>
                              </DropdownMenuTrigger>

                              <DropdownMenuContent align="end" className="w-52">
                                <DropdownMenuItem>
                                  <Bed className="mr-2 h-4 w-4" />
                                  Assign Bed
                                </DropdownMenuItem>

                                <DropdownMenuItem>
                                  <UserPlus className="mr-2 h-4 w-4" />
                                  Manage Room
                                </DropdownMenuItem>

                                <DropdownMenuItem>
                                  <Pencil className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>

                                <DropdownMenuSeparator />

                                <DropdownMenuItem className="text-red-600 focus:text-red-600">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
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
