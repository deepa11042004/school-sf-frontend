"use client";

import { AlertCircle } from "lucide-react";

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
import Link from "next/link";
export default function CreateFineRule() {
  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Add Fine Rule</h1>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Fine Rule Details</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Academic Year */}
            <div className="space-y-2">
              <Label>
                Academic Year <span className="text-destructive">*</span>
              </Label>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Year" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="2025-26">2025-26</SelectItem>

                  <SelectItem value="2026-27">2026-27</SelectItem>

                  <SelectItem value="2027-28">2027-28</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Fee Head */}
            <div className="space-y-2">
              <Label>
                Fee Head (Tuition Only){" "}
                <span className="text-destructive">*</span>
              </Label>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Head" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="tuition">Tuition Fee</SelectItem>

                  <SelectItem value="monthly">Monthly Fee</SelectItem>

                  <SelectItem value="annual">Annual Fee</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Rule Type */}
            <div className="space-y-2 md:col-span-2">
              <Label>
                Rule Type <span className="text-destructive">*</span>
              </Label>

              <Select defaultValue="fixed-after-due-date">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="fixed-after-due-date">
                    Fixed Amount After Due Date
                  </SelectItem>

                  <SelectItem value="daily-fixed">
                    Daily Fixed Amount
                  </SelectItem>

                  <SelectItem value="percentage">Percentage of Fee</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Fixed Amount */}
            <div className="space-y-2">
              <Label>
                Fixed Amount <span className="text-destructive">*</span>
              </Label>

              <Input type="number" min="0" placeholder="Enter fine amount" />
            </div>

            {/* Apply Once */}
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <Label className="text-sm font-medium">Apply Once</Label>

                <p className="text-sm text-muted-foreground">
                  Single fine per charge
                </p>
              </div>

              <Switch defaultChecked />
            </div>

            {/* Active */}
            <div className="flex items-center justify-between rounded-lg border p-4 md:col-span-2">
              <div>
                <Label className="text-sm font-medium">Active</Label>

                <p className="text-sm text-muted-foreground">
                  Enable this fine rule for fee calculations.
                </p>
              </div>

              <Switch defaultChecked />
            </div>
          </div>

          {/* Actions */}
        



          <div className="flex items-center gap-3 pt-8  ">
            <Button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
            >
              <AlertCircle className="mr-2 h-4 w-4" />
            Create Rule
            </Button>
            <Link href="/fee/fine-rules">
              <Button variant="outline">Cancel</Button>
            </Link>
          </div>


        </CardContent>
      </Card>
    </div>
  );
}
