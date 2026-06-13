"use client";

import { useState } from "react";
import { BookOpen } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent, DialogFooter ,DialogHeader,DialogTitle  } from "@/components/ui/dialog";

const teachers = [
  { id: 9, name: "ANITA SAHA" },
  { id: 6, name: "JYOTI" },
  { id: 5, name: "KHUSHBU" },
  { id: 11, name: "Kusum" },
  { id: 8, name: "MAMTA" },
  { id: 7, name: "NEHA BE" },
  { id: 2, name: "PRITI" },
  { id: 3, name: "PRIYANKA" },
  { id: 1, name: "PUJA" },
  { id: 4, name: "SHALINI" },
];

export default function CreateSubjects() {
  const [subjectType, setSubjectType] = useState("Theory");
  const [teacher, setTeacher] = useState("");
  const [isMinorSubject, setIsMinorSubject] = useState("No");
  const [openTeacherDialog, setOpenTeacherDialog] = useState(false);

  const [selectedTeachers, setSelectedTeachers] = useState<number[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({
      subjectType,
      teacher,
      isMinorSubject,
    });

    // API Call Here
  };

  return (
    <div className="space-y-6 p-4 md:p-6 h-screen">
      {/* Header */}

      <h1 className="text-2xl font-bold">Add Subject</h1>

      <Card className="max-w-5xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Subject Information
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Subject Name */}
              <div className="space-y-2">
                <Label>
                  Name <span className="text-destructive">*</span>
                </Label>

                <Input placeholder="Enter subject name" required />
              </div>

              {/* Subject Code */}
              <div className="space-y-2">
                <Label>
                  Code <span className="text-destructive">*</span>
                </Label>

                <Input placeholder="e.g. MATH101" required />
              </div>

              {/* Subject Type */}
              <div className="space-y-2">
                <Label>
                  Type <span className="text-destructive">*</span>
                </Label>

                <Select value={subjectType} onValueChange={setSubjectType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="Theory">Theory</SelectItem>

                    <SelectItem value="Practical">Practical</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Teacher */}
              <div className="space-y-2">
                <Label>Teacher</Label>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-between"
                  onClick={() => setOpenTeacherDialog(true)}
                >
                  {selectedTeachers.length > 0
                    ? `${selectedTeachers.length} Teacher(s) Selected`
                    : "Choose Teacher"}
                </Button>

                {selectedTeachers.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {teachers
                      .filter((teacher) =>
                        selectedTeachers.includes(teacher.id),
                      )
                      .map((teacher) => (
                        <div
                          key={teacher.id}
                          className="rounded-md border bg-muted px-3 py-1 text-sm"
                        >
                          {teacher.name}
                        </div>
                      ))}
                  </div>
                )}
              </div>

              {/* Teacher Popup */}
              <Dialog
  open={openTeacherDialog}
  onOpenChange={setOpenTeacherDialog}
>
  <DialogContent className="sm:max-w-lg">
    <DialogHeader>
      <DialogTitle>Select Teacher</DialogTitle>
    </DialogHeader>

    <div className="max-h-[400px] space-y-3 overflow-y-auto">
      {teachers.map((teacher) => (
        <label
          key={teacher.id}
          className="flex cursor-pointer items-center gap-3 rounded-lg border p-3 hover:bg-muted/50"
        >
          <input
            type="checkbox"
            checked={selectedTeachers.includes(teacher.id)}
            onChange={(e) => {
              if (e.target.checked) {
                setSelectedTeachers((prev) => [...prev, teacher.id]);
              } else {
                setSelectedTeachers((prev) =>
                  prev.filter((id) => id !== teacher.id),
                );
              }
            }}
            className="h-4 w-4"
          />

          <div>
            <p className="font-medium">
              {teacher.name}
            </p>

            <p className="text-xs text-muted-foreground">
              ID: {teacher.id}
            </p>
          </div>
        </label>
      ))}
    </div>

    <DialogFooter>
      <Button
        variant="outline"
        onClick={() => setOpenTeacherDialog(false)}
      >
        Cancel
      </Button>

      <Button onClick={() => setOpenTeacherDialog(false)}>
        Apply Selection
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

              {/* Minor Subject */}
              <div className="space-y-2">
                <Label>
                  Is Minor Subject <span className="text-destructive">*</span>
                </Label>

                <Select
                  value={isMinorSubject}
                  onValueChange={setIsMinorSubject}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="No">No</SelectItem>

                    <SelectItem value="Yes">Yes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Sort Order */}
              <div className="space-y-2">
                <Label>Sort Order</Label>

                <Input type="number" min="0" defaultValue="0" />
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-start">
              <Button type="submit">Save Subject</Button>

              <Link href="/academic/subjects">
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
