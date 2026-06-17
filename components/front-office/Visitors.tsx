"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Search,
  Plus,
  Filter,
  ChevronLeft,
  ChevronRight,
  FileText,
  Upload,
  Download,
  HandCoins,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import {
  FileSpreadsheet,
  User,
  Phone,
  Shield,
  GraduationCap,
  Landmark,
  Sheet,
  MoreVertical,
  Eye,
  Pencil,
  KeyRound,
  Ban,
  Trash2,
} from "lucide-react";

import {
  students as dummyStudents,
  Student,
} from "@/components/data/studentData";

const sections = [
  {
    title: "Personal Details",
    icon: User,
    fields: [
      "Full Name",
      "Admission No",
      "Class",
      "Section",
      "Gender",
      "Date of Birth",
      "Blood Group",
      "Religion",
      "Caste",
      "Category",
      "Nationality",
    ],
  },
  {
    title: "Contact & Parents",
    icon: Phone,
    fields: [
      "Primary Contact",
      "Email",
      "Full Address",
      "Father Name",
      "Father Phone",
      "Father Email",
      "Mother Name",
      "Mother Phone",
    ],
  },
  {
    title: "Compliance",
    icon: Shield,
    fields: ["Aadhar Number", "PEN Number"],
  },
  {
    title: "Academic History",
    icon: GraduationCap,
    fields: ["Prev School", "Prev Class", "Year Passed", "Last Exam %"],
  },
  {
    title: "Financial & Bank",
    icon: Landmark,
    fields: [
      "Is RTE",
      "Discount %",
      "Prev Year Due",
      "Bank Name",
      "Account No.",
      "IFSC Code",
      "Bank Branch",
      "Holder Name",
    ],
  },
];
interface StudentActionsProps {
  onView?: (id: string) => void;
  onReportCard?: (id: string) => void;
  onEdit?: (id: string) => void;
  onLoginDetails?: (id: string) => void;
  onDisable?: (id: string) => void;
  onDelete?: (id: string) => void;
}
export default function Students({
  onView,
  onReportCard,
  onEdit,
  onLoginDetails,
  onDisable,
  onDelete,
}: StudentActionsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedRte, setSelectedRte] = useState("all");
  const [selectedDiscount, setSelectedDiscount] = useState("all");
  const [selectedPrevDue, setSelectedPrevDue] = useState("all");
  const [entriesPerPage, setEntriesPerPage] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);
  const [openImportDialog, setOpenImportDialog] = useState(false);
  const [openExportDialog, setOpenExportDialog] = useState(false);
  const [openFormatDialog, setOpenFormatDialog] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [openFilterDialog, setOpenFilterDialog] = useState(false);

  const filteredStudents = dummyStudents.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.admissionNo.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesClass =
      selectedClass === "all" || student.className === selectedClass;

    const matchesRte =
      selectedRte === "all" ||
      student.rteStatus.toLowerCase() === selectedRte.toLowerCase();

    const matchesDiscount =
      selectedDiscount === "all" ||
      student.discount.toLowerCase() === selectedDiscount.toLowerCase();

    const matchesPrevDue =
      selectedPrevDue === "all" ||
      student.prevDue.toLowerCase() === selectedPrevDue.toLowerCase();

    return (
      matchesSearch &&
      matchesClass &&
      matchesRte &&
      matchesDiscount &&
      matchesPrevDue
    );
  });

  const totalPages = Math.ceil(
    filteredStudents.length / parseInt(entriesPerPage),
  );
  const startIndex = (currentPage - 1) * parseInt(entriesPerPage);
  const endIndex = startIndex + parseInt(entriesPerPage);
  const currentStudents = filteredStudents.slice(startIndex, endIndex);

  const handleEntriesPerPageChange = (value: string) => {
    setEntriesPerPage(value);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedClass("all");
    setSelectedRte("all");
    setSelectedDiscount("all");
    setSelectedPrevDue("all");
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

  const hasActiveFilters =
    selectedClass !== "all" ||
    selectedRte !== "all" ||
    selectedDiscount !== "all" ||
    selectedPrevDue !== "all";

  const activeFilterCount = [
    selectedClass,
    selectedRte,
    selectedDiscount,
    selectedPrevDue,
  ].filter((value) => value !== "all").length;

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Students
            </h1>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setOpenImportDialog(true)}
              className=" hover:bg-gray-300 dark:hover:bg-neutral-900  border border-black/20 dark:border-white/20"
            >
              <Download className="mr-2 h-4 w-4" />
              Import
            </Button>

            <Button
              variant="outline"
              onClick={() => setOpenExportDialog(true)}
              className=" hover:bg-gray-300 dark:hover:bg-neutral-900  border border-black/20 dark:border-white/20"
            >
              <Upload className="mr-2 h-4 w-4" />
              Export
            </Button>

            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Student
            </Button>
          </div>
        </div>

        <>
          {/* import and export choice and export format */}

          <Dialog open={openImportDialog} onOpenChange={setOpenImportDialog}>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Import Students</DialogTitle>
                <DialogDescription>
                  Upload a CSV file to bulk import student records.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-2">
                {/* Upload Area */}
                <label
                  htmlFor="csv-upload"
                  className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 p-8 transition hover:border-primary/50 hover:bg-muted/30"
                >
                  <Upload className="mb-3 h-8 w-8 text-muted-foreground" />

                  <p className="font-medium">
                    Click to upload or drag and drop
                  </p>

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

                {/* Selected File */}
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

                {/* Sample CSV */}
                <div className="rounded-lg border bg-muted/30 p-3">
                  <p className="text-sm text-muted-foreground">
                    Make sure your CSV follows the required format.
                  </p>

                  <Button variant="link" className="h-auto ">
                    <a href="/download/student_import_sample.csv" download>
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

                <Button disabled={!file}>Import Students</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={openExportDialog} onOpenChange={setOpenExportDialog}>
            <DialogContent className="sm:max-w-3xl max-h-[85vh] p-0">
              <DialogHeader className="border-b px-6 py-4">
                <DialogTitle className="flex items-center gap-2">
                  <FileSpreadsheet className="h-5 w-5" />
                  Export Students
                </DialogTitle>

                <DialogDescription>
                  Choose the fields you want to include in the export.
                </DialogDescription>
              </DialogHeader>

              <div className="flex items-center justify-between border-b px-6 py-3">
                <p className="text-sm text-muted-foreground">
                  33 fields selected
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
                  defaultValue={[sections[0]?.title]}
                  className="space-y-2"
                >
                  {sections.map((section) => {
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

                <Button
                  onClick={() => {
                    setOpenFormatDialog(true);
                  }}
                >
                  Export
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={openFormatDialog} onOpenChange={setOpenFormatDialog}>
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

                      setOpenFormatDialog(false);
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
        </>

        {/* filter pop up dialog */}
        <Dialog open={openFilterDialog} onOpenChange={setOpenFilterDialog}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Filter Students</DialogTitle>

              <DialogDescription>
                Apply filters to narrow down student records.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-2">
              {/* Class */}
              <div className="space-y-2">
                <Label>Class</Label>

                <Select
                  value={selectedClass}
                  onValueChange={(value) => {
                    setSelectedClass(value);
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Classes" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="all">All Classes</SelectItem>
                    <SelectItem value="Class 1">Class 1</SelectItem>
                    <SelectItem value="Class 2">Class 2</SelectItem>
                    <SelectItem value="Class 3">Class 3</SelectItem>
                    <SelectItem value="Class 4">Class 4</SelectItem>
                    <SelectItem value="Class 5">Class 5</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* RTE */}
              <div className="space-y-2">
                <Label>RTE Status</Label>

                <Select value={selectedRte} onValueChange={setSelectedRte}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Discount */}
              <div className="space-y-2">
                <Label>Discount</Label>

                <Select
                  value={selectedDiscount}
                  onValueChange={setSelectedDiscount}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Previous Due */}
              <div className="space-y-2">
                <Label>Previous Due</Label>

                <Select
                  value={selectedPrevDue}
                  onValueChange={setSelectedPrevDue}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>

              <Button
                onClick={() => {
                  setOpenFilterDialog(false);
                  // Apply API/Table filtering here if needed
                }}
              >
                Apply Filters
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* search + filter  Section */}
        <Card className="shadow-sm">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              {/* Search Input */}
              <div className="relative w-full lg:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Search..."
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
                Showing {filteredStudents.length === 0 ? 0 : startIndex + 1} to{" "}
                {Math.min(endIndex, filteredStudents.length)} of{" "}
                {filteredStudents.length} entries
              </div>
            </div>

            {/* Data Table */}
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
                      Class
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                      Admission No
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">
                      Contact
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider text-center py-3">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentStudents.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-64 text-center">
                        <div className="flex flex-col items-center justify-center gap-2 text-slate-400">
                          <div className="p-3 rounded-full bg-slate-100">
                            <FileText className="h-8 w-8 text-slate-400" />
                          </div>
                          <p className="text-sm font-medium text-slate-500">
                            No students found.
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    currentStudents.map((student) => (
                      <TableRow
                        key={student.id}
                        className="border-b last:border-b-0 hover:bg-gray-300 dark:hover:bg-neutral-800 transition-colors"
                      >
                        <TableCell className="py-3 font-medium">
                          {student.id}
                        </TableCell>

                        <TableCell className="py-3">
                          <div className="flex flex-col">
                            <span className="font-medium  ">
                              {student.name}
                            </span>
                            <span className="text-sm text-slate-500">
                              {student.fatherName}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="py-3">
                          <span className="inline-flex max-w-xl items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 capitalize">
                            {student.className}
                          </span>
                        </TableCell>
                        <TableCell className="py-3">
                          {student.admissionNo}
                        </TableCell>
                        <TableCell className="py-3">
                          {student.contact}
                        </TableCell>
                        <TableCell className="text-right py-3">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              className="hover:bg-zinc-300 dark:hover:bg-white/10"
                              variant="outline"
                              size="sm"
                            >
                              <HandCoins />
                              Collect Fees
                            </Button>

                            <Button
                               className="hover:bg-zinc-300 dark:hover:bg-white/10"
                              variant="outline"
                              size="sm"
                            >
                              <FileText />
                              See Invoices
                            </Button>

                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="h-4 w-4 " />
                                </Button>
                              </DropdownMenuTrigger>

                              <DropdownMenuContent align="end" className="w-52">
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Student
                                </DropdownMenuItem>

                                <DropdownMenuItem>
                                  <FileText className="mr-2 h-4 w-4" />
                                  Report Card
                                </DropdownMenuItem>

                                <DropdownMenuItem>
                                  <Pencil className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>

                                <DropdownMenuItem>
                                  <KeyRound className="mr-2 h-4 w-4" />
                                  Login Details
                                </DropdownMenuItem>

                                <DropdownMenuItem>
                                  <Ban className="mr-2 h-4 w-4" />
                                  Disable
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
