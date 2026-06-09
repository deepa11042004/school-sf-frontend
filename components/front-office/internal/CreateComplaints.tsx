"use client";

import { AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CreateComplaints() {
  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">File Complaint</h1>

        <p className="text-sm text-muted-foreground">
          Dashboard / Complaints / Add
        </p>
      </div>

      {/* Complaint Form */}
      <Card>
        <CardHeader>
          <CardTitle>Complaint Details</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Complainant Name */}
            <div className="space-y-2">
              <Label htmlFor="complainantName">
                Complainant Name <span className="text-destructive">*</span>
              </Label>

              <Input
                id="complainantName"
                placeholder="Enter complainant name"
              />
            </div>

            {/* Type */}
            <div className="space-y-2">
              <Label>
                Type <span className="text-destructive">*</span>
              </Label>

              <Select defaultValue="parent">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="parent">Parent</SelectItem>

                  <SelectItem value="student">Student</SelectItem>

                  <SelectItem value="staff">Staff</SelectItem>

                  <SelectItem value="visitor">Visitor</SelectItem>

                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Category */}
            <div className="space-y-2 md:col-span-2">
              <Label>Category</Label>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="academic">Academic</SelectItem>

                  <SelectItem value="transport">Transport</SelectItem>

                  <SelectItem value="fee">Fee & Accounts</SelectItem>

                  <SelectItem value="staff">Staff Behaviour</SelectItem>

                  <SelectItem value="facilities">
                    Facilities & Infrastructure
                  </SelectItem>

                  <SelectItem value="discipline">Discipline</SelectItem>

                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Complaint Description */}
          <div className="mt-6 space-y-2">
            <Label htmlFor="description">
              Complaint Description <span className="text-destructive">*</span>
            </Label>

            <Textarea
              id="description"
              rows={6}
              placeholder="Describe the complaint in detail..."
            />
          </div>

          {/* Actions */}

          <div className="flex items-center gap-3 pt-8  ">
            <Button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
            >
              <AlertTriangle className="mr-2 h-4 w-4" />
              Submit Complaint
            </Button>
            <Link href="/front-office/complaints">
              <Button variant="outline">Cancel</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
