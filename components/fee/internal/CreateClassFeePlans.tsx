 
"use client";

import { ReceiptText } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CreateClassFeePlans() {
  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Add Class Fee Plan</h1>

        
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Fee Plan Details</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Academic Year */}
            <div className="space-y-2">
              <Label>
                Academic Year{" "}
                <span className="text-destructive">*</span>
              </Label>

              <Select defaultValue="2026-27">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="2025-26">
                    2025-26
                  </SelectItem>

                  <SelectItem value="2026-27">
                    2026-27
                  </SelectItem>

                  <SelectItem value="2027-28">
                    2027-28
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Class */}
            <div className="space-y-2">
              <Label>
                Class <span className="text-destructive">*</span>
              </Label>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="nursery">
                    Nursery
                  </SelectItem>

                  <SelectItem value="lkg">
                    LKG
                  </SelectItem>

                  <SelectItem value="ukg">
                    UKG
                  </SelectItem>

                  <SelectItem value="class-1">
                    Class 1
                  </SelectItem>

                  <SelectItem value="class-2">
                    Class 2
                  </SelectItem>

                  <SelectItem value="class-3">
                    Class 3
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Plan Name */}
            <div className="space-y-2 md:col-span-2">
              <Label>
                Plan Name{" "}
                <span className="text-destructive">*</span>
              </Label>

              <Input placeholder="e.g. Class 1 Fees 2026-27" />
            </div>

            {/* Active Status */}
            <div className="flex items-center justify-between rounded-lg border p-4 md:col-span-2">
              <div>
                <Label className="text-sm font-medium">
                  Active
                </Label>

                
              </div>

              <Switch defaultChecked />
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-start">
            <Link href="/fee/class-fee-plans">
           
            <Button variant="outline">
              Cancel
            </Button>
             </Link>

            <Button>
              <ReceiptText className="mr-2 h-4 w-4" />
              Create Fee Plan
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}