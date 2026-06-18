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
import { CalendarIcon, Briefcase } from "lucide-react";
import { format } from "date-fns";

export default function StaffPayrollInfo() {
  const [contractStart, setContractStart] = useState<Date | undefined>(
    undefined,
  );
  const [contractEnd, setContractEnd] = useState<Date | undefined>(undefined);

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Briefcase className="h-5 w-5 " />

          <CardTitle>Payroll Information</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <form className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* EPF No */}
            <div className="space-y-2">
              <Label>EPF No</Label>
              <Input
                placeholder="Enter EPF number"
                className="focus-visible:ring-indigo-500"
              />
            </div>

            {/* Basic Salary */}
            <div className="space-y-2">
              <Label>Basic Salary</Label>
              <Input
                type="number"
                step="0.01"
                placeholder="0.00"
                className="focus-visible:ring-indigo-500"
              />
            </div>

            {/* Contract Type */}
            <div className="space-y-2">
              <Label>Contract Type</Label>
              <Select defaultValue="permanent">
                <SelectTrigger className="focus-visible:ring-indigo-500">
                  <SelectValue placeholder="Select Contract Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="permanent">Permanent</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="intern">Intern</SelectItem>
                  <SelectItem value="temporary">Temporary</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Contract Start */}
            <div className="space-y-2">
              <Label>Contract Start</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal focus-visible:ring-indigo-500"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-slate-500" />
                    {contractStart
                      ? format(contractStart, "MM/dd/yyyy")
                      : "mm/dd/yyyy"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={contractStart}
                    onSelect={setContractStart}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Contract End */}
            <div className="space-y-2">
              <Label>Contract End</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal focus-visible:ring-indigo-500"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-slate-500" />
                    {contractEnd
                      ? format(contractEnd, "MM/dd/yyyy")
                      : "mm/dd/yyyy"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={contractEnd}
                    onSelect={setContractEnd}
                  />
                </PopoverContent>
              </Popover>
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
