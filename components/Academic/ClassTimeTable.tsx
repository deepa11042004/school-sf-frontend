"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Link from "next/link";
import { Filter, NotepadText } from "lucide-react";

export default function ClassTimeTable() {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-[100rem] mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Time Table
            </h1>
          </div>
          <div className="flex gap-3">
            <Link href="/academic/timetable/create">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm">
                <NotepadText className="mr-2 h-4 w-4" />
                Manage TimeTable
              </Button>
            </Link>
          </div>
        </div>

        {/* Filter Section */}
        <Card className="shadow-sm">
          <CardContent className="p-4 sm:p-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label>Class Name</Label>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nc">NC</SelectItem>
                    <SelectItem value="lkg">LKG</SelectItem>
                    <SelectItem value="ukg">UKG</SelectItem>
                    <SelectItem value="1">Class I</SelectItem>
                    <SelectItem value="2">Class II</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Section</Label>
                <Select
                  value={selectedSection}
                  onValueChange={setSelectedSection}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Section" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="a-eng">Sec A (English)</SelectItem>
                    <SelectItem value="b-eng">Sec B (English)</SelectItem>
                    <SelectItem value="a-hin">Sec A (Hindi)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end justify-center space-y-2 ">
                <Button variant="outline" className="w-full">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
