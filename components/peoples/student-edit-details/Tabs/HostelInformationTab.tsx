"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { ChevronsUpDown } from "lucide-react";

export default function HostelInformationTab() {
  const [hasHostel, setHasHostel] = useState(false);
  const [hostel, setHostel] = useState("");
  const [room, setRoom] = useState("");
  const [bed, setBed] = useState("");
  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);

  const months = [
    { value: "apr", label: "April (APR)" },
    { value: "may", label: "May (MAY)" },
    { value: "jun", label: "June (JUN)" },
    { value: "jul", label: "July (JUL)" },
    { value: "aug", label: "August (AUG)" },
    { value: "sep", label: "September (SEP)" },
    { value: "oct", label: "October (OCT)" },
    { value: "nov", label: "November (NOV)" },
    { value: "dec", label: "December (DEC)" },
    { value: "jan", label: "January (JAN)" },
    { value: "feb", label: "February (FEB)" },
    { value: "mar", label: "March (MAR)" },
  ];

  const toggleMonth = (monthValue: string) => {
    setSelectedMonths((prev) =>
      prev.includes(monthValue)
        ? prev.filter((m) => m !== monthValue)
        : [...prev, monthValue],
    );
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Building2 className="h-5 w-5  " />

          <CardTitle>Hostel Services</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-start justify-between gap-4 p-4 border rounded-lg bg-slate-50/50 dark:bg-neutral-900/50 transition-colors hover:bg-slate-100/50 dark:hover:bg-neutral-900">
          <div className="space-y-1">
            <Label
              htmlFor="hostel-toggle"
              className="text-base font-medium cursor-pointer"
            >
              Avail Hostel?
            </Label>
            <p className="text-sm text-muted-foreground">
              Enable to assign hostel accommodation.
            </p>
          </div>
          <Switch
            id="hostel-toggle"
            checked={hasHostel}
            onCheckedChange={setHasHostel}
            className="mt-1 shrink-0"
          />
        </div>

        {hasHostel && (
          <div className="space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <Label>Hostel</Label>
                <Select value={hostel} onValueChange={setHostel}>
                  <SelectTrigger className="focus-visible:ring-indigo-500">
                    <SelectValue placeholder="Select Hostel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">A</SelectItem>
                    <SelectItem value="B">B</SelectItem>
                    <SelectItem value="C">C</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Room</Label>
                <Select value={room} onValueChange={setRoom}>
                  <SelectTrigger className="focus-visible:ring-indigo-500">
                    <SelectValue placeholder="Select Room" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="101">Room 101</SelectItem>
                    <SelectItem value="102">Room 102</SelectItem>
                    <SelectItem value="103">Room 103</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Bed</Label>
                <Select value={bed} onValueChange={setBed}>
                  <SelectTrigger className="focus-visible:ring-indigo-500">
                    <SelectValue placeholder="Select Bed" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Bed 1</SelectItem>
                    <SelectItem value="2">Bed 2</SelectItem>
                    <SelectItem value="3">Bed 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Months (Optional)</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between font-normal focus-visible:ring-indigo-500"
                  >
                    <span className="text-slate-500">
                      {selectedMonths.length === 0
                        ? "Select months"
                        : `${selectedMonths.length} month(s) selected`}
                    </span>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-[var(--radix-popover-trigger-width)] p-4"
                  align="start"
                >
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Leave empty to apply to all months in the academic year.
                    </p>
                    <div className="grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto">
                      {months.map((month) => (
                        <div
                          key={month.value}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            id={`month-${month.value}`}
                            checked={selectedMonths.includes(month.value)}
                            onChange={() => toggleMonth(month.value)}
                            className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <Label
                            htmlFor={`month-${month.value}`}
                            className="text-sm font-normal cursor-pointer flex-1"
                          >
                            {month.label}
                          </Label>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="default"
                        size="sm"
                        className="flex-1"
                        onClick={() =>
                          setSelectedMonths(months.map((month) => month.value))
                        }
                      >
                        Select All
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => setSelectedMonths([])}
                      >
                        Clear All
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        )}
      </CardContent>

      {/* Footer Actions */}
      <div className="flex flex-wrap gap-3 justify-start p-4 border-t">
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
    </Card>
  );
}
