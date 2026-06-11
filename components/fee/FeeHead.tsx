"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
 
} from "@/components/ui/dialog";
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
  Plus,
  Search,
  ChevronLeft,
  ChevronRight,
  FileText,
  Upload,
  Sheet,
} from "lucide-react";

interface FeeHead {
  id: string;
  code: string;
  name: string;
  attributes: string[];
  system: string;
  status: string;
}

const dummyFeeHeads: FeeHead[] = [
  {
    id: "1",
    code: "ADMISSION",
    name: "Admission fee",
    attributes: ["New Students Only"],
    system: "No",
    status: "Active",
  },
  {
    id: "2",
    code: "ANNUAL FEE",
    name: "Annual Fee",
    attributes: ["-"],
    system: "No",
    status: "Inactive",
  },
  {
    id: "3",
    code: "CREDIT",
    name: "Advance Credit",
    attributes: ["-"],
    system: "System",
    status: "Active",
  },
  {
    id: "4",
    code: "EXAM FEE",
    name: "exam fee",
    attributes: ["-"],
    system: "No",
    status: "Inactive",
  },
  {
    id: "5",
    code: "MONTHLY",
    name: "Monthly",
    attributes: ["Discount", "Fine"],
    system: "No",
    status: "Inactive",
  },
  {
    id: "6",
    code: "PAYMENT_DISCOUNT",
    name: "Payment Discount",
    attributes: ["-"],
    system: "System",
    status: "Active",
  },
  {
    id: "7",
    code: "PREV_YEAR_DUE",
    name: "Previous Year Due",
    attributes: ["-"],
    system: "System",
    status: "Active",
  },
  {
    id: "8",
    code: "VBVB",
    name: "vbvb",
    attributes: ["New Students Only"],
    system: "No",
    status: "Active",
  },
];

export default function FeeHead() {
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);
  const [openExportDialog, setOpenExportDialog] = useState(false);

  const filteredFeeHeads = dummyFeeHeads.filter(
    (head) =>
      head.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      head.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      head.attributes.some((attribute) =>
        attribute.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
  );

  const totalPages = Math.ceil(
    filteredFeeHeads.length / parseInt(entriesPerPage),
  );
  const startIndex = (currentPage - 1) * parseInt(entriesPerPage);
  const endIndex = startIndex + parseInt(entriesPerPage);
  const currentFeeHeads = filteredFeeHeads.slice(startIndex, endIndex);

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
              Staff List
            </h1>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setOpenExportDialog(true)}
              className="hover:bg-gray-300 dark:hover:bg-neutral-900 border border-black/20 dark:border-white/20"
            >
              <Upload className="mr-2 h-4 w-4" />
              Export
            </Button>

            <Link href="/fee/fee-heads/create">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Fee Head
              </Button>
            </Link>
          </div>
        </div>

        <Dialog open={openExportDialog} onOpenChange={setOpenExportDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Choose Export Format</DialogTitle>

              <DialogDescription>
                Select the format for exporting student data.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2">
              {/* PDF */}
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-3">
                  <FileText className="h-10 w-10 text-red-500" />

                  <div>
                    <p className="font-medium">PDF Format</p>
                    <p className="text-sm text-muted-foreground">
                      Export as PDF document
                    </p>
                  </div>
                </div>

                <Button
                  onClick={() => {
                    console.log("Generate PDF");

                    setOpenExportDialog(false);
                  }}
                >
                  Select
                </Button>
              </div>

              {/* CSV */}
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-3">
                  <Sheet className="h-10 w-10 text-green-600" />

                  <div>
                    <p className="font-medium">CSV Format</p>
                    <p className="text-sm text-muted-foreground">
                      Export as CSV file
                    </p>
                  </div>
                </div>

                <Button
                  variant="secondary"
                  onClick={() => {
                    console.log("Generate CSV");

                    setOpenExportDialog(false);
                  }}
                >
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
            <div className="p-4 md:p-6 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ">
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
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4  " />
                <Input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 focus-visible:ring-indigo-500"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50/10 hover:bg-slate-50/10">
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                      Code
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                      Name
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                      Attributes
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                      System
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
                  {filteredFeeHeads.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-64 text-center">
                        <div className="flex flex-col items-center justify-center gap-2 text-slate-400">
                          <div className="p-3 rounded-full bg-slate-100">
                            <FileText className="h-8 w-8 text-slate-400" />
                          </div>
                          <p className="text-sm font-medium text-slate-500">
                            No fee heads found.
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    currentFeeHeads.map((head) => (
                      <TableRow
                        key={head.id}
                        className="border-b last:border-b-0 hover:bg-gray-300 dark:hover:bg-neutral-800 transition-colors"
                      >
                        <TableCell className="py-3 font-medium  ">
                          {head.code}
                        </TableCell>
                        <TableCell className="py-3  ">{head.name}</TableCell>
                        <TableCell className="py-3">
                          <div className="flex flex-wrap gap-1">
                            {head.attributes.map((attribute) => (
                              <span
                                key={attribute}
                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
          ${
            attribute === "New Students Only"
              ? "bg-blue-700 text-white"
              : attribute === "Fine"
                ? "bg-red-700 text-white"
                : attribute === "Discount"
                  ? "bg-green-700 text-white"
                  : "bg-muted text-muted-foreground"
          }
        `}
                              >
                                {attribute}
                              </span>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="py-3">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              head.system == "System"
                                ? "bg-purple-100 text-purple-800"
                                : "bg-slate-100 text-slate-800"
                            }`}
                          >
                            {head.system}
                          </span>
                        </TableCell>

                        <TableCell className="py-3">
                          {head.status === "Active" ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-600 text-white">
                              {head.status}
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-600 text-white">
                              {head.status}
                            </span>
                          )}
                        </TableCell>

                        <TableCell className="text-right py-3">
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
