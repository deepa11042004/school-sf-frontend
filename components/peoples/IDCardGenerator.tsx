"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info, IdCardLanyard,} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function IDCardGenerator() {
  const [selectedClass, setSelectedClass] = useState("");

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header Section */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            ID Card Generator
          </h1>
        </div>

        {/* Form Card */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Select Class to Generate ID Cards</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              {/* Class & Section Selection */}
              <div className="space-y-2">
                <Label>
                  Class & Section <span className="text-destructive">*</span>
                </Label>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger className="w-full md:w-1/2 focus-visible:ring-indigo-500">
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

              {/* Information Notice */}
              <Alert className="border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/30">
                <Info className="h-4 w-4 text-blue-600" />
                <AlertTitle className="text-blue-900 dark:text-blue-100">
                  Generating ID Cards
                </AlertTitle>
                <AlertDescription className="text-blue-800 dark:text-blue-200">
                  ID cards will be generated and opened as a printable PDF in a
                  new tab.
                </AlertDescription>
              </Alert>

              {/* Footer Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t">
                <Button
                  type="submit"
                  size="lg"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md"
                >
                  <IdCardLanyard className="mr-2 h-4 w-4" />
                  Generate ID Cards (PDF)
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
