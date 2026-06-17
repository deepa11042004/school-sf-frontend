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
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

const PayrollLeaves = () => {
  const [contractStart, setContractStart] = useState<Date | undefined>(
    undefined,
  );
  const [contractEnd, setContractEnd] = useState<Date | undefined>(undefined);

  return (
    <div className="space-y-6 animate-in fade-in-0 slide-in-from-right-4 duration-300">
      <div className="border-b pb-2 mb-4">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
          Payroll Details
        </h3>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-2">
          <Label>EPF No</Label>
          <Input placeholder="Enter EPF number" />
        </div>
        <div className="space-y-2">
          <Label>Basic Salary</Label>
          <Input type="number" placeholder="0.00" />
        </div>
        <div className="space-y-2">
          <Label>Contract Type</Label>
          <Select defaultValue="Permanent">
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Permanent">Permanent</SelectItem>
              <SelectItem value="Contract">Contract</SelectItem>
              <SelectItem value="Intern">Intern</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Contract Start</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
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
        <div className="space-y-2">
          <Label>Contract End</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-slate-500" />
                {contractEnd ? format(contractEnd, "MM/dd/yyyy") : "mm/dd/yyyy"}
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

      <div className="border-b pb-2 mb-4 mt-8">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
          Leaves
        </h3>
      </div>
      <div className="grid gap-6 md:grid-cols-5">
        <div className="space-y-2">
          <Label>Year</Label>
          <Input type="number" defaultValue="2025" />
        </div>
        <div className="space-y-2">
          <Label>Medical</Label>
          <Input type="number" defaultValue="0" />
        </div>
        <div className="space-y-2">
          <Label>Casual</Label>
          <Input type="number" defaultValue="0" />
        </div>
        <div className="space-y-2">
          <Label>Maternity</Label>
          <Input type="number" defaultValue="0" />
        </div>
        <div className="space-y-2">
          <Label>Sick</Label>
          <Input type="number" defaultValue="0" />
        </div>
      </div>
    </div>
  );
};

export default PayrollLeaves;
