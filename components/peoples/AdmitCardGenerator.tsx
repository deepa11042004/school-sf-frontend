"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Alert, AlertTitle, AlertDescription } from "../ui/alert";
import { Info, Ticket } from "lucide-react";
import Link from "next/link";

export default function AdmitCardGenerator() {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedExam, setSelectedExam] = useState("");

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header Section */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Admit Card Generator
          </h1>
        </div>

        {/* Form Card */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Select Details to Generate Admit Cards</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Class & Section */}
                <div className="space-y-2">
                  <Label>
                    Class & Section <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={selectedClass}
                    onValueChange={(value) => {
                      setSelectedClass(value);
                      setSelectedExam(""); // Reset exam when class changes
                    }}
                  >
                    <SelectTrigger className="focus-visible:ring-indigo-500">
                      <SelectValue placeholder="Select Class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="I-A">I - A</SelectItem>
                      <SelectItem value="I-B">I - B</SelectItem>
                      <SelectItem value="II-A">II - A</SelectItem>
                      <SelectItem value="II-B">II - B</SelectItem>
                      <SelectItem value="III-A">III - A</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Select Exam */}
                <div className="space-y-2">
                  <Label>
                    Select Exam <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={selectedExam}
                    onValueChange={setSelectedExam}
                    disabled={!selectedClass}
                  >
                    <SelectTrigger className="focus-visible:ring-indigo-500">
                      <SelectValue
                        placeholder={
                          !selectedClass ? "Select Class First" : "Select Exam"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mid-term">
                        Mid-Term Examination
                      </SelectItem>
                      <SelectItem value="final-term">
                        Final-Term Examination
                      </SelectItem>
                      <SelectItem value="unit-test-1">Unit Test 1</SelectItem>
                      <SelectItem value="unit-test-2">Unit Test 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {/* Information Notice */}
              <Alert className="border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/30">
                <Info className="h-4 w-4 text-blue-600" />
                <AlertTitle className="text-blue-900 dark:text-blue-100">
                  Generating Admit Cards
                </AlertTitle>
                <AlertDescription className="text-blue-800 dark:text-blue-200">
                  Admit Cards will be generated and opened as a printable PDF in
                  a new tab.
                </AlertDescription>
              </Alert>
              {/* Footer Actions */}

              <div className="flex flex-wrap items-center gap-3 pt-4 border-t">
                <Button
                  type="submit"
                  size="lg"
                  disabled={!selectedClass || !selectedExam}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Ticket className="mr-2 h-4 w-4" />
                  Generate Admit Cards
                </Button>

                <Link href="/reports">
                  <Button type="button" variant="outline" size="lg">
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
