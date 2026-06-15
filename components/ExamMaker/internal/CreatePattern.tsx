"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Calendar as CalendarIcon,
  Trash2,
  Plus,
  ArrowLeft,
} from "lucide-react";

interface ExamType {
  name: string;
  code: string;
  max: string;
  min: string;
  startDate?: Date;
  endDate?: Date;
}

export default function CreatePattern() {
  const router = useRouter();

  // Main Form fields
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // Exam Types fields
  const [examTypes, setExamTypes] = useState<ExamType[]>([
    {
      name: "",
      code: "",
      max: "",
      min: "",
      startDate: undefined,
      endDate: undefined,
    },
  ]);

  const handleAddType = () => {
    setExamTypes([
      ...examTypes,
      {
        name: "",
        code: "",
        max: "",
        min: "",
        startDate: undefined,
        endDate: undefined,
      },
    ]);
  };

  const handleRemoveType = (index: number) => {
    if (examTypes.length > 1) {
      setExamTypes(examTypes.filter((_, idx) => idx !== index));
    }
  };

  const handleUpdateType = (
    index: number,
    field: keyof ExamType,
    value: any,
  ) => {
    const updated = [...examTypes];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    setExamTypes(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Perform simple validation
    if (!name.trim()) {
      alert("Name is required.");
      return;
    }

    const hasInvalidType = examTypes.some(
      (t) => !t.name.trim() || !t.code.trim(),
    );
    if (hasInvalidType) {
      alert("All Exam Types must have a Name and a Code.");
      return;
    }

    console.log("Submitting Exam Pattern:", {
      name,
      description,
      examTypes,
    });

    alert("Exam Pattern created successfully!");
    router.push("/exam-maker/pattern");
  };

  return (
    <div className="space-y-6 p-4 md:p-6 bg-white dark:bg-[#0F0F12] min-h-screen">
      {/* Header and Back Link */}
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/exam-maker/pattern")}
            className="border border-black/20 dark:border-white/20 p-2 h-8 w-8 hover:bg-gray-100 dark:hover:bg-neutral-850"
          >
            <ArrowLeft className="h-4 w-4 text-slate-700 dark:text-slate-350" />
          </Button>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Create Exam Pattern
          </h1>
        </div>
      </div>

      {/* Form Card */}
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-sm border border-slate-100 dark:border-neutral-800">
          <CardHeader className="border-b border-slate-100 dark:border-neutral-800 py-4">
            <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white">
              Pattern Details
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <form className="space-y-8" onSubmit={handleSubmit}>
              {/* General Fields Grid */}
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>
                    Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    placeholder="e.g. Primary Term System"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="focus-visible:ring-indigo-500 bg-white dark:bg-neutral-900 border-slate-200 dark:border-neutral-800"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Input
                    placeholder="Description of the pattern"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="focus-visible:ring-indigo-500 bg-white dark:bg-neutral-900 border-slate-200 dark:border-neutral-800"
                  />
                </div>
              </div>

              {/* Dynamic Exam Types Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-neutral-800 pb-2">
                  <Label className="text-base font-semibold text-slate-900 dark:text-white">
                    Exam Types <span className="text-destructive">*</span>
                  </Label>
                </div>

                <div className="space-y-4">
                  {examTypes.map((type, index) => (
                    <div
                      key={index}
                      className="p-4 border border-slate-100 dark:border-neutral-850 rounded-lg space-y-4 relative bg-slate-50/40 dark:bg-neutral-900/30"
                    >
                      {/* Row Header with Label & Delete */}
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                          Type #{index + 1}
                        </span>
                        {examTypes.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 h-8 w-8 p-0"
                            onClick={() => handleRemoveType(index)}
                            title="Remove Exam Type"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>

                      {/* Inputs Grid */}
                      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                        {/* Name field */}
                        <div className="space-y-1">
                          <Label className="text-xs">
                            Name <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            placeholder="Name (e.g. Term 1)"
                            value={type.name}
                            onChange={(e) =>
                              handleUpdateType(index, "name", e.target.value)
                            }
                            className="h-9 focus-visible:ring-indigo-500 bg-white dark:bg-neutral-900 border-slate-200 dark:border-neutral-800 text-xs"
                          />
                        </div>

                        {/* Code field */}
                        <div className="space-y-1">
                          <Label className="text-xs">
                            Code <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            placeholder="Code (e.g. T1)"
                            value={type.code}
                            onChange={(e) =>
                              handleUpdateType(index, "code", e.target.value)
                            }
                            className="h-9 focus-visible:ring-indigo-500 bg-white dark:bg-neutral-900 border-slate-200 dark:border-neutral-800 text-xs"
                          />
                        </div>

                        {/* Max field */}
                        <div className="space-y-1">
                          <Label className="text-xs">Max</Label>
                          <Input
                            type="number"
                            placeholder="Max"
                            value={type.max}
                            onChange={(e) =>
                              handleUpdateType(index, "max", e.target.value)
                            }
                            className="h-9 focus-visible:ring-indigo-500 bg-white dark:bg-neutral-900 border-slate-200 dark:border-neutral-800 text-xs"
                          />
                        </div>

                        {/* Min field */}
                        <div className="space-y-1">
                          <Label className="text-xs">Min</Label>
                          <Input
                            type="number"
                            placeholder="Min"
                            value={type.min}
                            onChange={(e) =>
                              handleUpdateType(index, "min", e.target.value)
                            }
                            className="h-9 focus-visible:ring-indigo-500 bg-white dark:bg-neutral-900 border-slate-200 dark:border-neutral-800 text-xs"
                          />
                        </div>

                        {/* Start Date */}
                        <div className="space-y-1">
                          <Label className="text-xs">Start Date</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                type="button"
                                className="w-full h-9 justify-start text-left font-normal text-xs px-3 border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-slate-700 dark:text-slate-300"
                              >
                                <CalendarIcon className="mr-1.5 h-3.5 w-3.5 text-slate-500" />
                                {type.startDate ? (
                                  format(type.startDate, "yyyy-MM-dd")
                                ) : (
                                  <span>Start Date</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={type.startDate}
                                onSelect={(date) =>
                                  handleUpdateType(index, "startDate", date)
                                }
                              />
                            </PopoverContent>
                          </Popover>
                        </div>

                        {/* End Date */}
                        <div className="space-y-1">
                          <Label className="text-xs">End Date</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                type="button"
                                className="w-full h-9 justify-start text-left font-normal text-xs px-3 border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-slate-700 dark:text-slate-300"
                              >
                                <CalendarIcon className="mr-1.5 h-3.5 w-3.5 text-slate-500" />
                                {type.endDate ? (
                                  format(type.endDate, "yyyy-MM-dd")
                                ) : (
                                  <span>End Date</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={type.endDate}
                                onSelect={(date) =>
                                  handleUpdateType(index, "endDate", date)
                                }
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Type Button */}
                <div>
                  <Button
                    type="button"
                    onClick={handleAddType}
                    className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 border-0 h-9 text-xs"
                  >
                    <Plus className="mr-1.5 h-4 w-4" />
                    Add Type
                  </Button>
                </div>
              </div>

              {/* Form Action Buttons Footer */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-100 dark:border-neutral-800">
                <Button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
                >
                  Submit
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => router.push("/exam-maker/pattern")}
                  className="border border-slate-250 dark:border-neutral-800"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
