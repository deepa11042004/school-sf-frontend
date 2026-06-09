"use client";

import { MessageSquarePlus } from "lucide-react";

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

export default function NewEnuiries() {
  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">New Enquiry</h1>

        <p className="text-sm text-muted-foreground">
          Dashboard / Enquiries / Add
        </p>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Enquiry Details</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">
                Name <span className="text-destructive">*</span>
              </Label>

              <Input
                id="name"
                placeholder="Enter name"
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>

              <Input
                id="phone"
                type="tel"
                placeholder="Enter phone number"
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
                  <SelectItem value="parent">
                    Parent
                  </SelectItem>

                  <SelectItem value="student">
                    Student
                  </SelectItem>

                  <SelectItem value="staff">
                    Staff
                  </SelectItem>

                  <SelectItem value="visitor">
                    Visitor
                  </SelectItem>

                  <SelectItem value="other">
                    Other
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Empty column for alignment on desktop */}
            <div className="hidden md:block" />
          </div>

          {/* Description */}
          <div className="mt-6 space-y-2">
            <Label htmlFor="description">
              Description / Initial Note
            </Label>

            <Textarea
              id="description"
              placeholder="Enter enquiry details, notes, or initial discussion..."
              rows={5}
            />
          </div>

           


          {/* Actions */}
          <div className="mt-8 flex gap-3 justify-start">
            <Link href="/front-office/admission-enquiries">
              <Button variant="outline">Cancel</Button>
            </Link>

            <Button>
              <MessageSquarePlus className="mr-2 h-4 w-4" />
              Save Enquiry
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}