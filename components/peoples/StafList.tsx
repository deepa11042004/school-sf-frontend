"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
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
  Plus,
  Filter,
  ChevronLeft,
  ChevronRight,
  FileText,
  Upload,
  Download,
  Sheet,
  FileSpreadsheet,
  User,
  Phone,
  Briefcase,
  MoreVertical,
  Eye,
  Pencil,
  Trash2,
  Shield,
  UserX,
  UserCog,
  KeyRound,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const staffSections = [
  {
    title: "Personal Details",
    icon: User,
    fields: ["Full Name", "Date of Birth", "Gender", "Nationality"],
  },
  {
    title: "Contact Information",
    icon: Phone,
    fields: [
      "Phone Number",
      "Email Address",
      "Full Address",
      "Emergency Contact",
    ],
  },
  {
    title: "Employment Details",
    icon: Briefcase,
    fields: ["Staff Type", "Roles", "Joining Date", "Department", "Salary"],
  },
];

import { dummyStaff, type Staff } from "@/components/data/staflist";

export default function StaffList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [entriesPerPage, setEntriesPerPage] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);

  const [openImportDialog, setOpenImportDialog] = useState(false);
  const [openExportDialog, setOpenExportDialog] = useState(false);
  const [openFormatDialog, setOpenFormatDialog] = useState(false);
  const [openFilterDialog, setOpenFilterDialog] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const activeFilterCount =
    (selectedType !== "all" ? 1 : 0) + (selectedStatus !== "all" ? 1 : 0);

  const hasActiveFilters = activeFilterCount > 0;

  const filteredStaff = dummyStaff.filter((staff) => {
    const matchesSearch =
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType =
      selectedType === "all" ||
      staff.type.toLowerCase() === selectedType.toLowerCase();

    const matchesStatus =
      selectedStatus === "all" ||
      staff.status.toLowerCase() === selectedStatus.toLowerCase();

    return matchesSearch && matchesType && matchesStatus;
  });

  const totalPages = Math.ceil(filteredStaff.length / parseInt(entriesPerPage));
  const startIndex = (currentPage - 1) * parseInt(entriesPerPage);
  const endIndex = startIndex + parseInt(entriesPerPage);
  const currentStaff = filteredStaff.slice(startIndex, endIndex);

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
              Staff List
            </h1>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setOpenImportDialog(true)}
              className="hover:bg-gray-300 dark:hover:bg-neutral-900 border border-black/20 dark:border-white/20"
            >
              <Download className="mr-2 h-4 w-4" />
              Import
            </Button>
            <Button
              variant="outline"
              onClick={() => setOpenExportDialog(true)}
              className="hover:bg-gray-300 dark:hover:bg-neutral-900 border border-black/20 dark:border-white/20"
            >
              <Upload className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Staff
            </Button>
          </div>
        </div>

        {/* Import Dialog */}
        <Dialog open={openImportDialog} onOpenChange={setOpenImportDialog}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Import Staff</DialogTitle>
              <DialogDescription>
                Upload a CSV file to bulk import staff records.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2">
              <label
                htmlFor="csv-upload"
                className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 p-8 transition hover:border-primary/50 hover:bg-muted/30"
              >
                <Upload className="mb-3 h-8 w-8 text-muted-foreground" />
                <p className="font-medium">Click to upload or drag and drop</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  CSV files only
                </p>
                <input
                  id="csv-upload"
                  type="file"
                  accept=".csv"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
              </label>

              {file && (
                <div className="flex items-center gap-3 rounded-lg border bg-muted/40 p-3">
                  <FileText className="h-5 w-5 text-primary" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
              )}

              <div className="rounded-lg border bg-muted/30 p-3">
                <p className="text-sm text-muted-foreground">
                  Make sure your CSV follows the required format.
                </p>
                <Button variant="link" className="h-auto">
                  <a href="/download/staff_sample.csv" download>
                    Download Sample CSV
                  </a>
                </Button>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setOpenImportDialog(false)}
              >
                Cancel
              </Button>
              <Button disabled={!file}>Import Staff</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Export Dialog */}
        <Dialog open={openExportDialog} onOpenChange={setOpenExportDialog}>
          <DialogContent className="sm:max-w-3xl max-h-[85vh] p-0">
            <DialogHeader className="border-b px-6 py-4">
              <DialogTitle className="flex items-center gap-2">
                <FileSpreadsheet className="h-5 w-5" />
                Export Staff
              </DialogTitle>
              <DialogDescription>
                Choose the fields you want to include in the export.
              </DialogDescription>
            </DialogHeader>

            <div className="flex items-center justify-between border-b px-6 py-3">
              <p className="text-sm text-muted-foreground">
                13 fields selected
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Select All
                </Button>
                <Button variant="ghost" size="sm">
                  Clear All
                </Button>
              </div>
            </div>

            <div className="max-h-[55vh] overflow-y-auto px-6 py-4">
              <Accordion
                type="multiple"
                defaultValue={[staffSections[0]?.title]}
                className="space-y-2"
              >
                {staffSections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <AccordionItem
                      key={section.title}
                      value={section.title}
                      className="border rounded-lg px-4"
                    >
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4" />
                          <span>{section.title}</span>
                          <span className="text-xs text-muted-foreground">
                            ({section.fields.length})
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid md:grid-cols-3 gap-3 pt-2">
                          {section.fields.map((field) => (
                            <label
                              key={field}
                              className="flex items-center gap-2 rounded-md p-2 hover:bg-muted cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                defaultChecked
                                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                              />
                              <span className="text-sm">{field}</span>
                            </label>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </div>

            <DialogFooter className="border-t px-6 py-4">
              <Button
                variant="outline"
                onClick={() => setOpenExportDialog(false)}
              >
                Cancel
              </Button>
              <Button onClick={() => setOpenFormatDialog(true)}>Export</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Format Dialog */}
        <Dialog open={openFormatDialog} onOpenChange={setOpenFormatDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Choose Export Format</DialogTitle>
              <DialogDescription>
                Select the format for exporting staff data.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2">
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
                    setOpenFormatDialog(false);
                    setOpenExportDialog(false);
                  }}
                >
                  Select
                </Button>
              </div>

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
                    setOpenFormatDialog(false);
                    setOpenExportDialog(false);
                  }}
                >
                  Select
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Filter Dialog */}
        <Dialog open={openFilterDialog} onOpenChange={setOpenFilterDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Filter Staff</DialogTitle>
              <DialogDescription>
                Apply filters to narrow down staff records.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label>Staff Type</Label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="teaching">Teaching</SelectItem>
                    <SelectItem value="administrative">
                      Administrative
                    </SelectItem>
                    <SelectItem value="support">Support</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                  value={selectedStatus}
                  onValueChange={setSelectedStatus}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="on leave">On Leave</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
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

        {/* Search + Filter Bar */}
        <Card className="shadow-sm">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <div className="relative w-full lg:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Search by Name, ID or Email..."
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
            <div className="p-4 md:p-6   flex flex-col sm:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm">
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
                Showing {filteredStaff.length === 0 ? 0 : startIndex + 1} to{" "}
                {Math.min(endIndex, filteredStaff.length)} of{" "}
                {filteredStaff.length} entries
              </div>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50/10 hover:bg-slate-50/10">
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                      ID
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                      Name
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                      Type
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                      Roles
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                      Phone
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                      Email
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                      Status
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                      Joining Date
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider text-center py-3">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentStaff.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} className="h-64 text-center">
                        <div className="flex flex-col items-center justify-center gap-2 text-slate-400">
                          <div className="p-3 rounded-full bg-slate-100">
                            <FileText className="h-8 w-8 text-slate-400" />
                          </div>
                          <p className="text-sm font-medium text-slate-500">
                            No staff found.
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    currentStaff.map((staff) => (
                      <TableRow
                        key={staff.id}
                        className="border-b last:border-b-0 hover:bg-gray-300 dark:hover:bg-neutral-800 transition-colors"
                      >
                        <TableCell className="py-3 font-medium">
                          {staff.id}
                        </TableCell>
                        <TableCell className="py-3 font-medium">
                          {staff.name}
                        </TableCell>
                        <TableCell className="py-3">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 capitalize">
                            {staff.type}
                          </span>
                        </TableCell>
                        <TableCell className="py-3 text-slate-600">
                          {staff.roles}
                        </TableCell>
                        <TableCell className="py-3 text-slate-600">
                          {staff.phone}
                        </TableCell>
                        <TableCell className="py-3 text-slate-600 max-w-[100px] truncate">
                          {staff.email}
                        </TableCell>
                        <TableCell className="py-3">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 capitalize">
                            {staff.status}
                          </span>
                        </TableCell>
                        <TableCell className="py-3 text-slate-600">
                          {staff.joiningDate
                            ? format(
                                new Date(staff.joiningDate),
                                "MMM dd, yyyy",
                              )
                            : "-"}
                        </TableCell>
                        <TableCell className="text-center py-3">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View Staff
                              </DropdownMenuItem>

                              <DropdownMenuItem>
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>

                              <DropdownMenuItem>
                                <UserX className="mr-2 h-4 w-4" />
                                Disable Login
                              </DropdownMenuItem>

                              <DropdownMenuItem>
                                <Shield className="mr-2 h-4 w-4" />
                                Login Details
                              </DropdownMenuItem>

                              <DropdownMenuItem>
                                <KeyRound className="mr-2 h-4 w-4" />
                                Reset Password
                              </DropdownMenuItem>

                              <DropdownMenuItem>
                                <UserCog className="mr-2 h-4 w-4" />
                                Assign Roles
                              </DropdownMenuItem>

                              <DropdownMenuSeparator />

                              <DropdownMenuItem className="text-red-600 focus:text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
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
