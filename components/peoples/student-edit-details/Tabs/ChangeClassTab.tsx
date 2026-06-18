"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

export default function ChangeClassTab() {
  const [admissionDate, setAdmissionDate] = useState<Date>(
    new Date(2007, 6, 22),
  ); // 07/22/2007

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Admission Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label>
                Admission Number <span className="text-destructive">*</span>
              </Label>
              <Input defaultValue="1387" />
            </div>
            <div className="space-y-2">
              <Label>
                Admission Date <span className="text-destructive">*</span>
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-slate-500" />
                    {admissionDate
                      ? format(admissionDate, "MM/dd/yyyy")
                      : "mm/dd/yyyy"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={admissionDate}
                    onSelect={(d) => d && setAdmissionDate(d)}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label>
                Class <span className="text-destructive">*</span>
              </Label>
              <Select defaultValue="nc-a">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nc-a">NC - A</SelectItem>
                  <SelectItem value="nc-b">NC - B</SelectItem>
                  <SelectItem value="lkg-a">LKG - A</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Class Roll Number</Label>
              <Input placeholder="Leave empty for auto" />
              <p className="text-xs text-slate-500">
                Leave empty to use internal auto-generation logic.
              </p>
            </div>
            <div className="space-y-2">
              <Label>Discount %</Label>
              <Input type="number" step="0.01" defaultValue="0.00" />
            </div>
          </div>

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
      </CardContent>
    </Card>
  );
}
