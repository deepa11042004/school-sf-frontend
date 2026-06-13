"use client";

import { useState } from "react";
import { BookOpen, GraduationCap, User } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const teachers = [
  { id: 1, name: "PUJA" },
  { id: 2, name: "PRITI" },
  { id: 3, name: "PRIYANKA" },
  { id: 4, name: "SHALINI" },
  { id: 5, name: "KHUSHBU" },
];

const subjects = [
  { id: 10, name: "Computer" },
  { id: 8, name: "E.V.S" },
  { id: 1, name: "English" },
  { id: 9, name: "G.K." },
  { id: 2, name: "Hindi" },
  { id: 4, name: "Maths" },
  { id: 7, name: "Moral Value" },
  { id: 11, name: "Rhymes" },
  { id: 6, name: "S.Science" },
  { id: 3, name: "Sanskrit" },
  { id: 5, name: "Science" },
];

const minorSubjects = [
  { id: 15, name: "Art & Craft" },
  { id: 13, name: "Discipline" },
  { id: 12, name: "Health & Physical Education" },
  { id: 14, name: "Personality/Character" },
];

export default function CreateClasses() {
  const [teacherDialogOpen, setTeacherDialogOpen] = useState(false);

  const [selectedTeacher, setSelectedTeacher] = useState<number | null>(null);

  const [selectedSubjects, setSelectedSubjects] = useState<number[]>([]);

  const [selectedMinorSubjects, setSelectedMinorSubjects] = useState<number[]>(
    [],
  );

  const toggleSubject = (id: number) => {
    setSelectedSubjects((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const toggleMinorSubject = (id: number) => {
    setSelectedMinorSubjects((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({
      selectedTeacher,
      selectedSubjects,
      selectedMinorSubjects,
    });
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Add Class</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Class Information
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Details */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label>
                  Class Name <span className="text-destructive">*</span>
                </Label>

                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Class" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="pre">Pre</SelectItem>
                    <SelectItem value="nc">NC</SelectItem>
                    <SelectItem value="lkg">LKG</SelectItem>
                    <SelectItem value="ukg">UKG</SelectItem>
                    <SelectItem value="I">I</SelectItem>
                    <SelectItem value="II">II</SelectItem>
                    <SelectItem value="III">III</SelectItem>
                    <SelectItem value="IV">IV</SelectItem>
                    <SelectItem value="V">V</SelectItem>
                    <SelectItem value="VI">VI</SelectItem>
                    <SelectItem value="VII">VII</SelectItem>
                    <SelectItem value="VIII">VIII</SelectItem>
                    <SelectItem value="IX">IX</SelectItem>
                    <SelectItem value="X">X</SelectItem>
                    <SelectItem value="XI">XI</SelectItem>
                    <SelectItem value="XII">XII</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>
                  Section <span className="text-destructive">*</span>
                </Label>

                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Section" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="a">Section A</SelectItem>
                    <SelectItem value="b">Section B</SelectItem>
                    <SelectItem value="c">Section C</SelectItem>
                    <SelectItem value="d">Section D</SelectItem>
                    <SelectItem value="e">Section E</SelectItem>
                    <SelectItem value="f">Section F</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>
                  Medium <span className="text-destructive">*</span>
                </Label>

                <Select defaultValue="english">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="hindi">Hindi</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Teacher */}
              <div className="space-y-2">
                <Label>
                  Class Teacher <span className="text-destructive">*</span>
                </Label>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-between"
                  onClick={() => setTeacherDialogOpen(true)}
                >
                  {selectedTeacher
                    ? teachers.find((t) => t.id === selectedTeacher)?.name
                    : "Select Teacher"}
                </Button>
              </div>
            </div>

            {/* Associated Subjects */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <BookOpen className="h-4 w-4" />
                  Associated Subjects
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {subjects.map((subject) => {
                    const checked = selectedSubjects.includes(subject.id);

                    return (
                      <button
                        key={subject.id}
                        type="button"
                        onClick={() => toggleSubject(subject.id)}
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

                        <span className="text-sm">
                          {subject.name} ({subject.id})
                        </span>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Minor Subjects */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Minor Subjects</CardTitle>
              </CardHeader>

              <CardContent>
                <div className="grid gap-3 sm:grid-cols-2">
                  {minorSubjects.map((subject) => {
                    const checked = selectedMinorSubjects.includes(subject.id);

                    return (
                      <button
                        key={subject.id}
                        type="button"
                        onClick={() => toggleMinorSubject(subject.id)}
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

                        <span className="text-sm">
                          {subject.name} ({subject.id})
                        </span>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Sort Order */}
            <div className="space-y-2">
              <Label>Sort Order</Label>

              <Input type="number" min={0} defaultValue={0} placeholder="0" />
            </div>

            {/* Footer */}
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-start">
             

              <Button type="submit">Save Class</Button>


              <Link href="/academic/school-classes">
               <Button variant="outline" type="button">
                Cancel
              </Button>
              </Link>

              </div>
          </form>
        </CardContent>
      </Card>

      {/* Teacher Dialog */}
      <Dialog open={teacherDialogOpen} onOpenChange={setTeacherDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Select Class Teacher</DialogTitle>
          </DialogHeader>

          <div className="max-h-[400px] space-y-2 overflow-y-auto">
            {teachers.map((teacher) => (
              <button
                key={teacher.id}
                type="button"
                onClick={() => {
                  setSelectedTeacher(teacher.id);
                  setTeacherDialogOpen(false);
                }}
                className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-all ${
                  selectedTeacher === teacher.id
                    ? "border-primary bg-primary/10"
                    : "hover:bg-muted/50"
                }`}
              >
                <input
                  type="radio"
                  checked={selectedTeacher === teacher.id}
                  readOnly
                  className="h-4 w-4"
                />

                <div>
                  <p className="font-medium">{teacher.name}</p>
                </div>

                <User className="ml-auto h-4 w-4 text-muted-foreground" />
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
