"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CreateFeeHeads() {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [discountApplicable, setDiscountApplicable] = useState(false);
  const [fineApplicable, setFineApplicable] = useState(false);
  const [forNewStudentsOnly, setForNewStudentsOnly] = useState(false);
  const [status, setStatus] = useState("active");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      code,
      name,
      discountApplicable,
      fineApplicable,
      forNewStudentsOnly,
      status,
    });
  };

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header Section */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Add Fee Head
          </h1>
        </div>

        {/* Form Section */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Fee Head Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="code">
                    Code <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="code"
                    placeholder="Enter code"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">
                    Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
  <input
    type="checkbox"
    id="discount"
    checked={discountApplicable}
    onChange={(e) => setDiscountApplicable(e.target.checked)}
    className="h-4 w-4 rounded border-gray-300 cursor-pointer"
  />

  <Label
    htmlFor="discount"
    className="font-normal cursor-pointer select-none"
  >
    Discount Applicable
  </Label>
</div>

<div className="flex items-center space-x-2">
  <input
    type="checkbox"
    id="fine"
    checked={fineApplicable}
    onChange={(e) => setFineApplicable(e.target.checked)}
    className="h-4 w-4 rounded border-gray-300 cursor-pointer"
  />

  <Label
    htmlFor="fine"
    className="font-normal cursor-pointer select-none"
  >
    Fine Applicable
  </Label>
</div>

<div className="flex items-center space-x-2">
  <input
    type="checkbox"
    id="newStudents"
    checked={forNewStudentsOnly}
    onChange={(e) => setForNewStudentsOnly(e.target.checked)}
    className="h-4 w-4 rounded border-gray-300 cursor-pointer"
  />

  <Label
    htmlFor="newStudents"
    className="font-normal cursor-pointer select-none"
  >
    For New Students Only
  </Label>
</div>

                <div className="space-y-2 pt-2">
                  <Label>Status</Label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger className="w-full md:w-[200px]">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4  ">
                <Button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
                >
                  Save Fee Head
                </Button>

                <Link href="/fee/fee-heads">
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
