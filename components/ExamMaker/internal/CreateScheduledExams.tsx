"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import { TriangleAlert, Info } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export default function CreateScheduledExams() {
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [selectedPattern, setSelectedPattern] = useState<string>("");

  const classes = [
    "NC A",
    "LKG A",
    "UKG A",
    "I A",
    "II A",
    "III A",
    "IV A",
    "V A",
    "VI A",
    "VII A",
    "VIII A",
  ];

  const toggleClass = (className: string) => {
    setSelectedClasses((prev) =>
      prev.includes(className)
        ? prev.filter((c) => c !== className)
        : [...prev, className],
    );
  };

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header Section */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Schedule New Exam
          </h1>
        </div>

        {/* Form Card */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Exam Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              {/* Select Classes */}
              <div className="space-y-3">
                <Label>
                  Select Classes <span className="text-destructive">*</span>
                </Label>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {classes.map((cls) => {
                    const isChecked = selectedClasses.includes(cls);
                    return (
                      <button
                        key={cls}
                        type="button"
                        onClick={() => toggleClass(cls)}
                        className={cn(
                          "flex items-center gap-3 rounded-lg border p-3 text-left transition-all",
                        )}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          readOnly
                          className="h-4 w-4"
                        />
                        <span className="font-medium">{cls}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Exam Pattern */}
              <div className="space-y-3">
                <Label>
                  Exam Pattern <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={selectedPattern}
                  onValueChange={setSelectedPattern}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Pattern" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mid-term">Mid-Term Pattern</SelectItem>
                    <SelectItem value="final-term">
                      Final-Term Pattern
                    </SelectItem>
                    <SelectItem value="unit-test">Unit Test Pattern</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Warning Notice */}
              <Alert className="border-yellow-300 bg-yellow-50 dark:border-yellow-900 dark:bg-yellow-950/30">
                <TriangleAlert className="h-4 w-4 text-yellow-600" />
                <AlertTitle className="text-yellow-900 dark:text-yellow-100">
                  Warning
                </AlertTitle>
                <AlertDescription className="text-yellow-800 dark:text-yellow-200">
                  Subjects and marks will be automatically generated based on
                  the classes you select.
                </AlertDescription>
              </Alert>

              {/* Information Notice */}
              <Alert className="border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/30">
                <Info className="h-4 w-4 text-blue-600" />
                <AlertTitle className="text-blue-900 dark:text-blue-100">
                  Automatic Exam Scheduling
                </AlertTitle>
                <AlertDescription className="text-blue-800 dark:text-blue-200">
                  This will automatically schedule all exams defined in the
                  selected pattern for every class you choose. Subjects and
                  marks will be automatically generated based on the classes you
                  select.
                </AlertDescription>
              </Alert>

              {/* Footer Actions */}
              <div className="flex flex-wrap gap-3 justify-end pt-4 border-t">
                <Button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
                >
                  Schedule Exam
                </Button>

                <Link href="/exam-maker/exams">
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
