"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Search } from "lucide-react";
import { format } from "date-fns";

export default function IssueBook() {
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedBookCopy, setSelectedBookCopy] = useState("");
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
  const [studentSearch, setStudentSearch] = useState("");
  const [bookSearch, setBookSearch] = useState("");

  const students = [
    { value: "student1", label: "John Doe (Class X-A)", rollNo: "101" },
    { value: "student2", label: "Jane Smith (Class IX-B)", rollNo: "102" },
    { value: "student3", label: "Alex Johnson (Class VIII-A)", rollNo: "103" },
    { value: "student4", label: "Emily Brown (Class VII-C)", rollNo: "104" },
    { value: "student5", label: "Michael Davis (Class VI-A)", rollNo: "105" },
  ];

  const bookCopies = [
    {
      value: "copy1",
      label: "The Great Gatsby",
      accession: "100234",
      author: "F. Scott Fitzgerald",
    },
    {
      value: "copy2",
      label: "To Kill a Mockingbird",
      accession: "100567",
      author: "Harper Lee",
    },
    {
      value: "copy3",
      label: "1984",
      accession: "100891",
      author: "George Orwell",
    },
    {
      value: "copy4",
      label: "Pride and Prejudice",
      accession: "101023",
      author: "Jane Austen",
    },
    {
      value: "copy5",
      label: "The Catcher in the Rye",
      accession: "101156",
      author: "J.D. Salinger",
    },
  ];

  const filteredStudents = students.filter(
    (student) =>
      student.label.toLowerCase().includes(studentSearch.toLowerCase()) ||
      student.rollNo.includes(studentSearch),
  );

  const filteredBooks = bookCopies.filter(
    (book) =>
      book.label.toLowerCase().includes(bookSearch.toLowerCase()) ||
      book.accession.includes(bookSearch) ||
      book.author.toLowerCase().includes(bookSearch.toLowerCase()),
  );

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header Section */}
        <div>
           
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Issue Book
          </h1>
        </div>

        {/* Form Card */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Issue Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              {/* Select Student */}
              <div className="space-y-2">
                <Label>
                  Select Student <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={selectedStudent}
                  onValueChange={setSelectedStudent}
                >
                  <SelectTrigger className="w-full focus-visible:ring-indigo-500">
                    <SelectValue placeholder="Select Student" />
                  </SelectTrigger>
                  <SelectContent>
                    <div className="p-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          placeholder="Search student..."
                          value={studentSearch}
                          onChange={(e) => setStudentSearch(e.target.value)}
                          className="pl-10 h-9 focus-visible:ring-indigo-500"
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                      {filteredStudents.length === 0 ? (
                        <div className="py-2 px-3 text-sm text-slate-500">
                          No students found.
                        </div>
                      ) : (
                        filteredStudents.map((student) => (
                          <SelectItem key={student.value} value={student.value}>
                            <div className="flex flex-col">
                              <span className="font-medium">
                                {student.label}
                              </span>
                              <span className="text-xs text-slate-500">
                                Roll No: {student.rollNo}
                              </span>
                            </div>
                          </SelectItem>
                        ))
                      )}
                    </div>
                  </SelectContent>
                </Select>
              </div>

              {/* Select Book Copy */}
              <div className="space-y-2">
                <Label>
                  Select Book Copy <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={selectedBookCopy}
                  onValueChange={setSelectedBookCopy}
                >
                  <SelectTrigger className="w-full focus-visible:ring-indigo-500">
                    <SelectValue placeholder="Select Book Copy" />
                  </SelectTrigger>
                  <SelectContent>
                    <div className="p-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          placeholder="Search by title, author, or accession..."
                          value={bookSearch}
                          onChange={(e) => setBookSearch(e.target.value)}
                          className="pl-10 h-9 focus-visible:ring-indigo-500"
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                      {filteredBooks.length === 0 ? (
                        <div className="py-2 px-3 text-sm text-slate-500">
                          No books found.
                        </div>
                      ) : (
                        filteredBooks.map((book) => (
                          <SelectItem key={book.value} value={book.value}>
                            <div className="flex flex-col">
                              <span className="font-medium">{book.label}</span>
                              <span className="text-xs text-slate-500">
                                {book.author} | Acc: {book.accession}
                              </span>
                            </div>
                          </SelectItem>
                        ))
                      )}
                    </div>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Only AVAILABLE copies are shown.
                </p>
              </div>

              {/* Due Date */}
              <div className="space-y-2">
                <Label>
                  Due Date <span className="text-destructive">*</span>
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal focus-visible:ring-indigo-500"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-slate-500" />
                      {dueDate ? format(dueDate, "MM/dd/yyyy") : "mm/dd/yyyy"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dueDate}
                      onSelect={setDueDate}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Footer Actions */}
              <div className="flex flex-wrap gap-3 justify-start pt-4 border-t">
                <Button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
                >
                  Issue Book
                </Button>

                <Link href="/management/library/circulation">
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
