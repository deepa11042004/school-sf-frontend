"use client";

import { useState } from "react";
import { CalendarDays, FileText, Receipt, Upload } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function AddExpense() {
  const [file, setFile] = useState<File | null>(null);
  const [date, setDate] = useState<Date>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({
      attachment: file,
    });
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Add Expense</h1>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            Expense Details
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Expense Head */}
              <div className="space-y-2">
                <Label>
                  Expense Head <span className="text-destructive">*</span>
                </Label>

                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Expense Head" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="electricity">
                      Electricity Bill
                    </SelectItem>

                    <SelectItem value="salary">Staff Salary</SelectItem>

                    <SelectItem value="transport">Transport Expense</SelectItem>

                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Date */}
              <div className="space-y-2">
                <Label>
                  Date <span className="text-destructive">*</span>
                </Label>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className={`w-full justify-start text-left font-normal ${
                        !date && "text-muted-foreground"
                      }`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />

                      {date ? format(date, "dd/MM/yyyy") : "Select date"}
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Amount */}
            <div className="space-y-2">
              <Label>
                Amount <span className="text-destructive">*</span>
              </Label>

              <Input
                type="number"
                min="0"
                placeholder="Enter Amount"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label>Description</Label>

              <Textarea rows={4} placeholder="Enter expense description..." />
            </div>

            {/* Attachment */}
            <div className="space-y-3">
              <Label>Attachment</Label>

              <label
                htmlFor="expense-file"
                className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 p-6 transition hover:border-primary/50 hover:bg-muted/30"
              >
                <Upload className="mb-3 h-8 w-8 text-muted-foreground" />

                <p className="font-medium">Click to upload attachment</p>

                <p className="mt-1 text-sm text-muted-foreground">
                  PDF, JPG, PNG, DOC files supported
                </p>

                <input
                  id="expense-file"
                  type="file"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
              </label>

              {file && (
                <div className="flex items-center gap-3 rounded-lg border bg-muted/30 p-3">
                  <FileText className="h-5 w-5 text-primary" />

                  <div className="flex-1">
                    <p className="text-sm font-medium">{file.name}</p>

                    <p className="text-xs text-muted-foreground">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-start">
              <Button type="submit">Save Expense</Button>

              <Link href={`/expenses/expenses-list`}>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
