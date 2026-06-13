 
"use client";

import { useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { CalendarIcon, FileQuestion } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CreateExams() {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const questions: any[] = [];

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Create Exam</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Exam Information</CardTitle>
        </CardHeader>

        <CardContent>
          <form className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label>
                Title <span className="text-destructive">*</span>
              </Label>

              <Input placeholder="Enter exam title" />
            </div>

            {/* Class & Subject */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label>
                  Class <span className="text-destructive">*</span>
                </Label>

                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Class" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="1">Class 1</SelectItem>
                    <SelectItem value="2">Class 2</SelectItem>
                    <SelectItem value="3">Class 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>
                  Subject <span className="text-destructive">*</span>
                </Label>

                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Subject" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="maths">Maths</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Start & End */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Start */}
              <div className="space-y-2">
                <Label>
                  Start Time{" "}
                  <span className="text-destructive">*</span>
                </Label>

                <div className="flex gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="flex-1 justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />

                        {startDate
                          ? format(startDate, "PPP")
                          : "Select date"}
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                       
                      />
                    </PopoverContent>
                  </Popover>

                  <Input type="time" className="w-40" />
                </div>
              </div>

              {/* End */}
              <div className="space-y-2">
                <Label>
                  End Time{" "}
                  <span className="text-destructive">*</span>
                </Label>

                <div className="flex gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="flex-1 justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />

                        {endDate
                          ? format(endDate, "PPP")
                          : "Select date"}
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                      />
                    </PopoverContent>
                  </Popover>

                  <Input type="time" className="w-40" />
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label>Description</Label>

              <Textarea
                rows={4}
                placeholder="Enter exam instructions or details..."
              />
            </div>

            {/* Questions */}
            <div className="space-y-4">
              <Label>Select Questions</Label>

              <div className="overflow-hidden rounded-lg border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="p-3 text-left">Select</th>
                      <th className="p-3 text-left">Question</th>
                      <th className="p-3 text-left">Type</th>
                      <th className="p-3 text-left">Marks</th>
                    </tr>
                  </thead>

                  <tbody>
                    {questions.length === 0 ? (
                      <tr>
                        <td
                          colSpan={4}
                          className="py-12 text-center"
                        >
                          <div className="flex flex-col items-center gap-3">
                            <FileQuestion className="h-10 w-10 text-muted-foreground" />

                            <p className="text-muted-foreground">
                              No questions found.
                            </p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      questions.map((question) => (
                        <tr key={question.id}>
                          {/* question row */}
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button type="submit">
                Create Exam
              </Button>

              <Link href="/online-exam/teacher/exams">
                <Button variant="outline">
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}