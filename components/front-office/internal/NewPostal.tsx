"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Upload, FileText, CalendarIcon, Save } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export default function NewPostal() {
  const [postalDate, setPostalDate] = useState<Date | undefined>(new Date());
  const [direction, setDirection] = useState("received");
  const [attachment, setAttachment] = useState<File | null>(null);
  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Add Postal Record</h1>

        <p className="text-muted-foreground text-sm">
          Dashboard / Postal Records / Add
        </p>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Postal Record Details</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Direction */}
            <div className="space-y-2">
              <Label>
                Direction <span className="text-destructive">*</span>
              </Label>

              <Select value={direction} onValueChange={setDirection}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="received">Received</SelectItem>

                  <SelectItem value="sent">Sent</SelectItem>
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
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !postalDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />

                    {postalDate ? (
                      format(postalDate, "dd/MM/yyyy")
                    ) : (
                      <span>Select date</span>
                    )}
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={postalDate}
                    onSelect={setPostalDate}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Postal Type */}
            <div className="space-y-2">
              <Label>Postal Type</Label>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="courier">Courier</SelectItem>

                  <SelectItem value="speed-post">Speed Post</SelectItem>

                  <SelectItem value="registered-post">
                    Registered Post
                  </SelectItem>

                  <SelectItem value="parcel">Parcel</SelectItem>

                  <SelectItem value="document">Document</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Reference No */}
            <div className="space-y-2">
              <Label>Reference No</Label>

              <Input placeholder="Enter reference number" />
            </div>

            {/* From Title */}
            <div className="space-y-2">
              <Label>From Title</Label>

              <Input placeholder="Enter sender title" />
            </div>

            {/* To Title */}
            <div className="space-y-2">
              <Label>To Title</Label>

              <Input placeholder="Enter receiver title" />
            </div>

            {/* Courier Name */}
            <div className="space-y-2 md:col-span-2">
              <Label>Courier Name</Label>

              <Input placeholder="Enter courier company name" />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label>Attachment</Label>

              <label
                htmlFor="postal-attachment"
                className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 p-8 transition hover:border-primary/50 hover:bg-muted/30"
              >
                <Upload className="mb-3 h-8 w-8 text-muted-foreground" />

                <p className="font-medium">Click to upload or drag and drop</p>

                <p className="mt-1 text-sm text-muted-foreground">
                  PDF, DOC, DOCX, JPG, PNG
                </p>

                <input
                  id="postal-attachment"
                  type="file"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  className="hidden"
                  onChange={(e) => setAttachment(e.target.files?.[0] || null)}
                />
              </label>

              {/* Selected File */}
              {attachment && (
                <div className="flex items-center gap-3 rounded-lg border bg-muted/40 p-3">
                  <FileText className="h-5 w-5 text-primary" />

                  <div className="flex-1">
                    <p className="text-sm font-medium">{attachment.name}</p>

                    <p className="text-xs text-muted-foreground">
                      {(attachment.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}

          <div className="flex items-center gap-3 pt-8  ">
            <Button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
            >
              <Save className="mr-2 h-4 w-4" />
              Save Postal Record
            </Button>
            <Link href="/front-office/postal">
              <Button variant="outline">Cancel</Button>
            </Link>
          </div>
          
        </CardContent>
      </Card>
    </div>
  );
}
