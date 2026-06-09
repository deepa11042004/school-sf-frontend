"use client";

import { useState } from "react";
import { CalendarIcon, Users } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AddVisitor() {
  const [visitorName, setVisitorName] = useState("");
  const [phone, setPhone] = useState("");
  const [purpose, setPurpose] = useState("");
  const [persons, setPersons] = useState("1");
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(new Date());

  const [checkInTime, setCheckInTime] = useState(
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
  );

  const currentDateTime = "06/09/2026 01:06 PM";
  function convertTo24Hour(time: string) {
    const [timePart, modifier] = time.split(" ");

    if (!modifier) return time;

    let [hours, minutes] = timePart.split(":");

    if (hours === "12") {
      hours = "00";
    }

    if (modifier === "PM") {
      hours = String(Number(hours) + 12);
    }

    return `${hours.padStart(2, "0")}:${minutes}`;
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Add Visitor</h1>
      </div>

      {/* Visitor Form */}
      <Card>
        <CardHeader>
          <CardTitle>Visitor Details</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Visitor Name */}
            <div className="space-y-2">
              <Label htmlFor="visitorName">
                Visitor Name <span className="text-destructive">*</span>
              </Label>

              <Input
                id="visitorName"
                placeholder="Enter visitor name"
                value={visitorName}
                onChange={(e) => setVisitorName(e.target.value)}
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>

              <Input
                id="phone"
                type="tel"
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            {/* Check In Time */}
            <div className="space-y-2">
              <Label>
                Check In Time <span className="text-destructive">*</span>
              </Label>

              <div className="grid gap-3 sm:grid-cols-[1fr_140px]">
                {/* Date Picker */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "justify-start text-left font-normal",
                        !checkInDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />

                      {checkInDate ? (
                        format(checkInDate, "dd/MM/yyyy")
                      ) : (
                        <span>Select date</span>
                      )}
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={checkInDate}
                      onSelect={setCheckInDate}
                    />
                  </PopoverContent>
                </Popover>

                {/* Time Picker */}
                <Input
                  type="time"
                  value={convertTo24Hour(checkInTime)}
                  onChange={(e) => setCheckInTime(e.target.value)}
                />
              </div>
            </div>

            {/* Purpose */}
            <div className="space-y-2">
              <Label>Purpose</Label>

              <Select value={purpose} onValueChange={setPurpose}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Purpose" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="meeting">Meeting</SelectItem>
                  <SelectItem value="admission">Admission Inquiry</SelectItem>
                  <SelectItem value="parent">Parent Visit</SelectItem>
                  <SelectItem value="delivery">Delivery</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Number of Persons */}
            <div className="space-y-2">
              <Label>Number of Persons</Label>

              <Select value={persons} onValueChange={setPersons}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((count) => (
                    <SelectItem key={count} value={String(count)}>
                      {count}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Actions */}

          <div className="flex items-center gap-3 pt-8  ">
            <Button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
            >
              <Users className="mr-2 h-4 w-4" />
              Check In
            </Button>
            <Link href="/front-office/visitors">
              <Button variant="outline">Cancel</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
