"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  User,
  MapPin,
  GraduationCap,
  Building2,
  FileText,
  CalendarIcon,
  Upload,
  FileUp,
} from "lucide-react";
import { format } from "date-fns";

export default function StudentProfileDetailsTab() {
  const [dob, setDob] = useState<Date>(new Date(2023, 3, 1)); // 04/01/2023
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [docFile, setDocFile] = useState<File | null>(null);

  return (
 
      <form className="space-y-6">
        <Accordion
        
          type="multiple"           
          className="grid gap-4"
        >
          {/* Personal Information */}
          <AccordionItem
          
            value="personal"
            className="overflow-hidden rounded-sm border bg-card shadow-sm"
          >
            <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-slate-50/50 dark:hover:bg-neutral-900/50 transition-colors">
              <div className="flex items-center gap-3">
                 
                  <User className="h-5 w-5  " />
               
                <span className="font-semibold text-lg">
                  Personal Information
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6 pt-2">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-2">
                  <Label>Aadhar Number</Label>
                  <Input defaultValue="3343-4566-7878" />
                </div>
                <div className="space-y-2">
                  <Label>PEN Number</Label>
                  <Input defaultValue="PEN385857" />
                </div>
                <div className="space-y-2">
                  <Label>
                    First Name <span className="text-destructive">*</span>
                  </Label>
                  <Input defaultValue="AADESH KUMAR YADAV" />
                </div>
                <div className="space-y-2">
                  <Label>Last Name</Label>
                  <Input />
                </div>
                <div className="space-y-2">
                  <Label>
                    Gender <span className="text-destructive">*</span>
                  </Label>
                  <Select defaultValue="male">
                    <SelectTrigger>
                      <SelectValue />
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
                    Date of Birth <span className="text-destructive">*</span>
                  </Label>
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
                      <Calendar
                        mode="single"
                        selected={dob}
                        onSelect={(d) => d && setDob(d)}
                      
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label>Blood Group</Label>
                  <Select defaultValue="A+">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>House</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select House" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="red">Red House</SelectItem>
                      <SelectItem value="blue">Blue House</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Additional Activity</Label>
                  <Select defaultValue="none">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="sports">Sports</SelectItem>
                      <SelectItem value="music">Music</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Religion</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hindu">Hindu</SelectItem>
                      <SelectItem value="muslim">Muslim</SelectItem>
                      <SelectItem value="christian">Christian</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="obc">OBC</SelectItem>
                      <SelectItem value="sc">SC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Caste</Label>
                  <Input defaultValue="NA" />
                </div>
                <div className="space-y-2">
                  <Label>Nationality</Label>
                  <Input defaultValue="Indian" />
                </div>
                <div className="space-y-2">
                  <Label>RTE Student</Label>
                  <Select defaultValue="no">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">YES</SelectItem>
                      <SelectItem value="no">NO</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Student Contact & Address */}
          <AccordionItem
            value="contact"
            className="overflow-hidden rounded-sm border bg-card shadow-sm"
          >
            <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-slate-50/50 dark:hover:bg-neutral-900/50 transition-colors">
              <div className="flex items-center gap-3">
              
                  <MapPin className="h-5 w-5" />
                 
                <span className="font-semibold text-lg">
                  Student Contact & Address
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6 pt-2">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>
                    Primary Mobile <span className="text-destructive">*</span>
                  </Label>
                  <Input type="tel" defaultValue="9719044221" />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" defaultValue="S781@example.com" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Current Address</Label>
                  <Input defaultValue="SUPRIYA COLONY" />
                </div>
                <div className="space-y-2">
                  <Label>City</Label>
                  <Input defaultValue="Rudrapur" />
                </div>
                <div className="space-y-2">
                  <Label>State</Label>
                  <Input defaultValue="Uttrakhand" />
                </div>
                <div className="space-y-2">
                  <Label>Zip Code</Label>
                  <Input defaultValue="263153" />
                </div>
                <div className="space-y-2">
                  <Label>Country</Label>
                  <Input defaultValue="India" />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Previous Details */}
          <AccordionItem
            value="previous"
            className="overflow-hidden rounded-sm border bg-card shadow-sm"
          >
            <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-slate-50/50 dark:hover:bg-neutral-900/50 transition-colors">
              <div className="flex items-center gap-3">
                
                  <GraduationCap className="h-5 w-5  " />
                 
                <span className="font-semibold text-lg">Previous Details</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6 pt-2">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-2">
                  <Label>Previous School Name</Label>
                  <Input defaultValue="JHS" />
                </div>
                <div className="space-y-2">
                  <Label>Previous Class</Label>
                  <Input defaultValue="N/A" />
                </div>
                <div className="space-y-2">
                  <Label>Year Due</Label>
                  <Input type="number" step="0.01" defaultValue="0.00" />
                </div>
                <div className="space-y-2">
                  <Label>Overpaid Amount</Label>
                  <Input type="number" step="0.01" defaultValue="500.00" />
                </div>
                <div className="space-y-2">
                  <Label>Year Passed</Label>
                  <Input type="number" defaultValue="2026" />
                </div>
                <div className="space-y-2">
                  <Label>Last Exam %</Label>
                  <Input type="number" step="0.01" defaultValue="0.00" />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Bank Details */}
          <AccordionItem
            value="bank"
            className="overflow-hidden rounded-sm border bg-card shadow-sm"
          >
            <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-slate-50/50 dark:hover:bg-neutral-900/50 transition-colors">
              <div className="flex items-center gap-3">
               
                  <Building2 className="h-5 w-5  " />
              
                <span className="font-semibold text-lg">Bank Details</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6 pt-2">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Account Name</Label>
                  <Input />
                </div>
                <div className="space-y-2">
                  <Label>Account No</Label>
                  <Input defaultValue="1234568499" />
                </div>
                <div className="space-y-2">
                  <Label>Bank Name</Label>
                  <Input defaultValue="ABC Bank" />
                </div>
                <div className="space-y-2">
                  <Label>Branch</Label>
                  <Input defaultValue="R Branch" />
                </div>
                <div className="space-y-2">
                  <Label>IFSC Code</Label>
                  <Input defaultValue="ABCD0001843" className="uppercase" />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Documents & Media */}
          <AccordionItem
            value="documents"
            className="overflow-hidden rounded-sm border bg-card shadow-sm"
          >
            <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-slate-50/50 dark:hover:bg-neutral-900/50 transition-colors">
              <div className="flex items-center gap-3">
              
                  <FileText className="h-5 w-5 " />
                 
                <span className="font-semibold text-lg">Documents & Media</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6 pt-2">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Student Photo</Label>
                  <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 p-8 transition hover:border-primary/50 hover:bg-muted/30">
                    <Upload className="mb-3 h-8 w-8 text-muted-foreground" />
                    <p className="font-medium">
                      {photoFile ? "Change Photo" : "No file chosen"}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Allowed: jpg, png, jpeg. Max: 2MB.
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        setPhotoFile(e.target.files?.[0] || null)
                      }
                    />
                  </label>
                  {photoFile && (
                    <div className="flex items-center gap-2 rounded-lg border bg-muted/40 p-2 text-sm mt-2">
                      <FileUp className="h-4 w-4 text-indigo-600" />
                      <span className="truncate flex-1">{photoFile.name}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 text-red-600"
                        onClick={() => setPhotoFile(null)}
                      >
                        ×
                      </Button>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Document (e.g. Birth Certificate)</Label>
                  <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 p-8 transition hover:border-primary/50 hover:bg-muted/30">
                    <FileText className="mb-3 h-8 w-8 text-muted-foreground" />
                    <p className="font-medium">
                      {docFile ? "Change Document" : "No file chosen"}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Allowed: pdf, doc, docx, jpg. Max: 5MB.
                    </p>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.jpg,.png"
                      className="hidden"
                      onChange={(e) => setDocFile(e.target.files?.[0] || null)}
                    />
                  </label>
                  {docFile && (
                    <div className="flex items-center gap-2 rounded-lg border bg-muted/40 p-2 text-sm mt-2">
                      <FileUp className="h-4 w-4 text-indigo-600" />
                      <span className="truncate flex-1">{docFile.name}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 text-red-600"
                        onClick={() => setDocFile(null)}
                      >
                        ×
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Footer Actions */}
        <div className="flex flex-wrap gap-3 justify-start pt-4 border-t">
          
          <Button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
          >
            Update Details
          </Button>


          <Button type="button" variant="outline">
            Cancel
          </Button>
        </div>
      </form>
    
  );
}
