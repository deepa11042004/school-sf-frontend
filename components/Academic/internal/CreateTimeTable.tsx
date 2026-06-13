"use client";

import { useState } from "react";
import { Clock3, Trash2, CalendarRange } from "lucide-react";
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

export default function CreateTimeTable() {
  const [className, setClassName] = useState("");
  const [section, setSection] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [showTimetable, setShowTimetable] = useState(false);

  const handleLoadTimetable = () => {
    if (!selectedClass || !selectedSection) return;

    setShowTimetable(true);
  };

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
            Manage Time Table
          </h1>
          <p className="text-sm text-muted-foreground">
            Create and manage class schedules.
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={handleLoadTimetable}
            disabled={!selectedClass || !selectedSection}
            className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
          >
            <CalendarRange className="mr-2 h-4 w-4" />
            Load TimeTable
          </Button>
        </div>
      </div>

      {/* Class Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Manage Time Table</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Class */}
            <div className="space-y-2">
              <Label>
                Class <span className="text-destructive">*</span>
              </Label>

              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="NC">NC</SelectItem>
                  <SelectItem value="LKG">LKG</SelectItem>
                  <SelectItem value="UKG">UKG</SelectItem>
                  <SelectItem value="I">Class I</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Section */}
            <div className="space-y-2">
              <Label>
                Section <span className="text-destructive">*</span>
              </Label>

              <Select
                value={selectedSection}
                onValueChange={setSelectedSection}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Section" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="A">Sec A (English)</SelectItem>

                  <SelectItem value="B">Sec B (English)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {showTimetable && (
        <>
          {/* Class Info */}
          <Card>
            <CardContent className="p-4">
              <div className="rounded-lg text-xl flex justify-between items-center border bg-muted/30 p-4">
                <h3 className="font-semibold">
                  Class: {selectedClass} | Section: {selectedSection}
                </h3>

                <h3 className="font-semibold">Class Teacher: PUJA</h3>
              </div>
            </CardContent>
          </Card>

          {/* Timetable */}
          <Tabs defaultValue="Monday">
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-6">
              {DAYS.map((day) => (
                <TabsTrigger key={day} value={day}>
                  {day}
                </TabsTrigger>
              ))}
            </TabsList>

            {DAYS.map((day) => (
              <TabsContent key={day} value={day} className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{day} Schedule</CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {schedule[day].map((period, index) => (
                      <Card key={index} className="border-dashed">
                        <CardContent className="pt-6">
                          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-2">
                              <Clock3 className="h-4 w-4" />

                              <h4 className="font-medium">
                                Period {index + 1}
                              </h4>
                            </div>

                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              onClick={() => clearPeriod(day, index)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Clear
                            </Button>
                          </div>

                          <div className="grid gap-4 lg:grid-cols-4">
                            {/* Subject */}
                            <div className="space-y-2">
                              <Label>Subject</Label>

                              <Select
                                value={period.subject}
                                onValueChange={(value) =>
                                  updatePeriod(day, index, "subject", value)
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>

                                <SelectContent>
                                  <SelectItem value="English">
                                    English
                                  </SelectItem>

                                  <SelectItem value="Maths">Maths</SelectItem>

                                  <SelectItem value="Science">
                                    Science
                                  </SelectItem>

                                  <SelectItem value="Computer">
                                    Computer
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            {/* Teacher */}
                            <div className="space-y-2">
                              <Label>Teacher</Label>

                              <Select
                                value={period.teacher}
                                onValueChange={(value) =>
                                  updatePeriod(day, index, "teacher", value)
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>

                                <SelectContent>
                                  <SelectItem value="PUJA">PUJA</SelectItem>

                                  <SelectItem value="PRIYA">PRIYA</SelectItem>

                                  <SelectItem value="ANITA">ANITA</SelectItem>

                                  <SelectItem value="NEHA">NEHA</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            {/* From */}
                            <div className="space-y-2">
                              <Label>From</Label>

                              <Input
                                type="time"
                                value={period.from}
                                onChange={(e) =>
                                  updatePeriod(
                                    day,
                                    index,
                                    "from",
                                    e.target.value,
                                  )
                                }
                              />
                            </div>

                            {/* To */}
                            <div className="space-y-2">
                              <Label>To</Label>

                              <Input
                                type="time"
                                value={period.to}
                                onChange={(e) =>
                                  updatePeriod(day, index, "to", e.target.value)
                                }
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                    {/* Actions */}
                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-start">
                      <Button onClick={handleSubmit}>Save Timetable</Button>

                      <Link href="/academic/timetable">
                        <Button type="button" variant="outline">
                          Cancel
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </>
      )}
    </div>
  );
}
