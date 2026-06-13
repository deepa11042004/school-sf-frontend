"use client";

import { useState } from "react";
import { Clock3, Trash2, Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

type Period = {
  subject: string;
  teacher: string;
  from: string;
  to: string;
};

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const createEmptyPeriods = (): Period[] =>
  Array.from({ length: 8 }, () => ({
    subject: "",
    teacher: "",
    from: "",
    to: "",
  }));

export default function TeacherTimeTable() {
  const [selectedTeacher, setSelectedTeacher] = useState("");

  const [showTimetable, setShowTimetable] = useState(false);

  const [schedule, setSchedule] = useState<Record<string, Period[]>>(
    DAYS.reduce(
      (acc, day) => ({
        ...acc,
        [day]: createEmptyPeriods(),
      }),
      {},
    ),
  );

  const updatePeriod = (
    day: string,
    index: number,
    field: keyof Period,
    value: string,
  ) => {
    setSchedule((prev) => {
      const updated = [...prev[day]];

      updated[index] = {
        ...updated[index],
        [field]: value,
      };

      return {
        ...prev,
        [day]: updated,
      };
    });
  };

  const clearPeriod = (day: string, index: number) => {
    setSchedule((prev) => {
      const updated = [...prev[day]];

      updated[index] = {
        subject: "",
        teacher: "",
        from: "",
        to: "",
      };

      return {
        ...prev,
        [day]: updated,
      };
    });
  };

  const handleSubmit = () => {
    console.log(schedule);
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Teacher Time Table
          </h1>
        </div>
        <div className="flex gap-3">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm">
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </div>
      </div>

      {/* Class Selection */}

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2 max-w-xs">
            <Label>
              Select Teacher <span className="text-destructive">*</span>
            </Label>

            <Select value={selectedTeacher} onValueChange={setSelectedTeacher}>
              <SelectTrigger>
                <SelectValue placeholder="Select Teacher" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="ANITA">ANITA</SelectItem>
                <SelectItem value="PUJA">PUJA</SelectItem>
                <SelectItem value="NEHA">NEHA</SelectItem>
                <SelectItem value="PRIYA">PRIYA</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
