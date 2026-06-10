"use client";

import { useState } from "react";
import { IndianRupee, Receipt } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const months = [
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
  "January",
  "February",
  "March",
];
import { Info } from "lucide-react";

export default function CreateMiscellaneous() {
  const [assignmentMode, setAssignmentMode] = useState("");
  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);

  const toggleMonth = (month: string) => {
    setSelectedMonths((prev) =>
      prev.includes(month) ? prev.filter((m) => m !== month) : [...prev, month],
    );
  };

  const handleSubmit = () => {
    console.log({
      assignmentMode,
      selectedMonths,
    });
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Assign Miscellaneous Fee</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            Fee Assignment Details
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Assignment Mode */}
          <div className="space-y-2">
            <Label>
              Assignment Mode <span className="text-destructive">*</span>
            </Label>

            <div className="grid gap-3 md:grid-cols-3">
              {[
                "Individual Student",
                "By Class (Bulk)",
                "All Students (Entire School)",
              ].map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setAssignmentMode(mode)}
                  className={`rounded-lg border p-4 text-left transition-all
                    ${
                      assignmentMode === mode
                        ? "border-indigo-600 bg-indigo-50 dark:bg-slate-50/10"
                        : "hover:bg-muted/40"
                    }
                  `}
                >
                  <p className="font-medium">{mode}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Student Selection */}
          {assignmentMode === "Individual Student" && (
            <div className="space-y-2">
              <Label>
                Select Student <span className="text-destructive">*</span>
              </Label>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Student" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="1">Aarav Sharma</SelectItem>
                  <SelectItem value="2">Priya Singh</SelectItem>
                  <SelectItem value="3">Rahul Verma</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Class Selection */}
          {assignmentMode === "By Class (Bulk)" && (
            <div className="space-y-2">
              <Label>
                Select Class <span className="text-destructive">*</span>
              </Label>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="1-a">Class 1 - A</SelectItem>
                  <SelectItem value="2-a">Class 2 - A</SelectItem>
                  <SelectItem value="3-a">Class 3 - A</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {assignmentMode === "All Students (Entire School)" && (
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
              <div className="flex items-start gap-3">
                <Info className="mt-0.5 h-5 w-5 text-blue-600" />

                <div>
                  <p className="mt-1 text-sm text-blue-900">
                    This fee will be assigned to all students enrolled in the
                    current academic year.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Fee Head + Amount */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label>
                Fee Head <span className="text-destructive">*</span>
              </Label>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Fee Head" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="transport">Transport Fee</SelectItem>

                  <SelectItem value="activity">Activity Fee</SelectItem>

                  <SelectItem value="library">Library Fee</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>
                Monthly Amount (₹) <span className="text-destructive">*</span>
              </Label>

              <div className="relative">
                <IndianRupee className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  type="number"
                  min="0"
                  placeholder="Enter amount"
                  className="pl-9"
                />
              </div>
            </div>
          </div>

          {/* Months */}
          <div className="space-y-3">
            <Label>
              Select Months <span className="text-destructive">*</span>
            </Label>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">
              {months.map((month) => (
                <button
                  key={month}
                  type="button"
                  onClick={() => toggleMonth(month)}
                  className={`rounded-lg border p-3 text-sm font-medium transition-all
                    ${
                      selectedMonths.includes(month)
                        ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                        : "hover:bg-muted/50"
                    }
                  `}
                >
                  {month}
                </button>
              ))}
            </div>

            <p className="text-xs text-muted-foreground">
              Selected: {selectedMonths.length} month(s)
            </p>
          </div>

          {/* Remarks */}
          <div className="space-y-2">
            <Label>Description / Remarks</Label>

            <Textarea rows={4} placeholder="Enter additional notes..." />
          </div>

          {/* Footer */}
          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-start">
            <Button onClick={handleSubmit}>Assign Fee</Button>

            <Link href="/fee/miscellaneous">
              <Button variant="outline">Cancel</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
