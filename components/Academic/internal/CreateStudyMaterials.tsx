 
"use client";

import { useState } from "react";
import {
  BookOpen,
  Upload,
  FileText,
  GraduationCap,
} from "lucide-react";
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

export default function CreateStudyMaterials() {
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);

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
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Add Study Material</h1>

   
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Study Material Information
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Material Title */}
            <div className="space-y-2">
              <Label>
                Material Title{" "}
                <span className="text-destructive">*</span>
              </Label>

              <Input
                placeholder="Ex. Algebra Chapter 1 Notes"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label>Description</Label>

              <Textarea
                placeholder="Enter details..."
                rows={4}
              />
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
                  <SelectItem value="hindi">Hindi</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Classes */}
            <div className="space-y-3">
              <Label>
                Classes <span className="text-destructive">*</span>
              </Label>

              <Card className="border-dashed">
                <CardContent className="p-4">
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {classes.map((className) => {
                      const checked =
                        selectedClasses.includes(className);

                      return (
                        <button
                          key={className}
                          type="button"
                          onClick={() => toggleClass(className)}
                          className={`flex items-center gap-3 rounded-lg border p-3 text-left transition-all ${
                            checked
                              ? "border-primary bg-primary/10"
                              : "hover:bg-muted/50"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            readOnly
                            className="h-4 w-4"
                          />

                          <span className="text-sm font-medium">
                            {className}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* File Upload */}
            <div className="space-y-3">
              <Label>
                Material File{" "}
                <span className="text-destructive">*</span>
              </Label>

              <label
                htmlFor="material-upload"
                className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 p-8 transition hover:border-primary/50 hover:bg-muted/30"
              >
                <Upload className="mb-3 h-8 w-8 text-muted-foreground" />

                <p className="font-medium">
                  Click to upload or drag and drop
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  PDF, DOC, XLS, Images (Max 10MB)
                </p>

                <input
                  id="material-upload"
                  type="file"
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
                  className="hidden"
                  onChange={(e) =>
                    setFile(e.target.files?.[0] || null)
                  }
                />
              </label>

              {/* Selected File */}
              {file && (
                <div className="flex items-center gap-3 rounded-lg border bg-muted/40 p-3">
                  <FileText className="h-5 w-5 text-primary" />

                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {file.name}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
              )}

              <div className="rounded-lg border bg-muted/30 p-3">
                <p className="text-sm text-muted-foreground">
                  Supported formats: PDF, DOC, DOCX, XLS, XLSX,
                  PNG, JPG, JPEG. Maximum file size: 10MB.
                </p>
              </div>
            </div>

            {/* Summary */}
            {selectedClasses.length > 0 && (
              <div className="rounded-lg border bg-primary/5 p-4">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-primary" />

                  <span className="font-medium">
                    {selectedClasses.length} Classes Selected
                  </span>
                </div>

                <p className="mt-2 text-sm text-muted-foreground">
                  {selectedClasses.join(", ")}
                </p>
              </div>
            )}

            {/* Footer */}
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-start">

                <Button type="submit">
                Upload Study Material
              </Button>


              <Link href="/academic/study-materials">
             
              <Button variant="outline" type="button">
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