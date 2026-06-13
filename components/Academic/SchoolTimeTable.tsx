"use client";

import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Upload, Sheet, Printer, FileText } from "lucide-react";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const timetableData = {
  Monday: [
    {
      class: "NC A",
      periods: ["Rhymes", "English", "-", "-", "-", "-", "-", "-"],
    },
    {
      class: "LKG A",
      periods: ["Maths", "English", "Art", "-", "-", "-", "-", "-"],
    },
    {
      class: "UKG A",
      periods: ["Hindi", "Maths", "EVS", "-", "-", "-", "-", "-"],
    },
    {
      class: "I A",
      periods: ["English", "Maths", "Science", "Hindi", "GK", "-", "-", "-"],
    },
    {
      class: "II A",
      periods: ["-", "-", "-", "-", "-", "-", "-", "-"],
    },
    {
      class: "III A",
      periods: ["-", "-", "-", "-", "-", "-", "-", "-"],
    },
    {
      class: "IV A",
      periods: ["-", "-", "-", "-", "-", "-", "-", "-"],
    },
    {
      class: "V A",
      periods: ["-", "-", "-", "-", "-", "-", "-", "-"],
    },
    {
      class: "VI A",
      periods: ["-", "-", "-", "-", "-", "-", "-", "-"],
    },
    {
      class: "VII A",
      periods: ["-", "-", "-", "-", "-", "-", "-", "-"],
    },
    {
      class: "VIII A",
      periods: ["-", "-", "-", "-", "-", "-", "-", "-"],
    },
  ],
};

export default function SchoolTimeTable() {
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [openFormatDialog, setOpenFormatDialog] = useState(false);

  const rows = timetableData[selectedDay as keyof typeof timetableData] || [];

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">School Time Table (Day Wise)</h1>
      </div>

      {/* Day Selection */}
     <Card>
  <CardContent className="pt-6">
    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      {/* Day Selection */}
      <div className="w-full lg:max-w-xs space-y-2">
        <Label>Select Day</Label>

        <Select
          value={selectedDay}
          onValueChange={setSelectedDay}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            {days.map((day) => (
              <SelectItem key={day} value={day}>
                {day}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2 sm:flex-row lg:justify-end">
        <Button
          variant="outline"
          size="sm"
          className="w-full sm:w-auto"
        >
          <Printer className="mr-2 h-4 w-4" />
          Print
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="w-full sm:w-auto"
          onClick={() => setOpenFormatDialog(true)}
        >
          <Upload className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>
    </div>
  </CardContent>
</Card>

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
                  <p className="text-sm text-muted-foreground">
                    Export as PDF document
                  </p>
                </div>
              </div>
              <Button onClick={() => setOpenFormatDialog(false)}>Select</Button>
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
                onClick={() => setOpenFormatDialog(false)}
              >
                Select
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Timetable */}
      <Card>
        <CardHeader>
          <CardTitle>Schedule for {selectedDay}</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1200px] border-collapse">
              <thead>
                <tr className="border-b bg-muted/40">
                  <th className="p-3 text-left font-medium">Class</th>

                  {Array.from({ length: 8 }, (_, i) => (
                    <th key={i} className="p-3 text-center font-medium">
                      Period {i + 1}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {rows.map((row) => (
                  <tr key={row.class} className="border-b">
                    <td className="p-3 font-medium">{row.class}</td>

                    {row.periods.map((subject, index) => (
                      <td key={index} className="p-3 text-center">
                        {subject === "-" ? (
                          <span className="text-muted-foreground">-</span>
                        ) : (
                          <div className="inline-flex rounded-md bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                            {subject}
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
