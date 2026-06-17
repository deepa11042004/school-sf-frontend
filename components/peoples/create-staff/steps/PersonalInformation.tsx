"use client";
import { useState } from "react";
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
import { CalendarIcon, Upload, FileUp } from "lucide-react";
import { format } from "date-fns";

const PersonalInformation = () => {
  

  const [dateOfJoining, setDateOfJoining] = useState<Date | undefined>(
    undefined,
  );
  const [dob, setDob] = useState<Date | undefined>(undefined);

  const [staffImage, setStaffImage] = useState<File | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  return (
    <div className="space-y-6 animate-in fade-in-0 slide-in-from-right-4 duration-300">
      <div className="border-b pb-2 mb-4">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
          Personal Information
        </h3>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-2">
          <Label>
            First Name <span className="text-destructive">*</span>
          </Label>
          <Input placeholder="Enter first name" />
        </div>
        <div className="space-y-2">
          <Label>Last Name</Label>
          <Input placeholder="Enter last name" />
        </div>
        <div className="space-y-2">
          <Label>Aadhar Number</Label>
          <Input placeholder="XXXX-XXXX-XXXX" />
        </div>
        <div className="space-y-2">
          <Label>PN Code</Label>
          <Input placeholder="Enter PN code" />
        </div>
        <div className="space-y-2">
          <Label>Gender</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>
            Primary Contact Number <span className="text-destructive">*</span>
          </Label>
          <Input type="tel" placeholder="Enter phone number" />
        </div>
        <div className="space-y-2">
          <Label>WhatsApp Number</Label>
          <Input type="tel" placeholder="Enter WhatsApp number" />
        </div>
        <div className="space-y-2">
          <Label>Email Address</Label>
          <Input type="email" placeholder="Enter email address" />
        </div>
        <div className="space-y-2">
          <Label>Blood Group</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="A+">A+</SelectItem>
              <SelectItem value="O+">O+</SelectItem>
              <SelectItem value="B+">B+</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Date of Joining</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
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
                onSelect={setDateOfJoining}
                
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="space-y-2">
          <Label>Father’s Name</Label>
          <Input placeholder="Enter father's name" />
        </div>
        <div className="space-y-2">
          <Label>Mother’s Name</Label>
          <Input placeholder="Enter mother's name" />
        </div>
        <div className="space-y-2">
          <Label>Date of Birth</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-slate-500" />
                {dob ? format(dob, "MM/dd/yyyy") : "mm/dd/yyyy"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={dob} onSelect={setDob} />
            </PopoverContent>
          </Popover>
        </div>
        <div className="space-y-2">
          <Label>Marital Status</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="single">Single</SelectItem>
              <SelectItem value="married">Married</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Qualification</Label>
          <Input placeholder="Enter qualification" />
        </div>
        <div className="space-y-2">
          <Label>Professional Qualification</Label>
          <Input placeholder="Enter professional qualification" />
        </div>
        <div className="space-y-2">
          <Label>Work Experience</Label>
          <Input placeholder="e.g. 5 years" />
        </div>

        <div className="space-y-2 md:col-span-2">
          <div className="space-y-2">
            <Label>Staff Image</Label>
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 p-4 transition hover:border-primary/50 hover:bg-muted/30">
              <Upload className="mb-2 h-6 w-6 text-muted-foreground" />
              <p className="text-xs font-medium">
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
          <div className="space-y-2">
            <Label>Resume (PDF)</Label>
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 p-4 transition hover:border-primary/50 hover:bg-muted/30">
              <FileUp className="mb-2 h-6 w-6 text-muted-foreground" />
              <p className="text-xs font-medium">
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

        <div className="space-y-2 md:col-span-3">
          <Label>Notes</Label>
          <Textarea
            placeholder="Enter any additional notes..."
            className="min-h-[80px]"
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;
