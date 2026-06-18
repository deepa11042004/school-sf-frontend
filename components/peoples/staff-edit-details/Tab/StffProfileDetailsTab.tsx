"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Upload, FileUp,User } from "lucide-react";
import { format } from "date-fns";

export default function StffProfileDetailsTab() {
  const [dateOfJoining, setDateOfJoining] = useState<Date>(
    new Date(2015, 8, 5),
  ); // 09/05/2015
  const [dob, setDob] = useState<Date>(new Date(1990, 9, 8)); // 10/08/1990
  const [staffImage, setStaffImage] = useState<File | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  return (
    <Card className="shadow-sm">

         <CardHeader>
          <div className="flex items-center gap-3">
         <User className="h-5 w-5" />

             <CardTitle>Staff Personal Details</CardTitle>
          </div>
        </CardHeader>

 
      <CardContent>
        <form className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            {/* First Name */}
            <div className="space-y-2">
              <Label>
                First Name <span className="text-destructive">*</span>
              </Label>
              <Input
                defaultValue="Kusum"
                className="focus-visible:ring-indigo-500"
              />
            </div>
            {/* Last Name */}
            <div className="space-y-2">
              <Label>Last Name</Label>
              <Input className="focus-visible:ring-indigo-500" />
            </div>
            {/* Aadhar Number */}
            <div className="space-y-2">
              <Label>Aadhar Number</Label>
              <Input
                placeholder="XXXX-XXXX-XXXX"
                className="focus-visible:ring-indigo-500"
              />
            </div>
            {/* PN Code */}
            <div className="space-y-2">
              <Label>PN Code</Label>
              <Input className="focus-visible:ring-indigo-500" />
            </div>
            {/* Gender */}
            <div className="space-y-2">
              <Label>Gender</Label>
              <Select defaultValue="female">
                <SelectTrigger className="focus-visible:ring-indigo-500">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Primary Contact Number */}
            <div className="space-y-2">
              <Label>
                Primary Contact Number{" "}
                <span className="text-destructive">*</span>
              </Label>
              <Input
                type="tel"
                defaultValue="9876543210"
                className="focus-visible:ring-indigo-500"
              />
            </div>
            {/* WhatsApp Number */}
            <div className="space-y-2">
              <Label>WhatsApp Number</Label>
              <Input type="tel" className="focus-visible:ring-indigo-500" />
            </div>
            {/* Email Address */}
            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input
                type="email"
                defaultValue="kusum@gmail.com"
                className="focus-visible:ring-indigo-500"
              />
            </div>
            {/* Blood Group */}
            <div className="space-y-2">
              <Label>Blood Group</Label>
              <Select>
                <SelectTrigger className="focus-visible:ring-indigo-500">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A+">A+</SelectItem>
                  <SelectItem value="O+">O+</SelectItem>
                  <SelectItem value="B+">B+</SelectItem>
                  <SelectItem value="AB+">AB+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Date of Joining */}
            <div className="space-y-2">
              <Label>Date of Joining</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal focus-visible:ring-indigo-500"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-slate-500" />
                    {dateOfJoining
                      ? format(dateOfJoining, "MM/dd/yyyy")
                      : "mm/dd/yyyy"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateOfJoining}
                    onSelect={(d) => d && setDateOfJoining(d)}
                  />
                </PopoverContent>
              </Popover>
            </div>
            {/* Father's Name */}
            <div className="space-y-2">
              <Label>Father’s Name</Label>
              <Input className="focus-visible:ring-indigo-500" />
            </div>
            {/* Mother's Name */}
            <div className="space-y-2">
              <Label>Mother’s Name</Label>
              <Input className="focus-visible:ring-indigo-500" />
            </div>
            {/* Date of Birth */}
            <div className="space-y-2">
              <Label>Date of Birth</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal focus-visible:ring-indigo-500"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-slate-500" />
                    {dob ? format(dob, "MM/dd/yyyy") : "mm/dd/yyyy"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dob}
                    onSelect={(d) => d && setDob(d)}
                  />
                </PopoverContent>
              </Popover>
            </div>
            {/* Marital Status */}
            <div className="space-y-2">
              <Label>Marital Status</Label>
              <Select>
                <SelectTrigger className="focus-visible:ring-indigo-500">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single</SelectItem>
                  <SelectItem value="married">Married</SelectItem>
                  <SelectItem value="divorced">Divorced</SelectItem>
                  <SelectItem value="widowed">Widowed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Qualification */}
            <div className="space-y-2">
              <Label>Qualification</Label>
              <Input
                defaultValue="M.Ed."
                className="focus-visible:ring-indigo-500"
              />
            </div>
            {/* Professional Qualification */}
            <div className="space-y-2">
              <Label>Professional Qualification</Label>
              <Input className="focus-visible:ring-indigo-500" />
            </div>
            {/* Work Experience */}
            <div className="space-y-2">
              <Label>Work Experience</Label>
              <Input
                placeholder="e.g. 5 years"
                className="focus-visible:ring-indigo-500"
              />
            </div>

            <div className="space-y-2 md:col-span-3">
              {/* Staff Image */}
              <div className="space-y-2">
                <Label>Staff Image</Label>
                <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 p-6 transition hover:border-primary/50 hover:bg-muted/30">
                  <Upload className="mb-2 h-6 w-6 text-muted-foreground" />
                  <p className="text-xs font-medium text-center">
                    {staffImage ? staffImage.name : "No file chosen"}
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setStaffImage(e.target.files?.[0] || null)}
                  />
                </label>
              </div>

              {/* Resume */}
              <div className="space-y-2">
                <Label>Resume (PDF)</Label>
                <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 p-6 transition hover:border-primary/50 hover:bg-muted/30">
                  <FileUp className="mb-2 h-6 w-6 text-muted-foreground" />
                  <p className="text-xs font-medium text-center">
                    {resumeFile ? resumeFile.name : "No file chosen"}
                  </p>
                  <input
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                  />
                </label>
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-2 md:col-span-3">
              <Label>Notes</Label>
              <Textarea
                placeholder="Enter any additional notes..."
                className="min-h-[100px] focus-visible:ring-indigo-500"
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex flex-wrap gap-3 justify-start pt-4 border-t">
            <Button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
            >
              Update
            </Button>

            <Button type="button" variant="outline">
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
