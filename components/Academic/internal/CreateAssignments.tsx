 
"use client";

import { useState } from "react";
import {
  BookOpen,
  Upload,
  FileText,
  GraduationCap,
} from "lucide-react";
import Link from "next/link";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";  
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

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

export default function CreateAssignments() {
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [date, setDate] = useState<Date | undefined>();

  const toggleClass = (className: string) => {
    setSelectedClasses((prev) =>
      prev.includes(className)
        ? prev.filter((c) => c !== className)
        : [...prev, className],
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({
      selectedClasses,
      file,
    });
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
   
      <Card>
  <CardHeader>
    <CardTitle>Add Assignment
</CardTitle>
  </CardHeader>

  <CardContent className="space-y-6">
    {/* Homework Title */}
    <div className="space-y-2">
      <Label>
        Title <span className="text-destructive">*</span>
      </Label>

      <Input placeholder="Ex. Math Problems 1-10" />
    </div>

    {/* Description */}
    <div className="space-y-2">
      <Label>Description</Label>

      <Textarea placeholder="Enter details..." rows={4} />
    </div>

    {/* Deadline */}
    <div className="grid gap-6 md:grid-cols-2">
      {/* Deadline Date */}
      <div className="space-y-2">
        <Label>
          Deadline Date <span className="text-destructive">*</span>
        </Label>

      <Popover>
  <PopoverTrigger asChild>
    <Button
      variant="outline"
      className="w-full justify-start text-left font-normal"
    >
      <CalendarIcon className="mr-2 h-4 w-4" />
      {date ? format(date, "PPP") : "Pick a date"}
    </Button>
  </PopoverTrigger>

  <PopoverContent className="w-auto p-0">
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      
    />
  </PopoverContent>
</Popover>
      </div>

      {/* Deadline Time */}
      <div className="space-y-2">
        <Label>
          Deadline Time <span className="text-destructive">*</span>
        </Label>

        <Input type="time" />

        
      </div>
    </div>

    {/* Subject */}
    <div className="space-y-2">
      <Label>
        Subject <span className="text-destructive">*</span>
      </Label>

      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select Subject" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="english">English</SelectItem>
          <SelectItem value="maths">Maths</SelectItem>
          <SelectItem value="science">Science</SelectItem>
          <SelectItem value="computer">Computer</SelectItem>
        </SelectContent>
      </Select>
    </div>

    {/* Classes */}
    <div className="space-y-3">
      <Label>
        Classes <span className="text-destructive">*</span>
      </Label>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {classes.map((className) => (
          <button
            key={className}
            type="button"
            className="flex items-center gap-3 rounded-lg border p-3 text-left hover:bg-muted/50"
          >
            <input
              type="checkbox"
              className="h-4 w-4"
            />

            <span>{className}</span>
          </button>
        ))}
      </div>
    </div>

    
    <div className="space-y-3">
      <Label>
        Assignment File <span className="text-destructive">*</span>
      </Label>

      <label
        htmlFor="homework-upload"
        className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-8"
      >
        <Upload className="mb-3 h-8 w-8" />

        <p className="font-medium">
          Click to upload or drag & drop
        </p>

        <p className="text-sm text-muted-foreground">
          PDF, DOC, Images (Max 10MB)
        </p>

        <input
          id="homework-upload"
          type="file"
          accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
          className="hidden"
        />
      </label>
    </div>

    {/* Actions */}
    <div className="flex justify-start gap-3">
      

      <Button>
        Create Assignment 
      </Button>


      <Link href="/academic/assignments">
      <Button variant="outline">
        Cancel
      </Button>
      </Link>
    </div>
  </CardContent>
</Card>
    </div>
  );
}