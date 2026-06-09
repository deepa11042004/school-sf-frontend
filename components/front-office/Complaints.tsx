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
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  complaintsDummyData,
  type Complaint,
} from "@/components/data/complaints";
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
import Link from "next/link";

interface ComplaintsProps {
  complaints?: Complaint[];
  onAddComplaint?: () => void;
  onEditComplaint?: (id: string) => void;
}

export default function Complaints({
  complaints = complaintsDummyData,
}: ComplaintsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [entriesPerPage, setEntriesPerPage] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);
  const [openFilterDialog, setOpenFilterDialog] = useState(false);

  const activeFilterCount =
    (selectedType !== "all" ? 1 : 0) + (selectedStatus !== "all" ? 1 : 0);

  const hasActiveFilters = activeFilterCount > 0;

  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch =
      complaint.complainant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.referenceNo.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType =
      selectedType === "all" || complaint.type === selectedType;

    const matchesStatus =
      selectedStatus === "all" || complaint.status === selectedStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  const totalPages = Math.ceil(
    filteredComplaints.length / parseInt(entriesPerPage),
  );
  const startIndex = (currentPage - 1) * parseInt(entriesPerPage);
  const endIndex = startIndex + parseInt(entriesPerPage);
  const currentComplaints = filteredComplaints.slice(startIndex, endIndex);

  const handleTypeChange = (value: string) => {
    setSelectedType(value);
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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedType("all");
    setSelectedStatus("all");
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
              Complaints
            </h1>
          </div>

          <div className="flex gap-3">
            <Link href="/front-office/complaints/create-complaints">
          
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm">
              <Plus className="mr-2 h-4 w-4" />
              New Complaint
            </Button>
              </Link>
          </div>
        </div>

        {/* filter pop up dialog  */}
        <Dialog open={openFilterDialog} onOpenChange={setOpenFilterDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Filter Complaints</DialogTitle>

              <DialogDescription>
                Apply filters to narrow down complaint records.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2">
              {/* Type */}
              <div className="space-y-2">
                <Label>Type</Label>

                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>

                    <SelectItem value="service">Service</SelectItem>

                    <SelectItem value="product">Product</SelectItem>

                    <SelectItem value="facility">Facility</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Status */}
              <div className="space-y-2">
                <Label>Status</Label>

                <Select
                  value={selectedStatus}
                  onValueChange={setSelectedStatus}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>

                    <SelectItem value="pending">Pending</SelectItem>

                    <SelectItem value="in-progress">In Progress</SelectItem>

                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>

              <Button onClick={() => setOpenFilterDialog(false)}>
                Apply Filters
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

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

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setOpenFilterDialog(true)}
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                  {hasActiveFilters && (
                    <span className="ml-2 rounded-full bg-primary text-primary-foreground px-2 py-0.5 text-xs font-medium">
                      {activeFilterCount}
                    </span>
                  )}
                </Button>
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
                Showing {filteredComplaints.length === 0 ? 0 : startIndex + 1}{" "}
                to {Math.min(endIndex, filteredComplaints.length)} of{" "}
                {filteredComplaints.length} entries
              </div>
            </div>

            {/* Data Table */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50/10 hover:bg-slate-50/10">
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                      Reference No
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                      Complainant
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                      Type
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                      Category
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                      Date
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
                  {currentComplaints.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-64 text-center">
                        <div className="flex flex-col items-center justify-center gap-2 text-slate-400">
                          <div className="p-3 rounded-full bg-slate-100">
                            <FileText className="h-8 w-8 text-slate-400" />
                          </div>
                          <p className="text-sm font-medium text-slate-500">
                            No complaints found.
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    currentComplaints.map((complaint) => (
                      <TableRow
                        key={complaint.id}
                        className="border-b last:border-b-0 hover:bg-gray-300 dark:hover:bg-neutral-800 transition-colors"
                      >
                        <TableCell className="py-3 font-medium">
                          {complaint.referenceNo}
                        </TableCell>
                        <TableCell className="py-3">
                          {complaint.complainant}
                        </TableCell>
                        <TableCell className="py-3">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                              complaint.type === "service"
                                ? "bg-indigo-100 text-indigo-800"
                                : complaint.type === "product"
                                  ? "bg-purple-100 text-purple-800"
                                  : "bg-orange-100 text-orange-800"
                            }`}
                          >
                            {complaint.type}
                          </span>
                        </TableCell>
                        <TableCell className="py-3">
                          {complaint.category}
                        </TableCell>
                        <TableCell className="py-3">
                          {format(new Date(complaint.date), "MMM dd, yyyy")}
                        </TableCell>
                        <TableCell className="py-3">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                              complaint.status === "resolved"
                                ? "bg-green-100 text-green-800"
                                : complaint.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {complaint.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right py-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="border border-black/20 dark:border-white/20"
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
