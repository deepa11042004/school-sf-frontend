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
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, Download } from "lucide-react";

export default function BulkStudentReportCards() {
  const [selectedClass, setSelectedClass] = useState("");

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header Section */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Bulk Student Report Cards
          </h1>
        </div>

        {/* Form Card */}
        <Card className="shadow-sm ">
          <CardHeader>
            <CardTitle>Select Class to Generate Report Cards</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              {/* Class Selection */}
              <div className="space-y-2">
                <Label>
                  Class <span className="text-destructive">*</span>
                </Label>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger className="w-full md:w-1/2 focus-visible:ring-indigo-500">
                    <SelectValue placeholder="Select Class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="II-A">II - A</SelectItem>
                    <SelectItem value="II-B">II - B</SelectItem>
                    <SelectItem value="III-A">III - A</SelectItem>
                    <SelectItem value="III-B">III - B</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Information Notice */}
              <Alert className="border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/30">
                <Info className="h-4 w-4 text-blue-600" />
                <AlertTitle className="text-blue-900 dark:text-blue-100">
                  Generating Report Cards
                </AlertTitle>
                <AlertDescription className="text-blue-800 dark:text-blue-200">
                  Will generate and download a single A4 PDF containing report
                  cards for all students in the selected class.
                </AlertDescription>
              </Alert>

              <div className="flex item-center justify-start  gap-4">
                <Button
                  type="submit"
                  size="lg"
                  className="min-w-[320px] bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-xl transition-all item-center   flex justify-center"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Generate & Download Report Cards (PDF)
                </Button>

                <Link href="/reports">
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
